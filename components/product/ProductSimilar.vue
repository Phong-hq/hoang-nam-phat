<template>
  <section v-if="similarProducts.length > 0" class="mt-12 lg:mt-16">
    <BaseSectionHeader
      label="Có thể bạn thích"
      title="Sản phẩm tương tự"
      :to="`/products?category=${encodeURIComponent(category)}`"
    />

    <!-- Product grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
      <NuxtLink
        v-for="item in similarProducts"
        :key="item.id"
        :to="`/products/${item.slug}`"
        class="block"
      >
        <HomeProductCard :product="toHomeProduct(item)" />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProductListItem, HomeProduct } from '~/types'

const props = defineProps<{
  currentSlug: string
  category: string
}>()

const { data } = await useAsyncData(
  `similar-${props.currentSlug}`,
  () => $fetch<{ data: ProductListItem[] }>('/api/products'),
)

const similarProducts = computed<ProductListItem[]>(() => {
  if (!data.value?.data) return []
  return data.value.data
    .filter((p) => p.category === props.category && p.slug !== props.currentSlug)
    .slice(0, 4)
})

function toHomeProduct(item: ProductListItem): HomeProduct {
  const discount =
    item.originalPrice && item.originalPrice > item.price
      ? Math.round((1 - item.price / item.originalPrice) * 100)
      : undefined
  return {
    id: item.id,
    name: item.name,
    brand: item.brand,
    price: item.price,
    originalPrice: item.originalPrice,
    discount,
    rating: item.rating ?? 0,
    ratingCount: item.reviewCount ?? 0,
    image: item.thumbnail,
    inStock: true,
  }
}
</script>
