<template>
  <div ref="rootRef" @mouseenter="cancelCloseFlyout" @mouseleave="scheduleCloseFlyout">
    <!-- No max-height/scroll here -- the list always renders at its natural full height.
         Rounding/overflow-hidden lives on the list box only, never on the root, so the
         flyout below (a sibling, not a descendant) is free to render outside its bounds. -->
    <div :class="['bg-white overflow-hidden', panelClass]">
      <slot name="header" />
      <ul class="py-1">
        <li
          v-for="cat in orderedCategories"
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
                v-if="iconFor(cat)"
                class="w-4 h-4 flex-shrink-0 flex items-center justify-center"
                :class="hoveredCat?.id === cat.id ? 'text-white' : 'text-primary'"
                v-html="iconFor(cat)"
              />
              <span class="truncate font-medium">{{ cat.name }}</span>
            </span>
            <svg
              v-if="cat.brands.length || cat.children?.length"
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
        class="absolute left-full z-50 ml-1 w-max max-w-[36rem] bg-white shadow-2xl rounded-xl border border-gray-100 p-4"
        :style="{ top: hoveredTop + 'px' }"
      >
        <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span
            v-if="iconFor(hoveredCat)"
            class="w-4 h-4 flex items-center justify-center text-primary"
            v-html="iconFor(hoveredCat)"
          />
          {{ hoveredCat.name }}
        </p>
        <!-- Sub-categories in a row, replacing the parent's brand grid below. Skipped
             past MAX_CHILDREN_IN_ROW, since that many chips no longer fit one line at
             the flyout's max width -- falls back to the plain brand grid instead. -->
        <div
          v-if="showChildrenRow"
          class="flex flex-wrap gap-1.5"
        >
          <NuxtLink
            v-for="child in hoveredCat.children"
            :key="child.id"
            :to="`/products?category=${child.slug}`"
            class="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-colors"
            @click="$emit('navigate')"
          >
            {{ child.name }}
          </NuxtLink>
        </div>
        <div v-else-if="hoveredCat.brands.length" class="grid grid-flow-col grid-rows-5 gap-x-3 gap-y-0.5">
          <NuxtLink
            v-for="brand in hoveredCat.brands"
            :key="brand.id"
            :to="`/products?category=${hoveredCat.slug}&brand=${brand.id}`"
            class="group flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-primary transition-colors"
            @click="$emit('navigate')"
          >
            <span class="text-sm text-gray-700 group-hover:text-white truncate">{{ brand.name }}</span>
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
import { computed, onBeforeUnmount, ref } from 'vue'
import { useCategoryStore } from '~/stores/category.store'
import type { ProductCategoryMenuItem } from '~/types'
import { CATEGORY_ICONS, getCategoryIconByKey } from '~/constants/categoryIcons'

withDefaults(defineProps<{ panelClass?: string }>(), {
  panelClass: 'rounded-xl shadow-lg',
})
defineEmits<{ navigate: [] }>()

const categoryStore = useCategoryStore()
const rootRef = ref<HTMLElement | null>(null)
const hoveredCat = ref<ProductCategoryMenuItem | null>(null)
const hoveredTop = ref(0)
let closeFlyoutTimeout: ReturnType<typeof setTimeout> | null = null

// Roughly how many chips fit one line at the flyout's max width (36rem, minus
// padding) before wrapping -- past this the children row is dropped instead.
const MAX_CHILDREN_IN_ROW = 6

// Store already holds the display order -- no re-sorting here
const orderedCategories = computed(() => categoryStore.categories)

const showChildrenRow = computed(() => {
  const count = hoveredCat.value?.children?.length ?? 0
  return count > 0 && count <= MAX_CHILDREN_IN_ROW
})

// The flyout sits a few pixels to the right of the list (ml-1 gap). Crossing that gap
// slowly moves the pointer off root's rendered box for an instant, firing mouseleave
// before it reaches the flyout. Delay the close briefly so a slow diagonal crossing
// still lands back inside root (list or flyout) in time to cancel it.
function scheduleCloseFlyout() {
  closeFlyoutTimeout = setTimeout(() => {
    hoveredCat.value = null
  }, 200)
}

function cancelCloseFlyout() {
  if (closeFlyoutTimeout) {
    clearTimeout(closeFlyoutTimeout)
    closeFlyoutTimeout = null
  }
}

function onCatHover(cat: ProductCategoryMenuItem, event: MouseEvent) {
  if (!cat.brands.length && !cat.children?.length) {
    hoveredCat.value = null
    return
  }
  hoveredCat.value = cat
  const li = event.currentTarget as HTMLElement
  const container = rootRef.value
  hoveredTop.value = container ? li.getBoundingClientRect().top - container.getBoundingClientRect().top : li.offsetTop
}

// cat.icon is the icon's key into CATEGORY_ICONS. No icon shows at all when
// the category carries no recognized key -- no fallback icon.
function iconFor(cat: ProductCategoryMenuItem): string {
  return cat.icon && CATEGORY_ICONS[cat.icon] ? getCategoryIconByKey(cat.icon) : ''
}

onBeforeUnmount(() => {
  if (closeFlyoutTimeout) clearTimeout(closeFlyoutTimeout)
})
</script>
