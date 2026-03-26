import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next') ?? '/app'

  // Fix for proxy environments (Railway) where request.url origin is 0.0.0.0:8080
  const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host')
  const protocol = request.headers.get('x-forwarded-proto') || (forwardedHost?.includes('localhost') ? 'http' : 'https')
  const origin = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${forwardedHost}`

  if (code) {
    const supabase = await createClient()

    if (type === 'recovery') {
      // For password recovery tokens from email template
      // Use verifyOtp to exchange the token for a session
      const { error } = await supabase.auth.verifyOtp({
        token_hash: code,
        type: 'recovery',
      })

      if (error) {
        // If verifyOtp fails, try exchangeCodeForSession as fallback
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
        if (exchangeError) {
          // Redirect to login with error
          return NextResponse.redirect(`${origin}/login?error=recovery_failed`)
        }
      }
    } else {
      // Standard OAuth / magic link code exchange
      await supabase.auth.exchangeCodeForSession(code)
    }
  }

  return NextResponse.redirect(`${origin}${next}`)
}
