<template>
  <NuxtLink
    :to="product.slug ? `/products/${product.slug}` : ''"
    class="group h-full bg-white rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 flex flex-col border-2 border-transparent hover:border-primary/20"
  >
    <div class="relative bg-base-100 aspect-square overflow-hidden">
      <span
        v-if="product.discount"
        class="absolute top-2 left-2 z-10 bg-primary text-white text-[10px] font-extrabold px-2 py-0.5 rounded"
      >
        -{{ product.discount }}%
      </span>
      <NuxtImg
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        width="300" height="300" loading="lazy"
        class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1 group-hover:drop-shadow-xl"
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
      <h3 class="text-sm font-medium text-base-content mt-0.5 line-clamp-2 leading-snug h-10">
        {{ product.name }}
      </h3>
      <div class="mt-2 min-h-[38px]">
        <div
          class="text-[11px] text-base-content/40 line-through leading-none mb-0.5"
          :class="{ invisible: !product.originalPrice }"
        >
          {{ formatCurrency(product.originalPrice ?? 0) }}
        </div>
        <div class="text-base font-extrabold text-primary">{{ formatPrice(product.price) }}</div>
      </div>
      <div v-if="product.quantity != null" class="flex items-center gap-1 mt-1.5 text-[10px] text-warning font-semibold">
        <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M11.983 1.907a.75.75 0 00-1.292-.657L4.204 10.5H8.75a.75.75 0 01.671 1.086l-2.914 5.834a.75.75 0 001.292.657l6.487-9.25a.75.75 0 00-.671-1.077H9.117l2.866-5.843z" clip-rule="evenodd" />
        </svg>
        Còn {{ product.quantity }} sản phẩm
      </div>
      <div class="flex-1" />
      <!-- Plain span, not a link: the whole card already navigates to the product page
           and nesting an <a> inside an <a> is invalid markup. -->
      <span class="btn btn-primary btn-sm w-full mt-3 text-white font-semibold">
        Mua ngay
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { formatCurrency, formatPrice } from '~/utils'
import type { FlashSaleProduct } from '~/types'

defineProps<{ product: FlashSaleProduct }>()
</script>
