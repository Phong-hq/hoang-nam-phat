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
                :alt="`${product.brand.name} ${product.name}`"
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
                <span
                  v-if="product.compare_price && product.compare_price > (selectedVariant?.unit_price ?? product.unit_price)"
                  class="text-lg text-base-content/40 line-through"
                >
                  {{ formatCurrency(product.compare_price) }}
                </span>
              </div>

              <p v-if="product.short_description" class="text-base-content/70 text-sm leading-relaxed line-clamp-3">
                {{ product.short_description }}
              </p>

              <!-- Variants -->
              <div v-if="product.variants.length > 1" class="space-y-2">
                <div class="text-sm font-medium text-base-content">Phiên bản</div>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="variant in product.variants"
                    :key="variant.slug"
                    type="button"
                    class="px-3 py-1.5 rounded-lg border text-sm transition-colors"
                    :class="
                      selectedVariantSlug === variant.slug
                        ? 'border-primary text-primary bg-primary/5 font-semibold'
                        : 'border-base-200 text-base-content/70 hover:border-primary/40'
                    "
                    @click="selectVariant(variant.slug)"
                  >
                    {{ variant.name }}
                  </button>
                </div>
              </div>

              <div class="divider my-2" />

              <!-- CTAs -->
              <div class="flex gap-3 pt-1">
                <BaseButton variant="primary" size="lg" class="flex-1" @click="handleAddToCart">
                  <svg class="w-5 h-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Thêm vào giỏ hàng
                </BaseButton>
                <BaseButton variant="secondary" size="lg" class="flex-1" @click="handleBuyNow">
                  Mua ngay
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
        <aside class="hidden lg:flex flex-col gap-3 w-64 flex-shrink-0 sticky top-[var(--header-height)] z-10">
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
              @click="productStore.setSelectedProduct(item)"
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
import { useRoute, useRouter } from 'vue-router'
import { formatCurrency } from '~/utils'
import { useProductCatalog } from '~/composables/useProductCatalog'
import { useCartStore } from '~/stores/cart.store'
import { useUiStore } from '~/stores/ui.store'
import { useProductStore } from '~/stores/product.store'
import { productCatalogService } from '~/services/productCatalog.service'
import type { ProductCatalogItem, ProductVariant } from '~/types'

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug as string)

const { fetchProductDetail } = useProductCatalog()
const productStore = useProductStore()

let servedFromCache = false

const { data: product, pending, error } = await useAsyncData(
  `product-${slug.value}`,
  async () => {
    // If the user navigated here from a product card, the full item is
    // already sitting in the store — skip the API call entirely.
    const cached = productStore.consumeSelectedProduct(slug.value)
    if (cached) {
      servedFromCache = true
      return {
        ...cached,
        description: '',
        specifications: '',
        short_description: '',
        warranty_description: '',
      }
    }

    servedFromCache = false
    const detail = await fetchProductDetail(slug.value).catch(() => null)
    if (!detail) return null

    // The /view detail endpoint can return stale variant data; the product
    // list endpoint (already loaded in productStore when browsing) is the
    // source of truth for variants/pricing, so prefer it when available.
    const listMatch = productStore.products.find((p) => p.slug === detail.slug)
    if (!listMatch) return detail

    return {
      ...detail,
      unit_price: listMatch.unit_price,
      compare_price: listMatch.compare_price,
      product_options: listMatch.product_options,
      variants: listMatch.variants,
    }
  },
  { watch: [slug] },
)

if (error.value || !product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Sản phẩm không tìm thấy' })
}
useProductSeo(product.value)

// The cached card only carries list-level fields (no description/specs/SEO
// copy). Fetch the full detail in the background -- this never blocks the
// already-rendered page -- and refresh the SEO tags once it lands, so meta
// description/JSON-LD never stay stuck on the empty stub.
if (servedFromCache) {
  const cachedSlug = slug.value
  fetchProductDetail(cachedSlug)
    .then((detail) => {
      if (!detail || !product.value || product.value.slug !== cachedSlug) return

      product.value = {
        ...product.value,
        description: detail.description,
        specifications: detail.specifications,
        short_description: detail.short_description,
        warranty_description: detail.warranty_description,
      }
      useProductSeo(product.value)
    })
    .catch(() => {})
}

const selectedVariantSlug = ref<string | undefined>()

watch(
  product,
  (p) => {
    selectedVariantSlug.value = p?.variants[0]?.slug
  },
  { immediate: true },
)

function selectVariant(slug: string) {
  selectedVariantSlug.value = slug
}

const selectedVariant = computed<ProductVariant | undefined>(() => {
  if (!product.value) return undefined
  const match = product.value.variants.find((v) => v.slug === selectedVariantSlug.value)
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

const cartStore = useCartStore()
const uiStore = useUiStore()

function buildCartItem() {
  if (!product.value) return null
  const variant = selectedVariant.value

  return {
    id: variant?.id ?? product.value.id,
    productId: product.value.id,
    productVariantId: variant?.id ?? product.value.id,
    name: product.value.name,
    thumbnail: variant?.images[0] ?? '',
    price: variant?.unit_price ?? product.value.unit_price,
    slug: product.value.slug,
  }
}

function handleAddToCart() {
  const item = buildCartItem()
  if (!item) return

  cartStore.addItem(item)
  uiStore.addToast({ type: 'success', message: 'Đã thêm sản phẩm vào giỏ hàng' })
}

function handleBuyNow() {
  const item = buildCartItem()
  if (!item) return

  cartStore.addItem(item)
  router.push('/cart')
}
</script>
