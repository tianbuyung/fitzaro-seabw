import type { Asset } from '@/data/mock-assets'
import { AssetCard } from './AssetCard'

interface AssetGridProps {
  assets: Asset[]
  isLoading?: boolean
}

export function AssetGrid({ assets, isLoading = false }: AssetGridProps) {
  if (isLoading) {
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
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  )
}
