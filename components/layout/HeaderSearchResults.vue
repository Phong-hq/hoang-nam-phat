<template>
  <div>
    <div v-if="isLoading" class="p-6 text-center text-sm text-gray-400">
      Đang tải sản phẩm...
    </div>

    <template v-else-if="results.length">
      <p class="px-4 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
        Tất cả sản phẩm
      </p>
      <NuxtLink
        v-for="item in results"
        :key="item.id"
        :to="`/products/${item.slug}`"
        class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
        @click="emit('select')"
      >
        <div class="w-12 h-12 flex-shrink-0 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
          <img
            v-if="item.variants[0]?.images[0] && !brokenImages.has(item.id)"
            :src="item.variants[0].images[0]"
            :alt="item.name"
            class="w-full h-full object-contain"
            @error="brokenImages.add(item.id)"
          />
          <svg v-else class="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-xs text-gray-400">{{ item.brand.name }}</p>
          <p class="text-sm text-gray-800 truncate">{{ item.name }}</p>
        </div>
        <div class="text-right whitespace-nowrap">
          <p v-if="item.compare_price && item.compare_price > item.unit_price" class="text-xs text-gray-400 line-through">
            {{ formatCurrency(item.compare_price) }}
          </p>
          <p class="text-sm font-bold text-primary">{{ formatCurrency(item.unit_price) }}</p>
        </div>
      </NuxtLink>
    </template>

    <div v-else class="p-6 text-center text-sm text-gray-400">
      Không tìm thấy sản phẩm
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatCurrency } from '~/utils'
import type { ProductCatalogItem } from '~/types'

defineProps<{
  isLoading: boolean
  results: ProductCatalogItem[]
}>()

const emit = defineEmits<{ select: [] }>()

const brokenImages = ref(new Set<number>())
</script>
