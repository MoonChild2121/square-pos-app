import { NextRequest, NextResponse } from 'next/server'

// This triggers NextAuth's credentials provider via its callback route
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const callbackUrl =
    req.nextUrl.searchParams.get('callbackUrl') || '/dashboard'

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', req.url))
  }

  const url = new URL('/api/auth/callback/credentials', req.nextUrl.origin)
  url.searchParams.set('code', code)
  url.searchParams.set('callbackUrl', callbackUrl)

  return NextResponse.redirect(url)
}
