import { redirect } from 'next/navigation'

interface AssetDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function AssetDetailPage({ params }: AssetDetailPageProps) {
  const { id } = await params
  redirect(`/investor/assets/${id}`)
}
