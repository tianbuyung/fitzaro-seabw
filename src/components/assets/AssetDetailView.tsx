'use client'

import Link from 'next/link'
import { Navbar } from '@/components/ui/Navbar'
import { useAsset } from '@/features/assets/queries/use-asset'
import { useUserRole } from '@/hooks/use-user-role'
import { AssetDetail } from './AssetDetail'
import { InvestorActions } from './InvestorActions'
import { OwnerActions } from './OwnerActions'
import { CopilotChat } from './CopilotChat'
import type { Asset } from '@/data/mock-assets'

interface AssetDetailViewProps {
  id: string
}

function CenteredSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <span
        aria-hidden
        className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--color-primary)]"
      />
      <p className="text-sm font-medium text-gray-600">Loading asset…</p>
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <h1 className="text-xl font-bold text-gray-900">Asset not found</h1>
      <p className="text-sm text-gray-500">
        The asset you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/dashboard"
        className="mt-2 inline-flex items-center rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-hover)]"
      >
        Back to marketplace
      </Link>
    </div>
  )
}

interface RoleActionsProps {
  asset: Asset
  role: ReturnType<typeof useUserRole>
}

/**
 * Render the right action panel based on the user's role.
 *
 * Open/Closed: new roles are added as new cases here, without touching
 * AssetDetailView's layout code.
 */
function RoleActions({ asset, role }: RoleActionsProps) {
  if (role === 'investor') return <InvestorActions asset={asset} />
  if (role === 'owner') return <OwnerActions asset={asset} />
  return null
}

/**
 * Asset detail orchestrator.
 *
 * Owns no business logic — only wires `useAsset(id)` and `useUserRole()`
 * into the display children. Each child handles one concern (SRP):
 *   - AssetDetail   → renders the asset profile
 *   - InvestorActions / OwnerActions → role-specific actions
 *   - CopilotChat   → AI Q&A
 */
export function AssetDetailView({ id }: AssetDetailViewProps) {
  const { data: asset, isPending } = useAsset(id)
  const role = useUserRole()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {isPending ? (
          <CenteredSpinner />
        ) : !asset ? (
          <NotFound />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="flex flex-col gap-6 lg:col-span-3">
              <AssetDetail asset={asset} />
              <RoleActions asset={asset} role={role} />
            </div>
            <div className="lg:col-span-2">
              <CopilotChat asset={asset} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
