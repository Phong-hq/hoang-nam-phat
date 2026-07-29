// Sitemap service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Server route -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { SitemapApiItem } from '~/types'

const SITEMAP_PRODUCTS_API_URL = '/api/v1/frontend/sitemap/products'
const SITEMAP_CATEGORIES_API_URL = '/api/v1/frontend/sitemap/categories'

export const sitemapService = {
  getProducts(): Promise<SitemapApiItem[]> {
    return httpClient.get<SitemapApiItem[]>(SITEMAP_PRODUCTS_API_URL, { unwrap: false })
  },

  getCategories(): Promise<SitemapApiItem[]> {
    return httpClient.get<SitemapApiItem[]>(SITEMAP_CATEGORIES_API_URL, { unwrap: false })
  },
}
