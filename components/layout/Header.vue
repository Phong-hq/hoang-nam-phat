<template>
  <div ref="headerRoot" class="sticky top-0 z-40 shadow-md">

    <!-- Top announcement bar -->
    <div class="bg-[#8b0000] text-white py-1 sm:py-1.5 text-xs sm:text-sm overflow-hidden">
      <div class="flex w-max items-center whitespace-nowrap animate-marquee">
        <span class="flex items-center gap-8 pr-8 shrink-0 text-red-200">
          <span>Giải pháp kết nối toàn diện cho doanh nghiệp &amp; gia đình</span>
          <span aria-hidden="true">•</span>
          <span>Giờ làm việc: 8:00 - 18:00</span>
          <span aria-hidden="true">•</span>
          <span>Email: info.hoangnamphat@gmail.com</span>
          <span aria-hidden="true">•</span>
          <a href="tel:0937813788" class="flex items-center gap-1 sm:gap-1.5 font-semibold hover:text-yellow-300 transition-colors">
            <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            0937.813.788 – Mua hàng online
          </a>
        </span>
        <span class="flex items-center gap-8 pr-8 shrink-0 text-red-200" aria-hidden="true">
          <span>Giải pháp kết nối toàn diện cho doanh nghiệp &amp; gia đình</span>
          <span>•</span>
          <span>Giờ làm việc: 8:00 - 18:00</span>
          <span>•</span>
          <span>Email: info.hoangnamphat@gmail.com</span>
          <span>•</span>
          <span class="flex items-center gap-1 sm:gap-1.5 font-semibold">
            <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            0937.813.788 – Mua hàng online
          </span>
        </span>
      </div>
    </div>

    <!-- Main header: logo + search + cart + phone -->
    <header class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-3 sm:px-4 py-2 md:py-1.5  max-w-screen-xl">

        <!-- Brand row: logo is the visual anchor, cart alongside it -->
        <div class="flex items-center gap-4">

          <!-- Logo image -->
          <NuxtLink to="/" class="flex-shrink-0">
            <img
              src="~/assets/images/hnp.png"
              alt="Hoàng Nam Phát"
              class="h-[4.5rem] sm:h-[5.25rem] md:h-24 lg:h-36 w-auto object-contain"
            />
          </NuxtLink>

          <!-- Search bar: inline, centered, desktop/tablet only -->
          <div class="hidden md:block relative flex-1 min-w-0 max-w-[60%] mx-auto">
            <div class="flex rounded-lg overflow-hidden border border-gray-300 focus-within:border-primary transition-colors">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                class="flex-1 min-w-0 px-4 py-2.5 text-base outline-none text-gray-700 bg-white placeholder:text-gray-400"
                @focus="openSearch"
                @blur="scheduleCloseSearch"
                @keydown.esc="isSearchOpen = false"
              />
              <button
                class="bg-primary text-white px-5 flex-shrink-0 flex items-center justify-center hover:bg-primary/90 transition-colors"
                aria-label="Tìm kiếm"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <!-- Results dropdown -->
            <div
              v-if="isSearchOpen"
              class="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[28rem] overflow-y-auto z-50"
              @mousedown.prevent="cancelCloseSearch"
            >
              <LayoutHeaderSearchResults
                :is-loading="isSearchLoading"
                :results="searchResults"
                @select="isSearchOpen = false"
              />
            </div>
          </div>

          <!-- Right: Cart + Hotline -->
          <div class="flex items-center gap-4 md:gap-5 ml-auto md:ml-0 flex-shrink-0">

            <!-- Cart -->
            <NuxtLink to="/cart" class="flex items-center gap-2 group">
              <div class="relative">
                <svg
                  class="w-6 h-6 md:w-7 md:h-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  0
                </span>
              </div>
              <div class="hidden lg:block text-left">
                <p class="text-xs text-gray-400 leading-none">Giỏ hàng</p>
                <p class="text-base font-bold text-gray-800 leading-tight">0₫</p>
              </div>
            </NuxtLink>

            <!-- Hotline -->
            <a href="tel:0937813788" class="hidden xl:flex items-center gap-2.5">
              <div class="bg-primary/10 rounded-full p-2">
                <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div class="text-left">
                <p class="text-xs text-gray-400 leading-none">Hotline hỗ trợ</p>
                <p class="text-base font-bold text-primary leading-tight">0937.813.788</p>
              </div>
            </a>

          </div>
        </div>

        <!-- Utility row: menu button + search share one row, mobile only -->
        <div class="flex items-center gap-2 mt-2 md:hidden">
          <button
            type="button"
            class="flex-shrink-0 p-1.5 -ml-1.5 text-gray-700"
            aria-label="Mở menu"
            @click="isMenuOpen = true"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div class="relative flex-1 min-w-0">
            <div class="flex rounded-lg overflow-hidden border border-gray-300 focus-within:border-primary transition-colors">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                class="flex-1 min-w-0 px-4 py-2 text-sm outline-none text-gray-700 bg-white placeholder:text-gray-400"
                @focus="openSearch"
                @blur="scheduleCloseSearch"
                @keydown.esc="isSearchOpen = false"
              />
              <button
                class="bg-primary text-white px-4 flex-shrink-0 flex items-center justify-center hover:bg-primary/90 transition-colors"
                aria-label="Tìm kiếm"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <!-- Results dropdown -->
            <div
              v-if="isSearchOpen"
              class="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[24rem] overflow-y-auto z-50"
              @mousedown.prevent="cancelCloseSearch"
            >
              <LayoutHeaderSearchResults
                :is-loading="isSearchLoading"
                :results="searchResults"
                @select="isSearchOpen = false"
              />
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main site navigation -->
    <nav class="bg-primary hidden md:block" aria-label="Điều hướng chính">
      <div class="container mx-auto px-4">
        <ul class="flex items-center overflow-x-auto justify-center">
          <li v-for="item in navItems" :key="item.label" class="relative">
            <NuxtLink
              :to="item.href"
              class="text-white/85 hover:text-white hover:bg-white/15 px-5 py-2.5 text-base font-medium whitespace-nowrap block transition-colors"
              :exact-active-class="item.exact ? 'text-white bg-white/20 font-bold' : ''"
              active-class="text-white bg-white/20 font-bold"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Mobile menu drawer -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isMenuOpen"
          class="fixed inset-0 z-50 bg-black/50 md:hidden"
          @click="isMenuOpen = false"
        />
      </Transition>
      <Transition name="slide">
        <aside
          v-if="isMenuOpen"
          class="fixed top-0 left-0 z-50 h-full w-72 max-w-[80%] bg-white shadow-xl md:hidden flex flex-col"
        >
          <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <span class="font-bold text-primary">Danh mục</span>
            <button
              type="button"
              aria-label="Đóng menu"
              class="p-2 text-gray-500"
              @click="isMenuOpen = false"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul class="flex-1 overflow-y-auto py-2">
            <li v-for="item in navItems" :key="item.label">
              <NuxtLink
                :to="item.href"
                class="block px-4 py-3 text-gray-700 hover:bg-gray-50"
                :exact-active-class="item.exact ? 'text-primary font-bold bg-primary/5' : ''"
                active-class="text-primary font-bold bg-primary/5"
                @click="isMenuOpen = false"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
          <div class="border-t border-gray-100 p-4">
            <a
              href="tel:0937813788"
              class="flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-lg py-3 hover:bg-primary/90 transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Gọi ngay: 0937.813.788
            </a>
          </div>
        </aside>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useProduct } from '~/composables/useProduct'
