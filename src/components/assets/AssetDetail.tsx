import { type Asset, formatCurrency } from '@/data/mock-assets'
import { RiskBadge } from '@/components/ui/RiskBadge'

interface AssetDetailProps {
  asset: Asset
}

const CATEGORY_STYLES: Record<Asset['category'], string> = {
  Micro: 'bg-amber-100 text-amber-700',
}

const CHAIN_STYLES: Record<Asset['recommendedChain'], string> = {
  Base: 'bg-blue-50 text-blue-700 ring-blue-200',
  Polygon: 'bg-purple-50 text-purple-700 ring-purple-200',
  Arbitrum: 'bg-sky-50 text-sky-700 ring-sky-200',
}

interface StatProps {
  label: string
  value: string
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
    </div>
  )
}

export function AssetDetail({ asset }: AssetDetailProps) {
  const categoryBadgeClass = CATEGORY_STYLES[asset.category]
  const chainBadgeClass = CHAIN_STYLES[asset.recommendedChain]

  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-base leading-none" aria-hidden>
              {asset.flag}
            </span>
            <span>{asset.country}</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            {asset.tokenName}
          </h1>
          <p className="mt-1 font-mono text-sm text-gray-400">{asset.ticker}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryBadgeClass}`}
          >
            {asset.category}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${chainBadgeClass}`}
          >
            {asset.recommendedChain}
          </span>
          <RiskBadge score={asset.riskScore} />
        </div>
      </header>

      <div className="mt-6 flex items-end gap-3">
        <p className="text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
          {asset.profitShare.toFixed(1)}%
        </p>
        <p className="pb-1 text-xs uppercase tracking-wide text-gray-400">
          Profit share
        </p>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
        {asset.summary}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total value" value={formatCurrency(asset.totalValue)} />
        <Stat label="Token supply" value={asset.tokenSupply.toLocaleString()} />
        <Stat label="Token price" value={formatCurrency(asset.tokenPrice)} />
        <Stat label="Repayment" value={`${asset.repaymentMultiple}x`} />
      </div>

      <section className="mt-6 rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-amber-700">Use of funds</p>
        <p className="mt-1 text-sm font-medium text-gray-900">{asset.useOfFunds}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Risk rationale
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          {asset.riskRationale}
        </p>
      </section>

      <section className="mt-6 border-t border-gray-100 pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Business description
        </h2>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-700">
          {asset.description}
        </p>
      </section>
    </article>
  )
}
