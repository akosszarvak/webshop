import { defineStore } from 'pinia'
import { useProductsStore } from './products'
import { addOrUpdateCartItem, hasSufficientStock, removeCartItem } from '@/utils/product'
import { findItemIndexById } from '@/utils/array'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: []
  }),
  getters: {
    totalQuantity() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0)
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
    }
  },
  actions: {
    addToCart(productId, quantity) {
      const productsStore = useProductsStore()
      const product = productsStore.getProductById(productId)

      if (product && hasSufficientStock(product, quantity)) {
        addOrUpdateCartItem(this.cartItems, product, quantity)
        productsStore.decrementProductAmount(productId, quantity)
      } else {
        console.error('Insufficient stock')
      }
    },
    removeFromCart(productId) {
      const cartItemIndex = findItemIndexById(this.cartItems, productId)
      if (cartItemIndex !== -1) {
        const cartItem = this.cartItems[cartItemIndex]
        const productsStore = useProductsStore()

        productsStore.incrementProductAmount(productId, cartItem.quantity)

        removeCartItem(this.cartItems, cartItemIndex)
      }
    }
  }
})
