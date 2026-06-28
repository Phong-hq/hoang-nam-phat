<template>
  <section class="py-14 bg-white">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <BaseSectionHeader label="Làm việc & Di động" title="Laptop chính hãng" to="/products?category=laptop" />

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
const autoplay = { delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }

const products: HomeProduct[] = [
  { id: 1, name: 'Dell Latitude 3540 Core i5-1345U 8GB 256GB SSD', brand: 'Dell', price: 14500000, originalPrice: 17000000, discount: 15, rating: 4.7, ratingCount: 87, image: 'https://placehold.co/300x300/F8FAFC/334155?text=Latitude+3540' },
  { id: 2, name: 'HP ProBook 440 G10 Core i7-1355U 16GB 512GB', brand: 'HP', price: 22500000, originalPrice: 26000000, discount: 13, rating: 4.8, ratingCount: 64, image: 'https://placehold.co/300x300/F0FDF4/15803D?text=ProBook+440' },
  { id: 3, name: 'Lenovo ThinkPad E14 Gen 5 Ryzen 5 7530U 16GB', brand: 'Lenovo', price: 18900000, originalPrice: 22000000, discount: 14, rating: 4.7, ratingCount: 112, image: 'https://placehold.co/300x300/EFF6FF/1D4ED8?text=ThinkPad+E14' },
  { id: 4, name: 'Asus VivoBook 15 OLED K3504VA Core i5-1340P', brand: 'ASUS', price: 16500000, originalPrice: 19500000, discount: 15, rating: 4.6, ratingCount: 156, image: 'https://placehold.co/300x300/FFF7ED/C2410C?text=VivoBook+15' },
  { id: 5, name: 'Acer Aspire 5 A514-56M Core i5-1335U 16GB 512GB', brand: 'Acer', price: 14900000, originalPrice: 17500000, discount: 15, rating: 4.5, ratingCount: 203, image: 'https://placehold.co/300x300/ECFEFF/0E7490?text=Aspire+5' },
  { id: 6, name: 'Dell Inspiron 15 3520 Core i3-1215U 8GB 256GB', brand: 'Dell', price: 10900000, originalPrice: 12900000, discount: 16, rating: 4.5, ratingCount: 178, image: 'https://placehold.co/300x300/F8FAFC/475569?text=Inspiron+15', isNew: true },
]
</script>
