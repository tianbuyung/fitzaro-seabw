'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { saveAsset } from '../api/save-asset'
import { type Asset } from '@/data/mock-assets'

export function useSaveAsset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (asset: Asset) => {
      saveAsset(asset)
      return Promise.resolve(asset)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.assets.all() })
    },
  })
}
