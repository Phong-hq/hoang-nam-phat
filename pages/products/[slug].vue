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
              <div class="relative">
                <ClientOnly>
                  <Swiper
                    class="rounded-xl aspect-square"
                    @swiper="onGallerySwiper"
                    @slide-change="onGallerySlideChange"
                  >
                    <SwiperSlide v-for="(img, index) in galleryImages" :key="index">
                      <NuxtImg
                        :src="img"
                        :alt="`${product.brand.name} ${product.name}`"
                        width="600"
                        height="600"
                        :loading="index === 0 ? 'eager' : 'lazy'"
                        decoding="async"
                        sizes="(max-width: 768px) 100vw, 600px"
                        class="rounded-xl w-full h-full object-cover aspect-square"
                      />
                    </SwiperSlide>
                  </Swiper>

                  <template v-if="galleryImages.length > 1">
                    <button
                      type="button"
                      aria-label="Ảnh trước"
                      class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/90 border border-base-200 rounded-full flex items-center justify-center text-base-content/60 hover:text-primary hover:border-primary transition-colors"
                      @click="gallerySwiper?.slidePrev()"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Ảnh tiếp theo"
                      class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/90 border border-base-200 rounded-full flex items-center justify-center text-base-content/60 hover:text-primary hover:border-primary transition-colors"
                      @click="gallerySwiper?.slideNext()"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </template>

                  <template #fallback>
                    <NuxtImg
                      v-if="galleryImages[activeImageIndex]"
                      :src="galleryImages[activeImageIndex]"
                      :alt="`${product.brand.name} ${product.name}`"
                      width="600"
                      height="600"
                      loading="eager"
                      decoding="async"
                      sizes="(max-width: 768px) 100vw, 600px"
                      class="rounded-xl w-full object-cover aspect-square"
                    />
                    <div v-else class="aspect-square bg-base-200 rounded-xl flex items-center justify-center">
                      <span class="text-base-content/40">Chưa có ảnh</span>
                    </div>
                  </template>
                </ClientOnly>
              </div>

              <div v-if="galleryImages.length > 1" class="flex gap-2 mt-3 overflow-x-auto">
                <button
                  v-for="(img, index) in galleryImages"
                  :key="index"
                  type="button"
                  class="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors"
                  :class="index === activeImageIndex ? 'border-primary' : 'border-transparent'"
                  @click="goToGallerySlide(index)"
                >
                  <NuxtImg
                    :src="img"
                    :alt="`${product.name} ${index + 1}`"
                    width="64"
                    height="64"
                    loading="lazy"
                    class="w-full h-full object-cover"
                  />
                </button>
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
                <span class="text-3xl font-bold text-primary">{{ formatCurrency(variant?.unit_price ?? product.unit_price) }}</span>
                <span
                  v-if="product.compare_price && product.compare_price > (variant?.unit_price ?? product.unit_price)"
                  class="text-lg text-base-content/40 line-through"
                >
                  {{ formatCurrency(product.compare_price) }}
                </span>
              </div>

              <p v-if="product.short_description" class="text-base-content/70 text-sm leading-relaxed line-clamp-3">
                {{ product.short_description }}
              </p>

              <div
                v-if="product.description"
                class="prose prose-sm max-w-none text-base-content/80"
                v-html="resolveOembedTags(product.description)"
              />

              <div class="divider my-2" />

              <!-- CTAs -->
              <div class="flex flex-wrap gap-3 pt-1">
                <BaseButton
                  variant="primary"
                  size="lg"
                  class="min-w-0 basis-full sm:flex-1 sm:basis-auto"
                  @click="handleAddToCart"
                >
                  <svg class="w-5 h-5 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Thêm vào giỏ hàng
                </BaseButton>
                <BaseButton variant="accent" size="lg" class="min-w-0 flex-1" @click="handleBuyNow">
                  Mua ngay
                </BaseButton>
                <BaseButton variant="outline" size="lg" class="flex-shrink-0">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </BaseButton>
              </div>

              <div v-if="variant" class="text-xs text-base-content/40 pt-1">
                Phiên bản: {{ variant.name }}
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
        <ProductSidebarList
          title="Có thể bạn quan tâm"
          subtitle="Cùng danh mục sản phẩm"
          :view-more-link="`/products?category=${product.category.slug}`"
          :items="sidebarItems"
          empty-text="Không có sản phẩm liên quan"
          @select="(item: unknown) => productStore.setSelectedProduct(item as ProductCatalogItem)"
        />
      </div>
    </div>

    <CommonNotFound v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper'
import { formatCurrency, getProductImages, getProductThumbnail, resolveOembedTags } from '~/utils'
import { useProductCatalog } from '~/composables/useProductCatalog'
import { useCartStore } from '~/stores/cart.store'
import { useUiStore } from '~/stores/ui.store'
import { useProductStore } from '~/stores/product.store'
import { productCatalogService } from '~/services/productCatalog.service'
import type { ProductCatalogItem, ProductVariant } from '~/types'
import type { SidebarProductItem } from '~/components/product/ProductSidebarList.vue'

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

const variant = computed<ProductVariant | undefined>(() => product.value?.variants)

const activeImageIndex = ref(0)

const galleryImages = computed<string[]>(() => (product.value ? getProductImages(product.value) : []))

watch(galleryImages, () => {
  activeImageIndex.value = 0
})

const gallerySwiper = ref<SwiperType | null>(null)
const onGallerySwiper = (s: SwiperType) => { gallerySwiper.value = s }
const onGallerySlideChange = (s: SwiperType) => { activeImageIndex.value = s.activeIndex }
const goToGallerySlide = (index: number) => {
  activeImageIndex.value = index
  gallerySwiper.value?.slideTo(index)
}

const { data: similarData } = await useAsyncData(
  `similar-sidebar-${slug.value}`,
  () => (product.value ? productCatalogService.getList({ category_slug: product.value.category.slug }) : []),
  { watch: [slug] },
)

const sidebarProducts = computed<ProductCatalogItem[]>(() => {
  if (!similarData.value || !product.value) return []
  return similarData.value.filter((p) => p.slug !== product.value!.slug).slice(0, 6)
})

const sidebarItems = computed<SidebarProductItem[]>(() =>
  sidebarProducts.value.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    image: getProductThumbnail(item),
    price: item.unit_price,
    comparePrice: item.compare_price,
    raw: item,
  })),
)

const cartStore = useCartStore()
const uiStore = useUiStore()

function buildCartItem() {
  if (!product.value) return null
  const v = variant.value

  return {
    id: v?.id ?? product.value.id,
    productId: product.value.id,
    productVariantId: v?.id ?? product.value.id,
    name: product.value.name,
    thumbnail: getProductThumbnail(product.value) ?? '',
    price: v?.unit_price ?? product.value.unit_price,
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
