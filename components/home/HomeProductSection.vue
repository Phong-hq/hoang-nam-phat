<template>
  <section class="py-14">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <BaseSectionHeader :label="label" :title="title" :subtitle="subtitle" :to="to" />

      <div class="relative">
        <ClientOnly>
          <Swiper :modules="swiperModules" :breakpoints="breakpoints" :autoplay="autoplayConfig" :loop="true" @swiper="onSwiper">
            <SwiperSlide v-for="p in products" :key="p.id" class="!h-auto pb-1">
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
import type { HomeProduct } from '~/types'

const props = defineProps<{
  label: string
  title: string
  subtitle?: string
  to: string
  products: HomeProduct[]
  autoplayDelay?: number
}>()

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
