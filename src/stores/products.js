import { defineStore } from 'pinia'
import { fetchProductsApi } from '../utils/api'
import { mapProducts } from '../utils/product'
import { findItemById } from '@/utils/array'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    productsFetched: false,
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchProducts() {
      if (this.productsFetched) return
      this.isLoading = true
      this.error = null

      try {
        const data = await fetchProductsApi()
        this.products = mapProducts(data)
        this.productsFetched = true
      } catch (error) {
        console.error('Error fetching products:', error)
        this.error = error
      } finally {
        this.isLoading = false
      }
    },
    decrementProductAmount(productId, amount) {
      const product = findItemById(this.products, productId)
      if (product && product.availableAmount >= amount) {
        product.availableAmount -= amount
      } else {
        throw new Error('Insufficient stock')
      }
    },
    incrementProductAmount(productId, amount) {
      const product = findItemById(this.products, productId)
      if (product) {
        product.availableAmount += amount
      } else {
        console.error('Error incrementing product amount.')
      }
    },
    getProductById(productId) {
      return this.products.find((p) => p.id === productId)
    }
  }
})
