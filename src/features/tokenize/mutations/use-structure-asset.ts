'use client'

import { useMutation } from '@tanstack/react-query'
import { structureAsset } from '../api/structure-asset'

export function useStructureAsset() {
  return useMutation({
    mutationFn: structureAsset,
  })
}
