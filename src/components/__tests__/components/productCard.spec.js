import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'
import { createTestingPinia } from '@pinia/testing'
import { describe, it, expect } from 'vitest'
import { useCartStore } from '@/stores/cart'

describe('ProductCard', () => {
  it('renders product details', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 100,
      availableAmount: 5,
      minOrderAmount: 1
    }

    const wrapper = mount(ProductCard, {
      props: { product },
      global: {
        plugins: [createTestingPinia({ stubActions: false })]
      }
    })

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('100')
  })

  it('adds product to cart on button click', async () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 100,
      availableAmount: 5,
      minOrderAmount: 1
    }

    const wrapper = mount(ProductCard, {
      props: { product },
      global: {
        plugins: [createTestingPinia({ stubActions: false })]
      }
    })

    await wrapper.find('button').trigger('click')

    const cartStore = useCartStore()
    expect(cartStore.addToCart).toHaveBeenCalledWith('1', 1)
  })
})
