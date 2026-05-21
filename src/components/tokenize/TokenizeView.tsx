'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { Navbar } from '@/components/ui/Navbar'
import { AssetForm } from './AssetForm'
import { TokenSpecCard } from './TokenSpecCard'
import { useStructureAsset } from '@/features/tokenize/mutations/use-structure-asset'
import { useSaveAsset } from '@/features/assets/mutations/use-save-asset'
import type { StructuredAsset } from '@/features/tokenize/types'
import type { Asset } from '@/data/mock-assets'

type Stage = 'idle' | 'structuring' | 'review' | 'minting' | 'done'

/**
 * Map a country name to its flag emoji.
 *
 * Kept inline (not in the data module) because flag selection is a
 * tokenize-flow concern — it only matters for user-submitted assets where
 * we don't already have a curated `flag` value.
 */
function getFlagForCountry(country: string): string {
  const normalized = country.trim().toLowerCase()
  switch (normalized) {
    case 'indonesia':
      return '🇮🇩'
    case 'malaysia':
      return '🇲🇾'
    case 'thailand':
      return '🇹🇭'
    case 'vietnam':
      return '🇻🇳'
    case 'philippines':
      return '🇵🇭'
    case 'singapore':
      return '🇸🇬'
    default:
      return '🌏'
  }
}

/**
 * Build a full Asset from the AI-structured spec + the original input.
 *
 * Kept pure (no hooks, no side effects) so it can be unit-tested in isolation
 * and so the orchestrator stays readable.
 */
function getCountryCode(country: string): string {
  const normalized = country.trim().toLowerCase()
  switch (normalized) {
    case 'indonesia': return 'ID'
    case 'malaysia': return 'MY'
    case 'thailand': return 'TH'
    case 'vietnam': return 'VN'
    case 'philippines': return 'PH'
    case 'singapore': return 'SG'
    default: return 'SEA'
  }
}

function buildAssetFromSpec(spec: StructuredAsset, description: string): Asset {
  return {
    id: crypto.randomUUID(),
    tokenName: spec.tokenName,
    ticker: spec.ticker,
    category: spec.category,
    country: spec.country,
    countryCode: getCountryCode(spec.country),
    flag: getFlagForCountry(spec.country),
    profitShare: spec.profitShare,
    repaymentMultiple: spec.repaymentMultiple,
    useOfFunds: spec.useOfFunds,
    riskScore: spec.riskScore,
    riskRationale: spec.riskRationale,
    recommendedChain: spec.recommendedChain,
    tokenSupply: spec.tokenSupply,
    tokenPrice: spec.tokenPrice,
    summary: spec.summary,
    description,
    totalValue: spec.tokenSupply * spec.tokenPrice,
    holders: 1,
    createdAt: new Date().toISOString(),
  }
}

interface SpinnerProps {
  label: string
}

function CenteredSpinner({ label }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <span
        aria-hidden
        className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-primary"
      />
      <p className="text-sm font-medium text-gray-600">{label}</p>
    </div>
  )
}

/**
 * Tokenize flow orchestrator.
 *
 * Single responsibility: own the state machine for the asset-tokenization
 * flow (idle → structuring → review → minting → done) and wire it to its
 * presentational children (AssetForm, TokenSpecCard).
 *
 * Auth guard is co-located here because every stage of the flow requires
 * an authenticated user — extracting it would force every child to repeat
 * the same `usePrivy` boilerplate.
 */
interface TokenizeViewProps {
  postMintRedirect?: string
}

export function TokenizeView({ postMintRedirect = '/dashboard' }: TokenizeViewProps) {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()

  const [stage, setStage] = useState<Stage>('idle')
  const [structured, setStructured] = useState<StructuredAsset | null>(null)
  const [originalDescription, setOriginalDescription] = useState<string>('')

  const structureMutation = useStructureAsset()
  const saveMutation = useSaveAsset()

  // Send unauthenticated users to /login as soon as Privy is ready.
  useEffect(() => {
    if (ready && !authenticated) {
      router.replace('/login')
    }
  }, [ready, authenticated, router])

  // Navigate to the post-mint destination once the mint persists.
  useEffect(() => {
    if (stage === 'done') {
      router.push(postMintRedirect)
    }
  }, [stage, router, postMintRedirect])

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <span
          aria-hidden
          className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary"
        />
      </main>
    )
  }

  if (!authenticated) {
    // The effect above will redirect; render nothing in the meantime so we
    // don't flash the form for a fraction of a second.
    return null
  }

  const handleStructure = async (description: string): Promise<void> => {
    setStage('structuring')
    setOriginalDescription(description)
    try {
      const result = await structureMutation.mutateAsync(description)
      setStructured(result)
      setStage('review')
    } catch (error) {
      setStage('idle')
      const message =
        error instanceof Error ? error.message : 'Failed to structure asset'
      // Hackathon-grade error UX — a real toast system can replace this later.
      if (typeof window !== 'undefined') {
        window.alert(message)
      }
    }
  }

  const handleMint = async (spec: StructuredAsset): Promise<void> => {
    setStage('minting')
    try {
      const asset = buildAssetFromSpec(spec, originalDescription)
      await saveMutation.mutateAsync(asset)
      setStage('done')
    } catch (error) {
      setStage('review')
      const message =
        error instanceof Error ? error.message : 'Failed to mint token'
      if (typeof window !== 'undefined') {
        window.alert(message)
      }
    }
  }

  const handleBack = (): void => {
    setStructured(null)
    setStage('idle')
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mx-auto mb-8 max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Raise capital for your business
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Describe your business and let Claude structure a profit-share token for you.
            Review the spec before minting — no collateral needed.
          </p>
        </header>

        {stage === 'idle' && (
          <AssetForm onSubmit={handleStructure} isLoading={false} />
        )}

        {stage === 'structuring' && (
          <CenteredSpinner label="Claude is structuring your credit token…" />
        )}

        {stage === 'review' && structured && (
          <TokenSpecCard
            spec={structured}
            onMint={handleMint}
            onBack={handleBack}
            isMinting={false}
          />
        )}

        {stage === 'minting' && <CenteredSpinner label="Minting your token…" />}

        {stage === 'done' && <CenteredSpinner label="Redirecting to dashboard…" />}
      </main>
    </div>
  )
}
