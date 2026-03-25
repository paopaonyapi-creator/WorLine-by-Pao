import { NextResponse } from 'next/server';

/**
 * Health check endpoint for Railway deployment.
 * Returns system status and verifies env vars are configured.
 */
export async function GET() {
  const checks = {
    supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabase_service_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    stripe_secret: !!process.env.STRIPE_SECRET_KEY,
    stripe_publishable: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    stripe_webhook_secret: !!process.env.STRIPE_WEBHOOK_SECRET,
    stripe_price_id: !!process.env.STRIPE_PRO_PRICE_ID,
    app_url: process.env.NEXT_PUBLIC_APP_URL || 'not set',
  };

  const allConfigured = Object.values(checks).every(v => v === true || (typeof v === 'string' && v !== 'not set'));

  return NextResponse.json({
    status: allConfigured ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
    checks,
  }, { status: allConfigured ? 200 : 503 });
}
