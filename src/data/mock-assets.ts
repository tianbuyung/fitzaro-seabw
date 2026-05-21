export interface Asset {
  id: string
  tokenName: string
  ticker: string
  category: 'Micro'
  country: string
  countryCode: string
  flag: string
  profitShare: number
  repaymentMultiple: number
  useOfFunds: string
  riskScore: number
  riskRationale: string
  recommendedChain: 'Base' | 'Polygon' | 'Arbitrum'
  tokenSupply: number
  tokenPrice: number
  summary: string
  description: string
  totalValue: number
  holders: number
  createdAt: string
}

export const MOCK_ASSETS: Asset[] = [
  {
    id: 'bangkok-coffee-shop',
    tokenName: 'Bangkok Coffee Shop',
    ticker: 'CAFE-BKK01',
    category: 'Micro',
    country: 'Thailand',
    countryCode: 'TH',
    flag: '🇹🇭',
    profitShare: 14,
    repaymentMultiple: 1.4,
    useOfFunds: 'New espresso bar & seating',
    riskScore: 4,
    riskRationale: 'Established neighbourhood cafe with growing morning footfall; moderate dependency on a single location and seasonal tourism.',
    recommendedChain: 'Base',
    tokenSupply: 10000,
    tokenPrice: 10,
    summary: 'Established neighbourhood cafe expanding seating capacity and adding an espresso bar to serve growing morning footfall.',
    description:
      "Neighbourhood coffee shop in Bangkok's Ari district with 3 years of operation. Daily revenue averages THB 12,000. Looking to add a full espresso bar and expand seating by 20 seats to serve growing morning foot traffic.",
    totalValue: 100000,
    holders: 47,
    createdAt: '2026-05-01T08:00:00Z',
  },
  {
    id: 'jakarta-bakso-vendor',
    tokenName: 'Jakarta Bakso Vendor',
    ticker: 'BKSO-JKT01',
    category: 'Micro',
    country: 'Indonesia',
    countryCode: 'ID',
    flag: '🇮🇩',
    profitShare: 13,
    repaymentMultiple: 1.4,
    useOfFunds: 'Meatball soup cart & supplies',
    riskScore: 5,
    riskRationale: 'Popular street-food cart with consistent daily revenue; higher operational risk from vendor licensing and ingredient price volatility.',
    recommendedChain: 'Polygon',
    tokenSupply: 5000,
    tokenPrice: 20,
    summary: 'Street-food micro-business raising capital for a second bakso cart and bulk ingredient supplies.',
    description:
      'Jakarta street-food vendor specialising in bakso meatball soup. Averaging IDR 2.5M daily revenue across two busy trade routes. Capital sought for a second cart and three months of bulk ingredients.',
    totalValue: 100000,
    holders: 31,
    createdAt: '2026-05-03T10:00:00Z',
  },
  {
    id: 'hanoi-pho-stall',
    tokenName: 'Hanoi Pho Stall',
    ticker: 'PHO-HAN01',
    category: 'Micro',
    country: 'Vietnam',
    countryCode: 'VN',
    flag: '🇻🇳',
    profitShare: 12,
    repaymentMultiple: 1.4,
    useOfFunds: 'Second cart & daily ingredients',
    riskScore: 4,
    riskRationale: 'Consistently busy neighbourhood pho stall with 5-year track record; growth constrained by single-cart capacity.',
    recommendedChain: 'Base',
    tokenSupply: 8000,
    tokenPrice: 10,
    summary: 'Popular pho stall funding a second cart to serve a new district and cover daily ingredient costs.',
    description:
      "Family-run pho stall in Hanoi's Ba Dinh district serving 200+ bowls daily for 5 years. Revenue VND 8M per day. Raising capital to open a second cart in a nearby district and pre-purchase daily ingredients in bulk.",
    totalValue: 80000,
    holders: 38,
    createdAt: '2026-05-05T07:30:00Z',
  },
  {
    id: 'cebu-retail-stall',
    tokenName: 'Cebu Retail Stall',
    ticker: 'RTL-CEB01',
    category: 'Micro',
    country: 'Philippines',
    countryCode: 'PH',
    flag: '🇵🇭',
    profitShare: 15,
    repaymentMultiple: 1.4,
    useOfFunds: 'Inventory restock',
    riskScore: 5,
    riskRationale: 'Fast-moving retail stall in high-footfall Cebu market; higher profit share reflects seasonal inventory risk and peak-season concentration.',
    recommendedChain: 'Arbitrum',
    tokenSupply: 6000,
    tokenPrice: 15,
    summary: 'Small retail stall raising working capital to restock fast-moving inventory ahead of peak season.',
    description:
      'Retail stall in Carbon Market, Cebu selling fast-moving consumer goods and household supplies. Monthly revenue PHP 180,000. Capital raised will restock inventory ahead of the peak holiday season.',
    totalValue: 90000,
    holders: 29,
    createdAt: '2026-05-08T09:00:00Z',
  },
  {
    id: 'chiang-mai-tailor-shop',
    tokenName: 'Chiang Mai Tailor Shop',
    ticker: 'TLR-CNX01',
    category: 'Micro',
    country: 'Thailand',
    countryCode: 'TH',
    flag: '🇹🇭',
    profitShare: 11,
    repaymentMultiple: 1.4,
    useOfFunds: 'New sewing machines & fabric',
    riskScore: 3,
    riskRationale: 'Established family tailoring business with 12 years of returning clientele; equipment investment reduces unit cost and expands monthly capacity.',
    recommendedChain: 'Base',
    tokenSupply: 7000,
    tokenPrice: 10,
    summary: 'Family tailor shop investing in additional sewing machines and fabric stock to take on more orders.',
    description:
      "Family tailor shop on Chiang Mai's Nimmanhaemin Road, operating for 12 years. Serves locals and tourists with custom garments. Capital will fund two additional sewing machines and a three-month fabric stock to grow monthly output from 60 to 100 garments.",
    totalValue: 70000,
    holders: 22,
    createdAt: '2026-05-10T08:30:00Z',
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
