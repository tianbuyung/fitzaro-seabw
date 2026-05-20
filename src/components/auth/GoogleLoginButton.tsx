'use client'

import { useState } from 'react'
import { useLoginWithOAuth } from '@privy-io/react-auth'

type Variant = 'onWhite' | 'onAmber'

interface GoogleLoginButtonProps {
  onAuthSuccess: () => void
  variant?: Variant
}

/**
 * Google OAuth login button. Uses Privy's headless `useLoginWithOAuth` hook
 * (no Privy modal — the user is redirected to Google directly).
 */
export function GoogleLoginButton({
  onAuthSuccess,
  variant = 'onWhite',
}: GoogleLoginButtonProps) {
  const [error, setError] = useState<string | null>(null)

  const { initOAuth, loading } = useLoginWithOAuth({
    onComplete: () => {
      setError(null)
      onAuthSuccess()
    },
    onError: () => {
      setError("We couldn't sign you in with Google. Please try again.")
    },
  })

  const handleClick = async (): Promise<void> => {
    setError(null)
    try {
      await initOAuth({ provider: 'google' })
    } catch {
      setError("We couldn't sign you in with Google. Please try again.")
    }
  }

  // Style stays consistent (white pill with Google "G") on both panels — the
  // button itself reads as Google regardless of background.
  const buttonClass =
    variant === 'onAmber'
      ? 'inline-flex w-full items-center justify-center gap-3 rounded-lg border border-white/40 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70'
      : 'inline-flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70'

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          void handleClick()
        }}
        disabled={loading}
        className={buttonClass}
      >
        <GoogleIcon />
        <span>{loading ? 'Connecting…' : 'Continue with Google'}</span>
      </button>
      {error && <InlineError variant={variant} message={error} />}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  )
}

interface InlineErrorProps {
  variant: Variant
  message: string
}

function InlineError({ variant, message }: InlineErrorProps) {
  const className =
    variant === 'onAmber'
      ? 'mt-2 text-xs text-white'
      : 'mt-2 text-xs text-red-600'
  return (
    <p role="alert" className={className}>
      {message}
    </p>
  )
}
