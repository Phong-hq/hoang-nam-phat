// Sitemap source for news articles (/news/<slug>)

import { sitemapService } from '~/services/sitemap.service'
import { newsPath } from '~/utils/routes'
import type { SitemapEntry } from '~/types'

export default defineEventHandler(async (): Promise<SitemapEntry[]> => {
  // Lỗi API thì trả [] -- một nguồn hỏng không được làm hỏng cả sitemap index.
  try {
    const items = await sitemapService.getNews()
    return items.map((item) => ({
      loc: newsPath(item),
      lastmod: toLastmod(item.updated_at || item.created_at),
      changefreq: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (e) {
    console.error('[sitemap:news]', e)
    return []
  }
})
