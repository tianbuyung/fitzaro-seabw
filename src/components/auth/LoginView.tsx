'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { useUserRole } from '@/hooks/use-user-role'
import { AssetOwnerPanel } from './AssetOwnerPanel'
import { InvestorPanel } from './InvestorPanel'

/**
 * Two-column login page.
 *
 * Left = Asset owner: Google + email magic link only, redirects to /owner/dashboard.
 * Right = Investor: Google + email + wallet (MetaMask/WalletConnect), redirects
 * to /investor/dashboard.
 *
 * Already-authenticated users are redirected to the correct namespace based on role.
 */
export function LoginView() {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()
  const role = useUserRole()

  useEffect(() => {
    if (ready && authenticated) {
      if (role === 'investor') router.replace('/investor/dashboard')
      else if (role === 'owner') router.replace('/owner/dashboard')
    }
  }, [ready, authenticated, role, router])

  // Avoid flashing the form while we figure out auth state, and avoid
  // flashing it for an already-authenticated user who's being redirected.
  if (!ready || authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Loading…</p>
      </main>
    )
  }

  const goToOwnerDashboard = (): void => {
    router.replace('/owner/dashboard')
  }

  const goToInvestorDashboard = (): void => {
    router.replace('/investor/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <AssetOwnerPanel onAuthSuccess={goToOwnerDashboard} />
      <InvestorPanel onAuthSuccess={goToInvestorDashboard} />

      <p className="pointer-events-none fixed bottom-3 left-0 right-0 text-center text-xs text-gray-400 md:text-white/80">
        By signing in you agree to our{' '}
        <Link href="#" className="pointer-events-auto underline hover:text-gray-600 md:hover:text-white">
          Terms
        </Link>
      </p>
    </main>
  )
}
