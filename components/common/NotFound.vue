<template>
  <div class="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
    <div class="text-6xl font-bold text-primary mb-4">404</div>
    <h1 class="text-2xl font-bold mb-2">{{ title }}</h1>
    <p class="text-base-content/70 mb-6">{{ message }}</p>
    <NuxtLink to="/" class="btn btn-primary">Ve trang chu</NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  message?: string
}
withDefaults(defineProps<Props>(), {
  title: 'Khong tim thay',
  message: 'Trang hoac san pham ban tim kiem khong ton tai.',
})
</script>
