'use client'

import { useState } from 'react'
import { useLogin } from '@privy-io/react-auth'

interface WalletLoginButtonProps {
  onAuthSuccess: () => void
}

/**
 * Opens the Privy login modal restricted to wallet methods only
 * (MetaMask, WalletConnect, etc.). Uses `useLogin` because the wallet
 * connection UX is best handled by Privy's modal.
 */
export function WalletLoginButton({ onAuthSuccess }: WalletLoginButtonProps) {
  const [error, setError] = useState<string | null>(null)

  const { login } = useLogin({
    onComplete: () => {
      setError(null)
      onAuthSuccess()
    },
    onError: () => {
      setError("We couldn't connect your wallet. Please try again.")
    },
  })

  const handleClick = (): void => {
    setError(null)
    login({ loginMethods: ['wallet'] })
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
      >
        <WalletIcon />
        Connect wallet
      </button>
      {error && (
        <p role="alert" className="mt-2 text-xs text-white">
          {error}
        </p>
      )}
    </div>
  )
}

function WalletIcon() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}
