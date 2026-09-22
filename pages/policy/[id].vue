<template>
  <div class="bg-[#EEF2F7] min-h-screen">
    <div v-if="pending" class="container mx-auto px-4 py-8">
      <BaseSkeleton class="h-8 w-1/2 mb-4" />
      <BaseSkeleton class="h-4 w-full mb-2" />
      <BaseSkeleton class="h-64 w-full" />
    </div>

    <template v-else-if="item">
      <!-- Page banner -->
      <div class="bg-white border-b border-gray-200 py-8">
        <div class="container mx-auto px-4">
          <nav class="text-sm text-gray-400 mb-3 flex items-center gap-1.5">
            <NuxtLink to="/" class="hover:text-primary transition-colors">Trang chủ</NuxtLink>
            <span>/</span>
            <NuxtLink to="/policy" class="hover:text-primary transition-colors">Chính sách</NuxtLink>
            <span>/</span>
            <span class="text-gray-600 truncate">{{ item.title }}</span>
          </nav>
          <h1 class="heading-1 mb-2">{{ item.title }}</h1>
          <p v-if="item.description" class="heading-2 max-w-2xl">{{ item.description }}</p>
          <p class="text-xs text-gray-400 mt-3">Cập nhật: {{ formatDate(item.updated_at) }}</p>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <div class="flex gap-8 items-start">
          <!-- Main content -->
          <div class="flex-1 min-w-0">
            <div class="bg-white rounded-2xl border border-gray-200 shadow p-5 sm:p-8">
              <img
                v-if="item.banner"
                :src="item.banner"
                :alt="item.title"
                class="w-full rounded-xl mb-6 object-cover max-h-96"
              />
              <div class="cms-content" v-html="infoHtml" />
            </div>

            <NuxtLink
              to="/policy"
              class="inline-flex items-center gap-1.5 mt-6 text-primary text-sm font-semibold hover:underline"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại danh sách chính sách
            </NuxtLink>
          </div>

          <!-- Right sidebar: best-selling products (desktop only) -->
          <ProductBestSellingSidebar />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePolicyPageStore } from '~/stores/policyPage'
import { formatDate, resolveOembedTags } from '~/utils'

const route = useRoute()
const id = computed(() => Number(route.params.id))

const policyPageStore = usePolicyPageStore()

const { data: item, pending, error } = await useAsyncData(
  `policy-${id.value}`,
  async () => {
    await policyPageStore.fetchPolicyList()
    return policyPageStore.getById(id.value) ?? null
  },
  { watch: [id] },
)

if (error.value || !item.value) {
  throw createError({ statusCode: 404, statusMessage: 'Không tìm thấy chính sách' })
}

useSeo({
  title: item.value.title,
  description: item.value.description ?? undefined,
})

const infoHtml = computed(() => (item.value?.info ? resolveOembedTags(item.value.info) : ''))
</script>
