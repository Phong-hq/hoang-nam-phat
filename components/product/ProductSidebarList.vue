<template>
  <aside class="hidden lg:block w-72 flex-shrink-0 sticky top-[var(--header-height)] z-10">
    <div class="bg-white rounded-2xl border border-base-200 shadow-sm overflow-hidden">
      <!-- Accent bar -->
      <div class="h-1 bg-gradient-to-r from-primary to-red-500" />

      <!-- Header -->
      <div class="flex items-center justify-between gap-2 px-4 pt-4 pb-3">
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-red-600 text-white shadow-sm flex-shrink-0">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.176 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1.005a.75.75 0 00.917-.878 2.25 2.25 0 013.198-2.677.75.75 0 001.007-.918c.15-.44.407-.836.766-1.156a3.75 3.75 0 011.292 4.796z"
              />
            </svg>
          </span>
          <div class="min-w-0">
            <h3 class="font-bold text-sm text-base-content leading-tight truncate">{{ title }}</h3>
            <p v-if="subtitle" class="text-[11px] text-base-content/50 truncate">{{ subtitle }}</p>
          </div>
        </div>
        <NuxtLink
          v-if="viewMoreLink"
          :to="viewMoreLink"
          class="flex items-center gap-0.5 text-xs font-semibold text-primary hover:underline flex-shrink-0"
        >
          Xem thêm
          <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            />
          </svg>
        </NuxtLink>
      </div>

      <!-- List -->
      <div class="flex flex-col gap-1.5 px-3 pb-3">
        <template v-if="items.length">
          <NuxtLink
            v-for="(item, index) in items"
            :key="item.id"
            :to="`/products/${item.slug}`"
            class="group relative flex gap-3 rounded-xl border border-transparent p-2 transition-all hover:border-primary/30 hover:bg-primary/[0.03]"
            @click="emit('select', item.raw ?? item)"
          >
            <div class="relative w-16 h-16 flex-shrink-0 bg-base-100 rounded-lg overflow-hidden">
              <span
                v-if="showRank"
                class="absolute -left-1.5 -top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow"
                :class="rankBadgeClass(index)"
              >
                {{ index + 1 }}
              </span>
              <span
                v-if="discountPercent(item)"
                class="absolute right-0 top-0 z-10 rounded-bl-md rounded-tr-lg bg-red-500 px-1 py-0.5 text-[9px] font-bold text-white"
              >
                -{{ discountPercent(item) }}%
              </span>
              <NuxtImg
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                width="64"
                height="64"
                loading="lazy"
                class="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-6 h-6 text-base-content/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div class="min-w-0 flex-1 py-0.5">
              <p class="text-xs font-medium text-base-content leading-snug line-clamp-2 transition-colors group-hover:text-primary">
                {{ item.name }}
              </p>
              <div class="mt-1.5 flex flex-wrap items-baseline gap-1.5">
                <span class="text-sm font-bold text-primary leading-tight">{{ formatCurrency(item.price) }}</span>
                <span
                  v-if="item.comparePrice && item.comparePrice > item.price"
                  class="text-[11px] text-base-content/40 line-through leading-tight"
                >
                  {{ formatCurrency(item.comparePrice) }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </template>

        <p v-else class="py-6 text-center text-xs text-base-content/40">
          {{ emptyText }}
        </p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils'

export interface SidebarProductItem {
  id: number
  slug: string
  name: string
  image?: string
  price: number
  comparePrice?: number | null
  // Original record, forwarded via the `select` event (e.g. to prime a store cache before navigation)
  raw?: unknown
}

withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    viewMoreLink?: string
    items: SidebarProductItem[]
    emptyText?: string
    showRank?: boolean
  }>(),
  {
    subtitle: undefined,
    viewMoreLink: undefined,
    emptyText: 'Chưa có sản phẩm',
    showRank: false,
  },
)

const emit = defineEmits<{ select: [item: unknown] }>()

const RANK_STYLES = [
  'bg-gradient-to-br from-amber-400 to-amber-600',
  'bg-gradient-to-br from-slate-300 to-slate-500',
  'bg-gradient-to-br from-orange-400 to-orange-700',
]

function rankBadgeClass(index: number) {
  return RANK_STYLES[index] ?? 'bg-base-content/30'
}

function discountPercent(item: SidebarProductItem) {
  if (!item.comparePrice || item.comparePrice <= item.price) return null
  return Math.round(((item.comparePrice - item.price) / item.comparePrice) * 100)
}
</script>
