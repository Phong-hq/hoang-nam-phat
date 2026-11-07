<template>
  <div class="products-page bg-page-bg min-h-screen">
    <div class="container mx-auto px-4 py-8 bg-page-bg">
      <h1 class="text-3xl font-bold mb-8">{{ pageHeading }}</h1>

      <div class="flex gap-6 items-start">
        <!-- Left sidebar: filter -->
        <aside class="hidden lg:flex flex-col gap-3 w-60 flex-shrink-0 sticky top-[var(--header-height)] z-10">
          <ProductSortGroup
            title="Sắp xếp"
            name="sort-desktop"
            :options="SORT_OPTIONS"
            v-model="sortOrder"
          />
          <ProductFilterGroup
            title="Danh mục"
            :model-value="selectedCategorySlugs"
            :items="categories"
            :multiple="false"
            @update:model-value="handleCategoryChange"
          />
          <ProductFilterGroup
            v-if="subCategoryItems.length"
            title="Danh mục phụ"
            :model-value="selectedSubCategories"
            :items="subCategoryItems"
            :multiple="false"
            @update:model-value="handleSubCategoryChange"
          />
          <ProductFilterGroup
            v-if="selectedCategorySlugs.length"
            title="Thương hiệu"
            :model-value="selectedBrandIds"
            :items="brands"
            @update:model-value="handleBrandChange"
          />
        </aside>

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
              <ProductSortGroup
                title="Sắp xếp"
                name="sort-mobile"
                :options="SORT_OPTIONS"
                v-model="sortOrder"
              />
              <ProductFilterGroup
                title="Danh mục"
                :model-value="selectedCategorySlugs"
                :items="categories"
                :multiple="false"
                @update:model-value="handleCategoryChange"
              />
              <ProductFilterGroup
                v-if="subCategoryItems.length"
                title="Danh mục phụ"
                :model-value="selectedSubCategories"
                :items="subCategoryItems"
                :multiple="false"
                @update:model-value="handleSubCategoryChange"
              />
              <ProductFilterGroup
                v-if="selectedCategorySlugs.length"
                title="Thương hiệu"
                :model-value="selectedBrandIds"
                :items="brands"
                @update:model-value="handleBrandChange"
              />
            </div>
          </div>

          <!-- Active filters, removable at a glance without opening the sidebar/drawer -->
          <div v-if="activeFilterChips.length" class="flex flex-wrap items-center gap-2 mb-4">
            <span class="text-xs font-medium text-base-content/40">Đang lọc:</span>
            <button
              v-for="chip in activeFilterChips"
              :key="chip.key"
              type="button"
              class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 pl-3 pr-2 py-1 text-xs font-semibold text-primary hover:bg-primary/15 transition-colors"
              @click="chip.remove()"
            >
              {{ chip.label }}
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              type="button"
              class="text-xs font-medium text-base-content/40 hover:text-primary underline underline-offset-2 ml-1"
              @click="clearAllFilters"
            >
              Xóa tất cả
            </button>
          </div>

          <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-6">
            <BaseSkeleton v-for="i in 8" :key="i" class="h-64" />
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

            <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-6">
              <NuxtLink
                v-for="item in products"
                :key="item.id"
                :to="`/products/${item.slug}`"
                class="group card h-full bg-white border border-base-200 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 rounded-xl overflow-hidden flex flex-col"
                @click="productStore.setSelectedProduct(item)"
              >
                <figure class="relative aspect-square overflow-hidden bg-base-200 p-3">
                  <span
                    v-if="getDiscountPercent(item)"
                    class="absolute top-2 left-2 z-10 bg-primary text-white text-sm font-extrabold px-2.5 py-1 rounded shadow-md"
                  >
                    -{{ getDiscountPercent(item) }}%
                  </span>
                  <NuxtImg
                    :src="getProductThumbnail(item)"
                    :alt="item.name"
                    width="300"
                    height="300"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 50vw, 300px"
                    class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1 group-hover:drop-shadow-xl"
                  />
                </figure>
                <div class="card-body p-4 flex flex-col flex-1">
                  <span v-if="item.brand" class="badge badge-ghost badge-sm">{{ item.brand.name }}</span>
                  <h2 class="card-title text-sm leading-snug line-clamp-2 h-11">{{ item.name }}</h2>
                  <div class="mt-1 min-h-[34px]">
                    <div
                      class="text-xs text-base-content/40 line-through leading-none mb-0.5"
                      :class="{ invisible: !(item.compare_price && item.compare_price > item.unit_price) }"
                    >
                      {{ formatCurrency(item.compare_price ?? 0) }}
                    </div>
                    <p class="text-primary font-bold">{{ formatPrice(item.unit_price) }}</p>
                  </div>
                  <div class="flex-1" />
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

            <div v-if="totalPages > 1" class="flex justify-center mt-8">
              <BasePagination :current-page="currentPage" :total-pages="totalPages" :page-href="pageHref" @change="handlePageChange" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatCurrency, formatPrice, getProductThumbnail } from '~/utils'
