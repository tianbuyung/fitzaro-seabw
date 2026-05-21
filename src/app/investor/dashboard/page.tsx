import type { Metadata } from 'next'
import { InvestorMarketplaceView } from '@/components/investor/InvestorMarketplaceView'

export const metadata: Metadata = {
  title: 'Marketplace — Fitzaro Investor',
  description:
    'Browse tokenized Southeast Asian micro businesses and fund them for a share of their monthly profit.',
}

export default function InvestorDashboardPage() {
  return <InvestorMarketplaceView />
}
