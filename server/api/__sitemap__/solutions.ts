// Sitemap source for solution pages (/solutions/<id>)

import { sitemapService } from '~/services/sitemap.service'
import type { SitemapEntry } from '~/types'

export default defineEventHandler(async (): Promise<SitemapEntry[]> => {
  // Lỗi API thì trả [] -- một nguồn hỏng không được làm hỏng cả sitemap index.
  try {
    const items = await sitemapService.getSolutions()
    return items.map((item) => ({
      loc: `/solutions/${item.id}`,
      lastmod: toLastmod(item.updated_at || item.created_at),
      changefreq: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (e) {
    console.error('[sitemap:solutions]', e)
    return []
  }
})
