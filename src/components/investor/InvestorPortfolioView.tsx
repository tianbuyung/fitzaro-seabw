'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { InvestorNavbar } from './InvestorNavbar'
import { formatCurrency } from '@/data/mock-assets'
import { useUserRole } from '@/hooks/use-user-role'
import type { PortfolioPosition } from '@/features/portfolio/types'

interface PositionCardProps {
  position: PortfolioPosition
}

function PositionCard({ position }: PositionCardProps) {
  const totalCost = position.tokenAmount * position.tokenPrice
  const annualProfitShare = (totalCost * position.profitShare) / 100

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{position.tokenName}</h3>
          <p className="mt-0.5 font-mono text-xs text-gray-400">{position.ticker}</p>
        </div>
        <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
          Active
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400">Tokens held</dt>
          <dd className="mt-0.5 text-sm font-semibold text-gray-900">
            {position.tokenAmount.toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400">Total invested</dt>
          <dd className="mt-0.5 text-sm font-semibold text-gray-900">{formatCurrency(totalCost)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400">Est. annual profit share</dt>
          <dd className="mt-0.5 text-sm font-semibold text-green-600">
            {formatCurrency(annualProfitShare)}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400">Repayment multiple</dt>
          <dd className="mt-0.5 text-sm font-semibold text-gray-900">{position.repaymentMultiple}x</dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <Link
          href={`/investor/assets/${position.assetId}`}
          className="text-sm font-medium text-[var(--color-primary)] hover:underline"
        >
          View business →
        </Link>
      </div>
    </div>
  )
}

export function InvestorPortfolioView() {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()
  const role = useUserRole()
  const [positions, setPositions] = useState<PortfolioPosition[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (ready && !authenticated) router.replace('/login')
  }, [ready, authenticated, router])

  useEffect(() => {
    if (role === 'owner') router.replace('/owner/dashboard')
  }, [role, router])

  useEffect(() => {
    const stored = localStorage.getItem('fitzaro-portfolio')
    const data: PortfolioPosition[] = stored ? (JSON.parse(stored) as PortfolioPosition[]) : []
    setPositions(data)
    setLoaded(true)
  }, [])

  const totalInvested = positions.reduce((sum, p) => sum + p.tokenAmount * p.tokenPrice, 0)
  const totalAnnualReturn = positions.reduce(
    (sum, p) => sum + (p.tokenAmount * p.tokenPrice * p.profitShare) / 100,
    0,
  )

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <InvestorNavbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">My Portfolio</h1>
          <p className="mt-1 text-sm text-gray-500">Businesses you&apos;ve funded on Fitzaro.</p>
        </header>

        {loaded && positions.length > 0 && (
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Portfolio summary">
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-400">Total invested</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{formatCurrency(totalInvested)}</p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-400">Est. annual return</p>
              <p className="mt-1 text-2xl font-bold text-green-600">{formatCurrency(totalAnnualReturn)}</p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-400">Positions</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{positions.length}</p>
            </div>
          </section>
        )}

        {!loaded ? (
          <div className="flex items-center justify-center py-24">
            <span
              aria-hidden
              className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--color-primary)]"
            />
          </div>
        ) : positions.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <p className="text-lg font-semibold text-gray-900">No positions yet</p>
            <p className="text-sm text-gray-500">
              Browse the marketplace and fund a business to start building your portfolio.
            </p>
            <Link
              href="/investor/dashboard"
              className="mt-2 inline-flex items-center rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              Browse marketplace
            </Link>
          </div>
        ) : (
          <section aria-label="Portfolio positions">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {positions.map((position, i) => (
                <li key={`${position.assetId}-${i}`}>
                  <PositionCard position={position} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}