import { SITE_URL } from '~/constants'
import { useCategoryStore } from '~/stores/category.store'
import { useBrandStore } from '~/stores/brand.store'
import { CATEGORY_ICONS, getCategoryIconByKey } from '~/constants/categoryIcons'
import { useProductStore } from '~/stores/product.store'
import { useCartStore } from '~/stores/cart.store'
import { useUiStore } from '~/stores/ui.store'
import { productCatalogService } from '~/services/productCatalog.service'
import type { ProductCatalogItem } from '~/types/productCatalog'
import type { ProductCategoryChild, ProductQueryParams } from '~/types'

const route = useRoute()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const siteUrl = (runtimeConfig.public.siteUrl || SITE_URL).replace(/\/$/, '')

const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const uiStore = useUiStore()

const mobileFilterOpen = ref(false)
const PER_PAGE = 20
const LIST_PATH = '/products'

function parseList(value: unknown): string[] {
  if (!value) return []
  return String(value).split(',').filter(Boolean)
}

function iconForCategory(icon: string | false): string | undefined {
  return icon && CATEGORY_ICONS[icon] ? getCategoryIconByKey(icon) : undefined
}

// ---------------------------------------------------------------------------
// URL là nguồn dữ liệu DUY NHẤT của bộ lọc.
// Mọi lựa chọn (danh mục, danh mục phụ, thương hiệu, sắp xếp, trang) đều đọc từ URL;
// thao tác của khách chỉ đổi URL, URL đổi thì tải lại danh sách đúng một lần. Nhờ vậy:
//   - server và trình duyệt luôn dựng ra cùng một kết quả (Google thấy đúng sản phẩm),
//   - không còn nhiều chỗ cùng gọi API cho một thao tác,
//   - nút Back/Forward của trình duyệt đưa bộ lọc về đúng trạng thái.
// Link khắp site (header, footer, trang chủ, breadcrumb) vẫn dùng /products?category=<slug>.
// ---------------------------------------------------------------------------

// Single-select, but kept as an array (max one element) to match ProductFilterGroup's
// array-based model-value contract, shared with the (multi-select) brand filter.
const selectedCategorySlugs = computed(() => parseList(route.query.category ?? route.query.category_slug).slice(0, 1))
const requestedSubCategory = computed(() => (route.query.sub_category ? String(route.query.sub_category) : ''))
const requestedBrandIds = computed(() =>
  parseList(route.query.brand)
    .map(Number)
    .filter((n) => !Number.isNaN(n)),
)
const currentPage = computed(() => Math.max(1, Number(route.query.page) || 1))

