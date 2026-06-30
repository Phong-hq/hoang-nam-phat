<template>
  <section class="py-12 bg-[#EEF2F7] border-y border-base-200">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-2.5">
          <span class="w-1 h-6 bg-primary rounded-full block flex-shrink-0" />
          <h2 class="text-base font-bold text-[#0F172A]">Thương hiệu chính hãng</h2>
        </div>
      </div>

      <ClientOnly>
        <Swiper
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
          <SwiperSlide v-for="brand in brands" :key="brand.name" style="width: 140px;">
            <NuxtLink
              :to="`/products?brand=${brand.slug}`"
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
              :key="brand.name"
              :to="`/products?brand=${brand.slug}`"
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, FreeMode } from 'swiper/modules'

const swiperModules = [Autoplay, FreeMode]
const autoplay = { delay: 0, disableOnInteraction: false }

const brands = [
  { name: 'MikroTik',    slug: 'mikrotik' },
  { name: 'TP-Link',     slug: 'tplink' },
  { name: 'Hikvision',   slug: 'hikvision' },
  { name: 'Dahua',       slug: 'dahua' },
  { name: 'Cisco',       slug: 'cisco' },
  { name: 'Ubiquiti',    slug: 'ubiquiti' },
  { name: 'Ruijie',      slug: 'ruijie' },
  { name: 'Grandstream', slug: 'grandstream' },
  { name: 'Dell',        slug: 'dell' },
  { name: 'HP',          slug: 'hp' },
  { name: 'Synology',    slug: 'synology' },
  { name: 'QNAP',        slug: 'qnap' },
  { name: 'Aruba',       slug: 'aruba' },
  { name: 'Ezviz',       slug: 'ezviz' },
  { name: 'Lenovo',      slug: 'lenovo' },
  { name: 'Imou',        slug: 'imou' },
]
</script>

<style>
.brands-swiper .swiper-wrapper {
  transition-timing-function: linear !important;
}
</style>
