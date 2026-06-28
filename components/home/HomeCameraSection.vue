<template>
  <section class="py-14" style="background: linear-gradient(135deg, #0C0F1A 0%, #0F172A 60%, #0C1628 100%);">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <BaseSectionHeader
        label="An ninh & Giám sát"
        subtitle="Hikvision · Dahua · Kbvision · Ezviz · Imou"
        to="/products?category=camera"
        dark
        accent="orange"
      >
        <template #title>Camera <span class="text-[#FFA500]">quan sát</span></template>
      </BaseSectionHeader>

      <!-- Swiper — dark cards -->
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
              <div class="group relative rounded-xl overflow-hidden border border-white/8 hover:border-[#FFA500]/40 transition-all duration-300 flex flex-col"
                style="background: rgba(255,255,255,0.04); backdrop-filter: blur(8px);">
                <!-- Image -->
                <div class="relative aspect-square overflow-hidden" style="background: rgba(255,255,255,0.06);">
                  <span v-if="product.discount" class="absolute top-2 left-2 z-10 bg-[#FFA500] text-[#0C0F1A] text-[10px] font-extrabold px-2 py-0.5 rounded">
                    -{{ product.discount }}%
                  </span>
                  <NuxtImg
                    v-if="product.image"
                    :src="product.image"
                    :alt="product.name"
                    width="300" height="300" loading="lazy"
                    class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <!-- Info -->
                <div class="p-3 flex flex-col flex-1">
                  <span class="text-[10px] font-bold uppercase tracking-widest text-white/30">{{ product.brand }}</span>
                  <h3 class="text-sm font-medium text-white/85 mt-0.5 line-clamp-2 leading-snug flex-1 min-h-[36px]">
                    {{ product.name }}
                  </h3>
                  <div class="flex items-center gap-1 mt-2">
                    <svg v-for="i in 5" :key="i" class="w-3 h-3"
                      :class="i <= Math.round(product.rating) ? 'fill-[#FFA500] text-[#FFA500]' : 'fill-white/15 text-white/15'"
                      viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="text-[10px] text-white/30">({{ product.ratingCount }})</span>
                  </div>
                  <div class="mt-2">
                    <div v-if="product.originalPrice" class="text-[11px] text-white/30 line-through leading-none mb-0.5">
                      {{ formatCurrency(product.originalPrice) }}
                    </div>
                    <div class="text-base font-extrabold text-[#FFA500]">{{ formatCurrency(product.price) }}</div>
                  </div>
                  <button class="mt-3 w-full py-2 text-sm font-semibold rounded-lg border border-[#FFA500]/50 text-[#FFA500] hover:bg-[#FFA500] hover:text-[#0C0F1A] transition-colors">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <button @click="swiper?.slidePrev()" aria-label="Trước"
            class="absolute -left-4 top-1/2 -translate-y-6 z-10 w-9 h-9 rounded-full border border-white/15 items-center justify-center text-white/60 hover:border-[#FFA500] hover:text-[#FFA500] transition-colors hidden md:flex"
            style="background: rgba(255,255,255,0.05);">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button @click="swiper?.slideNext()" aria-label="Tiếp"
            class="absolute -right-4 top-1/2 -translate-y-6 z-10 w-9 h-9 rounded-full border border-white/15 items-center justify-center text-white/60 hover:border-[#FFA500] hover:text-[#FFA500] transition-colors hidden md:flex"
            style="background: rgba(255,255,255,0.05);">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <template #fallback>
            <div class="flex gap-4 overflow-x-auto pb-2 snap-x">
              <div v-for="p in products" :key="p.id" class="flex-shrink-0 w-[220px] snap-start rounded-xl p-3 border border-white/10 bg-white/5">
                <div class="text-sm font-medium text-white">{{ p.name }}</div>
                <div class="text-[#FFA500] font-extrabold mt-1">{{ formatCurrency(p.price) }}</div>
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
const autoplay = { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }

interface CameraProduct {
  id: number; name: string; brand: string; price: number
  originalPrice?: number; discount?: number; rating: number; ratingCount: number; image?: string
}

const products: CameraProduct[] = [
  { id: 1, name: 'Hikvision DS-2CD2T47G2-L 4MP ColorVu Bullet', brand: 'Hikvision', price: 1890000, originalPrice: 2290000, discount: 17, rating: 4.9, ratingCount: 318, image: 'https://placehold.co/300x300/FFF7ED/EA580C?text=2CD2T47' },
  { id: 2, name: 'Dahua IPC-HFW2849S-S-IL 8MP Smart Dual Light', brand: 'Dahua', price: 1490000, originalPrice: 1890000, discount: 21, rating: 4.7, ratingCount: 205, image: 'https://placehold.co/300x300/FFF7ED/C2410C?text=HFW2849' },
  { id: 3, name: 'Kbvision KX-C8001 8MP Full Color IP Camera', brand: 'Kbvision', price: 890000, originalPrice: 1190000, discount: 25, rating: 4.5, ratingCount: 143, image: 'https://placehold.co/300x300/FEF9C3/A16207?text=KX-C8001' },
  { id: 4, name: 'Imou Bullet 2E 4MP Wi-Fi Smart Camera', brand: 'Imou', price: 790000, originalPrice: 990000, discount: 20, rating: 4.6, ratingCount: 421, image: 'https://placehold.co/300x300/ECFDF5/047857?text=Bullet+2E' },
  { id: 5, name: 'Ezviz C3X Pro 4MP Dual Lens Color Night Vision', brand: 'Ezviz', price: 1290000, originalPrice: 1590000, discount: 19, rating: 4.7, ratingCount: 289, image: 'https://placehold.co/300x300/FFF7ED/D97706?text=C3X+Pro' },
  { id: 6, name: 'Hikvision DS-2DE4425IWG-E 4MP PTZ Network', brand: 'Hikvision', price: 4590000, originalPrice: 5490000, discount: 16, rating: 4.8, ratingCount: 97, image: 'https://placehold.co/300x300/FFF7ED/EA580C?text=PTZ+4MP' },
]
</script>
