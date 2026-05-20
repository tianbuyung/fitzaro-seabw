import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InvestmentCalculator } from '@/components/assets/InvestmentCalculator'
import type { Asset } from '@/data/mock-assets'

const mockAsset: Asset = {
  id: 'test-01',
  tokenName: 'Test',
  ticker: 'TST',
  assetType: 'Agricultural',
  country: 'Indonesia',
  flag: '🇮🇩',
  yieldAPY: 10,
  riskScore: 3,
  riskRationale: 'Low risk',
  recommendedChain: 'Base',
  tokenSupply: 1000,
  tokenPrice: 100,
  investorBrief: 'Brief',
  description: 'Desc',
  totalValue: 100000,
  holders: 10,
  createdAt: '2026-01-01T00:00:00.000Z',
}

describe('<InvestmentCalculator />', () => {
  it('renders default values for 1 token (cost $100, annual yield $10)', () => {
    render(<InvestmentCalculator asset={mockAsset} />)

    const input = screen.getByLabelText(/how many tokens/i) as HTMLInputElement
    expect(input.value).toBe('1')

    // Total cost = 1 * 100 = $100
    expect(screen.getByText('$100')).toBeInTheDocument()
    // Annual yield = $100 * 10% = $10
    expect(screen.getByText('$10')).toBeInTheDocument()
  })

  it('recalculates totals when the token amount is changed to 5', async () => {
    const user = userEvent.setup()
    render(<InvestmentCalculator asset={mockAsset} />)

    const input = screen.getByLabelText(/how many tokens/i)
    await user.clear(input)
    await user.type(input, '5')

    // Total cost = 5 * 100 = $500
    expect(screen.getByText('$500')).toBeInTheDocument()
    // Annual yield = $500 * 10% = $50
    expect(screen.getByText('$50')).toBeInTheDocument()
  })
})
