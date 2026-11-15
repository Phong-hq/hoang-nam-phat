// Sitemap source for brand pages (/brand/<slug>)

import { sitemapService } from '~/services/sitemap.service'
import { brandPath } from '~/utils/routes'
import type { SitemapApiItem, SitemapEntry } from '~/types'

// Trang /brand/<slug> chỉ mở được với thương hiệu có trong cây danh mục (nơi duy nhất có
// slug thương hiệu), nên sitemap cũng lấy danh sách từ đó; lastmod lấy từ sitemap/brands.
export default defineEventHandler(async (): Promise<SitemapEntry[]> => {
  // Lỗi API thì trả [] -- một nguồn hỏng không được làm hỏng cả sitemap index.
  try {
    const [tree, brands] = await Promise.all([
      sitemapService.getCategoryTree(),
      sitemapService.getBrands().catch((): SitemapApiItem[] => []),
    ])

    const lastmodBySlug = new Map(
      brands.map((b) => [b.loc.split('/').filter(Boolean).pop() ?? '', b.lastmod] as const),
    )

    const slugs = new Set<string>()
    for (const category of tree) {
      for (const b of category.brands ?? []) slugs.add(b.slug)
      for (const child of category.children ?? []) {
        for (const b of child.brands ?? []) slugs.add(b.slug)
      }
    }

    return [...slugs].filter(Boolean).map((slug) => ({
      loc: brandPath(slug),
      lastmod: lastmodBySlug.get(slug),
      changefreq: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (e) {
    console.error('[sitemap:brands]', e)
    return []
  }
})
