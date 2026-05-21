import type { Metadata } from 'next'
import { TokenizeView } from '@/components/tokenize/TokenizeView'

export const metadata: Metadata = {
  title: 'Tokenize Your Business — Fitzaro Owner',
  description:
    'Describe your business and let Claude AI structure a profit-share token for you.',
}

export default function OwnerTokenizePage() {
  return <TokenizeView postMintRedirect="/owner/dashboard" />
}
