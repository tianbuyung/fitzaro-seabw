import { MOCK_ASSETS, type Asset } from '@/data/mock-assets'

export function fetchAssets(): Asset[] {
  if (typeof window === 'undefined') return MOCK_ASSETS
  const stored = localStorage.getItem('fitzaro-user-assets')
  const userAssets: Asset[] = stored ? (JSON.parse(stored) as Asset[]) : []
  return [...MOCK_ASSETS, ...userAssets]
}
