<template>
  <section class="bg-[#0F172A] py-4">
    <div class="container mx-auto px-4 max-w-screen-xl">
      <div class="flex gap-3">

        <!-- Category menu with flyout -->
        <div
          class="w-[230px] flex-shrink-0 hidden lg:flex flex-col relative z-30"
          @mouseleave="hoveredCat = null"
        >
          <div class="bg-white rounded-xl overflow-hidden flex flex-col h-full shadow-lg">
            <div class="bg-primary text-white text-sm font-bold px-4 py-3 flex items-center gap-2 flex-shrink-0">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Danh mục sản phẩm
            </div>
            <ul class="flex-1 py-1 overflow-hidden">
              <li
                v-for="cat in categoryStore.categories"
                :key="cat.id"
                @mouseenter="onCatHover(cat, $event)"
              >
                <NuxtLink
                  :to="`/products?category=${cat.slug}`"
                  :class="[
                    'flex items-center justify-between px-3.5 py-[9px] text-sm transition-colors',
                    hoveredCat?.id === cat.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-50',
                  ]"
                >
                  <span class="flex items-center gap-2 min-w-0">
                    <span
                      class="w-4 h-4 flex-shrink-0 flex items-center justify-center text-primary"
                      v-html="defaultCategoryIcon"
                    />
                    <span class="truncate font-medium">{{ cat.name }}</span>
                  </span>
                  <svg
                    v-if="cat.latest_products.length"
                    class="w-3.5 h-3.5 flex-shrink-0"
                    :class="hoveredCat?.id === cat.id ? 'opacity-80' : 'opacity-25'"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Flyout -->
          <Transition
            enter-active-class="transition-all duration-150"
            enter-from-class="opacity-0 translate-x-1"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition-all duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="hoveredCat"
              class="absolute left-full z-50 ml-1 w-72 bg-white shadow-2xl rounded-xl border border-gray-100 p-4"
              :style="{ top: hoveredTop + 'px' }"
            >
              <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span
                  class="w-4 h-4 flex items-center justify-center text-primary"
                  v-html="defaultCategoryIcon"
                />
                {{ hoveredCat.name }}
              </p>
              <div class="grid grid-cols-1 gap-0.5">
                <NuxtLink
                  v-for="item in hoveredCat.latest_products"
                  :key="item.id"
                  :to="`/products/${item.slug}`"
                  class="flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span class="text-sm text-gray-700 truncate">{{ item.name }}</span>
                  <span class="text-xs font-bold text-primary whitespace-nowrap">{{ formatCurrency(item.unit_price) }}</span>
                </NuxtLink>
              </div>
              <div class="border-t border-gray-100 mt-3 pt-3">
                <NuxtLink
                  :to="`/products?category=${hoveredCat.slug}`"
                  class="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
                >
                  Xem tất cả {{ hoveredCat.name }}
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Banner grid -->
        <div class="flex-1 min-w-0" v-if="banner">

          <!-- Mobile / tablet layout: main banner + all banners shown statically (no swiper) -->
          <div class="flex flex-col gap-2.5 lg:hidden">
            <NuxtLink
              to="/products"
              class="relative rounded-xl overflow-hidden aspect-[1.52]"
              :style="mainBannerStyle"
            />
            <div class="grid grid-cols-2 gap-2.5">
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
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import { useCategoryStore } from '~/stores/category.store'
import { useBannerStore } from '~/stores/banner.store'
import { formatCurrency } from '~/utils'
import type { ProductCategoryMenuItem } from '~/types'

const heroSwiperModules = [Autoplay]
const heroAutoplay = { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }

const categoryStore = useCategoryStore()
const bannerStore = useBannerStore()
const hoveredCat = ref<ProductCategoryMenuItem | null>(null)
const hoveredTop = ref(0)

const banner = computed(() => bannerStore.banner)

function toBgStyle(image: string | undefined, fallbackGradient: string) {
  return image
    ? `background: url('${image}') center / 100% 100% no-repeat;`
    : `background: ${fallbackGradient};`
}

function onCatHover(cat: ProductCategoryMenuItem, event: MouseEvent) {
  if (!cat.latest_products.length) {
    hoveredCat.value = null
    return
  }
  hoveredCat.value = cat
  hoveredTop.value = (event.currentTarget as HTMLElement).offsetTop
}

const defaultCategoryIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>`

onMounted(() => {
  if (!categoryStore.categories.length) categoryStore.fetchCategories()
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
