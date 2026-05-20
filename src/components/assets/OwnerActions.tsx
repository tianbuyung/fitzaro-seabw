'use client'

import { useState } from 'react'
import { type Asset, formatCurrency } from '@/data/mock-assets'

interface OwnerActionsProps {
  asset: Asset
}

interface StatProps {
  label: string
  value: string
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-xl border border-amber-100 bg-amber-50/40 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-amber-700">{label}</p>
      <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
    </div>
  )
}

/**
 * Owner-only actions for an asset. Display-focused: confirms ownership,
 * surfaces the key on-chain stats, and lets the owner copy a shareable
 * link to circulate to investors.
 *
 * SRP: only renders the owner's view of an asset. It does not detect role
 * (`useUserRole` is the parent's job) and does not perform any chain action.
 */
export function OwnerActions({ asset }: OwnerActionsProps) {
  const [copied, setCopied] = useState<boolean>(false)

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/assets/${asset.id}`
      : `/assets/${asset.id}`

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section
      aria-label="Owner actions"
      className="rounded-2xl border border-[var(--color-primary)] bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="rounded-xl bg-amber-50 px-4 py-3 ring-1 ring-amber-200">
        <p className="text-sm font-semibold text-amber-900">
          You are the asset owner
        </p>
        <p className="mt-1 text-xs text-amber-800">
          Manage your tokenised asset and share it with potential investors.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Token supply" value={asset.tokenSupply.toLocaleString()} />
        <Stat label="Token price" value={formatCurrency(asset.tokenPrice)} />
        <Stat label="Total value" value={formatCurrency(asset.totalValue)} />
        <Stat label="Holders" value={asset.holders.toLocaleString()} />
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Share Asset
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          Send this link to investors to view your asset.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={shareUrl}
            readOnly
            aria-label="Shareable asset URL"
            className="block w-full flex-1 truncate rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-xs text-gray-700 shadow-sm focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-hover)]"
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </section>
  )
}
