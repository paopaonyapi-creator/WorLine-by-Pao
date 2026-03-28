import { NextResponse } from 'next/server';
import { APP_VERSION } from '@/lib/app-meta';

/**
 * Health check endpoint for Railway deployment.
 * Always returns 200 so Railway healthcheck passes.
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: APP_VERSION,
  }, { status: 200 });
}
