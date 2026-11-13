<template>
  <section class="py-12 border-y border-base-200">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-2.5">
          <span class="w-1 h-6 bg-primary rounded-full block flex-shrink-0" />
          <h2 class="text-base font-bold text-[#0F172A]">Thương Hiệu Thiết Bị Mạng Nổi Bật</h2>
        </div>
      </div>
      <ClientOnly>
        <Swiper
          v-if="brands.length"
          :modules="swiperModules"
          :slides-per-view="'auto'"
          :space-between="16"
          :autoplay="autoplay"
          :speed="4000"
          :loop="true"
          :free-mode="{ enabled: true, momentum: false }"
          :grab-cursor="false"
          :allow-touch-move="false"
          class="brands-swiper"
        >
          <SwiperSlide v-for="brand in brands" :key="brand.id" style="width: 140px;">
            <div
              class="w-full h-full flex flex-col items-center justify-center my-auto gap-2 rounded-xl border border-base-200 bg-white"
            >
              <div class="w-full h-[74px] flex items-center justify-center">
                <img
                  v-if="brand.icon?.length"
                  :src="brand.icon[0]"
                  :alt="brand.name"
                  class="w-auto h-auto max-w-full max-h-full object-contain"
                  loading="lazy"
                />
                <span
                  v-else
                  class="text-sm font-extrabold text-base-content/70 tracking-wide"
                >
                  {{ brand.name }}
                </span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Same box as the Swiper slide above (140px wide, 74px logo area, 16px gap),
             so the strip keeps its height when Swiper takes over. -->
        <template #fallback>
          <div class="flex gap-4 overflow-hidden">
            <div
              v-for="brand in brands"
              :key="brand.id"
              class="flex-shrink-0 w-[140px] flex flex-col items-center justify-center gap-2 rounded-xl border border-base-200 bg-white"
            >
              <div class="w-full h-[74px] flex items-center justify-center">
                <img
                  v-if="brand.icon?.length"
                  :src="brand.icon[0]"
                  :alt="brand.name"
                  class="w-auto h-auto max-w-full max-h-full object-contain"
                  loading="lazy"
                />
                <span v-else class="text-sm font-extrabold text-base-content/70 tracking-wide">{{ brand.name }}</span>
              </div>
            </div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, FreeMode } from 'swiper/modules'
import { useBrandStore } from '~/stores/brand.store'

const swiperModules = [Autoplay, FreeMode]
const autoplay = { delay: 0, disableOnInteraction: false }

const brandStore = useBrandStore()
const { brands: allBrands } = storeToRefs(brandStore)

// Home strip only shows brands the CMS marked to appear on the homepage --
// the full list still backs the /products filter sidebar elsewhere.
const brands = computed(() => allBrands.value.filter((brand) => brand.show_on_home === 1))
</script>

<style>
.brands-swiper .swiper-wrapper {
  transition-timing-function: linear !important;
}
</style>
