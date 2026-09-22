<template>
  <div class="bg-[#EEF2F7] min-h-screen">

    <!-- Page banner -->
    <div class="bg-white border-b border-gray-200 py-8">
      <div class="container mx-auto px-4">
        <nav class="text-sm text-gray-400 mb-3 flex items-center gap-1.5">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Trang chủ</NuxtLink>
          <span>/</span>
          <span class="text-gray-600">Chính sách</span>
        </nav>
        <h1 class="heading-1 mb-2">Chính sách</h1>
        <p class="heading-2 max-w-2xl">
          Các chính sách bảo hành, đổi trả, vận chuyển và bảo mật thông tin khi mua hàng tại Hoàng Nam Phát.
        </p>
      </div>
    </div>

    <!-- Policy list (text list, no thumbnail) + best-selling sidebar -->
    <div class="container mx-auto px-4 py-8">
      <div class="flex gap-8 items-start">
        <!-- Main content -->
        <div class="flex-1 min-w-0">
          <div v-if="isLoading" class="bg-white rounded-2xl border border-gray-200 shadow divide-y divide-gray-100">
            <BaseSkeleton v-for="i in 6" :key="i" class="h-20 m-4" />
          </div>

          <template v-else>
            <div v-if="pagedPolicies.length === 0" class="bg-white rounded-2xl border border-gray-200 shadow py-16 text-center text-gray-400">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6m-6-4h6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="font-medium">Chưa có chính sách nào</p>
            </div>

            <div v-else class="bg-white rounded-2xl border border-gray-200 shadow divide-y divide-gray-100 overflow-hidden">
              <NuxtLink
                v-for="item in pagedPolicies"
                :key="item.id"
                :to="`/policy/${item.id}`"
                class="group flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors"
              >
                <div class="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <h2 class="font-bold text-base text-[#0F172A] line-clamp-1 group-hover:text-primary transition-colors">
                    {{ item.title }}
                  </h2>
                  <p v-if="item.description" class="text-sm text-gray-500 line-clamp-1 mt-0.5">
                    {{ item.description }}
                  </p>
                </div>
                <svg class="w-4 h-4 text-gray-300 flex-shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>

            <div v-if="totalPages > 1" class="flex justify-center mt-8">
              <BasePagination :current-page="currentPage" :total-pages="totalPages" @change="handlePageChange" />
            </div>
          </template>
        </div>

        <!-- Right sidebar: best-selling products (desktop only) -->
        <ProductBestSellingSidebar />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { usePolicyPageStore } from '~/stores/policyPage'

useSeo({
  title: 'Chính sách',
  description:
    'Các chính sách bảo hành, đổi trả, vận chuyển và bảo mật thông tin khi mua hàng tại Hoàng Nam Phát.',
})

const route = useRoute()
const router = useRouter()

const policyPageStore = usePolicyPageStore()
const { policyList, isLoading } = storeToRefs(policyPageStore)

// The record API returns the full list in one call (no server-side paging), so
// pagination is applied client-side over the already-fetched list.
const PER_PAGE = 10
const currentPage = ref(Number(route.query.page) || 1)

const totalPages = computed(() => Math.max(1, Math.ceil(policyList.value.length / PER_PAGE)))

const pagedPolicies = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE
  return policyList.value.slice(start, start + PER_PAGE)
})

function handlePageChange(page: number) {
  currentPage.value = page
  router.replace({ query: { ...route.query, page: page > 1 ? String(page) : undefined } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages
})

onMounted(() => {
  policyPageStore.fetchPolicyList()
})
</script>
