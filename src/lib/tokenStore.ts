// lib/tokenStore.ts

import fs from 'fs'
import path from 'path'

const TOKEN_PATH = path.join(process.cwd(), 'tokenStore.json')

type TokenInfo = {
  access_token: string
  refresh_token: string
  expires_at: string
  merchant_id: string
}

export const saveToken = (token: TokenInfo) => {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2), 'utf-8')
  console.log('Token stored in tokenStore.json:', token)
}

export const getToken = (): TokenInfo | null => {
  if (!fs.existsSync(TOKEN_PATH)) return null
  const data = fs.readFileSync(TOKEN_PATH, 'utf-8')
  return JSON.parse(data) as TokenInfo
}
