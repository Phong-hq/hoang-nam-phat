// Đường dẫn công khai của trang danh mục, thương hiệu, tin tức.
// Mọi link trong site (header, footer, trang chủ, breadcrumb, sitemap) dựng URL qua đây
// để chỉ có MỘT dạng URL cho mỗi trang -- Google không thấy trang trùng.

import { slugify } from './slug'

export function categoryPath(categorySlug: string, subCategorySlug?: string | null): string {
  const base = `/category/${encodeURIComponent(categorySlug)}`
  return subCategorySlug ? `${base}/${encodeURIComponent(subCategorySlug)}` : base
}

export function brandPath(brandSlug: string): string {
  return `/brand/${encodeURIComponent(brandSlug)}`
}

interface NewsLike {
  id: number
  title: string
  slug?: string | null
}

// BE chưa trả `slug` cho bài tin tức trên mọi môi trường: có thì dùng, chưa có thì
// dựng từ tiêu đề (vẫn ổn định chừng nào tiêu đề không đổi).
export function newsSlug(item: NewsLike): string {
  return item.slug?.trim() || slugify(item.title) || String(item.id)
}

export function newsPath(item: NewsLike): string {
  return `/news/${encodeURIComponent(newsSlug(item))}`
}
