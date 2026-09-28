// Sitemap source for categories
// Fetches category sitemap entries from the ERP API (base URL from NUXT_PUBLIC_ERP_API_BASE_URL)

import { sitemapService } from '~/services/sitemap.service'
import type { SitemapEntry } from '~/types'

// The ERP returns `/categories/<slug>`, a path this app has no route for -- browsing a
// category here means the product list filtered by query, the same URL the header menu
// links to. A sub-category also needs its parent's slug in the query, so the category
// tree is fetched alongside to tell parents and children apart.
export default defineEventHandler(async (): Promise<SitemapEntry[]> => {
  const [categories, tree] = await Promise.all([
    sitemapService.getCategories(),
    sitemapService.getCategoryTree(),
  ])

  const parentSlugs = new Set(tree.map((c) => c.slug))
  const parentSlugByChild = new Map<string, string>()
  for (const parent of tree) {
    for (const child of parent.children ?? []) {
      parentSlugByChild.set(child.slug, parent.slug)
    }
  }

  return categories.flatMap((category) => {
    const slug = category.loc.split('/').filter(Boolean).pop() ?? ''
    const parentSlug = parentSlugByChild.get(slug)

    // A slug the catalog no longer carries would only add a 404 to the sitemap.
    let loc: string
    if (parentSlug) loc = `/products?category=${parentSlug}&sub_category=${slug}`
    else if (parentSlugs.has(slug)) loc = `/products?category=${slug}`
    else return []

    return [{
      loc,
      lastmod: category.lastmod,
      changefreq: 'weekly' as const,
      priority: 0.7,
    }]
  })
})
