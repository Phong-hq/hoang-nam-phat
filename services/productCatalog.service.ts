// Product catalog service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import { buildQueryString } from '~/utils'
import type { ApiListResponse, ProductCatalogItem, ProductDetail, ProductQueryParams, ProductVariant } from '~/types'

const PRODUCT_API_URL = '/api/v1/frontend/product/product'

// The ERP API returns `variants` as an array on the detail endpoint; the app only ever
// deals with a single variant per product, so normalize it to an object right after
// the API boundary. The list endpoint already returns `variants` as a single object.
type ApiProductListItem = Omit<ProductCatalogItem, 'images'> & { images: string }
type ApiProductDetail = Omit<ProductDetail, 'variants' | 'images'> & { variants: ProductVariant[]; images: string }

function normalizeVariants<T extends { variants: ProductVariant[] }>(
  item: T,
): Omit<T, 'variants'> & { variants: ProductVariant } {
  return { ...item, variants: item.variants[0] }
}

// `images` comes back from the ERP API as a JSON-encoded string (or empty string);
// parse it once here so every screen that renders a product can just read a string[].
function normalizeImages<T extends { images: string }>(item: T): Omit<T, 'images'> & { images: string[] } {
  let images: string[] = []
  try {
    const parsed = JSON.parse(item.images)
    if (Array.isArray(parsed)) images = parsed.filter((value): value is string => typeof value === 'string')
  } catch {
    images = []
  }
  return { ...item, images }
}

export const productCatalogService = {
  async getList(params?: ProductQueryParams): Promise<ProductCatalogItem[]> {
    const query = buildQueryString(params ?? {})
    const res = await httpClient.get<ApiListResponse<ApiProductListItem>>(`${PRODUCT_API_URL}${query}`)
    return res.items.map(normalizeImages)
  },

  async getDetail(slug: string): Promise<ProductDetail> {
    const query = buildQueryString({ slug })
    const res = await httpClient.get<{ product: ApiProductDetail }>(`${PRODUCT_API_URL}/view${query}`)
    return normalizeImages(normalizeVariants(res.product))
  },
}
