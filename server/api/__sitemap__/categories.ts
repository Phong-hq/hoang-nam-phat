// Sitemap source for categories
// Fetches category sitemap entries from the ERP API (base URL from NUXT_PUBLIC_ERP_API_BASE_URL)

import { sitemapService } from '~/services/sitemap.service'
import type { SitemapEntry } from '~/types'

export default defineEventHandler(async (): Promise<SitemapEntry[]> => {

  const categories = await sitemapService.getCategories()
  return categories.map((c) => ({
    loc: c.loc,
    lastmod: c.lastmod,
    changefreq: 'weekly' as const,
    priority: 0.7,
  }))
})
