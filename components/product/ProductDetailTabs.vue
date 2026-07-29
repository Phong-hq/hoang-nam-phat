<template>
  <div class="overflow-hidden rounded-xl border border-base-200 bg-white">
    <!-- Tab header -->
    <div class="flex gap-1 overflow-x-auto border-b border-base-200 bg-base-200/40 px-2 scrollbar-none sm:px-4">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="relative flex flex-shrink-0 items-center gap-2 px-4 py-4 text-base font-medium whitespace-nowrap transition-colors sm:px-6"
        :class="
          activeTab === tab.id
            ? 'text-primary after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[3px] after:rounded-full after:bg-primary after:content-[\'\']'
            : 'text-base-content/50 hover:text-base-content'
        "
        @click="activeTab = tab.id"
      >
        <svg v-if="TAB_ICONS[tab.id]" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" :d="TAB_ICONS[tab.id]" />
        </svg>
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab content -->
    <div class="p-6 lg:p-8">
      <template v-for="tab in tabs" :key="tab.id">
        <div v-if="activeTab === tab.id" class="cms-content" v-html="tab.value" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ProductDetail } from '~/types'

const props = defineProps<{ product: ProductDetail }>()

const TAB_LABELS: Record<string, string> = {
  info: 'Thông tin sản phẩm',
  specs: 'Thông số kỹ thuật',
}

const TAB_ICONS: Record<string, string> = {
  info: 'M12 16v-4m0-4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z',
  specs: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 7h6m-6 4h6',
}

const TAB_ORDER = ['info', 'specs']

const tabs = computed(() =>
  (props.product.additional_data ?? [])
    .filter((item) => item.value)
    .map((item) => ({ id: item.name, label: TAB_LABELS[item.name] ?? item.name, value: item.value }))
    .sort((a, b) => TAB_ORDER.indexOf(a.id) - TAB_ORDER.indexOf(b.id)),
)

const activeTab = ref(tabs.value[0]?.id ?? '')
</script>

<style scoped>
/* Nội dung CMS (v-html) không dùng plugin @tailwindcss/typography nên cần style
   trực tiếp để đảm bảo cỡ chữ, khoảng cách và bảng responsive trên mobile.
   Màu/kích thước lấy theo token trong tailwind.config.ts (primary, base-content, base-200). */
.cms-content {
  font-size: 1.0625rem;
  line-height: 1.625;
  color: rgba(31, 41, 55, 0.8);
}

.cms-content :deep(h1),
.cms-content :deep(h2),
.cms-content :deep(h3),
.cms-content :deep(h4) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
  color: #1f2937;
}
.cms-content :deep(h1:first-child),
.cms-content :deep(h2:first-child),
.cms-content :deep(h3:first-child),
.cms-content :deep(h4:first-child) {
  margin-top: 0;
}
.cms-content :deep(h3) {
  font-size: 1.5rem;
}
.cms-content :deep(h4) {
  font-size: 1.25rem;
}

.cms-content :deep(p) {
  margin-bottom: 1rem;
}

.cms-content :deep(strong) {
  font-weight: 600;
  color: #1f2937;
}

.cms-content :deep(a) {
  color: #e52020;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.cms-content :deep(a:hover) {
  color: rgba(229, 32, 32, 0.8);
}

.cms-content :deep(ul),
.cms-content :deep(ol) {
  margin-bottom: 1rem;
  margin-left: 1.25rem;
}
.cms-content :deep(li + li) {
  margin-top: 0.375rem;
}
.cms-content :deep(ul) {
  list-style-type: disc;
}
.cms-content :deep(ol) {
  list-style-type: decimal;
}

.cms-content :deep(img) {
  margin: 1rem 0;
  height: auto;
  max-width: 100%;
  border-radius: 0.5rem;
}

.cms-content :deep(figure.table) {
  margin: 1rem 0;
  overflow-x: auto;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}
.cms-content :deep(figure.table table) {
  margin: 0;
  width: 100%;
  min-width: 420px;
  border-collapse: collapse;
  text-align: left;
}
.cms-content :deep(figure.table td) {
  padding: 0.75rem 1rem;
  vertical-align: top;
  color: rgba(31, 41, 55, 0.8);
  width: auto !important;
}
.cms-content :deep(figure.table tr) {
  border-bottom: 1px solid #e5e7eb;
}
.cms-content :deep(figure.table tr:last-child) {
  border-bottom: none;
}
.cms-content :deep(figure.table td:first-child) {
  width: 40% !important;
  background-color: #f5f7fa;
  font-weight: 500;
  color: #1f2937;
}
</style>
