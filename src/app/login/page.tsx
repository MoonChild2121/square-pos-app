'use client'

import { initiateSquareOAuth } from '@/lib/square-oauth'
import { css, cx } from '@/styled-system/css'
import { button } from '@/styled-system/recipes'

export default function LoginPage() {
  const handleLogin = () => {
    try {
      const oauthUrl = initiateSquareOAuth()
      window.location.href = oauthUrl
    } catch (error) {
      console.error('Failed to initiate Square OAuth:', error)
    }
  }

  return (
    <main
      className={css({
        minH: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '3',
        bg: 'bg',
        color: 'text',
        px: '4',
      })}
    >
      <h1 className={css({ textStyle: 'heading' })}>Login with Square</h1>
      <button
        onClick={handleLogin}
        className={cx(button({ variant: 'solid' }))}
      >
        Connect Square Account
      </button>
    </main>
  )
}
