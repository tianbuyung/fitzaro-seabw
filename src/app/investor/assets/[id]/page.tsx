import type { Metadata } from 'next'
import { InvestorAssetDetailView } from '@/components/investor/InvestorAssetDetailView'

export const metadata: Metadata = {
  title: 'Asset Detail — Fitzaro Investor',
  description: 'Business detail with investment calculator and AI copilot.',
}

interface AssetDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function InvestorAssetDetailPage({ params }: AssetDetailPageProps) {
  const { id } = await params
  return <InvestorAssetDetailView id={id} />
}
