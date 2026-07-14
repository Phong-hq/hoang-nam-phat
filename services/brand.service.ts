// Brand service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, Brand } from '~/types'

const BRAND_API_URL = '/api/v1/frontend/product/brand/'

export const brandService = {
  async getList(): Promise<Brand[]> {
    const res = await httpClient.get<ApiListResponse<Brand>>(BRAND_API_URL)
    return res.items
  },
}
