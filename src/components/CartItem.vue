<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const totalPrice = computed(() => {
  return props.product.price * props.product.quantity
})
</script>
<template>
  <div
    class="relative flex w-full max-w-xs flex-col overflow-hidden rounded-sm border-2 border-gray-300 bg-white shadow-md"
  >
    <a class="relative mx-2 mt-1 flex h-40 overflow-hidden rounded-sm" href="#">
      <img class="h-full w-full object-cover" :src="props.product.img" :alt="props.product.name" />
    </a>
    <div class="mt-1 px-2 pb-2">
      <a href="#">
        <h5 class="text-lg tracking-tight text-custom-dark">{{ props.product.name }}</h5>
      </a>
      <div class="mt-1 mb-2 flex items-center justify-between">
        <p>
          <span class="text-md text-custom-dark">qt: {{ props.product.quantity }}</span>
        </p>
        <p>
          <span class="text-md text-custom-dark">Amount: ${{ totalPrice }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
