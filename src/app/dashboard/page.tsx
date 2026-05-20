import type { Metadata } from 'next'
import { DashboardView } from '@/components/dashboard/DashboardView'

export const metadata: Metadata = {
  title: 'Marketplace — Fitzaro',
  description:
    'Browse tokenized Southeast Asian real-world assets — rice farms, SME invoices, palm oil plantations, and properties.',
}

export default function DashboardPage() {
  return <DashboardView />
}
