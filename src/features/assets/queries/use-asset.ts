'use client'

import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { fetchAsset } from '../api/fetch-asset'

export function useAsset(id: string) {
  return useQuery({
    queryKey: queryKeys.assets.detail(id),
    queryFn: () => fetchAsset(id),
    staleTime: Infinity,
    enabled: !!id,
  })
}
