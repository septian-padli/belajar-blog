// app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() })

  const requestUrl = new URL(request.url)
    const { error } = await supabase.auth.exchangeCodeForSession(requestUrl.toString())


  if (error) {
    console.error('Exchange error:', error.message)
    return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
  }

  return NextResponse.redirect(new URL('/', request.url))
}
