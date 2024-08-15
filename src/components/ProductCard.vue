<script setup>
import { computed, ref } from 'vue'
import { defineProps } from 'vue'
import { useCartStore } from '@/stores/cart'
import { validateOrderAmount } from '@/utils/validation'
import { setFeedback } from '@/utils/feedback'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const orderAmount = ref(props.product.minOrderAmount > 1 ? props.product.minOrderAmount : 1)

const feedbackMessage = ref('')
const feedbackType = ref('') // 'success' or 'error'

// Minimum and Maximum order amounts
const minOrderAmount = ref(props.product.minOrderAmount > 1 ? props.product.minOrderAmount : 1)
const maxOrderAmount = computed(() => props.product.availableAmount)

function addToCart() {
  const validation = validateOrderAmount(
    orderAmount.value,
    minOrderAmount.value,
    maxOrderAmount.value
  )

  if (!validation.isValid) {
    setFeedback(feedbackMessage, feedbackType, validation.message, 'error')
    return
  }

  try {
    cartStore.addToCart(props.product.id, orderAmount.value)

    setFeedback(feedbackMessage, feedbackType, 'Product added to cart.', 'success')

    orderAmount.value = minOrderAmount.value
  } catch (error) {
    setFeedback(
      feedbackMessage,
      feedbackType,
      error.message || 'Failed to add product to cart.',
      'error'
    )
  }
}
</script>

<template>
  <div
    class="relative flex w-full max-w-xs flex-col overflow-hidden rounded-sm border-2 border-gray-300 bg-white shadow-md"
  >
    <a class="relative mx-2 mt-1 flex h-40 overflow-hidden rounded-sm" href="#">
      <img class="h-full w-full object-cover" :src="props.product.img" :alt="props.product.name" />
    </a>
    <div class="mt-1 px-2 pb-2">
      <div class="mt-1 mb-2 flex items-center justify-between">
        <h5 class="text-lg tracking-tight text-custom-dark">{{ props.product.name }}</h5>
        <p>
          <span class="text-xl font-bold text-custom-dark">${{ props.product.price }}</span>
        </p>
      </div>

      <!-- Order amount input -->
      <div class="mb-3">
        <label for="orderAmount" class="block text-sm font-medium text-gray-700"
          >Order Amount:</label
        >
        <input
          id="orderAmount"
          type="number"
          v-model.number="orderAmount"
          :min="minOrderAmount"
          :max="maxOrderAmount"
          class="mt-1 block w-full rounded-sm bg-custom-dark text-white border-gray-300 shadow-sm focus:border-custom-pink focus:ring-custom-pink sm:text-sm"
        />
        <p class="mt-1 text-xs text-gray-500">
          Min: {{ minOrderAmount }}, Max: {{ maxOrderAmount }}
        </p>
      </div>

      <!-- Feedback message -->
      <div v-if="feedbackMessage" class="mb-4">
        <p
          :class="{
            'text-green-600': feedbackType === 'success',
            'text-red-600': feedbackType === 'error'
          }"
        >
          {{ feedbackMessage }}
        </p>
      </div>

      <button
        @click="addToCart"
        :disabled="props.product.availableAmount === 0"
        class="flex w-full items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-blue disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-2 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span v-if="props.product.availableAmount === 0">Out of Stock</span>
        <span v-else>Add to cart</span>
      </button>
    </div>
  </div>
</template>
