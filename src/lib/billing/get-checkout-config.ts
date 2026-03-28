export interface CheckoutConfig {
  stripeSecretKey: string;
  stripePriceId: string;
  appUrl: string;
}

export function getCheckoutConfig(env: NodeJS.ProcessEnv = process.env): CheckoutConfig {
  const stripeSecretKey = env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY in environment');
  }

  const stripePriceId = env.STRIPE_PRO_PRICE_ID;
  if (!stripePriceId) {
    throw new Error('Missing STRIPE_PRO_PRICE_ID in environment');
  }

  let appUrl = env.NEXT_PUBLIC_APP_URL || env.NEXT_PUBLIC_SITE_URL;
  if (!appUrl) {
    if (env.NODE_ENV === 'production') {
      throw new Error('Missing NEXT_PUBLIC_APP_URL in production environment');
    }
    appUrl = 'http://localhost:3000';
  }

  // Ensure no trailing slash
  appUrl = appUrl.replace(/\/$/, '');

  return {
    stripeSecretKey,
    stripePriceId,
    appUrl,
  };
}
