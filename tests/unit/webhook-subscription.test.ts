import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/stripe/webhook/route';

// Mock explicit Stripe dependencies securely
vi.mock('stripe', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      webhooks: {
        constructEvent: vi.fn().mockReturnValue({
          type: 'checkout.session.completed',
          data: {
            object: {
              id: 'cs_123abc',
              client_reference_id: 'user_live_123',
              customer: 'cus_123',
              subscription: 'sub_live_123'
            }
          }
        })
      },
      subscriptions: {
        retrieve: vi.fn().mockResolvedValue({
          status: 'active',
          current_period_end: 1700000000,
          cancel_at_period_end: false,
          items: {
            data: [{ price: { id: 'price_abc_live' } }]
          }
        })
      },
      checkout: {
        sessions: {
          listLineItems: vi.fn().mockResolvedValue({ data: [] })
        }
      }
    }))
  };
});

// Capture and spy on Supabase methods
const mockUpsert = vi.fn().mockResolvedValue({ error: null });
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn().mockReturnValue({
    from: vi.fn().mockReturnValue({
      upsert: mockUpsert,
    })
  })
}));

describe('Webhook Billing Subscriptions', () => {
  beforeEach(() => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_mock';
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_mock';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://test-stage';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'mock_role_key';
    vi.clearAllMocks();
  });

  it('persists full subscription period data independently after checkout completion', async () => {
    const req = new Request('http://localhost/api/stripe/webhook', {
      method: 'POST',
      headers: { 'stripe-signature': 'mock_valid_signature' },
      body: 'mocked_secure_body'
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    // Accurately verify period boundaries were persisted alongside identities natively
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'user_live_123',
        status: 'active',
        stripe_price_id: 'price_abc_live',
        current_period_end: new Date(1700000000 * 1000).toISOString(),
        cancel_at_period_end: false
      }),
      expect.objectContaining({ onConflict: 'user_id' })
    );
  });
});
