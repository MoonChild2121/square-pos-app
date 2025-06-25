import { NextResponse } from 'next/server'
import { getToken } from '@/lib/tokenStore'

export async function GET() {
  const token = getToken()

  if (!token) {
    return NextResponse.json({ error: 'No token stored' }, { status: 404 })
  }

  return NextResponse.json(token)
}
