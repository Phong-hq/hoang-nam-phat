// Sitemap service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Server route -> Service -> API

import { httpClient } from '~/utils/httpClient'
import { ERP_API_BASE_URL_FALLBACK } from '~/constants'
import type { SitemapApiItem } from '~/types'

const SITEMAP_PRODUCTS_API_URL = '/api/v1/frontend/sitemap/products'
const SITEMAP_CATEGORIES_API_URL = '/api/v1/frontend/sitemap/categories'

// These run from Nitro server routes where the runtime config resolved empty on the
// deployed server, so the ERP host is pinned here rather than read from it.
const baseURL = ERP_API_BASE_URL_FALLBACK

export const sitemapService = {
  getProducts(): Promise<SitemapApiItem[]> {
    return httpClient.get<SitemapApiItem[]>(SITEMAP_PRODUCTS_API_URL, { unwrap: false, baseURL })
  },

  getCategories(): Promise<SitemapApiItem[]> {
    return httpClient.get<SitemapApiItem[]>(SITEMAP_CATEGORIES_API_URL, { unwrap: false, baseURL })
  },
}
