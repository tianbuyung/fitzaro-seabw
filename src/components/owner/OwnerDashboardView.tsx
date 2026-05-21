'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { OwnerNavbar } from './OwnerNavbar'
import { OwnerAssetCard } from './OwnerAssetCard'
import { PayoutTracker } from './PayoutTracker'
import type { Asset } from '@/data/mock-assets'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gray-200 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7F77DD]/10 text-2xl">
        🏪
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-900">No businesses listed yet</p>
        <p className="mt-1 text-sm text-gray-500">
          Tokenize your first business to start raising capital from global investors.
        </p>
      </div>
      <Link
        href="/owner/tokenize"
        className="inline-flex items-center rounded-lg bg-[#7F77DD] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#6b64c4]"
      >
        Tokenize a business
      </Link>
    </div>
  )
}

export function OwnerDashboardView() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('fitzaro-user-assets')
    const data: Asset[] = stored ? (JSON.parse(stored) as Asset[]) : []
    setAssets(data)
    setLoaded(true)
  }, [])

  const totalRaised = assets.reduce((sum, a) => {
    const fundedPercent = Math.min(a.holders, 95) / 100
    return sum + Math.round(fundedPercent * a.totalValue)
  }, 0)

  const totalInvestors = assets.reduce((sum, a) => sum + a.holders, 0)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <OwnerNavbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">My Businesses</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track funding and profit-share payouts for your listed businesses.
            </p>
          </div>
          <Link
            href="/owner/tokenize"
            className="hidden shrink-0 sm:inline-flex items-center rounded-lg bg-[#7F77DD] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#6b64c4]"
          >
            + Tokenize New
          </Link>
        </header>

        {loaded && assets.length > 0 && (
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Summary metrics">
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-400">Total raised</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {totalRaised > 0 ? `$${totalRaised.toLocaleString()}` : '—'}
              </p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-400">Businesses listed</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{assets.length}</p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-400">Total investors</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{totalInvestors}</p>
            </div>
          </section>
        )}

        {!loaded ? (
          <div className="flex items-center justify-center py-24">
            <span
              aria-hidden
              className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#7F77DD]"
            />
          </div>
        ) : assets.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <section aria-label="Listed businesses" className="mb-10">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {assets.map((asset) => (
                  <li key={asset.id}>
                    <OwnerAssetCard asset={asset} />
                  </li>
                ))}
              </ul>
            </section>

            <PayoutTracker assets={assets} />
          </>
        )}
      </main>
    </div>
  )
}
