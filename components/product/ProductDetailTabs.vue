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
