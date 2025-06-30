import { useRouter } from 'next/navigation'
import { clearMerchantIdCookie } from '@/lib/cookies'
import { button } from '@/styled-system/recipes'
import { css, cx } from '@/styled-system/css'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    clearMerchantIdCookie()
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className={cx(button({ variant: 'outline' }))}
    >
      Logout
    </button>
  )
}
