import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup') || request.nextUrl.pathname.startsWith('/forgot-password')
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/app') || request.nextUrl.pathname.startsWith('/admin')

  // If env vars are not set, fail closed for protected routes (build-time or misconfigured)
  if (!url || !key) {
    if (isProtectedRoute) {
      const errorUrl = request.nextUrl.clone()
      errorUrl.pathname = '/misconfigured'
      return NextResponse.redirect(errorUrl)
    }
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()



  if (!user && isProtectedRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }

  if (user && isAuthRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/app'
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}