const SORT_OPTIONS = [
  { value: 'default', label: 'Mặc định' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
]
// Sắp xếp nay nằm trên URL (?sort=price-asc) -- trước đây chỉ nằm trong bộ nhớ trang nên
// tải lại trang là mất, và server không biết khách đang sắp xếp kiểu gì.
const sortOrder = computed<string>({
  get: () => {
    const value = String(route.query.sort ?? '')
    return SORT_OPTIONS.some((o) => o.value === value) ? value : 'default'
  },
  set: (value) => navigate({ sort: value, page: 1 }),
})

const categories = computed(() =>
  categoryStore.categories.map((c) => ({ id: c.slug, label: c.name, icon: iconForCategory(c.icon) })),
)

function findCategory(slug?: string) {
  return slug ? categoryStore.categories.find((c) => c.slug === slug) : undefined
}

const selectedCategory = computed(() => findCategory(selectedCategorySlugs.value[0]))

// Sub-categories of the selected parent category. Only one can be picked at a time --
// see ProductFilterGroup's `multiple` prop.
const subCategoryChildren = computed<ProductCategoryChild[]>(() => selectedCategory.value?.children ?? [])

const subCategoryItems = computed(() =>
  subCategoryChildren.value.map((c) => ({ id: c.slug, label: c.name, icon: iconForCategory(c.icon) })),
)

// Danh mục phụ trên URL chỉ có hiệu lực khi thuộc danh mục cha đang chọn -- trước đây
// một watcher xoá nó khỏi URL; giờ chỉ cần bỏ qua, kết quả như nhau ở cả server lẫn trình duyệt.
const selectedSubCategoryChild = computed(
  () => subCategoryChildren.value.find((c) => c.slug === requestedSubCategory.value) ?? null,
)
const selectedSubCategories = computed(() => (selectedSubCategoryChild.value ? [selectedSubCategoryChild.value.slug] : []))

// When a sub-category is selected, its own brands take over the brand filter --
// otherwise fall back to the brands of the selected parent category. No category
// selected = null (the brand filter is hidden).
function brandListFor(categorySlug?: string, subCategorySlug?: string) {
  const category = findCategory(categorySlug)
  if (!category) return null
  const sub = subCategorySlug ? category.children?.find((c) => c.slug === subCategorySlug) : undefined
  return sub ? (sub.brands ?? []) : (category.brands ?? [])
}

const categoryBrands = computed(() => brandListFor(selectedCategorySlugs.value[0], selectedSubCategories.value[0]))

function keepValidBrands(list: { id: number }[] | null, ids: number[]): number[] {
  if (!list) return []
  const validIds = new Set(list.map((b) => b.id))
  return ids.filter((id) => validIds.has(id))
}

const brands = computed(() => {
  const source = categoryBrands.value ?? brandStore.brands
  return source.map((b) => ({ id: b.id, label: b.name }))
})

// Thương hiệu chỉ có hiệu lực khi nằm trong danh sách đang hiển thị (cùng lý do như danh mục phụ).
const selectedBrandIds = computed(() => keepValidBrands(categoryBrands.value, requestedBrandIds.value))

// The list API filters by category_id, not slug, so resolve the selected slug to an id.
const selectedCategoryIds = computed(() => (selectedCategory.value ? [selectedCategory.value.id] : []))

// The sub-category goes to the API as its own `sub_category_id` param alongside the
// parent's `category_id`, instead of replacing it.
const selectedSubCategoryId = computed(() => selectedSubCategoryChild.value?.id ?? null)

const totalSelectedFilters = computed(
  () => selectedCategorySlugs.value.length + selectedSubCategories.value.length + selectedBrandIds.value.length,
)

// Selected filters surfaced as removable chips above the grid, so a shopper never
// has to scroll back up to the sidebar (or reopen the mobile drawer) to see or undo
// what's currently narrowing the results.
interface FilterChip {
  key: string
  label: string
  remove: () => void
}

const activeFilterChips = computed<FilterChip[]>(() => [
  ...selectedCategorySlugs.value.map((slug) => ({
    key: `category-${slug}`,
    label: categories.value.find((c) => c.id === slug)?.label ?? slug,
    remove: () => handleCategoryChange([]),
  })),
  ...selectedSubCategories.value.map((slug) => ({
    key: `sub-category-${slug}`,
    label: subCategoryItems.value.find((c) => c.id === slug)?.label ?? slug,
    remove: () => handleSubCategoryChange([]),
  })),
  ...selectedBrandIds.value.map((id) => ({
    key: `brand-${id}`,
    label: brands.value.find((b) => b.id === id)?.label ?? String(id),
    remove: () => handleBrandChange(selectedBrandIds.value.filter((b) => b !== id)),
  })),
])

// ---------------------------------------------------------------------------
// Đổi URL -- cách DUY NHẤT để thay đổi bộ lọc.
// ---------------------------------------------------------------------------
interface FilterState {
  category: string[]
  subCategory: string[]
  brands: number[]
  sort: string
  page: number
}

function buildQuery(state: FilterState): Record<string, string> {
  const query: Record<string, string> = {}
  if (state.category.length) query.category = state.category.join(',')
  if (state.subCategory.length) query.sub_category = state.subCategory[0]!
  if (state.brands.length) query.brand = state.brands.join(',')
  if (state.sort !== 'default') query.sort = state.sort
  if (state.page > 1) query.page = String(state.page)
  return query
}

function navigate(patch: Partial<FilterState>) {
  const next: FilterState = {
    category: selectedCategorySlugs.value,
    subCategory: selectedSubCategories.value,
    brands: selectedBrandIds.value,
    sort: sortOrder.value,
    page: currentPage.value,
    ...patch,
  }
  return router.push({ path: LIST_PATH, query: buildQuery(next) })
}

function handleCategoryChange(slugs: (string | number)[]) {
  const category = slugs.map(String).slice(0, 1)
  // Danh mục phụ luôn thuộc đúng một danh mục cha -> đổi cha thì bỏ danh mục phụ.
  // Thương hiệu thì giữ những cái vẫn có trong danh mục mới.
  navigate({
    category,
    subCategory: [],
    brands: keepValidBrands(brandListFor(category[0]), selectedBrandIds.value),
    page: 1,
  })
}

function handleSubCategoryChange(ids: (string | number)[]) {
  const subCategory = ids.map(String).slice(0, 1)
  navigate({
    subCategory,
    brands: keepValidBrands(brandListFor(selectedCategorySlugs.value[0], subCategory[0]), selectedBrandIds.value),
    page: 1,
  })
}

function handleBrandChange(ids: (string | number)[]) {
  navigate({ brands: ids.map(Number), page: 1 })
}

function handlePageChange(page: number) {
  navigate({ page })
}

function clearAllFilters() {
  mobileFilterOpen.value = false
  navigate({ category: [], subCategory: [], brands: [], page: 1 })
}

// Link thật cho từng nút phân trang, để Google đi được sang trang 2, 3...
// Dựng lại từ bộ lọc (không copy nguyên URL) để không mang theo utm_*, fbclid... từ quảng cáo.
function pageHref(page: number) {
  const query = buildQuery({
    category: selectedCategorySlugs.value,
    subCategory: selectedSubCategories.value,
    brands: selectedBrandIds.value,
    sort: sortOrder.value,
    page,
  })
  return router.resolve({ path: LIST_PATH, query }).href
}

// ---------------------------------------------------------------------------
// Tải danh sách -- chạy trên SERVER ở lần mở trang đầu tiên (HTML gửi về đã có sẵn
// sản phẩm cho Google), sau đó chạy lại trên trình duyệt mỗi khi bộ lọc trên URL đổi.
// ---------------------------------------------------------------------------

// API sort param: a bare field sorts ascending, a `-`-prefixed field descending.
function sortParam(): string | undefined {
  if (sortOrder.value === 'price-asc') return 'unit_price'
  if (sortOrder.value === 'price-desc') return '-unit_price'
  return undefined
}

// Khi khách rời trang (vd bấm vào 1 sản phẩm), URL đổi trước khi trang này đóng hẳn.
// Giữ nguyên tham số cũ trong lúc đó để không bắn thêm 1 lượt tải "tất cả sản phẩm" thừa.
let lastParams: ProductQueryParams | null = null
const listParams = computed<ProductQueryParams>(() => {
  if (route.path !== LIST_PATH && lastParams) return lastParams
  lastParams = {
    type: 'new',
    category_id: selectedCategoryIds.value.join(',') || undefined,
    sub_category_id: selectedSubCategoryId.value != null ? String(selectedSubCategoryId.value) : undefined,
    brand_id: selectedBrandIds.value.join(',') || undefined,
    sort: sortParam(),
    page: currentPage.value,
    'per-page': PER_PAGE,
  }
  return lastParams
})

// useAsyncData tự huỷ kết quả của lượt tải cũ khi có lượt mới, nên bấm lọc liên tục
// không bị kết quả cũ về sau đè lên kết quả mới.
const { data: listData, status } = await useAsyncData(
  'product-list',
  () => productCatalogService.getListWithMeta(listParams.value),
  { watch: [listParams] },
)

// Trang chi tiết sản phẩm đọc giá/biến thể mới nhất từ productStore.products,
// nên vẫn ghi danh sách vào store như trước.
watch(
  listData,
  (res) => {
    if (res) productStore.setProducts(res.items, res.meta)
  },
  { immediate: true },
)

const products = computed(() => listData.value?.items ?? [])
const isLoading = computed(() => status.value === 'pending')
const totalPages = computed(() => listData.value?.meta?.pageCount ?? 1)

// ---------------------------------------------------------------------------
// SEO: tiêu đề, mô tả, canonical theo danh mục đang xem.
// ---------------------------------------------------------------------------
const pageHeading = computed(
  () => selectedSubCategoryChild.value?.name ?? selectedCategory.value?.name ?? 'Tất cả sản phẩm',
)

useSeo(() => {
  const name = selectedSubCategoryChild.value?.name ?? selectedCategory.value?.name
  const pageSuffix = currentPage.value > 1 ? ` - Trang ${currentPage.value}` : ''

  // Canonical chỉ giữ danh mục, danh mục phụ và số trang. Thương hiệu, sắp xếp là biến thể
  // lọc của cùng trang danh mục -> trỏ về trang danh mục để Google không coi là trang trùng.
  const query = buildQuery({
    category: selectedCategory.value ? [selectedCategory.value.slug] : [],
    subCategory: selectedSubCategories.value,
    brands: [],
    sort: 'default',
    page: currentPage.value,
  })
  const search = new URLSearchParams(query).toString()

  return {
    title: name ? `${name} chính hãng, giá tốt${pageSuffix}` : `Tất cả sản phẩm${pageSuffix}`,
    description: name
      ? `Mua ${name} chính hãng tại Hoàng Nam Phát: giá tốt, bảo hành chính hãng, tư vấn tận tâm, giao hàng toàn quốc.`
      : 'Khám phá router, switch, WiFi, camera, tổng đài IP và thiết bị mạng chính hãng tại Hoàng Nam Phát.',
    canonical: `${siteUrl}${LIST_PATH}${search ? `?${search}` : ''}`,
  }
})

// ---------------------------------------------------------------------------

function getDiscountPercent(item: ProductCatalogItem) {
  if (!item.compare_price || item.compare_price <= item.unit_price) return 0
  return Math.round(((item.compare_price - item.unit_price) / item.compare_price) * 100)
}

function handleAddToCart(item: ProductCatalogItem) {
  cartStore.addItem({
    id: item.id,
    productId: item.id,
    productVariantId: item.variants?.id ?? item.id,
    name: item.name,
    thumbnail: getProductThumbnail(item),
    price: item.unit_price,
    originalPrice: item.compare_price ?? undefined,
    discount: getDiscountPercent(item) || undefined,
    slug: item.slug,
  })

  uiStore.addToast({ type: 'success', message: 'Đã thêm sản phẩm vào giỏ hàng' })
}
</script>
