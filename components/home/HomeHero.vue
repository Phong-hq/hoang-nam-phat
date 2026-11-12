<template>
  <section
    class="bg-[#0F172A] pt-0 lg:min-h-[calc(var(--category-menu-height,380px)_+_24px)]"
    :style="{ '--category-menu-height': `${categoryMenuHeight}px` }"
  >
    <div v-if="banner" class="container mx-auto px-4 lg:h-[calc(var(--category-menu-height,380px)_+_4px)] max-w-screen-xl">

      <!-- Mobile / tablet layout: main banner swiper with dots. Tablets also get the side
           banners below it in 2 columns; phones show the main banner only. The fixed desktop
           height only applies at lg+, so the stack grows with its content instead of
           overflowing into the next section. -->
      <div class="flex flex-col gap-3 py-3 lg:hidden">
        <Swiper
          v-if="swiperReady && mainBanners.length > 1"
          :modules="mobileMainSwiperModules"
          :autoplay="mainAutoplay"
          :loop="true"
          :pagination="{ clickable: true }"
          class="hero-mobile-main w-full rounded-xl overflow-hidden aspect-[1.52] shadow-lg"
        >
          <SwiperSlide v-for="(img, i) in mainBanners" :key="i">
            <NuxtLink to="/products" :aria-label="MAIN_LABEL" class="relative block w-full h-full" :style="MAIN_BG">
              <NuxtImg
                v-if="img"
                :src="img"
                :sizes="MAIN_SIZES"
                format="webp"
                :loading="i === 0 ? 'eager' : 'lazy'"
                alt=""
                class="absolute inset-0 w-full h-full object-fill"
              />
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
        <!-- Server HTML + first paint: a plain image (the LCP element). Swiper only takes over
             once the browser is idle, by which time this image is already in cache. -->
        <NuxtLink
          v-else
          to="/products"
          :aria-label="MAIN_LABEL"
          class="relative block rounded-xl overflow-hidden aspect-[1.52] shadow-lg"
          :style="MAIN_BG"
        >
          <NuxtImg
            v-if="mainBanners[0]"
            :src="mainBanners[0]"
            :sizes="MAIN_SIZES"
            format="webp"
            loading="eager"
            fetchpriority="high"
            :preload="{ fetchPriority: 'high' }"
            alt=""
            class="absolute inset-0 w-full h-full object-fill"
          />
        </NuxtLink>
        <div v-if="sideBanners.length" class="hidden sm:grid sm:grid-cols-2 sm:gap-3">
          <NuxtLink
            v-for="b in sideBanners"
            :key="b.href"
            :to="b.href"
            :aria-label="b.label"
            class="relative block rounded-lg overflow-hidden aspect-[3.21] shadow-md active:opacity-80 transition-opacity"
          >
            <NuxtImg :src="b.image" sizes="sm:50vw md:50vw" format="webp" loading="lazy" alt="" class="absolute inset-0 w-full h-full object-fill" />
          </NuxtLink>
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
            <Swiper
              v-if="swiperReady && mainBanners.length > 1"
              :modules="mainSwiperModules"
              :autoplay="mainAutoplay"
              :loop="true"
              class="h-full w-full"
            >
              <SwiperSlide v-for="(img, i) in mainBanners" :key="i">
                <NuxtLink to="/products" :aria-label="MAIN_LABEL" class="relative block w-full h-full" :style="MAIN_BG">
                  <NuxtImg
                    v-if="img"
                    :src="img"
                    :loading="i === 0 ? 'eager' : 'lazy'"
                    alt=""
                    class="absolute inset-0 w-full h-full object-fill"
                  />
                </NuxtLink>
              </SwiperSlide>
            </Swiper>
            <!-- Same src + sizes as the mobile image, so the browser downloads it only once.
                 Lazy: on phones this block is display:none and must not fetch anything. -->
            <NuxtLink v-else to="/products" :aria-label="MAIN_LABEL" class="relative block w-full h-full" :style="MAIN_BG">
              <NuxtImg
                v-if="mainBanners[0]"
                :src="mainBanners[0]" 
                alt=""
                class="absolute inset-0 w-full h-full object-fill"
              /> 
            </NuxtLink>
          </div> 

          <!-- Right column: single vertical list, 4 visible at a time, 1 image per slide transition -->
          <div class="relative h-full">
            <Swiper
              v-if="swiperReady && sideBanners.length"
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
                  :aria-label="b.label"
                  class="relative block w-full h-full rounded-xl overflow-hidden group hover:opacity-90 transition-opacity"
                >
                  <NuxtImg :src="b.image" width="320" format="webp" loading="lazy" alt="" class="absolute inset-0 w-full h-full object-fill" />
                </NuxtLink>
              </SwiperSlide>
            </Swiper>
            <div v-else class="absolute inset-0 flex flex-col gap-2.5">
              <NuxtLink
                v-for="b in sideBanners.slice(0, HERO_SWIPER_SLIDES_PER_VIEW)"
                :key="b.href"
                :to="b.href"
                :aria-label="b.label"
                class="flex-1 relative rounded-xl overflow-hidden"
              >
                <NuxtImg :src="b.image" width="320" format="webp" loading="lazy" alt="" class="absolute inset-0 w-full h-full object-fill" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import { useBannerStore } from '~/stores/banner.store'

