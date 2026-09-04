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
              <div class="relative rounded-xl shadow-xl">
                <ClientOnly>
                  <Swiper
                    class="rounded-xl aspect-square bg-base-100"
                    @swiper="onGallerySwiper"
                    @slide-change="onGallerySlideChange"
                  >
                    <SwiperSlide v-for="(img, index) in galleryImages" :key="index">
                      <NuxtImg
                        :src="img"
                        :class="{'scale-[0.4]': img === PRODUCT_IMAGE_PLACEHOLDER}"
                        :alt="productImageAlt"
                        width="600"
                        height="600"
                        :loading="index === 0 ? 'eager' : 'lazy'"
                        decoding="async"
                        sizes="(max-width: 768px) 100vw, 600px"
                        class="rounded-xl w-full h-full object-contain aspect-square"
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
                      :src="galleryImages[activeImageIndex]"
                      :alt="productImageAlt"
                      width="600"
                      height="600"
                      loading="eager"
                      decoding="async"
                      sizes="(max-width: 768px) 100vw, 600px"
                      class="rounded-xl w-full aspect-square object-contain bg-base-100"
                    />
                  </template>
                </ClientOnly>

                <!-- Hotline tab on the photo -- only rendered when there is an
                     actual photo underneath it. -->
                <a
                  v-if="galleryImages.length"
                  :href="phoneHref"
                  class="shop-plate absolute bottom-2 right-3 z-10 flex items-center gap-2.5 rounded-xl px-3 py-2 sm:gap-3 sm:px-3.5 sm:py-2.5"
                >
                  <span class="shop-plate-dial" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h2.6a1 1 0 01.98.8l.7 3.4a1 1 0 01-.55 1.1l-1.6.8a12 12 0 006 6l.8-1.6a1 1 0 011.1-.55l3.4.7a1 1 0 01.8.98V19a2 2 0 01-2 2h-.5C9.6 21 3 14.4 3 6.5V5z" />
                    </svg>
                  </span>
                  <span class="leading-none">
                    <span class="block text-[9px] font-bold uppercase tracking-[0.18em] text-white/75 sm:text-[10px]">Hotline đặt hàng</span>
                    <span class="shop-plate-number mt-1 block text-[15px] font-extrabold tabular-nums text-white sm:text-[18px]">{{ phoneDisplay }}</span>
                  </span>
                </a>
              </div>

              <div v-if="galleryImages.length > 1" class="flex gap-2 mt-3 overflow-x-auto">
                <button
                  v-for="(img, index) in galleryImages"
                  :key="index"
                  type="button"
                  class="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 shadow-md bg-base-100 transition-colors"
                  :class="index === activeImageIndex ? 'border-primary' : 'border-transparent'"
                  @click="goToGallerySlide(index)"
                >
                  <NuxtImg
                    :src="img"
                    :alt="`${product.name} ${index + 1}`"
                    width="64"
                    height="64"
                    loading="lazy"
                    class="w-full h-full object-contain"
                  />
                </button>
              </div>
            </div>

            <!-- Product info -->
            <div class="product-info space-y-4">
              <div class="flex items-center gap-2 flex-wrap">
                <span v-if="product.brand" class="badge badge-primary">{{ product.brand.name }}</span>
                <span class="badge badge-ghost">{{ product.category.name }}</span>
              </div>

              <h1 class="text-lg lg:text-xl font-bold leading-snug">{{ product.name }}</h1>

              <div class="space-y-2">
                <span
                  v-if="isFlashSale"
                  class="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-orange-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm shadow-primary/30"
                >
                  <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.983 1.907a.75.75 0 00-1.292-.657L4.204 10.5H8.75a.75.75 0 01.671 1.086l-2.914 5.834a.75.75 0 001.292.657l6.487-9.25a.75.75 0 00-.671-1.077H9.117l2.866-5.843z" clip-rule="evenodd" />
                  </svg>
                  Flash Sale
                </span>

                <div class="flex items-baseline gap-3">
                  <span class="text-xl font-bold text-primary">{{ formatPrice(displayPrice) }}</span>
                  <span
                    v-if="(isFlashSale && regularPrice > 0) || (product.compare_price && product.compare_price > regularPrice)"
                    class="text-sm text-base-content/40 line-through"
                  >
                    {{ formatCurrency(isFlashSale ? regularPrice : product.compare_price!) }}
                  </span>
                </div>

                <div
                  v-if="isFlashSale"
                  class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                >
                  Chỉ còn <span class="tabular-nums">{{ flashSaleRecord!.quantity }}</span>&nbsp;sản phẩm giá sốc
                </div>
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
                  size="md"
                  class="min-w-0 basis-full sm:flex-1 sm:basis-auto"
                  @click="handleAddToCart"
                >
                  <svg class="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Thêm vào giỏ hàng
                </BaseButton>
                <BaseButton variant="accent" size="md" class="min-w-0 flex-1" @click="handleBuyNow">
                  Mua ngay
                </BaseButton>
                <BaseButton variant="outline" size="md" class="flex-shrink-0">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </BaseButton>
              </div>

              <!-- Ưu đãi dịch vụ: khung viền đứt, nhãn tiêu đề đè lên cạnh trên -->
               <div class="pt-6">
 <div class="relative rounded-2xl border-2 border-dashed border-primary px-4 pb-4 pt-7">
                <p class="absolute -top-4 left-4 flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm">
                  <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zM5 12h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                  Quà tặng / Khuyến mãi
                </p>
                <div class="rounded-xl bg-emerald-50/60 p-4">
                  <p class="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
                    <svg class="w-5 h-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1m0 0a2 2 0 104 0m-4 0a2 2 0 114 0M7 17a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                    Ưu đãi dịch vụ Hoàng Nam Phát
                  </p>
                  <!-- Nội dung CMS (product_promo); nếu API chưa có content thì dùng danh sách mặc định -->
                  <div
                    v-if="productPromoHtml"
                    class="promo-content mt-3 pl-7 text-sm leading-relaxed text-base-content/80"
                    v-html="productPromoHtml"
                  />
                  <ul v-else class="mt-3 space-y-2 pl-7 text-sm leading-relaxed text-base-content/80">
                    <li>Giao hàng trực tiếp &amp; hướng dẫn sử dụng tại TP.HCM.</li>
                    <li>Cài đặt miễn phí cho đơn hàng trên <strong>5 triệu</strong> (nội thành HCM).</li>
                    <li>Hỗ trợ hướng dẫn &amp; cài đặt từ xa cho khách hàng ở xa.</li>
                    <li><strong class="text-primary">Freeship toàn quốc</strong> – nhanh, an toàn, đúng hẹn.</li>
                  </ul>
                </div>
              </div>
               </div>
             
            </div>
          </div>

          <!-- Detail tabs section (self-hides when the product has no additional_data) -->
          <ProductDetailTabs :product="product" class="mt-10 lg:mt-12" />

          <!-- Similar products -->
          <ProductSimilar
            :current-slug="product.slug"
            :category-slug="product.category.slug"
            :brand-slug="product.brand?.slug"
          />
        </div>

        <!-- Right sidebar: similar products (desktop only) -->
        <ProductSidebarList
          title="Có thể bạn quan tâm"
          :subtitle="sidebarSubtitle"
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
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper'
import { formatCurrency, formatPrice, getProductImages, getProductThumbnail, resolveOembedTags } from '~/utils'
import { PRODUCT_IMAGE_PLACEHOLDER } from '~/constants'
import { useProductCatalog } from '~/composables/useProductCatalog'
import { useCartStore } from '~/stores/cart.store'
import { useUiStore } from '~/stores/ui.store'
import { useProductStore } from '~/stores/product.store'
import { useProductPromoStore } from '~/stores/productPromo.store'
import { useBusinessStore } from '~/stores/business.store'
import { useFlashSaleStore } from '~/stores/flashSale.store'
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

