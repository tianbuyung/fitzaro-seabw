'use client'

import { formatCurrency, getRiskLabel, type Asset } from '@/data/mock-assets'
import type { StructuredAsset } from '@/features/tokenize/types'

interface TokenSpecCardProps {
  spec: StructuredAsset
  onMint: (spec: StructuredAsset) => void
  onBack: () => void
  isMinting?: boolean
}

const ASSET_TYPE_STYLES: Record<Asset['assetType'], string> = {
  Agricultural: 'bg-green-100 text-green-700',
  Property: 'bg-blue-100 text-blue-700',
  Invoice: 'bg-purple-100 text-purple-700',
  Infrastructure: 'bg-gray-100 text-gray-600',
}

const CHAIN_STYLES: Record<Asset['recommendedChain'], string> = {
  Base: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  Polygon: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
  Arbitrum: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
}

/**
 * Presentational card for the AI-structured token spec.
 *
 * SRP: it only renders the spec and surfaces two intents (back, mint) as
 * callbacks. It does not own state, fetch, or persist anything — the
 * orchestrator wires those concerns up.
 */
export function TokenSpecCard({
  spec,
  onMint,
  onBack,
  isMinting = false,
}: TokenSpecCardProps) {
  const totalValue = spec.tokenSupply * spec.tokenPrice
  const risk = getRiskLabel(spec.riskScore)
  const typeBadgeClass = ASSET_TYPE_STYLES[spec.assetType]
  const chainBadgeClass = CHAIN_STYLES[spec.recommendedChain]

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <header className="border-b border-gray-100 pb-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{spec.tokenName}</h2>
            <p className="mt-1 text-sm font-mono text-gray-400">{spec.ticker}</p>
          </div>
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
            style={{ color: risk.color, backgroundColor: risk.bg }}
          >
            {risk.label} · {spec.riskScore}/10
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadgeClass}`}
          >
            {spec.assetType}
          </span>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
            {spec.country}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${chainBadgeClass}`}
          >
            {spec.recommendedChain}
          </span>
        </div>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-amber-50 p-4">
          <p className="text-xs uppercase tracking-wide text-amber-700">Yield APY</p>
          <p className="mt-1 text-3xl font-bold text-amber-600">
            {spec.yieldAPY.toFixed(1)}%
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">Token price</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {formatCurrency(spec.tokenPrice)}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">Total value</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {formatCurrency(totalValue)}
          </p>
        </div>
      </section>

      <section className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">Token supply</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {spec.tokenSupply.toLocaleString()} tokens
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">Risk score</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {spec.riskScore} / 10
          </p>
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-sm font-semibold text-gray-900">Risk rationale</h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-600">
          {spec.riskRationale}
        </p>
      </section>

      <section className="mt-5">
        <h3 className="text-sm font-semibold text-gray-900">Investor brief</h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-600">
          {spec.investorBrief}
        </p>
      </section>

      <footer className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onBack}
          disabled={isMinting}
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          &larr; Back
        </button>
        <button
          type="button"
          onClick={() => onMint(spec)}
          disabled={isMinting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isMinting ? (
            <>
              <span
                aria-hidden
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
              Minting…
            </>
          ) : (
            <>Mint Token &rarr;</>
          )}
        </button>
      </footer>
    </div>
  )
}
