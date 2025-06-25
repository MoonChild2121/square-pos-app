import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'SquareOAuth',
      credentials: {
        code: { label: 'Authorization Code', type: 'text' },
      },
      async authorize(credentials) {
        const code = credentials?.code

        const tokenRes = await fetch(
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

        const token = await tokenRes.json()

        if (!token.access_token) return null

        return {
          id: token.merchant_id,
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          expiresAt: token.expires_at,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.expiresAt = user.expiresAt
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresAt: token.expiresAt,
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})
export { handler as GET, handler as POST }
