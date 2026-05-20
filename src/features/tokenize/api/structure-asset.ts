import { type StructuredAsset } from '../types'

export async function structureAsset(description: string): Promise<StructuredAsset> {
  const res = await fetch('/api/structure-asset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Request failed' })) as { error?: string }
    throw new Error(body.error ?? 'Failed to structure asset')
  }

  return res.json() as Promise<StructuredAsset>
}
