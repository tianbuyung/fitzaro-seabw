import type { Metadata } from 'next'
import { OwnerDashboardView } from '@/components/owner/OwnerDashboardView'

export const metadata: Metadata = {
  title: 'My Businesses — Fitzaro Owner',
  description: 'Track funding progress and profit-share payouts for your tokenized businesses.',
}

export default function OwnerDashboardPage() {
  return <OwnerDashboardView />
}
