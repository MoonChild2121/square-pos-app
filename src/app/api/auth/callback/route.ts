import { NextRequest, NextResponse } from 'next/server'
import { saveToken } from '@/lib/tokenStore'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')

  if (!code) {
    return NextResponse.json(
      { error: 'Missing authorization code' },
      { status: 400 }
    )
  }

  try {
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
      return NextResponse.json({ error: data }, { status: 400 })
    }

    saveToken({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      merchant_id: data.merchant_id,
    })

    return NextResponse.redirect(new URL('/dashboard', req.url))
  } catch (error) {
    console.error('Token exchange error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
