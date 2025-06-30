import { NextRequest, NextResponse } from 'next/server'
import { Client, Environment } from 'square'
import { supabase } from '@/lib/supabase-admin'
import { decrypt } from '@/lib/crypto'

export async function GET(req: NextRequest) {
  try {
    const merchantId = req.cookies.get('merchant_id')?.value

    if (!merchantId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Fetch merchant's token from Supabase
    const { data: tokenData, error: tokenError } = await supabase
      .from('tokens')
      .select('access_token')
      .eq('merchant_id', merchantId)
      .single()

    if (tokenError || !tokenData) {
      console.error('Failed to fetch token:', tokenError)
      return NextResponse.json({ error: 'Token not found' }, { status: 401 })
    }

    // Decrypt the access token
    const accessToken = decrypt(tokenData.access_token)

    // Initialize Square client with merchant's token
    const client = new Client({
      accessToken,
      environment:
        process.env.NODE_ENV === 'production'
          ? Environment.Production
          : Environment.Sandbox,
    })

    const response = await client.merchantsApi.retrieveMerchant(merchantId)

    if (!response.result.merchant) {
      return NextResponse.json({ error: 'Merchant not found' }, { status: 404 })
    }

    return NextResponse.json({
      merchantId,
      businessName: response.result.merchant.businessName || merchantId,
    })
  } catch (error) {
    console.error('Error fetching merchant:', error)
    return NextResponse.json(
      { error: 'Failed to fetch merchant data' },
      { status: 500 }
    )
  }
}
