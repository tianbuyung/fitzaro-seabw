import { type Asset } from '@/data/mock-assets'

export function saveAsset(asset: Asset): void {
  const stored = localStorage.getItem('fitzaro-user-assets')
  const existing: Asset[] = stored ? (JSON.parse(stored) as Asset[]) : []
  localStorage.setItem('fitzaro-user-assets', JSON.stringify([...existing, asset]))
}
