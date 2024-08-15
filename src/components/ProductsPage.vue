<script setup>
import { onMounted } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProductsStore } from '@/stores/products'
import Spinner from './Spinner.vue'
// Use jobs.value in the template since it's a ref

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<template>
  <section class="bg-custom-dark px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-2xl font-bold text-custom-pink mb-6 text-center">Browse Our Products</h2>
      <div v-if="productsStore.isLoading" class="flex items-center justify-center h-64">
        <Spinner />
      </div>
      <div class="flex justify-center mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProductCard
            v-for="product in productsStore.products"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </section>
</template>
