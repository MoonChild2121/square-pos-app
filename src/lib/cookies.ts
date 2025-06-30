const MERCHANT_ID_COOKIE = 'merchant_id'

export function getMerchantIdCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined

  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${MERCHANT_ID_COOKIE}=`))
    ?.split('=')[1]
}

export function setMerchantIdCookie(merchantId: string) {
  document.cookie = `${MERCHANT_ID_COOKIE}=${merchantId}; Path=/; Secure; SameSite=Lax`
}

export function clearMerchantIdCookie() {
  document.cookie = `${MERCHANT_ID_COOKIE}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}
