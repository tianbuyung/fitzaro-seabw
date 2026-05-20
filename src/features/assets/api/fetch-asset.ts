import { getAssetById, type Asset } from '@/data/mock-assets'

export function fetchAsset(id: string): Asset | null {
  const mock = getAssetById(id)
  if (mock) return mock

  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('fitzaro-user-assets')
  const userAssets: Asset[] = stored ? (JSON.parse(stored) as Asset[]) : []
  return userAssets.find((a) => a.id === id) ?? null
}
