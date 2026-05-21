'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { InvestorNavbar } from './InvestorNavbar'
import { AssetMetrics } from '@/components/ui/AssetMetrics'
import { AssetFilters } from '@/components/ui/AssetFilters'
import { AssetGrid } from '@/components/ui/AssetGrid'
import { useAssets } from '@/features/assets/queries/use-assets'
import type { Asset } from '@/data/mock-assets'

const FILTER_ALL = 'All'

export function InvestorMarketplaceView() {
  const router = useRouter()
  const { data: assets, isPending } = useAssets()
  const [filterType, setFilterType] = useState<string>(FILTER_ALL)

  const allAssets = useMemo<Asset[]>(() => assets ?? [], [assets])

  const filteredAssets = useMemo(() => {
    if (filterType === FILTER_ALL) return allAssets
    return allAssets.filter((a) => a.category === filterType)
  }, [allAssets, filterType])

  const handleSelect = (asset: Asset): void => {
    router.push(`/investor/assets/${asset.id}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <InvestorNavbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Live Micro Businesses</h1>
          <p className="mt-1 text-sm text-gray-500">
            Real micro businesses sharing profit with global investors — no collateral, no banks.
          </p>
        </header>

        <section className="mb-8" aria-label="Marketplace metrics">
          <AssetMetrics assets={allAssets} />
        </section>

        <section className="mb-6" aria-label="Asset filters">
          <AssetFilters selected={filterType} onChange={setFilterType} />
        </section>

        <section aria-label="Asset listings">
          <AssetGrid assets={filteredAssets} loading={isPending} onSelect={handleSelect} />
        </section>
      </main>
    </div>
  )
}
