import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/app'

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
