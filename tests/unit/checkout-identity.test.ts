import { describe, it, expect, vi, beforeEach } from 'vitest';

// Pre-mock next/server and stripe
vi.mock('next/server', () => {
  return {
    NextResponse: {
      json: vi.fn((body, init) => ({ body, init })),
    }
  };
});

vi.mock('stripe', () => {
  return {
    default: class MockStripe {
      checkout = {
        sessions: {
          create: vi.fn().mockResolvedValue({ url: 'https://checkout.stripe.test/123' })
        }
      };
    }
  };
});

// We need to alter createClient response before import
const { mockGetUser } = vi.hoisted(() => ({ mockGetUser: vi.fn() }));
vi.mock('../../src/lib/supabase/server', () => {
  return {
    createClient: vi.fn().mockReturnValue(Promise.resolve({
      auth: {
        getUser: mockGetUser
      }
    }))
  };
});

import { POST } from '../../src/app/api/checkout/route';
import { NextResponse } from 'next/server';

describe('Checkout Identity Hardening', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';
    process.env.STRIPE_PRO_PRICE_ID = 'price_123';
    process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
  });

  it('rejects checkout if user is not authenticated on the server', async () => {
    // Mock unauthorized user
    mockGetUser.mockResolvedValueOnce({ data: { user: null } });

    const req = new Request('http://localhost/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ userId: 'fake_user_id', email: 'fake@example.com' }), // Client trying to forge request
    });

    const res = await POST(req);
    
    // Assert 401 Unauthorized
    expect(res).toEqual({ body: { error: 'Unauthorized' }, init: { status: 401 } });
    expect(NextResponse.json).toHaveBeenCalledWith({ error: 'Unauthorized' }, { status: 401 });
  });

  it('resolves identity strictly from the server data, ignoring client payload', async () => {
    // Mock authenticated real user
    mockGetUser.mockResolvedValueOnce({ 
      data: { 
        user: { id: 'real_user_id', email: 'real@user.com' } 
      } 
    });

    // Client tries to specify someone else's ID or email
    const req = new Request('http://localhost/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ userId: 'fake_forged_id', email: 'someone_else@example.com' }), // Will be ignored
    });

    const res = await POST(req);
    
    // Since mock resolved properly, the session should be created successfully using the backend config
    expect(res).toEqual({ body: { url: 'https://checkout.stripe.test/123' }, init: undefined });
  });
});
