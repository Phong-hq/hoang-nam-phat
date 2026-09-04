<template>
  <div class="bg-[#EEF2F7] min-h-screen">

    <!-- Page banner -->
    <div class="bg-white border-b border-gray-200 py-8">
      <div class="container mx-auto px-4">
        <nav class="text-sm text-gray-400 mb-3 flex items-center gap-1.5">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Trang chủ</NuxtLink>
          <span>/</span>
          <span class="text-gray-600">Giải pháp</span>
        </nav>
        <h1 class="heading-1 mb-2">Giải pháp công nghệ</h1>
        <p class="heading-2 max-w-2xl">
          Hoàng Nam Phát cung cấp giải pháp mạng, camera và công nghệ toàn diện cho doanh nghiệp và gia đình – từ tư vấn đến triển khai và bảo trì.
        </p>
      </div>
    </div>

    <!-- Solutions list (blog-style cards) + best-selling sidebar -->
    <div class="container mx-auto px-4 py-8">
      <div class="flex gap-8 items-start">
        <!-- Main content -->
        <div class="flex-1 min-w-0">
          <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <BaseSkeleton v-for="i in 6" :key="i" class="h-80" />
          </div>

          <template v-else>
            <div v-if="pagedSolutions.length === 0" class="bg-white rounded-2xl border border-gray-200 shadow py-16 text-center text-gray-400">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6m-6-4h6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="font-medium">Chưa có bài viết giải pháp nào</p>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <NuxtLink
                v-for="item in pagedSolutions"
                :key="item.id"
                :to="`/solutions/${item.id}`"
                class="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <!-- Thumbnail -->
                <div class="aspect-[16/9] overflow-hidden flex-shrink-0">
                  <img
                    v-if="item.banner"
                    :src="item.banner"
                    :alt="item.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <svg class="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12l-5.204-5.204a1.125 1.125 0 00-1.591 0L9 13" />
                    </svg>
                  </div>
                </div>
                <!-- Content -->
                <div class="p-5 flex flex-col flex-1">
                  <span class="text-xs text-gray-400 mb-2">{{ formatDate(item.created_at) }}</span>
                  <h2 class="font-bold text-base text-[#0F172A] line-clamp-2 leading-snug mb-2 group-hover:text-primary transition-colors">
                    {{ item.title }}
                  </h2>
                  <p v-if="item.description" class="text-sm text-gray-500 line-clamp-2 leading-relaxed flex-1">
                    {{ item.description }}
                  </p>
                  <div class="flex items-center gap-1 mt-4 text-primary text-sm font-semibold">
                    Đọc thêm
                    <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
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
import { useSolutionsPageStore } from '~/stores/solutionsPage'
import { formatDate } from '~/utils'

useSeo({
  title: 'Giải pháp công nghệ',
  description:
    'Hoàng Nam Phát cung cấp giải pháp mạng, camera quan sát và công nghệ toàn diện cho doanh nghiệp và gia đình. Tư vấn – triển khai – bảo trì chuyên nghiệp.',
})

const route = useRoute()
const router = useRouter()

const solutionsPageStore = useSolutionsPageStore()
const { solutionsList, isLoading } = storeToRefs(solutionsPageStore)

// The record API returns the full list in one call (no server-side paging), so
// pagination is applied client-side over the already-fetched list.
const PER_PAGE = 6
const currentPage = ref(Number(route.query.page) || 1)

const totalPages = computed(() => Math.max(1, Math.ceil(solutionsList.value.length / PER_PAGE)))

const pagedSolutions = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE
  return solutionsList.value.slice(start, start + PER_PAGE)
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
  solutionsPageStore.fetchSolutionsList()
})
</script>
