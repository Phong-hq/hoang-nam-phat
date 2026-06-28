<template>
  <div class="products-page bg-page-bg min-h-screen">
    <div class="container mx-auto px-4 py-8 bg-page-bg">
      <h1 class="text-3xl font-bold mb-8">Tất cả sản phẩm</h1>

      <div class="flex gap-6 items-start">
        <!-- Product grid -->
        <div class="flex-1 min-w-0">
          <!-- Mobile category filter toggle -->
          <div class="lg:hidden mb-4">
            <button
              class="flex items-center gap-2 text-sm font-medium text-base-content border border-base-200 rounded-lg px-3 py-2 bg-white shadow-sm"
              @click="mobileFilterOpen = !mobileFilterOpen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Lọc theo danh mục
              <span v-if="selectedCategories.length" class="badge badge-primary badge-sm">{{ selectedCategories.length }}</span>
            </button>
            <div v-if="mobileFilterOpen" class="mt-2">
              <ProductCategoryFilter
                v-model="selectedCategories"
                :categories="categories"
                @update:model-value="handleCategoryChange"
              />
            </div>
          </div>

          <div v-if="pending" class="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <BaseSkeleton v-for="i in 6" :key="i" class="h-64" />
          </div>

          <template v-else>
            <div v-if="products.length === 0" class="py-16 text-center text-base-content/50">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p class="font-medium">Không có sản phẩm nào</p>
              <button class="mt-2 text-sm text-primary hover:underline" @click="handleCategoryChange([])">
                Xóa bộ lọc
              </button>
            </div>

            <div v-else class="grid grid-cols-2 lg:grid-cols-3 gap-6">
              <NuxtLink
                v-for="product in products"
                :key="product.id"
                :to="`/products/${product.slug}`"
                class="card bg-white border border-base-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden"
              >
                <figure class="aspect-square overflow-hidden bg-base-200">
                  <NuxtImg
                    v-if="product.thumbnail"
                    :src="product.thumbnail"
                    :alt="product.name"
                    width="300"
                    height="300"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 50vw, 300px"
                    class="w-full h-full object-cover"
                  />
                </figure>
                <div class="card-body p-4">
                  <h2 class="card-title text-sm line-clamp-2">{{ product.name }}</h2>
                  <p class="text-primary font-bold">{{ formatCurrency(product.price) }}</p>
                  <p v-if="product.originalPrice" class="text-sm line-through text-base-content/50">
                    {{ formatCurrency(product.originalPrice) }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </template>

          <div v-if="pagination && pagination.totalPages > 1" class="flex justify-center mt-8">
            <BasePagination
              :current-page="pagination.currentPage"
              :total-pages="pagination.totalPages"
              @change="handlePageChange"
            />
          </div>
        </div>

        <!-- Right sidebar: filter + contact -->
        <aside class="hidden lg:flex flex-col gap-3 w-60 flex-shrink-0 sticky top-24">
          <!-- Category filter -->
          <ProductCategoryFilter
            v-model="selectedCategories"
            :categories="categories"
            @update:model-value="handleCategoryChange"
          />

          <!-- Contact header -->
          <!-- <div class="bg-primary rounded-xl px-4 py-3">
            <p class="text-white font-bold text-sm">Tư vấn miễn phí</p>
            <p class="text-white/80 text-xs mt-0.5">Liên hệ ngay để được hỗ trợ</p>
          </div> -->

          <!-- Phone -->
       
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils'
import type { PaginatedResponse, ProductListItem } from '~/types'

useSeo({
  title: 'Tat ca san pham',
  description: 'Kham pha hang ngan san pham cong nghe chinh hang tai Hoang Nam Phat.',
})

const route = useRoute()
const router = useRouter()

const mobileFilterOpen = ref(false)

const selectedCategories = ref<string[]>(
  route.query.category ? String(route.query.category).split(',').filter(Boolean) : [],
)

const page = ref(Number(route.query.page) || 1)

const { data: categoriesData } = await useAsyncData(
  'product-categories',
  () => $fetch<Array<{ slug: string; label: string }>>('/api/categories'),
)

const categories = computed(() => categoriesData.value ?? [])

const { data, pending } = await useAsyncData(
  'products-list',
  () => {
    const params: Record<string, string> = { page: String(page.value) }
    if (selectedCategories.value.length) {
      params.category = selectedCategories.value.join(',')
    }
    return $fetch<PaginatedResponse<ProductListItem>>('/api/products', { params })
  },
  { watch: [page, selectedCategories] },
)

const products = computed(() => data.value?.data ?? [])
const pagination = computed(() => data.value?.meta ?? null)

function handleCategoryChange(cats: string[]) {
  selectedCategories.value = cats
  page.value = 1
  mobileFilterOpen.value = false
  const query: Record<string, string> = {}
  if (cats.length) query.category = cats.join(',')
  router.replace({ query })
}

function handlePageChange(p: number) {
  page.value = p
  const query: Record<string, string> = {}
  if (p > 1) query.page = String(p)
  if (selectedCategories.value.length) query.category = selectedCategories.value.join(',')
  router.replace({ query })
}
</script>
