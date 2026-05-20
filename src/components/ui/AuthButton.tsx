'use client'

import { usePrivy } from '@privy-io/react-auth'

function truncateAddress(address: string): string {
  if (address.length <= 10) return address
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

function getDisplayIdentity(
  email: string | undefined,
  walletAddress: string | undefined,
): string {
  if (email) return email
  if (walletAddress) return truncateAddress(walletAddress)
  return 'Account'
}

export function AuthButton() {
  const { ready, authenticated, user, login, logout } = usePrivy()

  if (!ready) return null

  if (authenticated) {
    const identity = getDisplayIdentity(user?.email?.address, user?.wallet?.address)

    return (
      <div className="flex items-center gap-3">
        <span
          className="hidden sm:inline-block max-w-[180px] truncate text-sm text-gray-700"
          title={identity}
        >
          {identity}
        </span>
        <button
          type="button"
          onClick={() => {
            void logout()
          }}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => login()}
      className="inline-flex items-center rounded-full border border-primary px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors"
    >
      Sign in
    </button>
  )
}
