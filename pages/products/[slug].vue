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
          <li><NuxtLink :to="`/categories/${product.category.toLowerCase()}`">{{ product.category }}</NuxtLink></li>
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
                v-if="product.thumbnail"
                :src="product.thumbnail"
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
                <span class="badge badge-primary">{{ product.brand }}</span>
                <span class="badge badge-ghost">{{ product.category }}</span>
              </div>

              <h1 class="text-2xl lg:text-3xl font-bold leading-snug">{{ product.name }}</h1>

              <div v-if="product.rating" class="flex items-center gap-2">
                <div class="rating rating-sm">
                  <input
                    v-for="i in 5"
                    :key="i"
                    type="radio"
                    class="mask mask-star-2 bg-orange-400"
                    :checked="i === Math.round(product.rating ?? 0)"
                    disabled
                  />
                </div>
                <span class="text-sm text-base-content/70">({{ product.reviewCount }} đánh giá)</span>
              </div>

              <div class="flex items-baseline gap-3">
                <span class="text-3xl font-bold text-primary">{{ formatCurrency(product.price) }}</span>
                <span v-if="product.originalPrice" class="text-lg line-through text-base-content/50">
                  {{ formatCurrency(product.originalPrice) }}
                </span>
                <span
                  v-if="product.originalPrice && product.originalPrice > product.price"
                  class="badge badge-primary badge-sm font-bold"
                >
                  -{{ Math.round((1 - product.price / product.originalPrice) * 100) }}%
                </span>
              </div>

              <!-- Stock indicator -->
              <div v-if="product.stock !== undefined" class="flex items-center gap-2">
                <span
                  class="w-2 h-2 rounded-full"
                  :class="product.stock > 0 ? 'bg-success' : 'bg-error'"
                />
                <span
                  class="text-sm font-medium"
                  :class="product.stock > 0 ? 'text-success' : 'text-error'"
                >
                  {{ product.stock > 0 ? `Còn hàng (${product.stock} sản phẩm)` : 'Hết hàng' }}
                </span>
              </div>

              <div class="divider my-2" />

              <p class="text-base-content/80 leading-relaxed text-sm line-clamp-4">{{ product.description }}</p>

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

              <!-- Quick specs -->
              <div v-if="product.specifications?.length" class="bg-base-50 rounded-lg border border-base-200 divide-y divide-base-200 mt-2">
                <div
                  v-for="spec in product.specifications.slice(0, 4)"
                  :key="spec.label"
                  class="grid grid-cols-5 px-4 py-2.5 gap-2 items-start"
                >
                  <dt class="col-span-2 text-xs text-base-content/55 font-medium">{{ spec.label }}</dt>
                  <dd class="col-span-3 text-xs text-base-content font-semibold">{{ spec.value }}</dd>
                </div>
              </div>

              <div class="text-xs text-base-content/40 pt-1">SKU: {{ product.sku }}</div>
            </div>
          </div>

          <!-- Detail tabs section -->
          <div class="mt-10 lg:mt-12">
            <ProductDetailTabs :product="product" />
          </div>

          <!-- Similar products -->
          <ProductSimilar :current-slug="product.slug" :category="product.category" />
        </div>

        <!-- Right sidebar: similar products (desktop only) -->
        <aside class="hidden lg:flex flex-col gap-3 w-64 flex-shrink-0 sticky top-24">
          <div class="flex items-center justify-between mb-1">
            <h3 class="font-bold text-sm text-base-content">Có thể bạn quan tâm</h3>
            <NuxtLink
              :to="`/products?category=${encodeURIComponent(product.category)}`"
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
                  v-if="item.thumbnail"
                  :src="item.thumbnail"
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
                  <span v-if="item.originalPrice" class="text-[10px] text-base-content/40 line-through block leading-none">
                    {{ formatCurrency(item.originalPrice) }}
                  </span>
                  <span class="text-sm font-bold text-primary leading-tight">
                    {{ formatCurrency(item.price) }}
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
import { computed } from 'vue'
import { formatCurrency } from '~/utils'
import type { Product, ProductListItem } from '~/types'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: product, pending, error } = await useAsyncData(
  `product-${slug.value}`,
  () => $fetch<Product>(`/api/products/${slug.value}`).catch(() => null),
  { watch: [slug] },
)

if (error.value || !product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Sản phẩm không tìm thấy' })
}

if (product.value) {
  useProductSeo(product.value)
}

const { data: similarData } = await useAsyncData(
  `similar-${slug.value}`,
  () => $fetch<{ data: ProductListItem[] }>('/api/products'),
  { watch: [slug] },
)

const sidebarProducts = computed<ProductListItem[]>(() => {
  if (!similarData.value?.data || !product.value) return []
  return similarData.value.data
    .filter((p: ProductListItem) => p.category === product.value!.category && p.slug !== product.value!.slug)
    .slice(0, 6)
})
</script>
