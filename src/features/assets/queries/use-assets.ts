'use client'

import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { fetchAssets } from '../api/fetch-assets'

export function useAssets() {
  return useQuery({
    queryKey: queryKeys.assets.all(),
    queryFn: fetchAssets,
    staleTime: Infinity,
  })
}
