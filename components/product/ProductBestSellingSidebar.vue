<template>
  <ProductSidebarList
    :title="title"
    :subtitle="subtitle"
    :view-more-link="viewMoreLink"
    :items="items"
    :show-rank="showRank"
    :empty-text="emptyText"
  />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBestSellingStore } from '~/stores/bestSelling.store'
import type { SidebarProductItem } from './ProductSidebarList.vue'

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    viewMoreLink?: string
    emptyText?: string
    showRank?: boolean
  }>(),
  {
    title: 'Sản phẩm bán chạy',
    subtitle: 'Được yêu thích nhất',
    viewMoreLink: '/products',
    emptyText: 'Chưa có sản phẩm bán chạy',
    showRank: true,
  },
)

// Store caches the fetch -- every page dropping in this component shares the
// same result instead of each one calling the API on its own.
const bestSellingStore = useBestSellingStore()
const { records } = storeToRefs(bestSellingStore)

const items = computed<SidebarProductItem[]>(() =>
  records.value.map((record) => ({
    id: record.product.id,
    slug: record.product.slug,
    name: record.product.name,
    image: record.product.images[0],
    price: record.product.unit_price,
    comparePrice: record.product.compare_price,
  })),
)

onMounted(() => {
  bestSellingStore.fetchBestSellingProducts()
})
</script>
