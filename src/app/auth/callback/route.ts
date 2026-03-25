import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // NOTE: When deploying to Railway, configure this origin or redirect appropriately
  // The NEXT_PUBLIC_APP_URL environment variable might be required here if origin fails
  const next = searchParams.get('next') ?? '/app'
  return NextResponse.redirect(`${origin}${next}`)
}
