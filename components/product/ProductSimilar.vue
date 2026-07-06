<template>
  <section v-if="similarProducts.length > 0" class="mt-12 lg:mt-16">
    <BaseSectionHeader
      label="Có thể bạn thích"
      title="Sản phẩm tương tự"
      :to="`/products?category=${encodeURIComponent(categorySlug)}`"
    />

    <!-- Product grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
      <NuxtLink
        v-for="item in similarProducts"
        :key="item.id"
        :to="`/products/${item.slug}`"
        class="card bg-white border border-base-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden"
      >
        <figure class="aspect-square overflow-hidden bg-base-200">
          <NuxtImg
            v-if="item.variants[0]?.images[0]"
            :src="item.variants[0].images[0]"
            :alt="item.name"
            width="300"
            height="300"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 50vw, 300px"
            class="w-full h-full object-cover"
          />
        </figure>
        <div class="card-body p-3">
          <span class="badge badge-ghost badge-sm">{{ item.brand.name }}</span>
          <h3 class="card-title text-sm line-clamp-2">{{ item.name }}</h3>
          <p class="text-primary font-bold">{{ formatCurrency(item.unit_price) }}</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatCurrency } from '~/utils'
import { productCatalogService } from '~/services/productCatalog.service'
import type { ProductCatalogItem } from '~/types'

const props = defineProps<{
  currentSlug: string
  categorySlug: string
}>()

const { data } = await useAsyncData(
  `similar-${props.currentSlug}`,
  () => productCatalogService.getList({ category_slug: props.categorySlug }),
)

const similarProducts = computed<ProductCatalogItem[]>(() =>
  (data.value ?? []).filter((p) => p.slug !== props.currentSlug).slice(0, 4),
)
</script>
