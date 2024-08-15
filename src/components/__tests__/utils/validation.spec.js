import { describe, it, expect } from 'vitest'
import { validateOrderAmount } from '@/utils/validation'

describe('validateOrderAmount', () => {
  it('returns invalid if order amount is less than minOrderAmount', () => {
    const result = validateOrderAmount(0, 1, 10)
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Minimum order amount is 1.')
  })

  it('returns invalid if order amount is more than maxOrderAmount', () => {
    const result = validateOrderAmount(11, 1, 10)
    expect(result.isValid).toBe(false)
    expect(result.message).toBe('Only 10 items available in stock.')
  })

  it('returns valid if order amount is within range', () => {
    const result = validateOrderAmount(5, 1, 10)
    expect(result.isValid).toBe(true)
    expect(result.message).toBe('')
  })
})
