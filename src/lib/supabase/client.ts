import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Build-time fallback — returns a client that won't connect but won't crash
    return createBrowserClient(
      "https://placeholder.supabase.co",
      "placeholder-anon-key"
    )
  }

  return createBrowserClient(url, key)
}
