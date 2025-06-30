import { supabase } from './supabase-admin'
import { encrypt } from './crypto'

type TokenPayload = {
  merchant_id: string
  access_token: string
  refresh_token: string
  expires_at: string // ISO format
}

export async function saveToken({
  merchant_id,
  access_token,
  refresh_token,
  expires_at,
}: TokenPayload) {
  const { error, data } = await supabase
    .from('tokens')
    .upsert(
      {
        merchant_id,
        access_token: encrypt(access_token),
        refresh_token: encrypt(refresh_token),
        expires_at: new Date(expires_at).toISOString(),
      },
      { onConflict: 'merchant_id' }
    )
    .select()

  if (error) {
    console.error('Error saving token to Supabase:', error)
    throw error
  }

  return data?.[0]
}
