export function initiateSquareOAuth() {
  const clientId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID
  const redirectUri = process.env.NEXT_PUBLIC_SQUARE_SANDBOX_REDIRECT_URI
  const environment = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT || 'sandbox'

  if (!clientId || !redirectUri) {
    throw new Error('Missing Square credentials in env variables.')
  }

  const state = crypto.randomUUID()
  const scope = [
    'MERCHANT_PROFILE_READ',
    'PAYMENTS_READ',
    'PAYMENTS_WRITE',
  ].join(' ')

  const baseUrl =
    environment === 'production'
      ? 'https://connect.squareup.com/oauth2/authorize'
      : 'https://connect.squareupsandbox.com/oauth2/authorize'

  const params = new URLSearchParams({
    client_id: clientId,
    scope,
    session: 'false',
    state,
  })

  // Store state for verification
  document.cookie = `square_oauth_state=${state}; path=/; SameSite=Lax`

  return `${baseUrl}?${params.toString()}`
}
