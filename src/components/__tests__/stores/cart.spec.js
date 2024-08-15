import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'

vi.mock('@/stores/products', () => {
  const mockGetProductById = vi.fn()
  const mockDecrementProductAmount = vi.fn()
  const mockIncrementProductAmount = vi.fn()

  return {
    useProductsStore: () => ({
      getProductById: mockGetProductById,
      decrementProductAmount: mockDecrementProductAmount,
      incrementProductAmount: mockIncrementProductAmount
    })
  }
})

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds product to cart', () => {
    const cartStore = useCartStore()
    const productsStore = useProductsStore()

    productsStore.getProductById.mockReturnValue({
      id: '1',
      name: 'Test Product',
      price: 100,
      availableAmount: 10
    })

    cartStore.addToCart('1', 2)

    expect(cartStore.cartItems.length).toBe(1)
    expect(cartStore.cartItems[0].quantity).toBe(2)
    expect(productsStore.decrementProductAmount).toHaveBeenCalledWith('1', 2)
  })

  it('removes product from cart', () => {
    const cartStore = useCartStore()
    const productsStore = useProductsStore()
    productsStore.getProductById.mockReturnValue({
      id: '1',
      name: 'Test Product',
      price: 100,
      availableAmount: 10
    })

    cartStore.addToCart('1', 2)
    cartStore.removeFromCart('1')

    expect(cartStore.cartItems.length).toBe(0)
  })
})
