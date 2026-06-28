// Sitemap source for products
// Returns all product slugs and update dates for sitemap generation
// Replace the data source here when connecting a real database

import type { SitemapEntry } from '~/types'

export default defineEventHandler(async (): Promise<SitemapEntry[]> => {
  const products = [
    { slug: 'iphone-16-pro-max', updatedAt: '2026-06-27' },
    { slug: 'samsung-galaxy-s25-ultra', updatedAt: '2026-06-27' },
    { slug: 'macbook-pro-m4', updatedAt: '2026-06-27' },
  ]

  return products.map((p) => ({
    loc: `/products/${p.slug}`,
    lastmod: p.updatedAt,
    changefreq: 'weekly' as const,
    priority: 0.8,
  }))
})
