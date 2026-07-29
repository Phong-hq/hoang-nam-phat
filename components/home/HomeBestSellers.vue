<template>
  <section class="py-14 bg-white">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <BaseSectionHeader label="Được mua nhiều nhất" title="Sản phẩm bán chạy" to="" />

      <!-- Swiper -->
      <div class="relative">
        <ClientOnly>
          <Swiper
            :modules="swiperModules"
            :breakpoints="breakpoints"
            :autoplay="autoplay"
            :loop="true"
            @swiper="onSwiper"
          >
            <SwiperSlide v-for="product in products" :key="product.id" class="!h-auto pb-1">
              <HomeProductCard :product="product" />
            </SwiperSlide>
          </Swiper>

          <!-- Prev -->
          <button
            @click="swiper?.slidePrev()"
            aria-label="Trước"
            class="absolute -left-4 top-1/2 -translate-y-6 z-10 w-9 h-9 bg-white rounded-full shadow-md border border-base-200 items-center justify-center text-base-content/60 hover:text-primary hover:border-primary transition-colors hidden md:flex"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <!-- Next -->
          <button
            @click="swiper?.slideNext()"
            aria-label="Tiếp"
            class="absolute -right-4 top-1/2 -translate-y-6 z-10 w-9 h-9 bg-white rounded-full shadow-md border border-base-200 items-center justify-center text-base-content/60 hover:text-primary hover:border-primary transition-colors hidden md:flex"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <template #fallback>
            <div class="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
              <div v-for="p in products" :key="p.id" class="flex-shrink-0 w-[220px] snap-start">
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import type { BestSellingRecordWithPricing, HomeProduct } from '~/types'
import { useBestSelling } from '~/composables/useBestSelling'

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
const autoplay = { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }

function toHomeProduct(record: BestSellingRecordWithPricing): HomeProduct {
  const { product, unitPrice, comparePrice, brand } = record
  const hasDiscount = comparePrice != null && comparePrice > unitPrice
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand,
    price: unitPrice,
    originalPrice: hasDiscount ? comparePrice : undefined,
    discount: hasDiscount ? Math.round(((comparePrice - unitPrice) / comparePrice) * 100) : undefined,
    rating: 0,
    ratingCount: 0,
    image: product.images[0],
  }
}

const { fetchBestSellingProducts } = useBestSelling()
const bestSellingRecords = ref<BestSellingRecordWithPricing[]>([])
const products = computed(() => bestSellingRecords.value.map(toHomeProduct))

onMounted(async () => {
  bestSellingRecords.value = await fetchBestSellingProducts()
})
</script>
