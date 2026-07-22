// Product catalog service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import { buildQueryString } from '~/utils'
import type { ApiListResponse, ProductCatalogItem, ProductDetail, ProductQueryParams, ProductVariant } from '~/types'

const PRODUCT_API_URL = '/api/v1/frontend/product/product'

// The ERP API returns `variants` as an array; the app only ever deals with a single
// variant per product, so normalize it to an object right after the API boundary.
type ApiProductCatalogItem = Omit<ProductCatalogItem, 'variants'> & { variants: ProductVariant[] }
type ApiProductDetail = Omit<ProductDetail, 'variants'> & { variants: ProductVariant[] }

function normalizeVariants<T extends { variants: ProductVariant[] }>(
  item: T,
): Omit<T, 'variants'> & { variants: ProductVariant } {
  return { ...item, variants: item.variants[0] }
}

export const productCatalogService = {
  async getList(params?: ProductQueryParams): Promise<ProductCatalogItem[]> {
    const query = buildQueryString(params ?? {})
    const res = await httpClient.get<ApiListResponse<ProductCatalogItem>>(`${PRODUCT_API_URL}${query}`)
    return res.items
  },

  async getDetail(slug: string): Promise<ProductDetail> {
    const query = buildQueryString({ slug })
    const res = await httpClient.get<{ product: ApiProductDetail }>(`${PRODUCT_API_URL}/view${query}`)
    return normalizeVariants(res.product)
  },
}
