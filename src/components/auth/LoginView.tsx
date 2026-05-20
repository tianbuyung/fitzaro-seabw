'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { AssetOwnerPanel } from './AssetOwnerPanel'
import { InvestorPanel } from './InvestorPanel'

/**
 * Two-column login page.
 *
 * Left = Asset owner: Google + email magic link only, redirects to /tokenize.
 * Right = Investor: Google + email + wallet (MetaMask/WalletConnect), redirects
 * to /dashboard.
 *
 * If a user lands here already authenticated, we send them straight to
 * /dashboard so they don't see the login UI flash.
 */
export function LoginView() {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()

  useEffect(() => {
    if (ready && authenticated) {
      router.replace('/dashboard')
    }
  }, [ready, authenticated, router])

  // Avoid flashing the form while we figure out auth state, and avoid
  // flashing it for an already-authenticated user who's being redirected.
  if (!ready || authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Loading…</p>
      </main>
    )
  }

  const goToTokenize = (): void => {
    router.replace('/tokenize')
  }

  const goToDashboard = (): void => {
    router.replace('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <AssetOwnerPanel onAuthSuccess={goToTokenize} />
      <InvestorPanel onAuthSuccess={goToDashboard} />

      <p className="pointer-events-none fixed bottom-3 left-0 right-0 text-center text-xs text-gray-400 md:text-white/80">
        By signing in you agree to our{' '}
        <Link href="#" className="pointer-events-auto underline hover:text-gray-600 md:hover:text-white">
          Terms
        </Link>
      </p>
    </main>
  )
}
