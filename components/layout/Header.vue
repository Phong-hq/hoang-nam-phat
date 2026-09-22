<template>
  <div ref="headerRoot" class="sticky top-0 z-40 shadow-md">

    <!-- Top announcement bar -->
    <div class="bg-[#8b0000] text-white py-1 sm:py-1.5 text-xs sm:text-sm overflow-hidden">
      <div class="flex w-max items-center whitespace-nowrap animate-marquee">
        <span class="flex items-center gap-8 pr-8 shrink-0 text-red-200">
          <span>Giải pháp kết nối toàn diện cho doanh nghiệp &amp; gia đình</span>
          <span aria-hidden="true">•</span>
          <span>Giờ làm việc: {{ workingHourDisplay }}</span>
          <span aria-hidden="true">•</span>
          <span>Email: {{ emailDisplay }}</span>
          <span aria-hidden="true">•</span>
          <a :href="phoneHref" class="flex items-center gap-1 sm:gap-1.5 font-semibold hover:text-yellow-300 transition-colors">
            <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {{ phoneDisplay }} – Mua hàng online
          </a>
        </span>
        <span class="flex items-center gap-8 pr-8 shrink-0 text-red-200" aria-hidden="true">
          <span>Giải pháp kết nối toàn diện cho doanh nghiệp &amp; gia đình</span>
          <span>•</span>
          <span>Giờ làm việc: {{ workingHourDisplay }}</span>
          <span>•</span>
          <span>Email: {{ emailDisplay }}</span>
          <span>•</span>
          <span class="flex items-center gap-1 sm:gap-1.5 font-semibold">
            <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {{ phoneDisplay }} – Mua hàng online
          </span>
        </span>
      </div>
    </div>

    <!-- Main header: logo + search + cart + phone -->
    <header class="relative z-30 bg-white border-b border-gray-200">
      <div class="container mx-auto px-3 sm:px-4 py-2 md:py-1.5  max-w-screen-xl">

        <!-- Brand row: logo is the visual anchor, cart alongside it -->
        <div class="flex items-center gap-4">

          <!-- Logo image -->
          <NuxtLink to="/" class="flex-shrink-0">
            <img
              src="~/assets/images/hnp.png"
              alt="Logo Công ty Công nghệ Hoàng Nam Phát"
              class="h-[4.5rem] sm:h-[5.25rem] md:h-24 lg:h-24 w-auto object-contain"
            />
          </NuxtLink>

          <!-- Search bar: inline, centered, desktop/tablet only -->
          <div class="hidden md:block relative flex-1 min-w-0 max-w-[55%] mx-auto">
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
              <div class="relative" :class="{ 'animate-cart-bump': isCartBumping }">
                <svg
                  class="w-6 h-6 md:w-7 md:h-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <Transition name="cart-count">
                  <span
                    v-if="totalQuantity > 0"
                    :key="totalQuantity"
                    class="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none"
                  >
                    {{ totalQuantity }}
                  </span>
                </Transition>
              </div>
              <div class="hidden lg:block text-left">
                <p class="text-xs text-gray-400 leading-none">Giỏ hàng</p>
                <p class="text-base font-bold text-gray-800 leading-tight">{{ formatCurrency(subtotal) }}</p>
              </div>
            </NuxtLink>

            <!-- Menu trigger, mobile only -- sits right of the cart -->
            <button
              type="button"
              class="md:hidden flex-shrink-0 p-1 text-gray-700"
              aria-label="Mở menu"
              @click="isMenuOpen = true"
            >
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <!-- Hotline -->
            <a :href="phoneHref" class="hidden xl:flex items-center gap-2.5">
              <div class="bg-primary/10 rounded-full p-2">
                <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div class="text-left">
                <p class="text-xs text-gray-400 leading-none">Hotline hỗ trợ</p>
                <p class="text-base font-bold text-primary leading-tight">{{ phoneDisplay }}</p>
              </div>
            </a>

          </div>
        </div>

        <!-- Utility row: search, mobile only -->
        <div class="mt-2 md:hidden">
          <div class="relative">
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
    <nav class="relative z-20 bg-primary hidden md:block" aria-label="Điều hướng chính">
      <div class="container mx-auto px-4 max-w-screen-xl">
        <div class="flex items-center">

          <!-- Category menu with flyout: kept outside the nav-items list below so its
               dropdown/flyout never get clipped by that list's horizontal scroll overflow.
               Click-only (no hover) -- toggle open/close on the button, close on nav-away. -->
          <div class="relative flex-shrink-0">
            <button
              type="button"
              class="flex items-center gap-2 text-white/85 hover:text-white hover:bg-white/15 px-5 py-2.5 text-base font-medium whitespace-nowrap transition-colors"
              :class="{ 'text-white bg-white/20 font-bold': isCategoryMenuOpen }"
              @click="isCategoryMenuOpen = !isCategoryMenuOpen"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Danh mục sản phẩm
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition-all duration-150"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <CommonCategoryMenu
                v-if="isCategoryMenuOpen"
                :ref="onCategoryMenuRef"
                class="absolute left-0 top-full z-50 w-72"
                panel-class="rounded-b-xl shadow-2xl"
                @navigate="isCategoryMenuOpen = false"
              />
            </Transition>
          </div>

          <div class="flex-1 flex justify-center min-w-0">
            <ul class="flex items-center overflow-x-auto">
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
        </div>
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
          <div class="flex-1 overflow-y-auto">
            <div v-if="categoryStore.categories.length" class="border-b border-gray-100">
              <button
                type="button"
                class="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-primary"
                @click="isCategorySectionOpen = !isCategorySectionOpen"
              >
                Danh mục sản phẩm
                <svg
                  class="w-4 h-4 flex-shrink-0 transition-transform"
                  :class="{ 'rotate-180': isCategorySectionOpen }"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul v-if="isCategorySectionOpen" class="pb-2">
                <li v-for="cat in orderedCategories" :key="cat.id">
                  <button
                    v-if="cat.children?.length || cat.brands.length"
                    type="button"
                    class="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-gray-700 active:bg-gray-100"
                    :aria-label="expandedCategoryId === cat.id ? `Thu gọn ${cat.name}` : `Xem danh mục con trong ${cat.name}`"
                    @click="toggleCategory(cat)"
                  >
                    <span class="flex items-center gap-2 min-w-0">
                      <span v-if="iconFor(cat)" class="w-4 h-4 flex-shrink-0 flex items-center justify-center text-primary" v-html="iconFor(cat)" />
                      <span class="truncate">{{ cat.name }}</span>
                    </span>
                    <svg
                      class="w-4 h-4 flex-shrink-0 text-gray-400 transition-transform"
                      :class="{ 'rotate-180': expandedCategoryId === cat.id }"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <NuxtLink
                    v-else
                    :to="`/products?category=${cat.slug}`"
                    class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    @click="isMenuOpen = false"
                  >
                    <span v-if="iconFor(cat)" class="w-4 h-4 flex-shrink-0 flex items-center justify-center text-primary" v-html="iconFor(cat)" />
                    <span class="truncate">{{ cat.name }}</span>
                  </NuxtLink>
                  <!-- Same rule as the desktop flyout: children (sub-categories) take
                       priority over brands when a category has both -- selecting a
                       sub-category is what then surfaces its own brands, on the product
                       list page. -->
                  <ul v-if="(cat.children?.length || cat.brands.length) && expandedCategoryId === cat.id" class="bg-gray-50/70 pb-1">
                    <template v-if="cat.children?.length">
                      <li v-for="child in cat.children" :key="child.id">
                        <NuxtLink
                          :to="`/products?category=${cat.slug}&sub_category=${child.slug}`"
                          class="flex items-center gap-2 pl-8 pr-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                          @click="isMenuOpen = false"
                        >
                          <span class="truncate">{{ child.name }}</span>
                        </NuxtLink>
                        <ul v-if="child.brands.length" class="pb-1">
                          <li v-for="brand in child.brands" :key="brand.id">
                            <NuxtLink
                              :to="`/products?category=${cat.slug}&sub_category=${child.slug}&brand=${brand.id}`"
                              class="flex items-center gap-2 pl-12 pr-4 py-1.5 text-[11px] text-gray-500 hover:bg-gray-100"
                              @click="isMenuOpen = false"
                            >
                              <span class="truncate">{{ brand.name }}</span>
                            </NuxtLink>
                          </li>
                        </ul>
                      </li>
                    </template>
                    <template v-else>
                      <li v-for="brand in cat.brands" :key="brand.id">
                        <NuxtLink
                          :to="`/products?category=${cat.slug}&brand=${brand.id}`"
                          class="flex items-center gap-2 pl-8 pr-4 py-2 text-xs text-gray-600 hover:bg-gray-100"
                          @click="isMenuOpen = false"
                        >
                          <span class="truncate">{{ brand.name }}</span>
                        </NuxtLink>
                      </li>
                    </template>
                    <li>
                      <NuxtLink
                        :to="`/products?category=${cat.slug}`"
                        class="block pl-8 pr-4 py-2 text-xs text-primary font-semibold hover:underline"
                        @click="isMenuOpen = false"
                      >
                        Xem tất cả {{ cat.name }}
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <ul class="py-2">
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
          </div>

          <div class="border-t border-gray-100 p-4">
            <a
              :href="phoneHref"
              class="flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-lg py-3 hover:bg-primary/90 transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Gọi ngay: {{ phoneDisplay }}
            </a>
          </div>
        </aside>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductCatalog } from '~/composables/useProductCatalog'
