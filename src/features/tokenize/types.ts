import { type Asset } from '@/data/mock-assets'

export type StructuredAsset = Pick<
  Asset,
  | 'tokenName'
  | 'ticker'
  | 'category'
  | 'country'
  | 'profitShare'
  | 'repaymentMultiple'
  | 'useOfFunds'
  | 'riskScore'
  | 'riskRationale'
  | 'recommendedChain'
  | 'tokenSupply'
  | 'tokenPrice'
  | 'summary'
>
