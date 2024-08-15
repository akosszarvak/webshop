export function validateOrderAmount(orderAmount, minOrderAmount, maxOrderAmount) {
  if (orderAmount < minOrderAmount) {
    return { isValid: false, message: `Minimum order amount is ${minOrderAmount}.` }
  }

  if (orderAmount > maxOrderAmount) {
    return { isValid: false, message: `Only ${maxOrderAmount} items available in stock.` }
  }

  return { isValid: true, message: '' }
}
