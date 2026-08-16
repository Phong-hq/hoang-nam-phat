<template>
  <section class="bg-[#0F172A] py-4">
    <div v-if="banner" class="container mx-auto px-4 max-w-screen-xl">

      <!-- Mobile / tablet layout: main banner + all banners shown statically (no swiper) -->
      <div class="flex flex-col gap-2.5 lg:hidden">
        <NuxtLink
          to="/products"
          class="relative rounded-xl overflow-hidden aspect-[1.52]"
          :style="mainBannerStyle"
        />
        <div class="grid grid-cols-1 gap-2.5">
          <NuxtLink
            v-for="b in sideBanners"
            :key="b.href"
            :to="b.href"
            class="relative rounded-xl overflow-hidden aspect-[3.21]"
            :style="b.style"
          />
        </div>
      </div>

      <!-- Desktop layout (lg+): main banner left, vertical banner list right -->
      <div class="hidden lg:grid grid-cols-3 gap-2.5">

        <!-- Large hero banner -->
        <NuxtLink
          to="/products"
          class="col-span-2 relative rounded-xl overflow-hidden group aspect-[1.52]"
          :style="mainBannerStyle"
        />

        <!-- Right column: single vertical list, 4 visible at a time, 1 image per slide transition -->
        <div class="relative h-0 pb-[133.33%]">
          <ClientOnly>
            <Swiper
              :modules="heroSwiperModules"
              direction="vertical"
              :slides-per-view="HERO_SWIPER_SLIDES_PER_VIEW"
              :space-between="10"
              :observer="true"
              :observe-parents="true"
              :autoplay="heroAutoplay"
              :loop="sideBanners.length > HERO_SWIPER_SLIDES_PER_VIEW"
              class="h-full w-full"
              style="position: absolute; inset: 0;"
            >
              <SwiperSlide v-for="b in loopSideBanners" :key="b.key">
                <NuxtLink
                  :to="b.href"
                  class="block w-full h-full rounded-xl overflow-hidden group hover:opacity-90 transition-opacity"
                  :style="b.style"
                />
              </SwiperSlide>
            </Swiper>
            <template #fallback>
              <div class="absolute inset-0 flex flex-col gap-2.5">
                <NuxtLink
                  v-for="b in sideBanners.slice(0, 4)"
                  :key="b.href"
                  :to="b.href"
                  class="flex-1 relative rounded-xl overflow-hidden"
                  :style="b.style"
                />
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import { useBannerStore } from '~/stores/banner.store'

const heroSwiperModules = [Autoplay]
const heroAutoplay = { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }

const bannerStore = useBannerStore()

const banner = computed(() => bannerStore.banner)

function toBgStyle(image: string | undefined, fallbackGradient: string) {
  return image
    ? `background: url('${image}') center / 100% 100% no-repeat;`
    : `background: ${fallbackGradient};`
}

onMounted(() => {
  bannerStore.fetchBanner()
})

const mainBannerStyle = computed(() =>
  toBgStyle(banner.value?.main, 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%)'),
)

const rightBannersMeta = [
  { href: '/products?category=camera', gradient: 'linear-gradient(135deg, #7C3AED, #5B21B6)', field: 'left', index: 0 },
  { href: '/products?category=router', gradient: 'linear-gradient(135deg, #0891B2, #0E7490)', field: 'left', index: 1 },
  { href: '/products?category=switch', gradient: 'linear-gradient(135deg, #1D4ED8, #1E40AF)', field: 'right', index: 0 },
  { href: '/products?category=nas', gradient: 'linear-gradient(135deg, #7C3AED, #6D28D9)', field: 'right', index: 1 },
  { href: '/products?category=laptop', gradient: 'linear-gradient(135deg, #334155, #1E293B)', field: 'right', index: 2 },
  { href: '/products?category=accessories', gradient: 'linear-gradient(135deg, #D97706, #B45309)', field: 'right', index: 3 },
] as const

const sideBanners = computed(() =>
  rightBannersMeta.map((m) => ({
    href: m.href,
    style: toBgStyle(banner.value?.[m.field]?.[m.index], m.gradient),
  })),
)

const HERO_SWIPER_SLIDES_PER_VIEW = 4

// Swiper's loop mode needs at least slidesPerView * 2 slides to loop smoothly,
// so repeat the banner list until there's enough buffer for a seamless infinite loop.
const loopSideBanners = computed(() => {
  const banners = sideBanners.value
  if (!banners.length) return []
  const minSlides = HERO_SWIPER_SLIDES_PER_VIEW * 3
  const repeated = []
  for (let i = 0; repeated.length < minSlides; i++) {
    const b = banners[i % banners.length]
    repeated.push({ ...b, key: `${b.href}-${i}` })
  }
  return repeated
})
</script>