import type { ProductListItem } from '~/types'

const isMenuOpen = ref(false)
const headerRoot = ref<HTMLElement | null>(null)

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (!headerRoot.value) return

  const updateHeaderHeight = () => {
    document.documentElement.style.setProperty('--header-height', `${headerRoot.value!.offsetHeight}px`)
  }

  updateHeaderHeight()
  resizeObserver = new ResizeObserver(updateHeaderHeight)
  resizeObserver.observe(headerRoot.value)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  if (searchBlurTimeout) clearTimeout(searchBlurTimeout)
})

// Search dropdown -- UI preview: shows the full product list regardless of
// the typed keyword, so the design can be reviewed before real search is wired up.
const { fetchProducts } = useProduct()

const searchQuery = ref('')
const isSearchOpen = ref(false)
const isSearchLoading = ref(false)
const searchResults = ref<ProductListItem[]>([])
let searchBlurTimeout: ReturnType<typeof setTimeout> | null = null

async function openSearch() {
  isSearchOpen.value = true
  if (searchResults.value.length > 0) return

  isSearchLoading.value = true
  try {
    const res = await fetchProducts()
    searchResults.value = res.data
  } finally {
    isSearchLoading.value = false
  }
}

function scheduleCloseSearch() {
  searchBlurTimeout = setTimeout(() => {
    isSearchOpen.value = false
  }, 150)
}

function cancelCloseSearch() {
  if (searchBlurTimeout) clearTimeout(searchBlurTimeout)
}

const navItems = [
  { label: 'Trang chủ',  href: '/',          exact: true },
  { label: 'Sản phẩm',   href: '/products',  exact: false },
  { label: 'Giải pháp',  href: '/solutions', exact: false },
  { label: 'Tin tức',    href: '/news',      exact: false },
  { label: 'Giới thiệu', href: '/about',     exact: false },
  { label: 'Liên hệ',    href: '/contact',   exact: false },
]
</script>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
.animate-marquee {
  animation: marquee 30s linear infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
