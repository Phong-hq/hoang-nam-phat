<template>
  <div class="products-page bg-page-bg min-h-screen">
    <div class="container mx-auto px-4 py-8 bg-page-bg">
      <h1 class="text-3xl font-bold mb-8">Tất cả sản phẩm</h1>

      <div class="flex gap-6 items-start">
        <!-- Product grid -->
        <div class="flex-1 min-w-0">
          <!-- Mobile filter toggle -->
          <div class="lg:hidden mb-4">
            <button
              class="flex items-center gap-2 text-sm font-medium text-base-content border border-base-200 rounded-lg px-3 py-2 bg-white shadow-sm"
              @click="mobileFilterOpen = !mobileFilterOpen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Lọc sản phẩm
              <span v-if="totalSelectedFilters" class="badge badge-primary badge-sm">{{ totalSelectedFilters }}</span>
            </button>
            <div v-if="mobileFilterOpen" class="mt-2 flex flex-col gap-3">
              <ProductFilterGroup
                title="Danh mục"
                :model-value="selectedCategorySlugs"
                :items="categories"
                @update:model-value="handleCategoryChange"
              />
              <ProductFilterGroup
                title="Thương hiệu"
                :model-value="selectedBrandIds"
                :items="brands"
                @update:model-value="handleBrandChange"
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
              <button v-if="totalSelectedFilters" class="mt-2 text-sm text-primary hover:underline" @click="clearAllFilters">
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
                <figure class="relative aspect-square overflow-hidden bg-base-200">
                  <span
                    v-if="getDiscountPercent(item)"
                    class="absolute top-2 left-2 z-10 bg-primary text-white text-xs font-extrabold px-2 py-0.5 rounded shadow-md"
                  >
                    -{{ getDiscountPercent(item) }}%
                  </span>
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
                  <div class="mt-1">
                    <div v-if="item.compare_price && item.compare_price > item.unit_price" class="text-xs text-base-content/40 line-through leading-none mb-0.5">
                      {{ formatCurrency(item.compare_price) }}
                    </div>
                    <p class="text-primary font-bold">{{ formatCurrency(item.unit_price) }}</p>
                  </div>
                  <button
                    class="btn btn-primary btn-sm w-full mt-3 text-white font-semibold gap-1.5"
                    @click.stop.prevent="handleAddToCart(item)"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Thêm vào giỏ
                  </button>
                </div>
              </NuxtLink>
            </div>
          </template>
        </div>

        <!-- Right sidebar: filter -->
        <aside class="hidden lg:flex flex-col gap-3 w-60 flex-shrink-0 sticky top-[var(--header-height)] z-10">
          <ProductFilterGroup
            title="Danh mục"
            :model-value="selectedCategorySlugs"
            :items="categories"
            @update:model-value="handleCategoryChange"
          />
          <ProductFilterGroup
            title="Thương hiệu"
            :model-value="selectedBrandIds"
            :items="brands"
            @update:model-value="handleBrandChange"
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
import { useBrandStore } from '~/stores/brand.store'
import { useProductStore } from '~/stores/product.store'
import { useCartStore } from '~/stores/cart.store'
import { useUiStore } from '~/stores/ui.store'
import type { ProductCatalogItem } from '~/types/productCatalog'

useSeo({
  title: 'Tat ca san pham',
  description: 'Kham pha hang ngan san pham cong nghe chinh hang tai Hoang Nam Phat.',
})

const route = useRoute()
const router = useRouter()

const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const uiStore = useUiStore()

const mobileFilterOpen = ref(false)

function parseList(value: unknown): string[] {
  if (!value) return []
  return String(value).split(',').filter(Boolean)
}

// Category links across the site (header, footer, hero, breadcrumbs...) all point to
// /products?category=<slug>, so the selection stays slug-based here for compatibility.
// Multi-select just joins several slugs with a comma in the same query param.
const initialCategoryQuery = route.query.category ?? route.query.category_slug
const selectedCategorySlugs = ref<string[]>(parseList(initialCategoryQuery))
const selectedBrandIds = ref<number[]>(parseList(route.query.brand).map(Number).filter((n) => !Number.isNaN(n)))

const categories = computed(() =>
  categoryStore.categories.map((c) => ({ id: c.slug, label: c.name })),
)
const brands = computed(() =>
  brandStore.brands.map((b) => ({ id: b.id, label: b.name })),
)

// The list API filters by category_id, not slug, so resolve the selected slugs to ids.
const selectedCategoryIds = computed(() =>
  selectedCategorySlugs.value
    .map((slug) => categoryStore.categories.find((c) => c.slug === slug)?.id)
    .filter((id): id is number => id != null),
)

const totalSelectedFilters = computed(() => selectedCategorySlugs.value.length + selectedBrandIds.value.length)

function syncQuery() {
  const query: Record<string, string> = {}
  if (selectedCategorySlugs.value.length) query.category = selectedCategorySlugs.value.join(',')
  if (selectedBrandIds.value.length) query.brand = selectedBrandIds.value.join(',')
  router.replace({ query })
}

function handleCategoryChange(slugs: (string | number)[]) {
  selectedCategorySlugs.value = slugs.map(String)
  syncQuery()
}

function handleBrandChange(ids: (string | number)[]) {
  selectedBrandIds.value = ids.map(Number)
  syncQuery()
}

function clearAllFilters() {
  selectedCategorySlugs.value = []
  selectedBrandIds.value = []
  mobileFilterOpen.value = false
  syncQuery()
}

function getDiscountPercent(item: ProductCatalogItem) {
  if (!item.compare_price || item.compare_price <= item.unit_price) return 0
  return Math.round(((item.compare_price - item.unit_price) / item.compare_price) * 100)
}

function handleAddToCart(item: ProductCatalogItem) {
  cartStore.addItem({
    id: item.id,
    productId: item.id,
    name: item.name,
    thumbnail: item.variants[0]?.images[0] ?? '',
    price: item.unit_price,
    originalPrice: item.compare_price ?? undefined,
    discount: getDiscountPercent(item) || undefined,
    slug: item.slug,
  })

  uiStore.addToast({ type: 'success', message: 'Đã thêm sản phẩm vào giỏ hàng' })
}

async function loadProducts() {
  await productStore.fetchProducts({
    type: 'new',
    category_id: selectedCategoryIds.value.join(',') || undefined,
    brand_id: selectedBrandIds.value.join(',') || undefined,
  })
}

onMounted(loadProducts)
watch([selectedCategoryIds, selectedBrandIds], loadProducts)

const products = computed(() => productStore.products)
const isLoading = computed(() => productStore.isLoading)
</script>
