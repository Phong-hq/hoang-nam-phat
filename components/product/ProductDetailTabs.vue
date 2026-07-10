<template>
  <div class="bg-white rounded-xl border border-base-200 overflow-hidden">
    <!-- Tab header -->
    <div class="flex border-b border-base-200 overflow-x-auto scrollbar-none">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="relative px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0"
        :class="
          activeTab === tab.id
            ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:content-[\'\']'
            : 'text-base-content/50 hover:text-base-content'
        "
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab content -->
    <div class="p-6 lg:p-8">
      <!-- Mô tả sản phẩm -->
      <template v-if="activeTab === 'description'">
        <div
          v-if="product.description"
          class="prose prose-sm lg:prose-base max-w-none text-base-content/80"
          v-html="product.description"
        />
        <p v-else class="text-center text-base-content/40 text-sm py-12">
          Chưa có mô tả sản phẩm
        </p>
      </template>

      <!-- Thông số kỹ thuật (tạm thời ẩn) -->
      <template v-if="activeTab === 'specs'">
        <div v-if="product.specifications" class="prose prose-sm max-w-none" v-html="product.specifications" />
        <p v-else class="text-center text-base-content/40 text-sm py-12">
          Chưa có thông số kỹ thuật
        </p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductDetail } from '~/types'

defineProps<{ product: ProductDetail }>()

const tabs = [
  { id: 'description', label: 'Mô tả sản phẩm' },
  // Thông số kỹ thuật tạm thời ẩn
  // { id: 'specs', label: 'Thông số kỹ thuật' },
]

const activeTab = ref('description')
</script>
