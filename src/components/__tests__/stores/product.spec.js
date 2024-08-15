import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { fetchProductsApi } from '@/utils/api'
import { mapProducts } from '@/utils/product'

vi.mock('@/utils/api', () => ({
  fetchProductsApi: vi.fn()
}))

vi.mock('@/utils/product', () => ({
  mapProducts: vi.fn()
}))

describe('Products Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches products and updates state correctly', async () => {
    const productsStore = useProductsStore()

    const mockProducts = [{ id: '1', name: 'Test Product', price: 100, availableAmount: 10 }]

    fetchProductsApi.mockResolvedValue(mockProducts)
    mapProducts.mockReturnValue(mockProducts)

    await productsStore.fetchProducts()

    expect(productsStore.products).toEqual(mockProducts)
    expect(productsStore.productsFetched).toBe(true)
    expect(productsStore.isLoading).toBe(false)
    expect(productsStore.error).toBeNull()
  })

  it('handles fetchProducts API error correctly', async () => {
    const productsStore = useProductsStore()

    fetchProductsApi.mockRejectedValue(new Error('Failed to fetch'))

    await productsStore.fetchProducts()

    expect(productsStore.products).toEqual([])
    expect(productsStore.productsFetched).toBe(false)
    expect(productsStore.isLoading).toBe(false)
    expect(productsStore.error).toBeInstanceOf(Error)
    expect(productsStore.error.message).toBe('Failed to fetch')
  })

  it('decrements product amount correctly', () => {
    const productsStore = useProductsStore()

    const product = { id: '1', name: 'Test Product', price: 100, availableAmount: 10 }
    productsStore.products = [product]

    productsStore.decrementProductAmount('1', 2)

    expect(productsStore.products[0].availableAmount).toBe(8)
  })

  it('throws error if decrementing more than available amount', () => {
    const productsStore = useProductsStore()

    const product = { id: '1', name: 'Test Product', price: 100, availableAmount: 1 }
    productsStore.products = [product]

    expect(() => {
      productsStore.decrementProductAmount('1', 2)
    }).toThrow('Insufficient stock')
  })

  it('increments product amount correctly', () => {
    const productsStore = useProductsStore()

    const product = { id: '1', name: 'Test Product', price: 100, availableAmount: 10 }
    productsStore.products = [product]

    productsStore.incrementProductAmount('1', 5)

    expect(productsStore.products[0].availableAmount).toBe(15)
  })

  it('returns correct product by ID', () => {
    const productsStore = useProductsStore()

    const product1 = { id: '1', name: 'Test Product 1', price: 100, availableAmount: 10 }
    const product2 = { id: '2', name: 'Test Product 2', price: 200, availableAmount: 20 }
    productsStore.products = [product1, product2]

    expect(productsStore.getProductById('1')).toEqual(product1)
    expect(productsStore.getProductById('2')).toEqual(product2)
  })
})
