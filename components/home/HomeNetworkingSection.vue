<template>
  <section class="py-14 bg-white">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <BaseSectionHeader label="Hạ tầng mạng" title="Router · Switch · WiFi" to="/products?category=router" />

      <div class="relative">
        <ClientOnly>
          <Swiper :modules="swiperModules" :breakpoints="breakpoints" :autoplay="autoplay" :loop="true" @swiper="onSwiper">
            <SwiperSlide v-for="p in products" :key="p.id" class="!h-auto pb-1">
              <HomeProductCard :product="p" />
            </SwiperSlide>
          </Swiper>
          <button @click="swiper?.slidePrev()" aria-label="Trước" class="absolute -left-4 top-1/2 -translate-y-6 z-10 w-9 h-9 bg-white rounded-full shadow-md border border-base-200 items-center justify-center text-base-content/60 hover:text-primary hover:border-primary transition-colors hidden md:flex">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button @click="swiper?.slideNext()" aria-label="Tiếp" class="absolute -right-4 top-1/2 -translate-y-6 z-10 w-9 h-9 bg-white rounded-full shadow-md border border-base-200 items-center justify-center text-base-content/60 hover:text-primary hover:border-primary transition-colors hidden md:flex">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
          <template #fallback>
            <div class="flex gap-4 overflow-x-auto pb-2 snap-x">
              <div v-for="p in products" :key="p.id" class="flex-shrink-0 w-[220px] snap-start"><HomeProductCard :product="p" /></div>
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
const autoplay = { delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }

const products: HomeProduct[] = [
  { id: 1, name: 'Mikrotik CCR2004-1G-12S+2XS Cloud Core Router', brand: 'MikroTik', price: 18900000, originalPrice: 22500000, discount: 16, rating: 4.9, ratingCount: 67, image: 'https://placehold.co/300x300/EEF2FF/1E40AF?text=CCR2004' },
  { id: 2, name: 'Ubiquiti UniFi Dream Machine Pro UDM-Pro', brand: 'Ubiquiti', price: 12500000, originalPrice: 14900000, discount: 16, rating: 4.8, ratingCount: 89, image: 'https://placehold.co/300x300/ECFEFF/0E7490?text=UDM-Pro' },
  { id: 3, name: 'Cisco SG110-16HP 16-Port PoE Unmanaged Switch', brand: 'Cisco', price: 5900000, originalPrice: 7200000, discount: 18, rating: 4.8, ratingCount: 134, image: 'https://placehold.co/300x300/EEF2FF/4338CA?text=SG110' },
  { id: 4, name: 'TP-Link ER7206 Omada Multi-WAN VPN Router', brand: 'TP-Link', price: 3290000, originalPrice: 3990000, discount: 18, rating: 4.7, ratingCount: 198, image: 'https://placehold.co/300x300/EEF2FF/1D4ED8?text=ER7206' },
  { id: 5, name: 'Ruijie RG-EG105GW-E Wireless Enterprise Gateway', brand: 'Ruijie', price: 2490000, originalPrice: 2990000, discount: 17, rating: 4.6, ratingCount: 156, image: 'https://placehold.co/300x300/EFF6FF/2563EB?text=EG105GW' },
  { id: 6, name: 'Grandstream GWN7664 AX3600 Wi-Fi 6 Access Point', brand: 'Grandstream', price: 4190000, originalPrice: 4990000, discount: 16, rating: 4.7, ratingCount: 72, image: 'https://placehold.co/300x300/F5F3FF/7C3AED?text=GWN7664', isNew: true },
]
</script>
