import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/stripe/webhook/route';

const {
  mockConstructEvent,
  mockRetrieve,
  mockUpsert,
  mockSelectSingle,
  mockSelectEq,
  mockSelect,
  mockUpdateEq,
  mockUpdate,
  mockFrom
} = vi.hoisted(() => {
  const mockConstructEvent = vi.fn();
  const mockRetrieve = vi.fn();
  const mockUpsert = vi.fn().mockResolvedValue({ error: null });
  const mockSelectSingle = vi.fn().mockResolvedValue({ data: { user_id: 'mapped_user_123' } });
  const mockSelectEq = vi.fn().mockReturnValue({ single: mockSelectSingle });
  const mockSelect = vi.fn().mockReturnValue({ eq: mockSelectEq });
  const mockUpdateEq = vi.fn().mockResolvedValue({ error: null });
  const mockUpdate = vi.fn().mockReturnValue({ eq: mockUpdateEq });
  const mockFrom = vi.fn().mockImplementation(() => ({
    upsert: mockUpsert,
    select: mockSelect,
    update: mockUpdate
  }));
  return { mockConstructEvent, mockRetrieve, mockUpsert, mockSelectSingle, mockSelectEq, mockSelect, mockUpdateEq, mockUpdate, mockFrom };
});

vi.mock('stripe', () => {
  return {
    default: class MockStripe {
      webhooks = { constructEvent: mockConstructEvent };
      subscriptions = { retrieve: mockRetrieve };
      checkout = {
        sessions: {
          listLineItems: vi.fn().mockResolvedValue({ data: [] })
        }
      };
    }
  };
});

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn().mockReturnValue({
    from: mockFrom
  })
}));

describe('Webhook Billing Subscriptions Lifecycle', () => {
  beforeEach(() => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_mock';
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_mock';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://test-stage';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'mock_role_key';
    vi.clearAllMocks();
  });

  const generateMockRequest = () => new Request('http://localhost/api/stripe/webhook', {
    method: 'POST',
    headers: { 'stripe-signature': 'mock_valid_signature' },
    body: 'mocked_secure_body'
  });

  it('persists full subscription period data originally on checkout completion', async () => {
    mockConstructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_123abc',
          client_reference_id: 'mapped_user_123',
          customer: 'cus_123',
          subscription: 'sub_live_123'
        }
      }
    });

    mockRetrieve.mockResolvedValue({
      status: 'active',
      current_period_end: 1700000000,
      cancel_at_period_end: false,
      items: { data: [{ price: { id: 'price_abc_live' } }] }
    });

    const res = await POST(generateMockRequest());
    expect(res.status).toBe(200);

    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'mapped_user_123',
        status: 'active',
        stripe_price_id: 'price_abc_live',
        current_period_end: new Date(1700000000 * 1000).toISOString(),
        cancel_at_period_end: false
      }),
      expect.objectContaining({ onConflict: 'user_id' })
    );
  });

  it('updates price mapping successfully upon downgrade/upgrade events', async () => {
    mockConstructEvent.mockReturnValue({
      type: 'customer.subscription.updated',
      data: {
        object: {
          customer: 'cus_123',
          status: 'active',
          current_period_end: 1700000000,
          cancel_at_period_end: false,
          items: { data: [{ price: { id: 'price_downgraded_tier' } }] }
        }
      }
    });

    const res = await POST(generateMockRequest());
    expect(res.status).toBe(200);

    // Verify it securely mapped the stripe customer lookup back to user_id
    expect(mockSelectEq).toHaveBeenCalledWith('stripe_customer_id', 'cus_123');

    // Verify update drops the new price securely onto the mapped user
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        stripe_price_id: 'price_downgraded_tier',
        status: 'active'
      })
    );
    expect(mockUpdateEq).toHaveBeenCalledWith('user_id', 'mapped_user_123');
  });

  it('persists cancel_at_period_end status seamlessly when behavior fires', async () => {
    mockConstructEvent.mockReturnValue({
      type: 'customer.subscription.updated',
      data: {
        object: {
          customer: 'cus_123',
          status: 'active', // Strip maintains active status until period finishes natively
          current_period_end: 1700000000,
          cancel_at_period_end: true,
          items: { data: [{ price: { id: 'price_abc_live' } }] }
        }
      }
    });

    const res = await POST(generateMockRequest());
    expect(res.status).toBe(200);

    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'active',
        cancel_at_period_end: true
      })
    );
  });

  it('marks subscription fully disabled precisely on deletion broadcast', async () => {
    mockConstructEvent.mockReturnValue({
      type: 'customer.subscription.deleted',
      data: {
        object: {
          customer: 'cus_123',
          status: 'canceled', 
          current_period_end: 1700000000,
          cancel_at_period_end: false,
          items: { data: [{ price: { id: 'price_abc_live' } }] }
        }
      }
    });

    const res = await POST(generateMockRequest());
    expect(res.status).toBe(200);

    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'canceled'
      })
    );
  });
});
