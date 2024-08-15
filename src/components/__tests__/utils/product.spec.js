import { describe, it, expect, vi } from 'vitest'
import {
  mapProducts,
  hasSufficientStock,
  updateProductStock,
  addOrUpdateCartItem
} from '@/utils/product'

vi.mock('uuid', () => ({ v4: () => 'mocked-uuid' }))

describe('mapProducts', () => {
  it('should map products and assign a new uuid', () => {
    const products = [{ name: 'Product 1' }, { name: 'Product 2' }]
    const mappedProducts = mapProducts(products)

    expect(mappedProducts).toEqual([
      { name: 'Product 1', id: 'mocked-uuid' },
      { name: 'Product 2', id: 'mocked-uuid' }
    ])
  })
})

describe('hasSufficientStock', () => {
  it('should return true if stock is sufficient', () => {
    const product = { availableAmount: 10 }
    const result = hasSufficientStock(product, 5)

    expect(result).toBe(true)
  })

  it('should return false if stock is insufficient', () => {
    const product = { availableAmount: 3 }
    const result = hasSufficientStock(product, 5)

    expect(result).toBe(false)
  })
})

describe('updateProductStock', () => {
  it('should update the product stock', () => {
    const product = { availableAmount: 10 }
    const updatedProduct = updateProductStock(product, 3)

    expect(updatedProduct).toEqual({ availableAmount: 7 })
  })
})

describe('addOrUpdateCartItem', () => {
  it('should add a new item to the cart', () => {
    const cartItems = []
    const product = { id: '1', name: 'Product 1', availableAmount: 10 }
    const quantity = 2

    addOrUpdateCartItem(cartItems, product, quantity)

    expect(cartItems).toEqual([{ id: '1', name: 'Product 1', quantity: 2, availableAmount: 8 }])
  })

  it('should update the quantity of an existing cart item', () => {
    const cartItems = [{ id: '1', name: 'Product 1', quantity: 1, availableAmount: 9 }]
    const product = { id: '1', name: 'Product 1', availableAmount: 10 }
    const quantity = 2

    addOrUpdateCartItem(cartItems, product, quantity)

    expect(cartItems).toEqual([{ id: '1', name: 'Product 1', quantity: 3, availableAmount: 7 }])
  })
})
