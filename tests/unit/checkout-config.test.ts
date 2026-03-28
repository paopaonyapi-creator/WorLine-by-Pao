import { describe, it, expect } from 'vitest';
import { getCheckoutConfig } from '../../src/lib/billing/get-checkout-config';
import { mockEnv } from './helpers/env';

describe('getCheckoutConfig', () => {
  mockEnv();

  it('throws if STRIPE_SECRET_KEY is missing', () => {
    delete process.env.STRIPE_SECRET_KEY;
    process.env.STRIPE_PRO_PRICE_ID = 'price_123';
    
    expect(() => getCheckoutConfig(process.env)).toThrow('Missing STRIPE_SECRET_KEY in environment');
  });

  it('throws if STRIPE_PRO_PRICE_ID is missing', () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';
    delete process.env.STRIPE_PRO_PRICE_ID;
    
    expect(() => getCheckoutConfig(process.env)).toThrow('Missing STRIPE_PRO_PRICE_ID in environment');
  });

  it('throws if NEXT_PUBLIC_APP_URL is missing in production', () => {
    const testEnv = {
      ...process.env,
      STRIPE_SECRET_KEY: 'sk_test_123',
      STRIPE_PRO_PRICE_ID: 'price_123',
      NODE_ENV: 'production',
    } as NodeJS.ProcessEnv;
    delete testEnv.NEXT_PUBLIC_APP_URL;
    delete testEnv.NEXT_PUBLIC_SITE_URL;
    
    expect(() => getCheckoutConfig(testEnv)).toThrow('Missing NEXT_PUBLIC_APP_URL in production environment');
  });

  it('falls back to localhost if NEXT_PUBLIC_APP_URL is missing in development', () => {
    const testEnv = {
      ...process.env,
      STRIPE_SECRET_KEY: 'sk_test_123',
      STRIPE_PRO_PRICE_ID: 'price_123',
      NODE_ENV: 'development',
    } as NodeJS.ProcessEnv;
    delete testEnv.NEXT_PUBLIC_APP_URL;
    delete testEnv.NEXT_PUBLIC_SITE_URL;
    
    const config = getCheckoutConfig(testEnv);
    expect(config.appUrl).toBe('http://localhost:3000');
  });

  it('returns valid config if all variables are present', () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';
    process.env.STRIPE_PRO_PRICE_ID = 'price_123';
    process.env.NEXT_PUBLIC_APP_URL = 'https://myapp.com/';
    
    const config = getCheckoutConfig(process.env);
    
    expect(config.stripeSecretKey).toBe('sk_test_123');
    expect(config.stripePriceId).toBe('price_123');
    expect(config.appUrl).toBe('https://myapp.com'); // Trailing slash removed
  });
});
