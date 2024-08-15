<script setup>
import { computed } from 'vue'
import CartItem from './CartItem.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const totalQuantity = computed(() => cartStore.totalQuantity)
const totalPrice = computed(() => cartStore.totalPrice)
</script>

<template>
  <section class="bg-custom-dark px-4 py-10 h-screen">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-2xl font-bold text-custom-pink mb-6 text-center">Your Cart Items</h2>
      <div class="flex items-center justify-between mb-8">
        <p>
          <span class="text-lg font-bold text-white"> {{ totalQuantity }} items</span>
        </p>
        <p>
          <span class="text-lg font-bold text-white">Total: ${{ totalPrice }}</span>
        </p>
      </div>
      <div class="flex justify-center mb-6">
        <div v-if="cartStore.cartItems.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CartItem v-for="item in cartStore.cartItems" :key="item.id" :product="item" />
        </div>
        <div v-else class="text-center text-gray-500">Your cart is empty.</div>
      </div>
    </div>
  </section>
</template>
