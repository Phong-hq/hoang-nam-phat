<template>
  <div class="flex items-start gap-3 py-4 group">
    <!-- Thumbnail -->
    <NuxtLink :to="`/products/${item.slug}`" class="flex-shrink-0">
      <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-base-200 bg-base-50 overflow-hidden">
        <NuxtImg
          v-if="item.thumbnail"
          :src="item.thumbnail"
          :alt="item.name"
          width="80"
          height="80"
          loading="lazy"
          class="w-full h-full object-contain p-1.5"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <svg class="w-8 h-8 text-base-content/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </NuxtLink>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <NuxtLink :to="`/products/${item.slug}`" class="text-sm font-semibold text-base-content hover:text-primary transition-colors line-clamp-2 leading-snug">
            {{ item.name }}
          </NuxtLink>
          <div class="flex items-center gap-2 mt-1 flex-wrap">
            <span class="text-sm font-bold text-primary">{{ formatCurrency(item.price) }}</span>
            <span v-if="item.originalPrice" class="text-xs text-base-content/40 line-through">
              {{ formatCurrency(item.originalPrice) }}
            </span>
            <BaseBadge v-if="item.discount" variant="primary">-{{ item.discount }}%</BaseBadge>
          </div>
        </div>

        <!-- Remove -->
        <button
          type="button"
          class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-base-content/30 hover:text-error hover:bg-error/10 transition-colors"
          aria-label="Xoá sản phẩm"
          @click="$emit('remove', item.id)"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Quantity + line total -->
      <div class="flex items-center justify-between mt-3">
        <BaseQuantityInput
          :model-value="item.quantity"
          :min="1"
          :max="99"
          @update:model-value="$emit('update-quantity', item.id, $event)"
        />
        <span class="text-sm font-bold text-base-content">
          {{ formatCurrency(item.price * item.quantity) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils'
import type { CartItem } from '~/types'

defineProps<{ item: CartItem }>()

defineEmits<{
  'update-quantity': [id: number, qty: number]
  remove: [id: number]
}>()
</script>
