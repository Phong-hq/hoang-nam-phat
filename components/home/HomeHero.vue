<template>
  <section class="bg-[#0F172A] pt-0 lg:min-h-[calc(var(--category-menu-height,380px)_+_24px)]">
    <div v-if="banner" class="container mx-auto px-4 lg:h-[calc(var(--category-menu-height,380px)_+_4px)] max-w-screen-xl">

      <!-- Mobile / tablet layout: main banner swiper with dots, then the side banners
           stacked vertically (2 columns on tablet). The fixed desktop height only
           applies at lg+, so the stack grows with its content instead of overflowing
           into the next section. -->
      <div class="flex flex-col gap-3 py-3 lg:hidden">
        <ClientOnly>
          <Swiper
            :modules="mobileMainSwiperModules"
            :autoplay="mainAutoplay"
            :loop="mainBannerStyles.length > 1"
            :pagination="mainBannerStyles.length > 1 ? { clickable: true } : false"
            class="hero-mobile-main w-full rounded-xl overflow-hidden aspect-[1.52] shadow-lg"
          >
            <SwiperSlide v-for="(style, i) in mainBannerStyles" :key="i">
              <NuxtLink
                to="/products"
                aria-label="Thiết bị mạng và camera chính hãng Hoàng Nam Phát"
                class="relative block w-full h-full"
                :style="style"
              />
            </SwiperSlide>
          </Swiper>
          <template #fallback>
            <NuxtLink
              to="/products"
              aria-label="Thiết bị mạng và camera chính hãng Hoàng Nam Phát"
              class="relative block rounded-xl overflow-hidden aspect-[1.52]"
              :style="mainBannerStyles[0]"
            />
          </template>
        </ClientOnly>
        <div v-if="sideBanners.length" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <NuxtLink
            v-for="b in sideBanners"
            :key="b.href"
            :to="b.href"
            class="block rounded-lg overflow-hidden aspect-[3.21] shadow-md active:opacity-80 transition-opacity"
            :style="b.style"
          />
        </div>
      </div>

      <!-- Desktop layout (lg+): main banner left, vertical banner list right -->
      <div class="hidden lg:flex gap-2.5 h-full pt-4">

        <!-- Reserved space, same width as the header's category dropdown (w-72), so opening
             it from the nav above lands into this gap instead of covering the banner image -->
        <div class="w-72 flex-shrink-0" />

        <div class="flex-1 min-w-0 grid grid-cols-3 gap-2.5">

          <!-- Large hero banner: height matches the header's category dropdown, so it fills
               the same vertical space the reserved gap on its left occupies -->
          <div class="col-span-2 relative rounded-xl overflow-hidden group h-full">
            <ClientOnly>
              <Swiper
                :modules="mainSwiperModules"
                :autoplay="mainAutoplay"
                :loop="mainBannerStyles.length > 1"
                class="h-full w-full"
              >
                <SwiperSlide v-for="(style, i) in mainBannerStyles" :key="i">
                  <NuxtLink
                    to="/products"
                    aria-label="Thiết bị mạng và camera chính hãng Hoàng Nam Phát"
                    class="block w-full h-full"
                    :style="style"
                  />
                </SwiperSlide>
              </Swiper>
              <template #fallback>
                <NuxtLink
                  to="/products"
                  aria-label="Thiết bị mạng và camera chính hãng Hoàng Nam Phát"
                  class="block w-full h-full"
                  :style="mainBannerStyles[0]"
                />
              </template>
            </ClientOnly>
          </div>

          <!-- Right column: single vertical list, 4 visible at a time, 1 image per slide transition -->
          <div class="relative h-full">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import { useBannerStore } from '~/stores/banner.store'

const heroSwiperModules = [Autoplay]
const heroAutoplay = { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }

const mainSwiperModules = [Autoplay]
const mainAutoplay = { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }
const mobileMainSwiperModules = [Autoplay, Pagination]

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

// `main` is now a list of images -- always render at least one slide (a
// gradient placeholder) so the swiper never ends up with zero slides.
const mainBannerStyles = computed(() => {
  const fallbackGradient = 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%)'
  const images = banner.value?.main ?? []
  return images.length ? images.map((img) => toBgStyle(img, fallbackGradient)) : [toBgStyle(undefined, fallbackGradient)]
})

const rightBannersMeta = [
  { href: '/products?category=camera', gradient: 'linear-gradient(135deg, #7C3AED, #5B21B6)', field: 'left', index: 0 },
  { href: '/products?category=router', gradient: 'linear-gradient(135deg, #0891B2, #0E7490)', field: 'left', index: 1 },
  { href: '/products?category=switch', gradient: 'linear-gradient(135deg, #1D4ED8, #1E40AF)', field: 'right', index: 0 },
  { href: '/products?category=nas', gradient: 'linear-gradient(135deg, #7C3AED, #6D28D9)', field: 'right', index: 1 },
  { href: '/products?category=laptop', gradient: 'linear-gradient(135deg, #334155, #1E293B)', field: 'right', index: 2 },
  { href: '/products?category=accessories', gradient: 'linear-gradient(135deg, #D97706, #B45309)', field: 'right', index: 3 },
] as const

// A slot the CMS left without an image would render as a bare gradient block
// (e.g. the orange accessories one) -- only list the banners that have a photo.
const sideBanners = computed(() =>
  rightBannersMeta
    .filter((m) => !!banner.value?.[m.field]?.[m.index])
    .map((m) => ({
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

<style scoped>
.hero-mobile-main :deep(.swiper-pagination) {
  bottom: 8px;
}

.hero-mobile-main :deep(.swiper-pagination-bullet) {
  width: 6px;
  height: 6px;
  margin: 0 3px;
  background: #fff;
  opacity: 0.55;
  transition: width 0.25s, opacity 0.25s;
}

.hero-mobile-main :deep(.swiper-pagination-bullet-active) {
  width: 18px;
  border-radius: 3px;
  opacity: 1;
}
</style>
