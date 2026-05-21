'use client'

import { usePrivy } from '@privy-io/react-auth'

export type UserRole = 'investor' | 'owner' | 'loading'

const ROLE_KEY = 'fitzaro-role'

export function persistRole(role: 'investor' | 'owner'): void {
  localStorage.setItem(ROLE_KEY, role)
}

export function clearPersistedRole(): void {
  localStorage.removeItem(ROLE_KEY)
}

/**
 * Derive the current user's role.
 *
 * Priority:
 *   1. Role the user explicitly chose at login (stored in localStorage).
 *   2. Wallet-based fallback: wallet linked → investor, social-only → owner.
 *   3. 'loading' while Privy initialises or there is no session.
 *
 * Using localStorage as the source of truth prevents Google-login investors
 * from being misidentified as owners (no wallet = owner under the old logic).
 */
export function useUserRole(): UserRole {
  const { ready, user } = usePrivy()
  if (!ready || !user) return 'loading'

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(ROLE_KEY)
    if (stored === 'investor' || stored === 'owner') return stored
  }

  const hasWallet = user.linkedAccounts.some(
    (a) => a.type === 'wallet' || a.type === 'smart_wallet'
  )
  return hasWallet ? 'investor' : 'owner'
}
