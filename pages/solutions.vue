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

    <!-- Solutions content (CMS HTML) + best-selling sidebar -->
    <div class="container mx-auto px-4 py-8">
      <div class="flex gap-8 items-start">
        <!-- Main content -->
        <div class="flex-1 min-w-0">
          <div v-if="solutionsInfo?.info" class="bg-white rounded-2xl border border-gray-200 shadow p-5 sm:p-8">
            <div class="cms-content" v-html="solutionsInfoHtml" />
          </div>
        </div>

        <!-- Right sidebar: best-selling products (desktop only) -->
        <ProductSidebarList
          title="Sản phẩm bán chạy"
          subtitle="Được yêu thích nhất"
          view-more-link="/products"
          :items="bestSellingSidebarItems"
          show-rank
          empty-text="Chưa có sản phẩm bán chạy"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSolutionsPageStore } from '~/stores/solutionsPage'
import { resolveOembedTags } from '~/utils'
import { useBestSelling } from '~/composables/useBestSelling'
import type { BestSellingRecordWithPricing } from '~/types'
import type { SidebarProductItem } from '~/components/product/ProductSidebarList.vue'

useSeo({
  title: 'Giải pháp công nghệ',
  description:
    'Hoàng Nam Phát cung cấp giải pháp mạng, camera quan sát và công nghệ toàn diện cho doanh nghiệp và gia đình. Tư vấn – triển khai – bảo trì chuyên nghiệp.',
})

const solutionsPageStore = useSolutionsPageStore()
const { solutionsInfo } = storeToRefs(solutionsPageStore)
const solutionsInfoHtml = computed(() => (solutionsInfo.value?.info ? resolveOembedTags(solutionsInfo.value.info) : ''))

const { fetchBestSellingProducts } = useBestSelling()
const bestSellingProducts = ref<BestSellingRecordWithPricing[]>([])

const bestSellingSidebarItems = computed<SidebarProductItem[]>(() =>
  bestSellingProducts.value.map((record) => ({
    id: record.product.id,
    slug: record.product.slug,
    name: record.product.name,
    image: record.product.images[0],
    price: record.unitPrice,
    comparePrice: record.comparePrice,
  })),
)

onMounted(async () => {
  solutionsPageStore.fetchSolutionsInfo()
  bestSellingProducts.value = await fetchBestSellingProducts()
})
</script>
