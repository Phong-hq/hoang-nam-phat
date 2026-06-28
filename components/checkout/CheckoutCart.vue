<template>
  <div class="bg-white rounded-2xl shadow-sm border border-base-200 overflow-hidden">
    <div class="px-5 py-4 border-b border-base-200 flex items-center justify-between">
      <h3 class="font-bold text-base text-base-content">
        Giỏ hàng
        <span class="ml-1.5 text-sm font-medium text-base-content/40">({{ items.length }} sản phẩm)</span>
      </h3>
      <NuxtLink to="/products" class="text-xs text-primary hover:underline font-medium">
        + Thêm sản phẩm
      </NuxtLink>
    </div>

    <div class="px-5 divide-y divide-base-100">
      <CheckoutItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @update-quantity="updateQuantity"
        @remove="removeItem"
      />
    </div>

    <div v-if="items.length === 0" class="px-5 py-10 text-center">
      <svg class="w-12 h-12 mx-auto text-base-content/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <p class="text-sm text-base-content/40">Giỏ hàng trống</p>
      <NuxtLink to="/products" class="btn btn-primary btn-sm mt-3">Mua sắm ngay</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { items, updateQuantity, removeItem } = useCheckout()
</script>
