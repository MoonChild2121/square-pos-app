import { NextRequest, NextResponse } from 'next/server'
import { saveToken } from '@/lib/tokenStore'

function parseCookies(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') || ''
  const cookies: Record<string, string> = {}
  cookieHeader.split(';').forEach((cookie) => {
    const [key, value] = cookie.trim().split('=')
    cookies[key] = decodeURIComponent(value)
  })
  return cookies
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')

  const cookies = parseCookies(req)
  const storedState = cookies['square_oauth_state']

  if (state !== storedState) {
    console.error('CSRF state mismatch:', { state, storedState })
    return NextResponse.json({ error: 'Invalid state' }, { status: 403 })
  }

  console.log('=== OAuth Callback Triggered ===')
  console.log('Query Params:', { code, state })

  if (!code) {
    console.warn('Missing authorization code in callback request')
    return NextResponse.json(
      { error: 'Missing authorization code' },
      { status: 400 }
    )
  }

  try {
    console.log('Attempting token exchange with Square...')

    const tokenResponse = await fetch(
      `${process.env.SQUARE_API_BASE}/oauth2/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Square-Version': '2025-06-18',
        },
        body: JSON.stringify({
          client_id: process.env.SQUARE_APPLICATION_ID,
          client_secret: process.env.SQUARE_APPLICATION_SECRET,
          code,
          grant_type: 'authorization_code',
        }),
      }
    )

    const data = await tokenResponse.json()

    if (!tokenResponse.ok) {
      console.error('Square token exchange failed:', data)
      return NextResponse.json({ error: data }, { status: 400 })
    }

    console.log('Token exchange successful. Data received:', {
      merchant_id: data.merchant_id,
      access_token_present: !!data.access_token,
      refresh_token_present: !!data.refresh_token,
      expires_at: data.expires_at,
    })

    // Store encrypted tokens in Supabase
    try {
      console.log('Encrypting and saving token to database...')
      await saveToken({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at:
          data.expires_at ||
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // fallback to 30 days if missing
        merchant_id: data.merchant_id,
      })
      console.log('Token successfully saved to Supabase')
    } catch (storageError: any) {
      console.error('Failed to store encrypted token:', storageError)
      return NextResponse.json(
        { error: 'Failed to store token' },
        { status: 500 }
      )
    }

    // Create response with redirect
    const response = NextResponse.redirect(new URL('/dashboard', req.url))

    // Set merchant ID cookie
    response.cookies.set('merchant_id', data.merchant_id, {
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: data.expires_at
        ? new Date(data.expires_at)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })

    console.log('Redirecting to /dashboard with merchant ID cookie set')
    return response
  } catch (error) {
    console.error('Token exchange or saving failed:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
