import { v4 as uuidv4 } from 'uuid'
import { findItemById } from '../utils/array'

export function mapProducts(products) {
  return products.map((product) => ({
    ...product,
    id: uuidv4()
  }))
}

export function hasSufficientStock(product, quantity) {
  return product.availableAmount >= quantity
}

export function updateProductStock(product, quantity) {
  return {
    ...product,
    availableAmount: product.availableAmount - quantity
  }
}

export function addOrUpdateCartItem(cartItems, product, quantity) {
  const cartItem = findItemById(cartItems, product.id)

  if (cartItem) {
    cartItem.quantity += quantity
    cartItem.availableAmount -= quantity
  } else {
    cartItems.push({
      ...product,
      quantity,
      availableAmount: product.availableAmount - quantity
    })
  }
}

export function removeCartItem(cartItems, cartItemIndex) {
  cartItems.splice(cartItemIndex, 1)
}
