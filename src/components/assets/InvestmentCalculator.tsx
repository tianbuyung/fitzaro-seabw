'use client'

import { useMemo, useState } from 'react'
import { type Asset, formatCurrency } from '@/data/mock-assets'

interface InvestmentCalculatorProps {
  asset: Asset
}

/**
 * Pure calculator for token-based investment yield projections.
 *
 * SRP: only owns the `tokenAmount` input state. All other displayed
 * values are derived in a single `useMemo` — no extra state for things
 * that can be computed.
 */
export function InvestmentCalculator({ asset }: InvestmentCalculatorProps) {
  const [tokenAmount, setTokenAmount] = useState<number>(1)

  const { totalCost, annualYield, monthlyYield } = useMemo(() => {
    const safeAmount = Number.isFinite(tokenAmount) && tokenAmount > 0 ? tokenAmount : 0
    const cost = safeAmount * asset.tokenPrice
    const annual = cost * (asset.yieldAPY / 100)
    const monthly = annual / 12
    return { totalCost: cost, annualYield: annual, monthlyYield: monthly }
  }, [tokenAmount, asset.tokenPrice, asset.yieldAPY])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const next = Number(event.target.value)
    if (Number.isNaN(next)) {
      setTokenAmount(0)
      return
    }
    // Clamp to [1, tokenSupply] — but allow the user to type "0" briefly
    // by letting state hold any non-negative number; we only enforce the
    // ceiling and a sensible floor here.
    if (next > asset.tokenSupply) {
      setTokenAmount(asset.tokenSupply)
      return
    }
    setTokenAmount(next < 0 ? 0 : next)
  }

  return (
    <section
      aria-label="Investment calculator"
      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8"
    >
      <header>
        <h2 className="text-lg font-semibold text-gray-900">Investment calculator</h2>
        <p className="mt-1 text-xs text-gray-500">
          Estimate your potential yield. Numbers are projections, not guarantees.
        </p>
      </header>

      <div className="mt-5">
        <label htmlFor="token-amount" className="block text-sm font-medium text-gray-700">
          How many tokens?
        </label>
        <div className="mt-2 flex items-center gap-3">
          <input
            id="token-amount"
            type="number"
            min={1}
            max={asset.tokenSupply}
            value={tokenAmount}
            onChange={handleChange}
            className="block w-40 rounded-lg border border-gray-200 px-3 py-2 text-base text-gray-900 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          />
          <span className="text-xs text-gray-400">
            of {asset.tokenSupply.toLocaleString()} available
          </span>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
          <dt className="text-xs uppercase tracking-wide text-gray-400">Total cost</dt>
          <dd className="mt-1 text-xl font-semibold text-gray-900">
            {formatCurrency(totalCost)}
          </dd>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3">
          <dt className="text-xs uppercase tracking-wide text-amber-700">
            Annual yield
          </dt>
          <dd className="mt-1 text-xl font-semibold text-[var(--color-primary)]">
            {formatCurrency(annualYield)}
          </dd>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3">
          <dt className="text-xs uppercase tracking-wide text-amber-700">
            Monthly yield
          </dt>
          <dd className="mt-1 text-xl font-semibold text-[var(--color-primary)]">
            {formatCurrency(monthlyYield)}
          </dd>
        </div>
      </dl>
    </section>
  )
}
