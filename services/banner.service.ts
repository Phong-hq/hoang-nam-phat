// Best selling product service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, BannerApiRecord } from '~/types'

const BANNER_API_URL = '/api/v1/frontend/cms/record/banner'

export const bestSellingService = {
  async getList(): Promise<BannerApiRecord[]> {
    const res = await httpClient.get<ApiListResponse<BannerApiRecord>>(BANNER_API_URL)
    return res.items
  },
}
