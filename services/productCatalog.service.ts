// Product catalog service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import { buildQueryString } from '~/utils'
import type { ApiListResponse, ProductCatalogItem, ProductDetail, ProductQueryParams } from '~/types'

const PRODUCT_API_URL = '/api/v1/frontend/product/product'

export const productCatalogService = {
  async getList(params?: ProductQueryParams): Promise<ProductCatalogItem[]> {
    const query = buildQueryString(params ?? {})
    const res = await httpClient.get<ApiListResponse<ProductCatalogItem>>(`${PRODUCT_API_URL}${query}`)
    return res.items
  },

  async getDetail(slug: string): Promise<ProductDetail> {
    const query = buildQueryString({ slug })
    const res = await httpClient.get<{ product: ProductDetail }>(`${PRODUCT_API_URL}/view${query}`)
    return res.product
  },
}
