<template>
  <ProductListing />
</template>

<script setup lang="ts">
// Tất cả sản phẩm. URL lọc cũ (?category=…&sub_category=…) được middleware chuyển 301
// sang /category/<cha>[/<con>] -- xem middleware/legacy-product-filters.ts.
definePageMeta({ middleware: ['legacy-product-filters'] })
</script>
