<template>
  <section class="py-14 bg-red-50" v-if="flashSaleRecords.length">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <!-- Header with countdown -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div class="flex items-center gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-2xl">⚡</span>
              <h2 class="text-2xl md:text-3xl font-extrabold text-base-content tracking-tight">Flash Sale</h2>
            </div>
            <p class="text-base-content/50 text-sm">Ưu đãi có hạn · Số lượng giới hạn mỗi ngày</p>
          </div>
        </div>

        <!-- Countdown -->
        <div class="flex items-center gap-2">
          <span class="text-base-content/60 text-sm font-medium">Kết thúc sau:</span>
          <div class="flex items-center gap-1.5">
            <div
              v-for="(unit, i) in [
                { value: pad(timeLeft.hours), label: 'GIỜ' },
                { value: pad(timeLeft.minutes), label: 'PHÚT' },
                { value: pad(timeLeft.seconds), label: 'GIÂY' },
              ]"
              :key="i"
              class="flex flex-col items-center"
            >
              <div class="bg-primary text-white font-extrabold text-xl w-12 h-12 rounded-lg flex items-center justify-center tabular-nums shadow-lg shadow-primary/40">
                {{ unit.value }}
              </div>
              <span class="text-base-content/40 text-[9px] font-bold tracking-widest mt-1">{{ unit.label }}</span>
            </div>
            <span v-if="false" class="text-base-content/40 font-bold text-2xl -mt-4">:</span>
          </div>
        </div>
      </div>

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
            <SwiperSlide v-for="product in products" :key="product.id" class="pb-1">
              <HomeFlashSaleCard :product="product" />
            </SwiperSlide>
          </Swiper>

          <button @click="swiper?.slidePrev()" aria-label="Trước"
            class="absolute -left-4 top-1/2 -translate-y-6 z-10 w-9 h-9 bg-white border border-base-200 rounded-full items-center justify-center text-base-content/60 hover:text-primary hover:border-primary transition-colors hidden md:flex">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button @click="swiper?.slideNext()" aria-label="Tiếp"
            class="absolute -right-4 top-1/2 -translate-y-6 z-10 w-9 h-9 bg-white border border-base-200 rounded-full items-center justify-center text-base-content/60 hover:text-primary hover:border-primary transition-colors hidden md:flex">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <template #fallback>
            <div class="flex gap-4 overflow-x-auto pb-2 snap-x">
              <div v-for="p in products" :key="p.id" class="flex-shrink-0 w-[220px] snap-start">
                <HomeFlashSaleCard :product="p" />
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
import type { FlashSaleProduct, FlashSaleRecordWithPricing } from '~/types'
import { useFlashSaleStore } from '~/stores/flashSale.store'

const swiper = ref<SwiperType | null>(null)
const onSwiper = (s: SwiperType) => { swiper.value = s }
const swiperModules = [Autoplay]
const breakpoints = {
  320: { slidesPerView: 1, spaceBetween: 12 },
  640: { slidesPerView: 3, spaceBetween: 16 },
  1024: { slidesPerView: 4, spaceBetween: 16 },
  1280: { slidesPerView: 5, spaceBetween: 16 },
}
const autoplay = { delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }

// Countdown timer
const timeLeft = ref({ hours: 5, minutes: 32, seconds: 0 })
let saleEndMs = 0

const pad = (n: number) => String(n).padStart(2, '0')

const updateTimer = () => {
  const diff = saleEndMs - Date.now()
  if (diff <= 0) { timeLeft.value = { hours: 0, minutes: 0, seconds: 0 }; return }
  timeLeft.value = {
    hours: Math.floor(diff / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  saleEndMs = Date.now() + 5 * 3_600_000 + 32 * 60_000
  updateTimer()
  timer = setInterval(updateTimer, 1000)
})
onUnmounted(() => clearInterval(timer))

// The flash sale's own new_price is the authoritative sale price -- the catalog's
// unit_price becomes the struck-through "was" price instead of compare_price.
function toFlashProduct(record: FlashSaleRecordWithPricing): FlashSaleProduct {
  const { product, unitPrice, new_price, quantity } = record
  const hasDiscount = new_price < unitPrice
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: '',
    price: new_price,
    originalPrice: hasDiscount ? unitPrice : undefined,
    discount: hasDiscount ? Math.round(((unitPrice - new_price) / unitPrice) * 100) : undefined,
    soldPercent: 0,
    quantity,
    image: product.images[0],
  }
}

const flashSaleStore = useFlashSaleStore()
const flashSaleRecords = computed(() => flashSaleStore.records)
const products = computed(() => flashSaleRecords.value.map(toFlashProduct))

// Fetched during server-side rendering so the flash sale products are in the
// HTML crawlers read; the store keeps the result for the rest of the visit.
await callOnce('home-flash-sale', () => flashSaleStore.fetchFlashSaleProducts())
</script>
