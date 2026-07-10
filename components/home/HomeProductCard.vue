<template>
  <div
    class="group relative bg-white rounded-xl border border-base-200 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col"
  >
    <!-- Image area -->
    <div class="relative bg-base-100 overflow-hidden aspect-square">
      <!-- Discount badge -->
      <span
        v-if="product.discount"
        class="absolute top-2 left-2 z-10 bg-primary text-white text-sm font-extrabold px-2.5 py-1 rounded shadow-md"
      >
        -{{ product.discount }}%
      </span>
      <!-- New badge -->
      <span
        v-if="product.isNew && !product.discount"
        class="absolute top-2 left-2 z-10 bg-success text-white text-[10px] font-bold px-2 py-0.5 rounded"
      >
        Mới
      </span>
      <!-- Wishlist -->
      <button
        class="absolute top-2 right-2 z-10 w-8 h-8 bg-white rounded-full shadow-sm border border-base-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        :class="{ '!opacity-100': wishlisted }"
        @click.prevent="wishlisted = !wishlisted"
        :aria-label="wishlisted ? 'Bỏ yêu thích' : 'Yêu thích'"
      >
        <svg
          class="w-3.5 h-3.5 transition-colors"
          :class="wishlisted ? 'text-primary fill-primary' : 'text-base-content/40 fill-none'"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      <!-- Product image -->
      <NuxtImg
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        width="300"
        height="300"
        loading="lazy"
        class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <svg class="w-16 h-16 text-base-content/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>

    <!-- Info -->
    <div class="p-3 flex flex-col flex-1">
      <span class="text-[10px] font-bold uppercase tracking-widest text-base-content/40">
        {{ product.brand }}
      </span>
      <h3 class="text-sm font-medium text-base-content mt-0.5 line-clamp-2 leading-snug flex-1 min-h-[36px]">
        {{ product.name }}
      </h3>

      <!-- Price -->
      <div class="mt-2">
        <div v-if="product.originalPrice" class="text-[11px] text-base-content/40 line-through leading-none mb-0.5">
          {{ formatCurrency(product.originalPrice) }}
        </div>
        <div class="text-base font-extrabold text-primary leading-tight">
          {{ formatCurrency(product.price) }}
        </div>
      </div>

      <!-- Stock -->
      <div class="mt-1.5 flex items-center gap-1">
        <span
          class="w-1.5 h-1.5 rounded-full flex-shrink-0"
          :class="product.inStock !== false ? 'bg-success' : 'bg-error'"
        />
        <span class="text-[10px]" :class="product.inStock !== false ? 'text-success' : 'text-error'">
          {{ product.inStock !== false ? 'Còn hàng' : 'Hết hàng' }}
        </span>
      </div>

      <!-- CTA -->
      <button
        class="btn btn-primary btn-sm w-full mt-3 text-white font-semibold gap-1.5"
        :disabled="product.inStock === false"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Thêm vào giỏ
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils'
import type { HomeProduct } from '~/types'

defineProps<{ product: HomeProduct }>()

const wishlisted = ref(false)
</script>
