'use client'

import { useState, type FormEvent } from 'react'

interface AssetFormProps {
  onSubmit: (description: string) => void
  isLoading?: boolean
}

const MIN_CHARS = 10
const PLACEHOLDER =
  "e.g. I run a coffee shop in Bangkok's Ari district. We're open 7 days a week with daily revenue around THB 12,000. I want to add an espresso bar and expand seating. Looking to raise THB 100,000 in working capital."

export function AssetForm({ onSubmit, isLoading = false }: AssetFormProps) {
  const [value, setValue] = useState<string>('')

  const trimmedLength = value.trim().length
  const isValid = trimmedLength >= MIN_CHARS
  const canSubmit = isValid && !isLoading

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (!canSubmit) return
    onSubmit(value.trim())
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Tell us about your business
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Plain language is fine — Claude will structure a profit-share token for you in seconds.
        </p>
      </div>

      <label
        htmlFor="asset-description"
        className="block text-sm font-medium text-gray-700"
      >
        Describe your business — what you sell, daily revenue, and how you'll use the capital
      </label>

      <textarea
        id="asset-description"
        name="asset-description"
        required
        minLength={MIN_CHARS}
        rows={8}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={PLACEHOLDER}
        disabled={isLoading}
        className="mt-2 block w-full resize-y rounded-xl border border-gray-300 bg-white p-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:bg-gray-50"
      />

      <p
        className={`mt-2 text-xs ${
          isValid ? 'text-gray-500' : 'text-gray-400'
        }`}
        aria-live="polite"
      >
        {trimmedLength} characters (min {MIN_CHARS})
      </p>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <span
              aria-hidden
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
            Structuring…
          </>
        ) : (
          <>Structure with AI &rarr;</>
        )}
      </button>
    </form>
  )
}
