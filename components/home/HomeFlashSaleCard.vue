<template>
  <div class="group bg-white rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 flex flex-col border-2 border-transparent hover:border-primary/20">
    <div class="relative bg-base-100 aspect-square overflow-hidden">
      <span class="absolute top-2 left-2 z-10 bg-primary text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
        -{{ product.discount }}%
      </span>
      <NuxtImg
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        width="300" height="300" loading="lazy"
        class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
      />
      <!-- Sale progress bar -->
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-base-200">
        <div
          class="h-full bg-primary rounded-full transition-all duration-500"
          :style="`width: ${product.soldPercent}%`"
        />
      </div>
    </div>
    <div class="p-3 flex flex-col flex-1">
      <span class="text-[10px] font-bold uppercase tracking-widest text-base-content/40">{{ product.brand }}</span>
      <h3 class="text-sm font-medium text-base-content mt-0.5 line-clamp-2 leading-snug flex-1 min-h-[36px]">
        {{ product.name }}
      </h3>
      <div class="mt-2">
        <div class="text-[11px] text-base-content/40 line-through leading-none mb-0.5">
          {{ formatCurrency(product.originalPrice) }}
        </div>
        <div class="text-base font-extrabold text-primary">{{ formatCurrency(product.price) }}</div>
      </div>
      <div class="flex items-center justify-between mt-1.5 text-[10px] text-base-content/40">
        <span>Đã bán {{ product.soldPercent }}%</span>
        <span class="text-warning font-semibold">Còn {{ 100 - product.soldPercent }}%</span>
      </div>
      <button class="btn btn-primary btn-sm w-full mt-3 text-white font-semibold">Mua ngay</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils'
import type { FlashSaleProduct } from '~/types'

defineProps<{ product: FlashSaleProduct }>()
</script>
