'use client'

import { GoogleLoginButton } from './GoogleLoginButton'
import { EmailLoginForm } from './EmailLoginForm'
import { WalletLoginButton } from './WalletLoginButton'

interface InvestorPanelProps {
  onAuthSuccess: () => void
}

/**
 * Right column. Targeted at DeFi-native (or curious) investors. They can pick
 * any login method — wallet, Google, or email magic link.
 */
export function InvestorPanel({ onAuthSuccess }: InvestorPanelProps) {
  return (
    <section className="flex flex-1 items-center justify-center bg-gradient-to-br from-[#E8820C] to-[#FFC44D] px-6 py-12 text-white md:py-16">
      <div className="w-full max-w-[480px]">
        <div className="mb-10 text-xl font-bold tracking-tight text-white">
          Fitzaro
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Invest in SEA assets
        </h1>
        <p className="mt-3 text-base leading-relaxed text-white/90">
          Browse tokenized rice farms, SME invoices, and more. Earn real yield.
        </p>

        <div className="mt-8 space-y-4">
          <WalletLoginButton onAuthSuccess={onAuthSuccess} />
          <GoogleLoginButton onAuthSuccess={onAuthSuccess} variant="onAmber" />

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/30" />
            <span className="text-xs uppercase tracking-wide text-white/80">
              or
            </span>
            <div className="h-px flex-1 bg-white/30" />
          </div>

          <EmailLoginForm onAuthSuccess={onAuthSuccess} variant="onAmber" />
        </div>
      </div>
    </section>
  )
}