const heroSwiperModules = [Autoplay]
const heroAutoplay = { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }

const mainSwiperModules = [Autoplay]
const mainAutoplay = { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }
const mobileMainSwiperModules = [Autoplay, Pagination]

const MAIN_LABEL = 'Thiết bị mạng và camera chính hãng Hoàng Nam Phát'
// Gradient behind the image: shows while it loads, and is the whole banner if the CMS has none.
const MAIN_BG = 'background: linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%);'
// Phones/tablets: full width. Desktop: 2 of 3 grid columns next to the 288px menu (~660px).
// Must be identical in both layouts so both <img> resolve to the same file.
const MAIN_SIZES = 'xs:100vw sm:100vw md:100vw lg:700px'

const bannerStore = useBannerStore()

// Exact height from the server HTML on, so the banner never jumps on hydration.
const categoryMenuHeight = useCategoryMenuHeight()

const banner = computed(() => bannerStore.banner)

// Swiper (+ autoplay) is mounted only once the page has loaded and the browser is idle.
// Until then the server-rendered static image stays on screen, so the LCP image paints
// with the HTML instead of waiting for Swiper's JS to run.
const swiperReady = ref(false)

onMounted(() => {
  bannerStore.fetchBanner()

  const enable = () => {
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void })
      .requestIdleCallback
    if (ric) ric(() => (swiperReady.value = true), { timeout: 3000 })
    else setTimeout(() => (swiperReady.value = true), 200)
  }
  if (document.readyState === 'complete') enable()
  else window.addEventListener('load', enable, { once: true })
})

// `main` is a list of images -- always at least one entry ('' = gradient placeholder)
// so the layout never ends up empty.
const mainBanners = computed(() => {
  const images = (banner.value?.main ?? []).filter(Boolean)
  return images.length ? images : ['']
})

const rightBannersMeta = [
  { href: '/products?category=camera', label: 'Camera quan sát', field: 'left', index: 0 },
  { href: '/products?category=router', label: 'Router', field: 'left', index: 1 },
  { href: '/products?category=switch', label: 'Switch', field: 'right', index: 0 },
  { href: '/products?category=nas', label: 'Thiết bị lưu trữ NAS', field: 'right', index: 1 },
  { href: '/products?category=laptop', label: 'Laptop', field: 'right', index: 2 },
  { href: '/products?category=accessories', label: 'Phụ kiện', field: 'right', index: 3 },
] as const

// A slot the CMS left without an image would render as a bare block -- only list the
// banners that have a photo.
const sideBanners = computed(() =>
  rightBannersMeta
    .filter((m) => !!banner.value?.[m.field]?.[m.index])
    .map((m) => ({
      href: m.href,
      label: m.label,
      image: banner.value![m.field][m.index] as string,
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
