// Sitemap source for categories

import type { SitemapEntry } from '~/types'

export default defineEventHandler((): SitemapEntry[] => {
  const categories = [
    { slug: 'dien-thoai', updatedAt: '2026-06-27' },
    { slug: 'laptop', updatedAt: '2026-06-27' },
    { slug: 'tablet', updatedAt: '2026-06-27' },
    { slug: 'phu-kien', updatedAt: '2026-06-27' },
  ]

  return categories.map((c) => ({
    loc: `/categories/${c.slug}`,
    lastmod: c.updatedAt,
    changefreq: 'weekly' as const,
    priority: 0.7,
  }))
})
