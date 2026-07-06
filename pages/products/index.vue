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
              <span v-if="selectedCategorySlug" class="badge badge-primary badge-sm">1</span>
            </button>
            <div v-if="mobileFilterOpen" class="mt-2">
              <ProductCategoryFilter
                :model-value="selectedCategoryModel"
                :categories="categories"
                @update:model-value="handleCategoryChange"
              />
            </div>
          </div>

          <div v-if="isLoading" class="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <BaseSkeleton v-for="i in 6" :key="i" class="h-64" />
          </div>

          <template v-else>
            <div v-if="products.length === 0" class="py-16 text-center text-base-content/50">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p class="font-medium">Không có sản phẩm nào</p>
              <button v-if="selectedCategorySlug" class="mt-2 text-sm text-primary hover:underline" @click="handleCategoryChange([])">
                Xóa bộ lọc
              </button>
            </div>

            <div v-else class="grid grid-cols-2 lg:grid-cols-3 gap-6">
              <NuxtLink
                v-for="item in products"
                :key="item.id"
                :to="`/products/${item.slug}`"
                class="card bg-white border border-base-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden"
              >
                <figure class="aspect-square overflow-hidden bg-base-200">
                  <NuxtImg
                    v-if="item.variants[0]?.images[0]"
                    :src="item.variants[0].images[0]"
                    :alt="item.name"
                    width="300"
                    height="300"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 50vw, 300px"
                    class="w-full h-full object-cover"
                  />
                </figure>
                <div class="card-body p-4">
                  <span class="badge badge-ghost badge-sm">{{ item.brand.name }}</span>
                  <h2 class="card-title text-sm line-clamp-2">{{ item.name }}</h2>
                  <p class="text-primary font-bold">{{ formatCurrency(item.unit_price) }}</p>
                </div>
              </NuxtLink>
            </div>
          </template>
        </div>

        <!-- Right sidebar: filter -->
        <aside class="hidden lg:flex flex-col gap-3 w-60 flex-shrink-0 sticky top-24">
          <ProductCategoryFilter
            :model-value="selectedCategoryModel"
            :categories="categories"
            @update:model-value="handleCategoryChange"
          />
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatCurrency } from '~/utils'
import { useCategoryStore } from '~/stores/category.store'
import { useProductStore } from '~/stores/product.store'

useSeo({
  title: 'Tat ca san pham',
  description: 'Kham pha hang ngan san pham cong nghe chinh hang tai Hoang Nam Phat.',
})

const route = useRoute()
const router = useRouter()

const categoryStore = useCategoryStore()
const productStore = useProductStore()

const mobileFilterOpen = ref(false)

const initialCategorySlug = route.query.category ?? route.query.category_slug
const selectedCategorySlug = ref<string | null>(
  initialCategorySlug ? String(initialCategorySlug) : null,
)

const categories = computed(() =>
  categoryStore.categories.map((c) => ({ slug: c.slug, label: c.name })),
)

// ProductCategoryFilter is a multi-select checkbox list; the API only takes one
// category_slug, so we treat the most recently toggled slug as the sole selection.
const selectedCategoryModel = computed(() => (selectedCategorySlug.value ? [selectedCategorySlug.value] : []))

function handleCategoryChange(cats: string[]) {
  selectedCategorySlug.value = cats[cats.length - 1] ?? null
  mobileFilterOpen.value = false
  router.replace({ query: selectedCategorySlug.value ? { category: selectedCategorySlug.value } : {} })
}

async function loadProducts() {
  await productStore.fetchProducts({
    type: 'new',
    category_slug: selectedCategorySlug.value ?? undefined,
  })
}

onMounted(loadProducts)
watch(selectedCategorySlug, loadProducts)

const products = computed(() => productStore.products)
const isLoading = computed(() => productStore.isLoading)
</script>
