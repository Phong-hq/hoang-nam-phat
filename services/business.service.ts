// Business service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, BusinessInfoApiRecord } from '~/types'

const BUSINESS_INFO_API_URL = '/api/v1/frontend/cms/record/business_info'

export const businessService = {
  async getList(): Promise<BusinessInfoApiRecord[]> {
    const res = await httpClient.get<ApiListResponse<BusinessInfoApiRecord>>(BUSINESS_INFO_API_URL)
    return res.items
  },
}
