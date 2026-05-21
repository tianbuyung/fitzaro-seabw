'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { useUserRole, persistRole } from '@/hooks/use-user-role'
import { AssetOwnerPanel } from './AssetOwnerPanel'
import { InvestorPanel } from './InvestorPanel'

const PENDING_ROLE_KEY = 'fitzaro-pending-role'

/**
 * Two-column login page.
 *
 * Left = Asset owner: Google + email magic link only, redirects to /owner/dashboard.
 * Right = Investor: Google + email + wallet (MetaMask/WalletConnect), redirects
 * to /investor/dashboard.
 *
 * Google OAuth is a full-page redirect — the browser leaves and returns. By the
 * time we're back, the component containing useLoginWithOAuth is no longer
 * mounted, so onComplete never fires and persistRole never gets called.
 *
 * Fix: store the intended role in sessionStorage when the user first clicks
 * anywhere inside a panel (before the redirect). sessionStorage survives
 * page navigation within the same tab. On return, the effect reads it,
 * persists to localStorage, and redirects to the correct dashboard.
 */
export function LoginView() {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()
  const role = useUserRole()

  useEffect(() => {
    if (!ready || !authenticated) return

    // Priority 1: role the user was in the middle of choosing (OAuth redirect case)
    const pending = sessionStorage.getItem(PENDING_ROLE_KEY) as 'investor' | 'owner' | null
    if (pending) {
      sessionStorage.removeItem(PENDING_ROLE_KEY)
      persistRole(pending)
      router.replace(pending === 'owner' ? '/owner/dashboard' : '/investor/dashboard')
      return
    }

    // Priority 2: already-authenticated user navigated to /login — send them home
    if (role === 'investor') router.replace('/investor/dashboard')
    else if (role === 'owner') router.replace('/owner/dashboard')
  }, [ready, authenticated, role, router])

  if (!ready || authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Loading…</p>
      </main>
    )
  }

  // These fire for non-redirect flows (wallet login, magic link OTP)
  const goToOwnerDashboard = (): void => {
    persistRole('owner')
    router.replace('/owner/dashboard')
  }

  const goToInvestorDashboard = (): void => {
    persistRole('investor')
    router.replace('/investor/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      {/*
        Wrap each panel in a "contents" div that captures clicks before OAuth
        redirects the page away. Event bubbling guarantees this fires after the
        button's own handler starts (and before initOAuth actually redirects).
      */}
      <div
        className="contents"
        onClick={() => sessionStorage.setItem(PENDING_ROLE_KEY, 'owner')}
      >
        <AssetOwnerPanel onAuthSuccess={goToOwnerDashboard} />
      </div>
      <div
        className="contents"
        onClick={() => sessionStorage.setItem(PENDING_ROLE_KEY, 'investor')}
      >
        <InvestorPanel onAuthSuccess={goToInvestorDashboard} />
      </div>

      <p className="pointer-events-none fixed bottom-3 left-0 right-0 text-center text-xs text-gray-400 md:text-white/80">
        By signing in you agree to our{' '}
        <Link href="#" className="pointer-events-auto underline hover:text-gray-600 md:hover:text-white">
          Terms
        </Link>
      </p>
    </main>
  )
}
