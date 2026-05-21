'use client'

import { useState } from 'react'
import { type Asset } from '@/data/mock-assets'
import { InvestmentCalculator } from './InvestmentCalculator'
import { BuyModal } from './BuyModal'

interface InvestorActionsProps {
  asset: Asset
}

export function InvestorActions({ asset }: InvestorActionsProps) {
  const [tokenAmount, setTokenAmount] = useState<number>(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = (): void => setIsModalOpen(true)
  const closeModal = (): void => setIsModalOpen(false)

  return (
    <>
      <section
        aria-label="Investor actions"
        className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8"
      >
        <header>
          <h2 className="text-lg font-semibold text-gray-900">
            Fund this Business
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Choose your funding amount and confirm.
          </p>
        </header>

        <div className="mt-5">
          <InvestmentCalculator
            asset={asset}
            value={tokenAmount}
            onTokenAmountChange={setTokenAmount}
          />
        </div>

        <button
          type="button"
          onClick={openModal}
          disabled={tokenAmount <= 0}
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Fund Business
        </button>
      </section>

      {isModalOpen ? (
        <BuyModal
          asset={asset}
          tokenAmount={tokenAmount}
          onClose={closeModal}
        />
      ) : null}
    </>
  )
}
