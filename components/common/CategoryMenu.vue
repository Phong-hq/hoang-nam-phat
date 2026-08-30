<template>
  <div ref="rootRef" @mouseleave="hoveredCat = null">
    <!-- No max-height/scroll here -- the list always renders at its natural full height.
         Rounding/overflow-hidden lives on the list box only, never on the root, so the
         flyout below (a sibling, not a descendant) is free to render outside its bounds. -->
    <div :class="['bg-white overflow-hidden', panelClass]">
      <slot name="header" />
      <div v-if="isCategorySearchable" class="px-2.5 pt-2.5">
        <div class="relative">
          <svg class="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="categorySearch"
            type="text"
            placeholder="Tìm danh mục..."
            class="w-full text-xs border border-gray-200 rounded-lg pl-7 pr-2 py-1.5 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
      <ul class="py-1">
        <li
          v-for="cat in filteredCategories"
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
            @click="$emit('navigate')"
          >
            <span class="flex items-center gap-2 min-w-0">
              <span
                class="w-4 h-4 flex-shrink-0 flex items-center justify-center text-primary"
                v-html="defaultCategoryIcon"
              />
              <span class="truncate font-medium">{{ cat.name }}</span>
            </span>
            <svg
              v-if="cat.brands.length"
              class="w-3.5 h-3.5 flex-shrink-0"
              :class="hoveredCat?.id === cat.id ? 'opacity-80' : 'opacity-25'"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </li>
        <li v-if="isCategorySearchable && !filteredCategories.length" class="px-3.5 py-3 text-xs text-gray-400 text-center">
          Không tìm thấy danh mục
        </li>
      </ul>
    </div>

    <!-- Flyout: sibling of the list box above, positioned relative to the root so it
         escapes the list box's overflow-hidden instead of being clipped by it. -->
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
            v-for="brand in hoveredCat.brands"
            :key="brand.id"
            :to="`/products?category=${hoveredCat.slug}&brand=${brand.id}`"
            class="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            @click="$emit('navigate')"
          >
            <img
              v-if="brand.icon"
              :src="brand.icon"
              :alt="brand.name"
              class="w-5 h-5 flex-shrink-0 object-contain"
            />
            <span class="text-sm text-gray-700 truncate">{{ brand.name }}</span>
          </NuxtLink>
        </div>
        <div class="border-t border-gray-100 mt-3 pt-3">
          <NuxtLink
            :to="`/products?category=${hoveredCat.slug}`"
            class="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
            @click="$emit('navigate')"
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
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCategoryStore } from '~/stores/category.store'
import type { ProductCategoryMenuItem } from '~/types'

withDefaults(defineProps<{ panelClass?: string }>(), {
  panelClass: 'rounded-xl shadow-lg',
})
defineEmits<{ navigate: [] }>()

const CATEGORY_SEARCH_THRESHOLD = 8

const categoryStore = useCategoryStore()
const rootRef = ref<HTMLElement | null>(null)
const hoveredCat = ref<ProductCategoryMenuItem | null>(null)
const hoveredTop = ref(0)
const categorySearch = ref('')

const isCategorySearchable = computed(() => categoryStore.categories.length > CATEGORY_SEARCH_THRESHOLD)

// Menu shows the API order reversed -- copy first, the store array is shared
const orderedCategories = computed(() => [...categoryStore.categories].reverse())

const filteredCategories = computed(() => {
  if (!isCategorySearchable.value || !categorySearch.value.trim()) return orderedCategories.value
  const q = categorySearch.value.trim().toLowerCase()
  return orderedCategories.value.filter((cat) => cat.name.toLowerCase().includes(q))
})

function onCatHover(cat: ProductCategoryMenuItem, event: MouseEvent) {
  if (!cat.brands.length) {
    hoveredCat.value = null
    return
  }
  hoveredCat.value = cat
  const li = event.currentTarget as HTMLElement
  const container = rootRef.value
  hoveredTop.value = container ? li.getBoundingClientRect().top - container.getBoundingClientRect().top : li.offsetTop
}

const defaultCategoryIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>`
</script>
