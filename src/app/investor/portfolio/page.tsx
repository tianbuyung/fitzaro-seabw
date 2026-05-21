import type { Metadata } from 'next'
import { InvestorPortfolioView } from '@/components/investor/InvestorPortfolioView'

export const metadata: Metadata = {
  title: 'My Portfolio — Fitzaro Investor',
  description: 'Track your funded businesses and estimated profit-share returns.',
}

export default function InvestorPortfolioPage() {
  return <InvestorPortfolioView />
}
