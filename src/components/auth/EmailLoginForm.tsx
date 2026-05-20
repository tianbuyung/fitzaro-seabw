'use client'

import { useState, type FormEvent } from 'react'
import { useLoginWithEmail } from '@privy-io/react-auth'

type Variant = 'onWhite' | 'onAmber'

interface EmailLoginFormProps {
  onAuthSuccess: () => void
  variant?: Variant
}

type Step = 'enter-email' | 'enter-code'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Email magic-link / OTP login. Two-step flow:
 *   1. User submits their email → Privy emails them a code.
 *   2. User enters the code → Privy logs them in.
 *
 * We expose both steps inline in the same form so the user never leaves the
 * page. Errors are shown inline (no `alert`).
 */
export function EmailLoginForm({
  onAuthSuccess,
  variant = 'onWhite',
}: EmailLoginFormProps) {
  const [step, setStep] = useState<Step>('enter-email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { sendCode, loginWithCode } = useLoginWithEmail({
    onComplete: () => {
      setError(null)
      onAuthSuccess()
    },
    onError: () => {
      setError("We couldn't verify that code. Please try again.")
    },
  })

  const handleSendCode = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError(null)

    if (!EMAIL_REGEX.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setBusy(true)
    try {
      await sendCode({ email: email.trim() })
      setStep('enter-code')
    } catch {
      setError("We couldn't send a magic link. Please try again.")
    } finally {
      setBusy(false)
    }
  }

  const handleVerifyCode = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError(null)

    if (code.trim().length < 4) {
      setError('Please enter the code from your email.')
      return
    }

    setBusy(true)
    try {
      await loginWithCode({ code: code.trim() })
      // onComplete callback handles redirect; no extra action needed here.
    } catch {
      setError("We couldn't verify that code. Please try again.")
    } finally {
      setBusy(false)
    }
  }

  const handleUseDifferentEmail = (): void => {
    setStep('enter-email')
    setCode('')
    setError(null)
  }

  const inputClass =
    variant === 'onAmber'
      ? 'w-full rounded-lg border border-white/40 bg-white/95 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 shadow-sm outline-none transition focus:border-white focus:ring-2 focus:ring-white/60'
      : 'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'

  const submitClass =
    variant === 'onAmber'
      ? 'inline-flex w-full items-center justify-center rounded-lg bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70'
      : 'inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-70'

  const errorClass =
    variant === 'onAmber'
      ? 'text-xs text-white'
      : 'text-xs text-red-600'

  const helperClass =
    variant === 'onAmber'
      ? 'text-xs text-white/90'
      : 'text-xs text-gray-500'

  if (step === 'enter-email') {
    return (
      <form className="space-y-3" onSubmit={(e) => { void handleSendCode(e) }}>
        <label className="block">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            className={inputClass}
          />
        </label>
        <button type="submit" disabled={busy} className={submitClass}>
          {busy ? 'Sending…' : 'Send magic link'}
        </button>
        {error && <p role="alert" className={errorClass}>{error}</p>}
      </form>
    )
  }

  return (
    <form className="space-y-3" onSubmit={(e) => { void handleVerifyCode(e) }}>
      <p className={helperClass}>
        We sent a code to <strong className="font-medium">{email}</strong>. Enter it below.
      </p>
      <label className="block">
        <span className="sr-only">Verification code</span>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          required
          placeholder="6-digit code"
          value={code}
          onChange={(e) => setCode(e.currentTarget.value)}
          className={inputClass}
        />
      </label>
      <button type="submit" disabled={busy} className={submitClass}>
        {busy ? 'Verifying…' : 'Verify and continue'}
      </button>
      <button
        type="button"
        onClick={handleUseDifferentEmail}
        className={`${helperClass} underline-offset-2 hover:underline`}
      >
        Use a different email
      </button>
      {error && <p role="alert" className={errorClass}>{error}</p>}
    </form>
  )
}
