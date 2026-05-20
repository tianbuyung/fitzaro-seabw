import type { Metadata } from 'next'
import { AssetDetailView } from '@/components/assets/AssetDetailView'

export const metadata: Metadata = {
  title: 'Asset Detail — Fitzaro',
  description:
    'Tokenized real-world asset detail with investment calculator and AI copilot.',
}

interface AssetDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function AssetDetailPage({ params }: AssetDetailPageProps) {
  const { id } = await params
  return <AssetDetailView id={id} />
}
