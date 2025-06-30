// app/dashboard/page.tsx
'use client'

import { useSession } from '@/hooks/useSession'
import { LogoutButton } from '@/components/LogoutButton'
import { css } from '@/styled-system/css'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { businessName, isLoading, error } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !businessName) {
      router.replace('/login')
    }
  }, [isLoading, businessName, router])

  if (isLoading) {
    return (
      <main className={css({ p: '8', minH: '100vh' })}>
        <p>Loading...</p>
      </main>
    )
  }

  if (error || !businessName) {
    return (
      <main className={css({ p: '8', minH: '100vh' })}>
        <p>Redirecting to login...</p>
      </main>
    )
  }

  return (
    <main
      className={css({
        p: '8',
        minH: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '4',
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <h1 className={css({ textStyle: 'heading' })}>Dashboard</h1>
        <LogoutButton />
      </div>
      <p>You're logged in as: {businessName}</p>
    </main>
  )
}
