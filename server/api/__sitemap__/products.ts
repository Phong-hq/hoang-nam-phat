// Sitemap source for products
// Fetches product sitemap entries from the ERP API (base URL from NUXT_PUBLIC_ERP_API_BASE_URL)

import { sitemapService } from '~/services/sitemap.service'
import type { SitemapEntry } from '~/types'

export default defineEventHandler(async (): Promise<SitemapEntry[]> => {
  try{
     console.log(`[sitemap:products] fetching from ERP at ${new Date().toISOString()}`)

    const products = await sitemapService.getProducts()
    console.log(`[sitemap:products] received ${products} entries`)

    return products.map((p) => ({
      loc: p.loc,
      lastmod: p.lastmod,
      changefreq: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (e) {
    console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv',e);
    return []
  }
})
