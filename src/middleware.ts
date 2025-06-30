import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get merchant ID from cookie
  const merchantId = request.cookies.get('merchant_id')

  // If accessing dashboard without being logged in, redirect to login
  if (request.nextUrl.pathname.startsWith('/dashboard') && !merchantId) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If accessing login while logged in, redirect to dashboard
  if (request.nextUrl.pathname === '/login' && merchantId) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
