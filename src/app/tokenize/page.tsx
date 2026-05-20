import type { Metadata } from 'next'
import { TokenizeView } from '@/components/tokenize/TokenizeView'

export const metadata: Metadata = {
  title: 'Tokenize Your Asset — Fitzaro',
  description:
    'Describe your real-world asset and let Claude AI structure it into an investable token spec.',
}

export default function TokenizePage() {
  return <TokenizeView />
}
