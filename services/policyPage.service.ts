// Policy page service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, PolicyPageApiRecord } from '~/types'

const POLICY_PAGE_API_URL = '/api/v1/frontend/cms/record/policy_page'

export const policyPageService = {
  async getList(): Promise<PolicyPageApiRecord[]> {
    const res = await httpClient.get<ApiListResponse<PolicyPageApiRecord>>(POLICY_PAGE_API_URL)
    return res.items
  },
}
