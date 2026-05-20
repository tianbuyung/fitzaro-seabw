import { type Asset, formatCurrency } from '@/data/mock-assets'
import { RiskBadge } from './RiskBadge'

interface AssetCardProps {
  asset: Asset
}

const ASSET_TYPE_STYLES: Record<Asset['assetType'], string> = {
  Agricultural: 'bg-green-100 text-green-700',
  Property: 'bg-blue-100 text-blue-700',
  Invoice: 'bg-purple-100 text-purple-700',
  Infrastructure: 'bg-gray-100 text-gray-600',
}

/**
 * Pure display component for a single asset.
 *
 * SRP: this renders one asset's summary. It does not handle navigation —
 * the parent (e.g. AssetGrid) wraps it in whatever clickable element is
 * appropriate for its context (button, anchor, or static).
 */
export function AssetCard({ asset }: AssetCardProps) {
  const typeBadgeClass = ASSET_TYPE_STYLES[asset.assetType]

  return (
    <div className="group block h-full rounded-xl border border-gray-200 bg-white p-5 text-left transition-all duration-150 group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="text-base leading-none" aria-hidden>
            {asset.flag}
          </span>
          <span>{asset.country}</span>
        </div>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadgeClass}`}>
          {asset.assetType}
        </span>
      </div>

      <div className="mt-3">
        <h3 className="text-lg font-bold text-gray-900 leading-tight">{asset.tokenName}</h3>
        <p className="mt-0.5 text-sm text-gray-400 font-mono">{asset.ticker}</p>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">Yield APY</p>
          <p className="mt-0.5 text-2xl font-bold text-green-600">{asset.yieldAPY.toFixed(1)}%</p>
        </div>
        <RiskBadge score={asset.riskScore} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="text-xs text-gray-500">Price / token</span>
        <span className="text-sm font-semibold text-gray-900">{formatCurrency(asset.tokenPrice)}</span>
      </div>
    </div>
  )
}
