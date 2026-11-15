// Sitemap source for policy pages (/policy/<id>)

import { sitemapService } from '~/services/sitemap.service'
import type { SitemapEntry } from '~/types'

export default defineEventHandler(async (): Promise<SitemapEntry[]> => {
  // Lỗi API thì trả [] -- một nguồn hỏng không được làm hỏng cả sitemap index.
  try {
    const items = await sitemapService.getPolicies()
    return items.map((item) => ({
      loc: `/policy/${item.id}`,
      lastmod: toLastmod(item.updated_at || item.created_at),
      changefreq: 'yearly' as const,
      priority: 0.3,
    }))
  } catch (e) {
    console.error('[sitemap:policies]', e)
    return []
  }
})
