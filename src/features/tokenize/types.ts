import { type Asset } from '@/data/mock-assets'

export type StructuredAsset = Pick<
  Asset,
  | 'tokenName'
  | 'ticker'
  | 'assetType'
  | 'country'
  | 'yieldAPY'
  | 'riskScore'
  | 'riskRationale'
  | 'recommendedChain'
  | 'tokenSupply'
  | 'tokenPrice'
  | 'investorBrief'
>