import { useBusinessStore } from '~/stores/business.store'
import { useCartStore } from '~/stores/cart.store'
import { useCategoryStore } from '~/stores/category.store'
import { formatCurrency } from '~/utils'
import { CATEGORY_ICONS, getCategoryIconByKey } from '~/constants/categoryIcons'
import type { ProductCatalogItem, ProductCategoryMenuItem } from '~/types'

const { totalQuantity, subtotal } = storeToRefs(useCartStore())

// Category menu -- dropdown content lives in CommonCategoryMenu; this component owns the
// click-to-toggle trigger and the mobile drawer's flat/tree list below. Auto-opens on the
// home page and auto-closes when navigating elsewhere, so it doesn't stay stuck open --
// manual click-toggling still works independently in between navigations.
const categoryStore = useCategoryStore()
const isCategoryMenuOpen = ref(false)
const route = useRoute()

watch(() => route.path, (path) => {
  isCategoryMenuOpen.value = path === '/'
}, { immediate: true })

// Measures the open dropdown's real rendered height into --category-menu-height so
// HomeHero can grow its section background just tall enough to fully contain the list
// (it auto-opens there) instead of the list spilling past the banner onto the next section.
let categoryMenuResizeObserver: ResizeObserver | null = null

function onCategoryMenuRef(instance: { $el?: HTMLElement } | null) {
  categoryMenuResizeObserver?.disconnect()
  categoryMenuResizeObserver = null
  const el = instance?.$el
  if (!el) return

  const updateCategoryMenuHeight = () => {
    document.documentElement.style.setProperty('--category-menu-height', `${el.offsetHeight}px`)
  }

  updateCategoryMenuHeight()
  categoryMenuResizeObserver = new ResizeObserver(updateCategoryMenuHeight)
  categoryMenuResizeObserver.observe(el)
}