// Ưu đãi dịch vụ -- nội dung HTML lấy từ CMS record "product_promo"
const productPromoStore = useProductPromoStore()
const { productPromo } = storeToRefs(productPromoStore)
const productPromoHtml = computed(() => productPromo.value?.content?.trim() || '')

// Shop hotline for the plate on the gallery -- same source and fallback the
// header uses, so the number never disagrees between the two.
const businessStore = useBusinessStore()
const { businessInfo } = storeToRefs(businessStore)
const phoneDisplay = computed(() => businessInfo.value?.phone?.[0] ?? '0937.813.788')
const phoneHref = computed(() => `tel:${(businessInfo.value?.phone?.[0] ?? '0937813788').replace(/\D/g, '')}`)

// Flash sale -- shared store so the list is fetched once across the app; check
// whether this product is one of the active flash sale entries and, if so,
// swap the displayed/cart price to the flash sale's new_price.
const flashSaleStore = useFlashSaleStore()

onMounted(() => {
  productPromoStore.fetchProductPromo()
  businessStore.fetchBusinessInfo()
  flashSaleStore.fetchFlashSaleProducts()
})

const variant = computed<ProductVariant | undefined>(() => product.value?.variants)

// Matched by slug, not id -- the flash_sale record's product.id is actually a
// variant id and can collide with unrelated catalog product ids.
const flashSaleRecord = computed(() =>
  product.value ? flashSaleStore.records.find((r) => r.product.slug === product.value!.slug) : undefined,
)
const isFlashSale = computed(() => !!flashSaleRecord.value)
const regularPrice = computed(() => variant.value?.unit_price ?? product.value?.unit_price ?? 0)
const displayPrice = computed(() => flashSaleRecord.value?.new_price ?? regularPrice.value)

