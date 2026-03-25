import { NextResponse } from 'next/server';

/**
 * Health check endpoint for Railway deployment.
 * Always returns 200 so Railway healthcheck passes.
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
  }, { status: 200 });
}
