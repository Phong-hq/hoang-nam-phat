// Sitemap source for categories
// Fetches category sitemap entries from the ERP API (base URL from NUXT_PUBLIC_ERP_API_BASE_URL)

import { sitemapService } from '~/services/sitemap.service'
import { categoryPath } from '~/utils/routes'
import type { SitemapEntry } from '~/types'

// The ERP returns `/categories/<slug>`; the site serves categories at /category/<slug>
// and sub-categories at /category/<parent>/<child>, so the category tree is fetched
// alongside to tell parents and children apart.
export default defineEventHandler(async (): Promise<SitemapEntry[]> => {
  // Lỗi API thì trả [] -- một nguồn hỏng không được làm hỏng cả sitemap index.
  try {
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
      if (parentSlug) loc = categoryPath(parentSlug, slug)
      else if (parentSlugs.has(slug)) loc = categoryPath(slug)
      else return []

      return [{
        loc,
        lastmod: category.lastmod,
        changefreq: 'weekly' as const,
        priority: 0.7,
      }]
    })
  } catch (e) {
    console.error('[sitemap:categories]', e)
    return []
  }
})
