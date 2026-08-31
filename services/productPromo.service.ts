// Product promo service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, ProductPromoApiRecord } from '~/types'

const PRODUCT_PROMO_API_URL = '/api/v1/frontend/cms/record/product_promo'

export const productPromoService = {
  async getList(): Promise<ProductPromoApiRecord[]> {
    const res = await httpClient.get<ApiListResponse<ProductPromoApiRecord>>(PRODUCT_PROMO_API_URL)
    return res.items
  },
}
