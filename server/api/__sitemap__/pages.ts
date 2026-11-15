// Sitemap source for static pages

import type { SitemapEntry } from '~/types'

export default defineEventHandler((): SitemapEntry[] => {
  return [
    { loc: '/', changefreq: 'daily', priority: 1.0 },
    { loc: '/products', changefreq: 'daily', priority: 0.9 },
    { loc: '/news', changefreq: 'weekly', priority: 0.6 },
    { loc: '/solutions', changefreq: 'weekly', priority: 0.6 },
    { loc: '/policy', changefreq: 'monthly', priority: 0.3 },
    { loc: '/about', changefreq: 'monthly', priority: 0.4 },
    { loc: '/contact', changefreq: 'monthly', priority: 0.4 },
  ]
})
