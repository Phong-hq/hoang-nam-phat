<template>
  <section v-if="similarProducts.length > 0" class="mt-12 lg:mt-16">
    <BaseSectionHeader
      label="Có thể bạn thích"
      title="Sản phẩm tương tự"
      :to="viewMoreLink"
    />

    <!-- Product grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
      <NuxtLink
        v-for="item in similarProducts"
        :key="item.id"
        :to="`/products/${item.slug}`"
        class="card bg-white border border-base-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden"
        @click="productStore.setSelectedProduct(item)"
      >
        <figure class="aspect-square overflow-hidden bg-base-200">
          <NuxtImg
            :src="getProductThumbnail(item)"
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
          <span v-if="item.brand" class="badge badge-ghost badge-sm">{{ item.brand.name }}</span>
          <h3 class="card-title text-sm line-clamp-2">{{ item.name }}</h3>
          <p v-if="item.compare_price && item.compare_price > item.unit_price" class="text-xs text-base-content/40 line-through">
            {{ formatCurrency(item.compare_price) }}
          </p>
          <p class="text-primary font-bold">{{ formatPrice(item.unit_price) }}</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatCurrency, formatPrice, getProductThumbnail } from '~/utils'
import { productCatalogService } from '~/services/productCatalog.service'
import { useProductStore } from '~/stores/product.store'
import type { ProductCatalogItem, ProductCategorySummary } from '~/types'

const props = defineProps<{
  currentSlug: string
  categorySlug: string
  subCategory?: ProductCategorySummary | null
  brandSlug?: string
}>()

const productStore = useProductStore()

// A product with a sub-category only lists products from that same sub-category
// (brand is not applied there); otherwise it lists the category, narrowed by brand.
const { data } = await useAsyncData(
  `similar-${props.currentSlug}`,
  () =>
    productCatalogService.getList({
      category_slug: props.categorySlug,
      ...(props.subCategory
        ? { sub_category_id: String(props.subCategory.id) }
        : props.brandSlug ? { brand_slug: props.brandSlug } : {}),
    }),
  { watch: [() => props.categorySlug, () => props.subCategory?.id, () => props.brandSlug] },
)

const similarProducts = computed<ProductCatalogItem[]>(() =>
  (data.value ?? [])
    .filter((p) => p.slug !== props.currentSlug)
    .filter((p) => !props.subCategory || p.sub_category?.id === props.subCategory.id)
    .slice(0, 4),
)

const viewMoreLink = computed(() => {
  const base = `/products?category=${encodeURIComponent(props.categorySlug)}`
  return props.subCategory ? `${base}&sub_category=${encodeURIComponent(props.subCategory.slug)}` : base
})
</script>