// Store already holds the display order -- no re-sorting here
const orderedCategories = computed(() => categoryStore.categories)

// Mobile drawer's category tree -- collapsed by default, one category expanded at a time
const isCategorySectionOpen = ref(false)
const expandedCategoryId = ref<number | null>(null)

function toggleCategory(cat: ProductCategoryMenuItem) {
  expandedCategoryId.value = expandedCategoryId.value === cat.id ? null : cat.id
}

// Mobile drawer's category tree -- cat.icon is the icon's key into CATEGORY_ICONS.
// No icon shows when the category carries no recognized key -- no fallback icon.
function iconFor(cat: ProductCategoryMenuItem): string {
  return cat.icon && CATEGORY_ICONS[cat.icon] ? getCategoryIconByKey(cat.icon) : ''
}

onMounted(() => {
  if (!categoryStore.categories.length) categoryStore.fetchCategories()
})

const isCartBumping = ref(false)
let cartBumpTimeout: ReturnType<typeof setTimeout> | null = null

watch(totalQuantity, (newQty, oldQty) => {
  if (newQty <= oldQty) return
  isCartBumping.value = false
  requestAnimationFrame(() => {
    isCartBumping.value = true
    if (cartBumpTimeout) clearTimeout(cartBumpTimeout)
    cartBumpTimeout = setTimeout(() => {
      isCartBumping.value = false
    }, 400)
  })
})

