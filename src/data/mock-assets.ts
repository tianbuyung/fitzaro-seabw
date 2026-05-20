export interface Asset {
  id: string
  tokenName: string
  ticker: string
  assetType: 'Agricultural' | 'Property' | 'Invoice' | 'Infrastructure'
  country: string
  flag: string
  yieldAPY: number
  riskScore: number
  riskRationale: string
  recommendedChain: 'Base' | 'Polygon' | 'Arbitrum'
  tokenSupply: number
  tokenPrice: number
  investorBrief: string
  description: string
  totalValue: number
  holders: number
  createdAt: string
}

export const MOCK_ASSETS: Asset[] = [
  {
    id: 'rice-wj01',
    tokenName: 'West Java Rice Farm',
    ticker: 'RICE-WJ01',
    assetType: 'Agricultural',
    country: 'Indonesia',
    flag: '🇮🇩',
    yieldAPY: 12.0,
    riskScore: 3,
    riskRationale: 'Stable commodity demand with certified SHM land title and 3 annual harvests.',
    recommendedChain: 'Base',
    tokenSupply: 50000,
    tokenPrice: 100,
    investorBrief:
      'A 50-hectare certified rice farm in Cianjur, West Java with a 30-year ownership track record generating stable yields across 3 annual harvest cycles. Low-risk agricultural asset backed by documented SHM land title with fixed offtake agreements covering 70% of annual yield.',
    description:
      'I own a 50-hectare rice farm in Cianjur, West Java, Indonesia. We do 3 harvests per year and earn around IDR 2.8 billion annually. The land has been in my family for 30 years and has a certified land title (SHM).',
    totalValue: 5000000,
    holders: 142,
    createdAt: '2026-04-10T08:00:00Z',
  },
  {
    id: 'inv-bt22',
    tokenName: 'Batam Electronics Invoice',
    ticker: 'INV-BT22',
    assetType: 'Invoice',
    country: 'Indonesia',
    flag: '🇮🇩',
    yieldAPY: 9.5,
    riskScore: 5,
    riskRationale: 'Short-term receivable from verified buyer, moderate counterparty concentration risk.',
    recommendedChain: 'Polygon',
    tokenSupply: 10000,
    tokenPrice: 50,
    investorBrief:
      'A 90-day trade receivable from a Batam-based electronics manufacturer with 5 years of on-time payment history with the debtor. Medium-risk invoice asset offering annualised returns of 9.5% with full principal return at maturity.',
    description:
      'Electronics SME in Batam Free Trade Zone with a $500,000 invoice to a Singapore buyer. 90-day payment terms. Buyer is a publicly listed Singapore company with AAA credit rating.',
    totalValue: 500000,
    holders: 87,
    createdAt: '2026-04-18T10:30:00Z',
  },
  {
    id: 'prop-cm07',
    tokenName: 'Chiang Mai Serviced Apartment',
    ticker: 'PROP-CM07',
    assetType: 'Property',
    country: 'Thailand',
    flag: '🇹🇭',
    yieldAPY: 8.2,
    riskScore: 4,
    riskRationale: 'Strong tourism demand in Chiang Mai; minor FX risk for non-THB investors.',
    recommendedChain: 'Base',
    tokenSupply: 100000,
    tokenPrice: 10,
    investorBrief:
      'A 12-unit fully-furnished serviced apartment building in the Nimman area of Chiang Mai with an 87% average occupancy rate over the last 3 years. Steady rental income from digital nomads and medical tourists provides a predictable 8.2% annual yield.',
    description:
      'I own a 12-unit serviced apartment building in Nimman, Chiang Mai. Average occupancy is 87%. All units are fully furnished and managed by a property management company. Generating THB 2.4M annually.',
    totalValue: 1000000,
    holders: 213,
    createdAt: '2026-03-22T07:15:00Z',
  },
  {
    id: 'palm-ph03',
    tokenName: 'Laguna Palm Oil Plantation',
    ticker: 'PALM-PH03',
    assetType: 'Agricultural',
    country: 'Philippines',
    flag: '🇵🇭',
    yieldAPY: 11.0,
    riskScore: 3,
    riskRationale: 'RSPO-certified plantation with long-term offtake contract and low weather exposure.',
    recommendedChain: 'Arbitrum',
    tokenSupply: 80000,
    tokenPrice: 75,
    investorBrief:
      'An RSPO-certified 200-hectare palm oil plantation in Laguna province with a 10-year offtake contract with a major Philippine cooking oil producer. Reliable commodity income with 11% annual yield driven by consistent fresh fruit bunch production.',
    description:
      '200-hectare RSPO-certified palm oil plantation in Laguna. We have a 10-year offtake contract with a major cooking oil producer. Annual revenue is PHP 28M. Plantation is 8 years old and in peak production phase.',
    totalValue: 6000000,
    holders: 178,
    createdAt: '2026-04-05T09:00:00Z',
  },
  {
    id: 'loan-jk11',
    tokenName: 'Jakarta SME Working Capital',
    ticker: 'LOAN-JK11',
    assetType: 'Infrastructure',
    country: 'Indonesia',
    flag: '🇮🇩',
    yieldAPY: 13.5,
    riskScore: 6,
    riskRationale: 'Higher yield reflects SME credit risk; mitigated by personal guarantee and inventory collateral.',
    recommendedChain: 'Polygon',
    tokenSupply: 20000,
    tokenPrice: 25,
    investorBrief:
      'A 12-month working capital loan to a Jakarta-based food distribution SME with 8 years of operation and IDR 15B annual revenue. Higher-yield opportunity at 13.5% APY secured by inventory collateral and personal guarantee from the business owner.',
    description:
      'Food distribution business in Jakarta with 8 years track record. Need IDR 7.5B working capital to fund inventory ahead of Ramadan peak season. Revenue IDR 15B annually. Personal guarantee provided.',
    totalValue: 500000,
    holders: 64,
    createdAt: '2026-04-25T11:00:00Z',
  },
]

export function getAssetById(id: string): Asset | undefined {
  return MOCK_ASSETS.find((a) => a.id === id)
}

export function getRiskLabel(score: number): { label: string; color: string; bg: string } {
  if (score <= 3) return { label: 'Low risk', color: '#085041', bg: '#E1F5EE' }
  if (score <= 6) return { label: 'Medium risk', color: '#633806', bg: '#FAEEDA' }
  return { label: 'High risk', color: '#791F1F', bg: '#FCEBEB' }
}

export function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value.toLocaleString()}`
}
