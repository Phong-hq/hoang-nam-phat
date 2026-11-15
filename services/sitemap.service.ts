// Sitemap service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Server route -> Service -> API

import { httpClient } from '~/utils/httpClient'
import { ERP_API_BASE_URL_FALLBACK } from '~/constants'
import type {
  ApiListResponse,
  NewsPageApiRecord,
  PolicyPageApiRecord,
  ProductCategory,
  SitemapApiItem,
  SolutionsPageApiRecord,
} from '~/types'

const SITEMAP_PRODUCTS_API_URL = '/api/v1/frontend/sitemap/products'
const SITEMAP_CATEGORIES_API_URL = '/api/v1/frontend/sitemap/categories'
const SITEMAP_BRANDS_API_URL = '/api/v1/frontend/sitemap/brands'
const CATEGORY_API_URL = '/api/v1/frontend/product/category'
const NEWS_PAGE_API_URL = '/api/v1/frontend/cms/record/news_page'
const SOLUTIONS_PAGE_API_URL = '/api/v1/frontend/cms/record/solutions_page'
const POLICY_PAGE_API_URL = '/api/v1/frontend/cms/record/policy_page'

// These run from Nitro server routes where the runtime config resolved empty on the
// deployed server, so the ERP host is pinned here rather than read from it.
const baseURL = ERP_API_BASE_URL_FALLBACK

async function getRecords<T>(url: string): Promise<T[]> {
  const res = await httpClient.get<ApiListResponse<T>>(url, { baseURL })
  return res.items
}

export const sitemapService = {
  getProducts(): Promise<SitemapApiItem[]> {
    return httpClient.get<SitemapApiItem[]>(SITEMAP_PRODUCTS_API_URL, { unwrap: false, baseURL })
  },

  getCategories(): Promise<SitemapApiItem[]> {
    return httpClient.get<SitemapApiItem[]>(SITEMAP_CATEGORIES_API_URL, { unwrap: false, baseURL })
  },

  // `loc` dạng `/brands/<slug>` -- chỉ dùng slug và lastmod, URL thật là /brand/<slug>.
  getBrands(): Promise<SitemapApiItem[]> {
    return httpClient.get<SitemapApiItem[]>(SITEMAP_BRANDS_API_URL, { unwrap: false, baseURL })
  },

  // The category sitemap only hands back slugs, but a sub-category's URL needs its
  // parent's slug too -- the tree is what tells the two apart. The tree also carries
  // the brand slugs that the /brand/<slug> pages resolve against.
  getCategoryTree(): Promise<ProductCategory[]> {
    return getRecords<ProductCategory>(CATEGORY_API_URL)
  },

  getNews(): Promise<NewsPageApiRecord[]> {
    return getRecords<NewsPageApiRecord>(NEWS_PAGE_API_URL)
  },

  getSolutions(): Promise<SolutionsPageApiRecord[]> {
    return getRecords<SolutionsPageApiRecord>(SOLUTIONS_PAGE_API_URL)
  },

  getPolicies(): Promise<PolicyPageApiRecord[]> {
    return getRecords<PolicyPageApiRecord>(POLICY_PAGE_API_URL)
  },
}
