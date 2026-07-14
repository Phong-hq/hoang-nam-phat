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
import type { HomeProduct } from '~/components/home/HomeProductCard.vue'

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

const products: HomeProduct[] = [
  { id: 1, name: 'Mikrotik RouterBOARD hEX S RB760iGS', brand: 'MikroTik', price: 1850000, originalPrice: 2200000, discount: 16, rating: 4.8, ratingCount: 234, image: 'https://placehold.co/300x300/EEF2FF/1E40AF?text=hEX+S' },
  { id: 2, name: 'TP-Link EAP670 AX3000 WiFi 6 Access Point', brand: 'TP-Link', price: 2490000, originalPrice: 2990000, discount: 17, rating: 4.7, ratingCount: 189, image: 'https://placehold.co/300x300/ECFEFF/0891B2?text=EAP670' },
  { id: 3, name: 'Hikvision DS-2CD2143G2-I 4MP AcuSense', brand: 'Hikvision', price: 1390000, originalPrice: 1650000, discount: 16, rating: 4.9, ratingCount: 312, image: 'https://placehold.co/300x300/FFF7ED/EA580C?text=DS-2CD' },
  { id: 4, name: 'Dell Latitude 3540 Core i5-1345U 8GB 256GB', brand: 'Dell', price: 14500000, originalPrice: 17000000, discount: 15, rating: 4.6, ratingCount: 87, image: 'https://placehold.co/300x300/F8FAFC/475569?text=Latitude' },
  { id: 5, name: 'Cisco SG350-28P 28-Port PoE Managed Switch', brand: 'Cisco', price: 12900000, originalPrice: 15500000, discount: 17, rating: 4.8, ratingCount: 156, image: 'https://placehold.co/300x300/EEF2FF/4338CA?text=SG350' },
  { id: 6, name: 'Synology DiskStation DS223+ 2-Bay NAS', brand: 'Synology', price: 8900000, originalPrice: 10500000, discount: 15, rating: 4.7, ratingCount: 93, image: 'https://placehold.co/300x300/F5F3FF/7C3AED?text=DS223+' },
  { id: 7, name: 'Ubiquiti UniFi AP AC Pro UAP-AC-PRO', brand: 'Ubiquiti', price: 3290000, originalPrice: 3990000, discount: 18, rating: 4.8, ratingCount: 271, image: 'https://placehold.co/300x300/ECFEFF/0E7490?text=AC+Pro' },
  { id: 8, name: 'HP ProBook 440 G10 Core i7-1355U 16GB 512GB', brand: 'HP', price: 22500000, originalPrice: 26000000, discount: 13, rating: 4.7, ratingCount: 64, image: 'https://placehold.co/300x300/F0FDF4/16A34A?text=ProBook' },
]
</script>
