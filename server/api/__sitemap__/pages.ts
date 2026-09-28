// Sitemap source for static pages

import type { SitemapEntry } from '~/types'

export default defineEventHandler((): SitemapEntry[] => {
  return [
    { loc: '/', changefreq: 'daily', priority: 1.0 },
    { loc: '/products', changefreq: 'daily', priority: 0.9 },
  ]
})
