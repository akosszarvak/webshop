<script setup>
import { RouterLink, useRoute } from 'vue-router'

const isActiveLink = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}
</script>

<template>
  <nav class="bg-custom-blue border-b border-zinc-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-12 items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <span class="hidden md:block text-black text-xl font-bold ml-2">Webshop</span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/')
                    ? 'font-extrabold text-custom-dark'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-custom-dark',
                  'rounded-sm',
                  'px-3',
                  'py-2'
                ]"
                >Home</RouterLink
              >
              <RouterLink
                to="/cart"
                :class="[
                  isActiveLink('/cart')
                    ? 'font-extrabold text-custom-dark'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-custom-dark',
                  'rounded-sm',

                  'px-3',
                  'py-2'
                ]"
                >Cart</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
