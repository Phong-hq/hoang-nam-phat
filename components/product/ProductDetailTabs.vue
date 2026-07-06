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
          class="prose prose-sm lg:prose-base max-w-none text-base-content/80"
          v-html="product.description"
        />

        <!-- Điểm nổi bật -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
          <div
            v-for="highlight in highlights"
            :key="highlight.title"
            class="flex items-start gap-3 p-4 rounded-lg bg-base-50 border border-base-200 hover:border-primary/30 transition-colors"
          >
            <div class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg">
              {{ highlight.icon }}
            </div>
            <div>
              <div class="text-sm font-semibold text-base-content">{{ highlight.title }}</div>
              <div class="text-xs text-base-content/55 mt-0.5 leading-relaxed">{{ highlight.desc }}</div>
            </div>
          </div>
        </div>
      </template>

      <!-- Thông số kỹ thuật -->
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

const props = defineProps<{ product: ProductDetail }>()

const tabs = [
  { id: 'description', label: 'Mô tả sản phẩm' },
  { id: 'specs', label: 'Thông số kỹ thuật' },
]

const activeTab = ref('description')

const highlights = computed(() => [
  {
    icon: '🛡️',
    title: 'Bảo hành chính hãng',
    desc: props.product.warranty_description || '12 tháng bảo hành tại trung tâm uỷ quyền toàn quốc',
  },
  { icon: '🚀', title: 'Giao hàng nhanh', desc: 'Giao hàng trong ngày tại TP.HCM, 1–2 ngày toàn quốc' },
  { icon: '↩️', title: 'Đổi trả dễ dàng', desc: '7 ngày đổi trả miễn phí nếu có lỗi từ nhà sản xuất' },
  { icon: '💳', title: 'Trả góp 0%', desc: 'Hỗ trợ trả góp 0% qua thẻ tín dụng và ví điện tử' },
])
</script>
