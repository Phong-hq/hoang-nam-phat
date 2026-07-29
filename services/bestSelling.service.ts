// Best selling product service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, BestSellingApiRecord } from '~/types'

const BEST_SELLING_API_URL = '/api/v1/frontend/cms/record/best_selling_product'

export const bestSellingService = {
  async getList(): Promise<BestSellingApiRecord[]> {
    const res = await httpClient.get<ApiListResponse<BestSellingApiRecord>>(BEST_SELLING_API_URL)
    return res.items
  },
}
