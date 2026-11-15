<template>
  <ProductListing :category-slug="slug" />
</template>

<script setup lang="ts">
// Trang danh mục: /category/<slug>. Lấy slug một lần (không reactive) -- đổi danh mục là
// đổi trang, Nuxt dựng lại trang mới.
const slug = String(useRoute().params.slug)
</script>
