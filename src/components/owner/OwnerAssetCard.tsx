import Link from 'next/link'
import { type Asset, formatCurrency } from '@/data/mock-assets'

interface OwnerAssetCardProps {
  asset: Asset
}

export function OwnerAssetCard({ asset }: OwnerAssetCardProps) {
  const fundedPercent = Math.min(asset.holders, 95)
  const fundedAmount = Math.round((fundedPercent / 100) * asset.totalValue)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <span aria-hidden>{asset.flag}</span>
            <span>{asset.country}</span>
          </div>
          <h3 className="mt-1 text-base font-semibold text-gray-900">{asset.tokenName}</h3>
          <p className="font-mono text-xs text-gray-400">{asset.ticker}</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#7F77DD]/10 px-2.5 py-0.5 text-xs font-medium text-[#7F77DD]">
          Active
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Funding progress</span>
          <span className="font-semibold text-gray-900">{fundedPercent}%</span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-[#7F77DD] transition-all"
            style={{ width: `${fundedPercent}%` }}
          />
        </div>
        <div className="mt-1.5 flex items-center justify-between text-xs text-gray-400">
          <span>{formatCurrency(fundedAmount)} raised</span>
          <span>of {formatCurrency(asset.totalValue)}</span>
        </div>
      </div>

      <dl className="mt-4 flex items-center gap-5 border-t border-gray-100 pt-3">
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400">Investors</dt>
          <dd className="mt-0.5 text-sm font-semibold text-gray-900">{asset.holders}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400">Profit share</dt>
          <dd className="mt-0.5 text-sm font-semibold text-gray-900">{asset.profitShare}%</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400">Multiple</dt>
          <dd className="mt-0.5 text-sm font-semibold text-gray-900">{asset.repaymentMultiple}x</dd>
        </div>
      </dl>

      <div className="mt-4">
        <Link
          href={`/investor/assets/${asset.id}`}
          className="text-sm font-medium text-[#7F77DD] hover:underline"
        >
          View listing →
        </Link>
      </div>
    </div>
  )
}
