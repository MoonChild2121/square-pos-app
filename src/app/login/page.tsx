'use client'

export default function LoginPage() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID
    const redirectUri = process.env.NEXT_PUBLIC_SQUARE_SANDBOX_REDIRECT_URI
    const environment = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT || 'sandbox'

    if (!clientId || !redirectUri) {
      console.error('Missing Square credentials in env variables.')
      return
    }

    const state = crypto.randomUUID() // CSRF protection
    const scope = [
      'MERCHANT_PROFILE_READ',
      'PAYMENTS_READ',
      'PAYMENTS_WRITE',
    ].join(' ') // Use space separator as per Square docs

    // Handle different URL formats based on environment
    let baseUrl
    if (environment === 'production') {
      baseUrl = 'https://connect.squareup.com/oauth2/authorize'
    } else {
      baseUrl = 'https://connect.squareupsandbox.com/oauth2/authorize'
    }

    // Construct URL with proper parameter separation
    const params = new URLSearchParams({
      client_id: clientId,
      scope: scope,
      session: 'false',
      state: state,
    })

    const url = `${baseUrl}?${params.toString()}`
    console.log('Generated OAuth URL:', url)
    console.log('URL breakdown:')
    console.log('- Base URL:', baseUrl)
    console.log('- Parameters:', params.toString())
    console.log('- Client ID:', clientId)
    console.log('- Scope:', scope)
    console.log('- State:', state)

    // Store the state for verification when the callback happens
    document.cookie = `square_oauth_state=${state}; path=/; SameSite=Lax`

    // Redirect the current window to the OAuth login flow
    window.location.href = url
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Login with Square</h1>
      <button onClick={handleLogin}>Connect Square Account</button>
    </main>
  )
}