// Brand can be null in the catalog API -- fall back to the product name alone
const productImageAlt = computed(() =>
  product.value?.brand ? `${product.value.brand.name} ${product.value.name}` : (product.value?.name ?? ''),
)

const activeImageIndex = ref(0)

// Falls back to the shop logo when the product has no photo yet, same as
// getProductThumbnail() does for every other product card/thumbnail.
const galleryImages = computed<string[]>(() => {
  const images = product.value ? getProductImages(product.value) : []
  return images.length ? images : [PRODUCT_IMAGE_PLACEHOLDER]
})

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

const SIDEBAR_LIMIT = 6

// The sidebar lists products from the same category. Some categories only hold
// the product being viewed, which would leave the sidebar empty -- fall back to
// a plain product list so there is always something to show.
const { data: similarData } = await useAsyncData(
  `similar-sidebar-${slug.value}`,
  async (): Promise<{ items: ProductCatalogItem[]; fallback: boolean }> => {
    if (!product.value) return { items: [], fallback: false }

    const currentSlug = product.value.slug
    const sameCategory = await productCatalogService
      .getList({ category_slug: product.value.category.slug })
      .catch(() => [] as ProductCatalogItem[])
    const related = sameCategory.filter((p) => p.slug !== currentSlug)
    if (related.length) return { items: related.slice(0, SIDEBAR_LIMIT), fallback: false }

    const all = await productCatalogService.getList().catch(() => [] as ProductCatalogItem[])
    return { items: all.filter((p) => p.slug !== currentSlug).slice(0, SIDEBAR_LIMIT), fallback: true }
  },
  { watch: [slug] },
)

const sidebarProducts = computed<ProductCatalogItem[]>(() => similarData.value?.items ?? [])

const sidebarSubtitle = computed(() =>
  similarData.value?.fallback ? 'Sản phẩm khác' : 'Cùng danh mục sản phẩm',
)

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
    thumbnail: getProductThumbnail(product.value),
    price: displayPrice.value,
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

<style scoped>
/* Hotline tab: the shop red itself -- theme primary (#e52020) at the top
   edge falling to a deep brick, so it stays on-brand while still reading as
   dark against the white cut-out product photos. */
.shop-plate {
  background: linear-gradient(135deg, oklch(var(--p) / 0.84) 0%, rgba(176, 27, 29, 0.87) 100%);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 8px 18px -8px rgba(103, 12, 14, 0.35);
  backdrop-filter: blur(8px);
  overflow: hidden;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.shop-plate:hover {
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.34),
    0 14px 26px -10px rgba(103, 12, 14, 0.6);
}

.shop-plate:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 0 0 4px rgba(103, 12, 14, 0.55);
}

/* Light sweeping across the tab -- the one ambient motion, slow enough to
   catch the eye without turning into a blinking banner. */
.shop-plate::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 38%, rgba(255, 255, 255, 0.26) 50%, transparent 62%);
  transform: translateX(-120%);
  animation: shop-plate-sheen 5.5s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shop-plate-sheen {
  0%,
  62% {
    transform: translateX(-120%);
  }
  88%,
  100% {
    transform: translateX(120%);
  }
}

/* Dial key: frosted glass punched into the red ground, pulsing once per
   cycle so the tab reads as "call now" and not as a price sticker. */
.shop-plate-dial {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.38),
    0 0 0 0 rgba(255, 255, 255, 0.55);
  animation: shop-plate-ring 2.6s ease-out infinite;
}

.shop-plate-dial svg {
  width: 16px;
  height: 16px;
}

@keyframes shop-plate-ring {
  0% {
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.38),
      0 0 0 0 rgba(255, 255, 255, 0.5);
  }
  70%,
  100% {
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.38),
      0 0 0 12px rgba(255, 255, 255, 0);
  }
}

.shop-plate-number {
  letter-spacing: 0.01em;
  text-shadow: 0 1px 2px rgba(103, 12, 14, 0.55);
}

@media (prefers-reduced-motion: reduce) {
  .shop-plate::after,
  .shop-plate-dial {
    animation: none;
  }

  .shop-plate:hover {
    transform: none;
  }
}

/* Nội dung CMS (v-html) không dùng @tailwindcss/typography, và Tailwind preflight
   xoá bullet + padding của <ul>, nên cần style trực tiếp để khớp danh sách mặc định. */
.promo-content :deep(ul),
.promo-content :deep(ol) {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.promo-content :deep(p) {
  margin: 0 0 0.5rem;
}

.promo-content :deep(p:last-child) {
  margin-bottom: 0;
}

.promo-content :deep(a) {
  color: oklch(var(--p));
  text-decoration: underline;
}
</style>
