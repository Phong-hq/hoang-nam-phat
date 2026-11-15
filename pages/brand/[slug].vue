<template>
  <ProductListing :brand-slug="slug" />
</template>

<script setup lang="ts">
// Trang thương hiệu: /brand/<slug>.
const slug = String(useRoute().params.slug)
</script>
