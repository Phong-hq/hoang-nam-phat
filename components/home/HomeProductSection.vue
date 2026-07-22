<template>
  <section class="py-14">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <BaseSectionHeader :label="label" :title="title" :subtitle="subtitle" :to="to" />

      <div class="flex gap-2 overflow-x-auto scrollbar-none -mt-4 mb-6">
        <button v-for="brand in brands" :key="brand.id" @click="activeBrand = brand"
          class="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors flex-shrink-0 border"
          :class="activeBrand?.id === brand.id
            ? 'bg-primary text-primary-content border-primary'
            : 'bg-white text-base-content/60 border-base-200 hover:text-primary hover:border-primary'">
          {{ brand.name }}
        </button>
      </div>

      <div class="relative transition-opacity duration-200" :class="{ 'opacity-50': isLoading }">
        <ClientOnly>
          <Swiper :key="activeBrand?.id" :modules="swiperModules" :breakpoints="breakpoints" :autoplay="autoplayConfig" :loop="activeProducts.length > 1" @swiper="onSwiper">
            <SwiperSlide v-for="p in activeProducts" :key="p.id" class="!h-auto pb-1">
              <HomeProductCard :product="p" />
            </SwiperSlide>
          </Swiper>

          <button @click="swiper?.slidePrev()" aria-label="Trước"
            class="absolute -left-4 top-1/2 -translate-y-6 z-10 w-9 h-9 bg-white rounded-full shadow-md border border-base-200 items-center justify-center text-base-content/60 hover:text-primary hover:border-primary transition-colors hidden md:flex">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button @click="swiper?.slideNext()" aria-label="Tiếp"
            class="absolute -right-4 top-1/2 -translate-y-6 z-10 w-9 h-9 bg-white rounded-full shadow-md border border-base-200 items-center justify-center text-base-content/60 hover:text-primary hover:border-primary transition-colors hidden md:flex">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <template #fallback>
            <div class="flex gap-4 overflow-x-auto pb-2 snap-x">
              <div v-for="p in activeProducts" :key="p.id" class="flex-shrink-0 w-[220px] snap-start">
                <HomeProductCard :product="p" />
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import type { HomeProduct, ProductCatalogItem, SessionBrand } from '~/types'
import { useProductCatalog } from '~/composables/useProductCatalog'

const props = defineProps<{
  label: string
  title: string
  subtitle?: string
  to: string
  categoryId: number
  brands: SessionBrand[]
  autoplayDelay?: number
}>()

const { fetchProducts } = useProductCatalog()

const brands = computed(() => props.brands)
const activeBrand = ref<SessionBrand | null>(brands.value[0] ?? null)
watch(brands, (newBrands) => {
  if (!newBrands.some((b) => b.id === activeBrand.value?.id)) activeBrand.value = newBrands[0] ?? null
})

const rawProducts = ref<ProductCatalogItem[]>([])
const isLoading = ref(false)

function toHomeProduct(item: ProductCatalogItem): HomeProduct {
  const hasDiscount = item.compare_price != null && item.compare_price > item.unit_price
  return {
    id: item.id,
    variantId: item.variants[0]?.id ?? item.id,
    slug: item.slug,
    name: item.name,
    brand: item.brand.name,
    price: item.unit_price,
    originalPrice: hasDiscount ? item.compare_price! : undefined,
    discount: hasDiscount ? Math.round(((item.compare_price! - item.unit_price) / item.compare_price!) * 100) : undefined,
    rating: 0,
    ratingCount: 0,
    image: item.variants[0]?.images[0],
  }
}

async function loadProducts() {
  if (!activeBrand.value) {
    rawProducts.value = []
    return
  }
  isLoading.value = true
  try {
    rawProducts.value = await fetchProducts({
      category_id: String(props.categoryId),
      brand_id: String(activeBrand.value.id),
    })
  } finally {
    isLoading.value = false
  }
}

watch([activeBrand, () => props.categoryId], loadProducts, { immediate: true })

const activeProducts = computed(() => rawProducts.value.map(toHomeProduct))

const swiper = ref<SwiperType | null>(null)
const onSwiper = (s: SwiperType) => { swiper.value = s }
const swiperModules = [Autoplay]
const breakpoints = {
  320: { slidesPerView: 1.5, spaceBetween: 12 },
  480: { slidesPerView: 2.3, spaceBetween: 12 },
  640: { slidesPerView: 3, spaceBetween: 16 },
  1024: { slidesPerView: 4, spaceBetween: 16 },
  1280: { slidesPerView: 5, spaceBetween: 16 },
}
const autoplayConfig = computed(() => ({
  delay: props.autoplayDelay ?? 4000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
}))
</script>
