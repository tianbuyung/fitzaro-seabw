'use client'

import { usePrivy } from '@privy-io/react-auth'

export type UserRole = 'investor' | 'owner' | 'loading'

/**
 * Detect the current user's role from their linked accounts.
 *
 * - `investor` — user has at least one `wallet` or `smart_wallet` linked account.
 * - `owner`    — user is authenticated but has no wallet (Google / email magic link).
 * - `loading`  — Privy is still initialising or no user is present.
 *
 * SRP: this hook does only one thing — derive a role from Privy state.
 * DI: components consume this via the returned union, not by inspecting
 * `usePrivy()` directly, so future role rules live in one place.
 */
export function useUserRole(): UserRole {
  const { ready, user } = usePrivy()
  if (!ready || !user) return 'loading'
  const hasWallet = user.linkedAccounts.some(
    (a) => a.type === 'wallet' || a.type === 'smart_wallet'
  )
  return hasWallet ? 'investor' : 'owner'
}
