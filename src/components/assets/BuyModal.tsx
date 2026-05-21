'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { type Asset, formatCurrency } from '@/data/mock-assets'

interface BuyModalProps {
  asset: Asset
  tokenAmount: number
  onClose: () => void
}

export function BuyModal({ asset, tokenAmount, onClose }: BuyModalProps) {
  const router = useRouter()
  const [confirmed, setConfirmed] = useState<boolean>(false)

  const total = tokenAmount * asset.tokenPrice
  const annualProfitShare = (total * asset.profitShare) / 100

  const handleConfirm = (): void => {
    setConfirmed(true)
  }

  const handleViewMarketplace = (): void => {
    onClose()
    router.push('/dashboard')
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fund-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100 sm:p-8">
        {confirmed ? (
          <div className="flex flex-col items-center text-center">
            <span
              aria-hidden
              className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7 text-green-600"
              >
                <path d="M5 12l4 4L19 7" />
              </svg>
            </span>
            <h2
              id="fund-modal-title"
              className="mt-4 text-xl font-semibold text-gray-900"
            >
              Funding submitted!
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Your funding of{' '}
              <span className="font-semibold text-gray-900">
                {formatCurrency(total)}
              </span>{' '}
              in{' '}
              <span className="font-semibold text-gray-900">
                {asset.tokenName}
              </span>{' '}
              has been submitted to the{' '}
              <span className="font-semibold text-gray-900">
                {asset.recommendedChain}
              </span>{' '}
              testnet.
            </p>
            <button
              type="button"
              onClick={handleViewMarketplace}
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              View Marketplace
            </button>
          </div>
        ) : (
          <>
            <h2
              id="fund-modal-title"
              className="text-xl font-semibold text-gray-900"
            >
              Confirm Funding
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Review your funding details before confirming.
            </p>

            <dl className="mt-5 divide-y divide-gray-100 rounded-xl border border-gray-100 bg-gray-50/60">
              <div className="flex items-center justify-between px-4 py-3">
                <dt className="text-xs uppercase tracking-wide text-gray-500">
                  Business
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {asset.tokenName}{' '}
                  <span className="font-mono text-xs text-gray-400">
                    ({asset.ticker})
                  </span>
                </dd>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <dt className="text-xs uppercase tracking-wide text-gray-500">
                  Tokens
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {tokenAmount.toLocaleString()}
                </dd>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <dt className="text-xs uppercase tracking-wide text-gray-500">
                  Total cost
                </dt>
                <dd className="text-sm font-semibold text-gray-900">
                  {formatCurrency(total)}
                </dd>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <dt className="text-xs uppercase tracking-wide text-gray-500">
                  Est. annual profit share
                </dt>
                <dd className="text-sm font-semibold text-[var(--color-primary)]">
                  {formatCurrency(annualProfitShare)}
                </dd>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <dt className="text-xs uppercase tracking-wide text-gray-500">
                  Repayment multiple
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {asset.repaymentMultiple}x
                </dd>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <dt className="text-xs uppercase tracking-wide text-gray-500">
                  Chain
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {asset.recommendedChain}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                Confirm Funding
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
