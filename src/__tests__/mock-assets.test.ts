import { describe, expect, it } from 'vitest'
import {
  MOCK_ASSETS,
  formatCurrency,
  getAssetById,
  getRiskLabel,
} from '@/data/mock-assets'

describe('getRiskLabel', () => {
  it('returns Low risk for score 1 (low band)', () => {
    expect(getRiskLabel(1).label).toBe('Low risk')
  })

  it('returns Medium risk for score 5 (medium band)', () => {
    expect(getRiskLabel(5).label).toBe('Medium risk')
  })

  it('returns High risk for score 8 (high band)', () => {
    expect(getRiskLabel(8).label).toBe('High risk')
  })
})

describe('formatCurrency', () => {
  it('formats a round number under 1K with locale separators', () => {
    expect(formatCurrency(500)).toBe('$500')
  })

  it('formats a decimal value (rounded to integer dollars)', () => {
    // 1500 is in the >=1K band, displayed as $2K after toFixed(0).
    // For decimal under 1K we expect locale formatting with no $ scaling.
    expect(formatCurrency(99.5)).toBe('$99.5')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0')
  })

  it('formats thousands with K suffix', () => {
    expect(formatCurrency(5000)).toBe('$5K')
  })

  it('formats millions with M suffix and one decimal', () => {
    expect(formatCurrency(2_500_000)).toBe('$2.5M')
  })
})

describe('getAssetById', () => {
  it('returns the asset when given an existing id', () => {
    const first = MOCK_ASSETS[0]
    const found = getAssetById(first.id)
    expect(found).toBeDefined()
    expect(found?.id).toBe(first.id)
    expect(found?.tokenName).toBe(first.tokenName)
  })

  it('returns undefined for a non-existent id', () => {
    expect(getAssetById('does-not-exist')).toBeUndefined()
  })
})
