import { describe, it, expect, vi, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { updateSession } from '../../src/lib/supabase/middleware';
import { mockEnv } from './helpers/env';

// Mock NextResponse
vi.mock('next/server', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    NextResponse: {
      next: vi.fn(),
      redirect: vi.fn((url) => ({ isRedirect: true, url: url.toString() })),
    },
    NextRequest: actual.NextRequest,
  };
});

describe('Production Hardening Middleware', () => {
  mockEnv();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('middleware fails closed and redirects to /misconfigured when Supabase env is missing on protected route', async () => {
    const { NextResponse } = await import('next/server');
    
    // Missing env
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // Simulate request to protected route
    const req = new NextRequest('http://localhost:3000/app/dashboard');
    
    const result = await updateSession(req);
    
    expect(NextResponse.redirect).toHaveBeenCalled();
    const mockRedirect = vi.mocked(NextResponse.redirect);
    const redirectUrl = mockRedirect.mock.calls[0][0] as URL;
    expect(redirectUrl.pathname).toBe('/misconfigured');
  });

  it('middleware allows unprotected routes to proceed even if Supabase env is missing', async () => {
    const { NextResponse } = await import('next/server');
    
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const req = new NextRequest('http://localhost:3000/pricing');
    
    await updateSession(req);
    
    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });
});
