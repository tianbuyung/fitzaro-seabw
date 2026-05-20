'use client'

import { GoogleLoginButton } from './GoogleLoginButton'
import { EmailLoginForm } from './EmailLoginForm'

interface AssetOwnerPanelProps {
  onAuthSuccess: () => void
}

/**
 * Left column. Targeted at SEA SME / farmer / property owner. They are not
 * crypto-native, so we intentionally only expose Google and email magic link.
 */
export function AssetOwnerPanel({ onAuthSuccess }: AssetOwnerPanelProps) {
  return (
    <section className="flex flex-1 items-center justify-center bg-white px-6 py-12 md:py-16">
      <div className="w-full max-w-[480px]">
        <div className="mb-10 text-xl font-bold tracking-tight text-primary">
          Fitzaro
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Tokenize your assets
        </h1>
        <p className="mt-3 text-base leading-relaxed text-gray-600">
          Turn your farm, property, or invoice into a tradeable token. No crypto
          knowledge needed.
        </p>

        <div className="mt-8 space-y-4">
          <GoogleLoginButton onAuthSuccess={onAuthSuccess} />

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs uppercase tracking-wide text-gray-400">
              or
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <EmailLoginForm onAuthSuccess={onAuthSuccess} />
        </div>
      </div>
    </section>
  )
}
