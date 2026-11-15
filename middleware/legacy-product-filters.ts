// Chuyển 301 URL lọc cũ sang URL danh mục mới (chạy cả trên server lẫn trình duyệt):
//   /products?category=router                      -> /category/router
//   /products?category=router&sub_category=mikrotik -> /category/router/mikrotik
//   /products?category=router&brand=5&page=2        -> /category/router?brand=5&page=2
// Google, link ngoài, bookmark đang trỏ vào URL cũ -> 301 chuyển uy tín sang URL mới.

import { categoryPath } from '~/utils'

function first(value: unknown): string {
  const raw = Array.isArray(value) ? value[0] : value
  return raw ? String(raw).split(',')[0]!.trim() : ''
}

export default defineNuxtRouteMiddleware((to) => {
  const category = first(to.query.category ?? to.query.category_slug)
  if (!category) return

  const { category: _c, category_slug: _cs, sub_category: subCategory, ...rest } = to.query
  return navigateTo(
    { path: categoryPath(category, first(subCategory) || undefined), query: rest, hash: to.hash },
    { redirectCode: 301 },
  )
})
