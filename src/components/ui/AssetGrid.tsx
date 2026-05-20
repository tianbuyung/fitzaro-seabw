'use client'

import type { Asset } from '@/data/mock-assets'
import { AssetCard } from './AssetCard'

interface AssetGridProps {
  assets: Asset[]
  loading?: boolean
  onSelect?: (asset: Asset) => void
}

export function AssetGrid({ assets, loading = false, onSelect }: AssetGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-52 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    )
  }

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-16 text-center">
        <p className="text-base font-semibold text-gray-700">No assets found</p>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your filters, or tokenize a new asset to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {assets.map((asset) => (
        <button
          key={asset.id}
          type="button"
          onClick={() => onSelect?.(asset)}
          className="group block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
          aria-label={`View details for ${asset.tokenName}`}
        >
          <AssetCard asset={asset} />
        </button>
      ))}
    </div>
  )
}
