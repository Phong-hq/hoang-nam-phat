<template>
  <section class="py-12 border-y border-base-200">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-2.5">
          <span class="w-1 h-6 bg-primary rounded-full block flex-shrink-0" />
          <h2 class="text-base font-bold text-[#0F172A]">Thương hiệu chính hãng</h2>
        </div>
      </div>

      <ClientOnly>
        <Swiper
          v-if="brands.length"
          :modules="swiperModules"
          :slides-per-view="'auto'"
          :space-between="12"
          :autoplay="autoplay"
          :speed="4000"
          :loop="true"
          :free-mode="{ enabled: true, momentum: false }"
          :grab-cursor="false"
          :allow-touch-move="false"
          class="brands-swiper"
        >
          <SwiperSlide v-for="brand in brands" :key="brand.id" style="width: 140px;">
            <NuxtLink
              :to="`/products?brand=${brand.code}`"
              class="flex flex-col items-center gap-2 p-4 rounded-xl border border-base-200 bg-white hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div class="w-16 h-10 flex items-center justify-center">
                <span class="text-sm font-extrabold text-base-content/50 group-hover:text-primary transition-colors tracking-wide">
                  {{ brand.name }}
                </span>
              </div>
            </NuxtLink>
          </SwiperSlide>
        </Swiper>

        <template #fallback>
          <div class="flex gap-3 overflow-x-auto pb-2">
            <NuxtLink
              v-for="brand in brands"
              :key="brand.id"
              :to="`/products?brand=${brand.code}`"
              class="flex-shrink-0 w-[140px] flex flex-col items-center gap-2 p-4 rounded-xl border border-base-200 bg-white"
            >
              <span class="text-sm font-extrabold text-base-content/50">{{ brand.name }}</span>
            </NuxtLink>
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
const { brands } = storeToRefs(brandStore)
</script>

<style>
.brands-swiper .swiper-wrapper {
  transition-timing-function: linear !important;
}
</style>
