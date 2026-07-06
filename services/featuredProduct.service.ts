// Featured product service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, FeaturedProduct } from '~/types'

const FEATURED_PRODUCT_API_URL = '/api/v1/frontend/cms/record/product_featured?expand=product'

export const featuredProductService = {
  async getList(): Promise<FeaturedProduct[]> {
    const res = await httpClient.get<ApiListResponse<FeaturedProduct>>(FEATURED_PRODUCT_API_URL)
    return res.items
  },
}
