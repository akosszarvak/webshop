<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-custom-dark">
    <Navbar />
    <RouterView class="min-h-128 w-3/4 m-auto" />
  </div>
</template>
