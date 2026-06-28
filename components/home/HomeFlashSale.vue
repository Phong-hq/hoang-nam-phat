<template>
  <section class="py-14" style="background: linear-gradient(135deg, #1A0005 0%, #3D0010 50%, #1A0005 100%);">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <!-- Header with countdown -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div class="flex items-center gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-2xl">⚡</span>
              <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Flash Sale</h2>
            </div>
            <p class="text-white/50 text-sm">Ưu đãi có hạn · Số lượng giới hạn mỗi ngày</p>
          </div>
        </div>

        <!-- Countdown -->
        <div class="flex items-center gap-2">
          <span class="text-white/60 text-sm font-medium">Kết thúc sau:</span>
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
              <span class="text-white/40 text-[9px] font-bold tracking-widest mt-1">{{ unit.label }}</span>
            </div>
            <span v-if="false" class="text-white/40 font-bold text-2xl -mt-4">:</span>
          </div>
        </div>

        <NuxtLink
          to="/products?sale=true"
          class="hidden sm:flex items-center gap-1 text-sm text-primary font-semibold hover:gap-2 transition-all duration-200"
        >
          Xem tất cả
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
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
            <SwiperSlide v-for="product in products" :key="product.id" class="!h-auto pb-1">
              <!-- Flash sale card: white card on dark bg -->
              <div class="group bg-white rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 flex flex-col border-2 border-transparent hover:border-primary/20">
                <div class="relative bg-base-100 aspect-square overflow-hidden">
                  <span class="absolute top-2 left-2 z-10 bg-primary text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                    -{{ product.discount }}%
                  </span>
                  <NuxtImg
                    v-if="product.image"
                    :src="product.image"
                    :alt="product.name"
                    width="300" height="300" loading="lazy"
                    class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <!-- Sale progress bar -->
                  <div class="absolute bottom-0 left-0 right-0 h-1 bg-base-200">
                    <div
                      class="h-full bg-primary rounded-full transition-all duration-500"
                      :style="`width: ${product.soldPercent}%`"
                    />
                  </div>
                </div>
                <div class="p-3 flex flex-col flex-1">
                  <span class="text-[10px] font-bold uppercase tracking-widest text-base-content/40">{{ product.brand }}</span>
                  <h3 class="text-sm font-medium text-base-content mt-0.5 line-clamp-2 leading-snug flex-1 min-h-[36px]">
                    {{ product.name }}
                  </h3>
                  <div class="mt-2">
                    <div class="text-[11px] text-base-content/40 line-through leading-none mb-0.5">
                      {{ formatCurrency(product.originalPrice) }}
                    </div>
                    <div class="text-base font-extrabold text-primary">{{ formatCurrency(product.price) }}</div>
                  </div>
                  <div class="flex items-center justify-between mt-1.5 text-[10px] text-base-content/40">
                    <span>Đã bán {{ product.soldPercent }}%</span>
                    <span class="text-warning font-semibold">Còn {{ 100 - product.soldPercent }}%</span>
                  </div>
                  <button class="btn btn-primary btn-sm w-full mt-3 text-white font-semibold">Mua ngay</button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <button @click="swiper?.slidePrev()" aria-label="Trước"
            class="absolute -left-4 top-1/2 -translate-y-6 z-10 w-9 h-9 bg-white/10 border border-white/20 rounded-full items-center justify-center text-white hover:bg-white hover:text-primary transition-colors hidden md:flex">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button @click="swiper?.slideNext()" aria-label="Tiếp"
            class="absolute -right-4 top-1/2 -translate-y-6 z-10 w-9 h-9 bg-white/10 border border-white/20 rounded-full items-center justify-center text-white hover:bg-white hover:text-primary transition-colors hidden md:flex">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <template #fallback>
            <div class="flex gap-4 overflow-x-auto pb-2 snap-x">
              <div v-for="p in products" :key="p.id" class="flex-shrink-0 w-[220px] snap-start bg-white rounded-xl p-3">
                <div class="text-sm font-medium">{{ p.name }}</div>
                <div class="text-primary font-extrabold mt-1">{{ formatCurrency(p.price) }}</div>
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
import { formatCurrency } from '~/utils'

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

interface FlashProduct {
  id: number; name: string; brand: string
  price: number; originalPrice: number; discount: number
  image?: string; soldPercent: number
}

const products: FlashProduct[] = [
  { id: 1, name: 'Ubiquiti UAP-AC-Lite Dual-Band Access Point', brand: 'Ubiquiti', price: 1290000, originalPrice: 1990000, discount: 35, soldPercent: 72, image: 'https://placehold.co/300x300/ECFEFF/0891B2?text=AC-Lite' },
  { id: 2, name: 'TP-Link TL-SG108 8-Port Gigabit Desktop Switch', brand: 'TP-Link', price: 390000, originalPrice: 650000, discount: 40, soldPercent: 85, image: 'https://placehold.co/300x300/EEF2FF/1E40AF?text=SG108' },
  { id: 3, name: 'Dahua IPC-HDW2831T-AS 8MP Lite IR Fixed Eye', brand: 'Dahua', price: 890000, originalPrice: 1250000, discount: 29, soldPercent: 61, image: 'https://placehold.co/300x300/FFF7ED/EA580C?text=HDW2831' },
  { id: 4, name: 'Kbvision KX-C2011S4 4CH Full HD Recorder', brand: 'Kbvision', price: 1490000, originalPrice: 2090000, discount: 29, soldPercent: 44, image: 'https://placehold.co/300x300/FFF1F2/F43F5E?text=KX-C' },
  { id: 5, name: 'Grandstream GXP2160 6-Line Enterprise IP Phone', brand: 'Grandstream', price: 2290000, originalPrice: 2990000, discount: 23, soldPercent: 38, image: 'https://placehold.co/300x300/F5F3FF/7C3AED?text=GXP2160' },
  { id: 6, name: 'Ruijie RG-ES208GC 8-Port Managed Cloud Switch', brand: 'Ruijie', price: 1990000, originalPrice: 2690000, discount: 26, soldPercent: 55, image: 'https://placehold.co/300x300/EFF6FF/2563EB?text=ES208GC' },
]
</script>