const isMenuOpen = ref(false)
watch(isMenuOpen, (open) => {
  if (!open) {
    isCategorySectionOpen.value = false
    expandedCategoryId.value = null
  }
})
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

// Business info -- populated at app startup (see app.vue); fetch here too
// as a guard in case this component ever mounts before that.
const businessStore = useBusinessStore()
const { businessInfo } = storeToRefs(businessStore)

onMounted(() => {
  businessStore.fetchBusinessInfo()
})

const workingHourDisplay = computed(() => businessInfo.value?.working_hour ?? '8:00 - 18:00')
const emailDisplay = computed(() => businessInfo.value?.email ?? 'info.hoangnamphat@gmail.com')
const phoneDisplay = computed(() => businessInfo.value?.phone?.[0] ?? '0937.813.788')
const phoneHref = computed(() => `tel:${(businessInfo.value?.phone?.[0] ?? '0937813788').replace(/\D/g, '')}`)

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  categoryMenuResizeObserver?.disconnect()
  if (searchBlurTimeout) clearTimeout(searchBlurTimeout)
  if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout)
  if (cartBumpTimeout) clearTimeout(cartBumpTimeout)
})

// Search dropdown -- calls the product catalog service directly with the
// typed keyword; no store needed since results aren't shared across the app.
const { fetchProducts } = useProductCatalog()

const searchQuery = ref('')
const isSearchOpen = ref(false)
const isSearchLoading = ref(false)
const searchResults = ref<ProductCatalogItem[]>([])
let searchBlurTimeout: ReturnType<typeof setTimeout> | null = null
let searchDebounceTimeout: ReturnType<typeof setTimeout> | null = null

async function runSearch() {
  isSearchLoading.value = true
  try {
    searchResults.value = await fetchProducts({ keyword: searchQuery.value.trim() })
  } finally {
    isSearchLoading.value = false
  }
}

function openSearch() {
  isSearchOpen.value = true
  if (searchResults.value.length === 0) runSearch()
}

watch(searchQuery, () => {
  if (!isSearchOpen.value) return
  if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout)
  searchDebounceTimeout = setTimeout(runSearch, 300)
})

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
  { label: 'Chính sách', href: '/policy',    exact: false },
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

@keyframes cart-bump {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.35) rotate(-8deg);
  }
  60% {
    transform: scale(0.95) rotate(4deg);
  }
  100% {
    transform: scale(1) rotate(0);
  }
}
.animate-cart-bump {
  animation: cart-bump 0.4s ease;
}

.cart-count-enter-active {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}
.cart-count-leave-active {
  transition: transform 0.15s ease, opacity 0.15s ease;
}
.cart-count-enter-from {
  transform: scale(0);
  opacity: 0;
}
.cart-count-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
