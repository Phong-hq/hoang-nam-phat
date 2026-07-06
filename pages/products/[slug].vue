<template>
  <div class="product-detail  bg-page-bg">
    <div v-if="pending" class="container bg-white mx-auto px-4 py-8">
      <BaseSkeleton class="h-8 w-1/2 mb-4" />
      <BaseSkeleton class="h-4 w-full mb-2" />
      <BaseSkeleton class="h-4 w-3/4" />
    </div>

    <div v-else-if="product" class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="breadcrumbs text-sm mb-6">
        <ul>
          <li><NuxtLink to="/">Trang chủ</NuxtLink></li>
          <li><NuxtLink to="/products">Sản phẩm</NuxtLink></li>
          <li><NuxtLink :to="`/products?category=${product.category.slug}`">{{ product.category.name }}</NuxtLink></li>
          <li class="text-base-content/60">{{ product.name }}</li>
        </ul>
      </nav>

      <div class="flex gap-8 items-start">
        <!-- Main content -->
        <div class="flex-1 min-w-0">
          <!-- Main product block -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Gallery -->
            <div class="product-images">
              <NuxtImg
                v-if="selectedVariant?.images[0]"
                :src="selectedVariant.images[0]"
                :alt="product.name"
                width="600"
                height="600"
                loading="eager"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 600px"
                class="rounded-xl w-full object-cover"
              />
              <div v-else class="aspect-square bg-base-200 rounded-xl flex items-center justify-center">
                <span class="text-base-content/40">Chưa có ảnh</span>
              </div>
            </div>

            <!-- Product info -->
            <div class="product-info space-y-4">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="badge badge-primary">{{ product.brand.name }}</span>
                <span class="badge badge-ghost">{{ product.category.name }}</span>
              </div>

              <h1 class="text-2xl lg:text-3xl font-bold leading-snug">{{ product.name }}</h1>

              <div class="flex items-baseline gap-3">
                <span class="text-3xl font-bold text-primary">{{ formatCurrency(selectedVariant?.unit_price ?? product.unit_price) }}</span>
              </div>

              <p v-if="product.short_description" class="text-base-content/70 text-sm leading-relaxed line-clamp-3">
                {{ product.short_description }}
              </p>

              <!-- Options -->
              <div v-for="option in product.product_options" :key="option.key" class="space-y-2">
                <div class="text-sm font-medium text-base-content">{{ option.name }}</div>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="value in option.values"
                    :key="value.slug"
                    type="button"
                    class="px-3 py-1.5 rounded-lg border text-sm transition-colors flex items-center gap-2"
                    :class="
                      selectedOptions[option.key] === value.slug
                        ? 'border-primary text-primary bg-primary/5 font-semibold'
                        : 'border-base-200 text-base-content/70 hover:border-primary/40'
                    "
                    @click="selectOption(option.key, value.slug)"
                  >
                    <span
                      v-if="value.additional_data"
                      class="w-3.5 h-3.5 rounded-full border border-base-300"
                      :style="{ backgroundColor: value.additional_data }"
                    />
                    {{ value.value }}
                  </button>
                </div>
              </div>

              <div class="divider my-2" />

              <!-- CTAs -->
              <div class="flex gap-3 pt-1">
                <BaseButton variant="primary" size="lg" class="flex-1">
                  <svg class="w-5 h-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Thêm vào giỏ hàng
                </BaseButton>
                <BaseButton variant="outline" size="lg">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </BaseButton>
              </div>

              <div v-if="selectedVariant" class="text-xs text-base-content/40 pt-1">
                Phiên bản: {{ selectedVariant.name }}
              </div>
            </div>
          </div>

          <!-- Detail tabs section -->
          <div class="mt-10 lg:mt-12">
            <ProductDetailTabs :product="product" />
          </div>

          <!-- Similar products -->
          <ProductSimilar :current-slug="product.slug" :category-slug="product.category.slug" />
        </div>

        <!-- Right sidebar: similar products (desktop only) -->
        <aside class="hidden lg:flex flex-col gap-3 w-64 flex-shrink-0 sticky top-24">
          <div class="flex items-center justify-between mb-1">
            <h3 class="font-bold text-sm text-base-content">Có thể bạn quan tâm</h3>
            <NuxtLink
              :to="`/products?category=${product.category.slug}`"
              class="text-xs text-primary hover:underline"
            >
              Xem thêm
            </NuxtLink>
          </div>

          <template v-if="sidebarProducts.length">
            <NuxtLink
              v-for="item in sidebarProducts"
              :key="item.id"
              :to="`/products/${item.slug}`"
              class="flex gap-3 bg-white border border-base-200 rounded-xl p-2.5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div class="w-16 h-16 flex-shrink-0 bg-base-100 rounded-lg overflow-hidden">
                <NuxtImg
                  v-if="item.variants[0]?.images[0]"
                  :src="item.variants[0].images[0]"
                  :alt="item.name"
                  width="64"
                  height="64"
                  loading="lazy"
                  class="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-base-content/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-base-content line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {{ item.name }}
                </p>
                <div class="mt-1.5">
                  <span class="text-sm font-bold text-primary leading-tight">
                    {{ formatCurrency(item.unit_price) }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </template>

          <p v-else class="text-xs text-base-content/40 text-center py-4">
            Không có sản phẩm liên quan
          </p>
        </aside>
      </div>
    </div>

    <CommonNotFound v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formatCurrency } from '~/utils'
import { useProductCatalog } from '~/composables/useProductCatalog'
import { productCatalogService } from '~/services/productCatalog.service'
import type { ProductCatalogItem, ProductVariant } from '~/types'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { fetchProductDetail } = useProductCatalog()

const { data: product, pending, error } = await useAsyncData(
  `product-${slug.value}`,
  () => fetchProductDetail(slug.value).catch(() => null),
  { watch: [slug] },
)

if (error.value || !product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Sản phẩm không tìm thấy' })
}

if (product.value) {
  useProductSeo(product.value)
}

const selectedOptions = ref<Record<string, string>>({})

watch(
  product,
  (p) => {
    const initial: Record<string, string> = {}
    p?.variants[0]?.meta_field.forEach((m) => {
      initial[m.key] = m.slug
    })
    selectedOptions.value = initial
  },
  { immediate: true },
)

function selectOption(key: string, valueSlug: string) {
  selectedOptions.value = { ...selectedOptions.value, [key]: valueSlug }
}

const selectedVariant = computed<ProductVariant | undefined>(() => {
  if (!product.value) return undefined
  const match = product.value.variants.find((v) =>
    v.meta_field.every((m) => selectedOptions.value[m.key] === m.slug),
  )
  return match ?? product.value.variants[0]
})

const { data: similarData } = await useAsyncData(
  `similar-sidebar-${slug.value}`,
  () => (product.value ? productCatalogService.getList({ category_slug: product.value.category.slug }) : []),
  { watch: [slug] },
)

const sidebarProducts = computed<ProductCatalogItem[]>(() => {
  if (!similarData.value || !product.value) return []
  return similarData.value.filter((p) => p.slug !== product.value!.slug).slice(0, 6)
})
</script>
