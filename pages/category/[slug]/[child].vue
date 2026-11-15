<template>
  <ProductListing :category-slug="slug" :sub-category-slug="child" />
</template>

<script setup lang="ts">
import { categoryPath } from '~/utils'
import { useCategoryStore } from '~/stores/category.store'

// Trang danh mục phụ: /category/<cha>/<con>.
const route = useRoute()
const slug = String(route.params.slug)
const child = String(route.params.child)

// Danh mục phụ không còn (hoặc không thuộc danh mục cha) -> về trang danh mục cha,
// giống cách URL cũ ?sub_category= sai từng bị bỏ qua.
const categoryStore = useCategoryStore()
const parent = categoryStore.categories.find((c) => c.slug === slug)
if (parent && !parent.children?.some((c) => c.slug === child)) {
  await navigateTo({ path: categoryPath(slug), query: route.query }, { redirectCode: 301 })
}
</script>
