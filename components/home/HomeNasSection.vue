<template>
  <section class="py-14 bg-white">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <BaseSectionHeader label="Lưu trữ chuyên nghiệp" title="NAS & Storage" to="/products?category=nas" />

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
const autoplay = { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }

const products: HomeProduct[] = [
  { id: 1, name: 'Synology DiskStation DS923+ 4-Bay NAS Enclosure', brand: 'Synology', price: 14900000, originalPrice: 17500000, discount: 15, rating: 4.9, ratingCount: 112, image: 'https://placehold.co/300x300/F5F3FF/6D28D9?text=DS923+' },
  { id: 2, name: 'QNAP TS-433 4-Bay Quad-core NAS', brand: 'QNAP', price: 8900000, originalPrice: 10500000, discount: 15, rating: 4.7, ratingCount: 78, image: 'https://placehold.co/300x300/EFF6FF/2563EB?text=TS-433' },
  { id: 3, name: 'WD My Cloud EX2 Ultra 8TB NAS', brand: 'WD', price: 7500000, originalPrice: 8900000, discount: 16, rating: 4.6, ratingCount: 134, image: 'https://placehold.co/300x300/F0FDF4/166534?text=EX2+Ultra' },
  { id: 4, name: 'Synology DS223+ 2-Bay NAS DiskStation', brand: 'Synology', price: 8900000, originalPrice: 10500000, discount: 15, rating: 4.8, ratingCount: 93, image: 'https://placehold.co/300x300/F5F3FF/7C3AED?text=DS223+' },
  { id: 5, name: 'TerraMaster F4-423 4-Bay High-Performance NAS', brand: 'TerraMaster', price: 9500000, originalPrice: 11200000, discount: 15, rating: 4.5, ratingCount: 47, image: 'https://placehold.co/300x300/FFF7ED/B45309?text=F4-423', isNew: true },
  { id: 6, name: 'Seagate IronWolf Pro 4TB NAS Internal HDD', brand: 'Seagate', price: 2890000, originalPrice: 3490000, discount: 17, rating: 4.7, ratingCount: 265, image: 'https://placehold.co/300x300/FEF2F2/B91C1C?text=IronWolf' },
]
</script>
