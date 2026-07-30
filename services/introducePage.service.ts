// Social service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, IntroducePageApiRecord } from '~/types'

const INTRODUCE_PAGE_API_URL = '/api/v1/frontend/cms/record/introduce_page'

export const introducePageService = {
  async getList(): Promise<IntroducePageApiRecord[]> {
    const res = await httpClient.get<ApiListResponse<IntroducePageApiRecord>>(INTRODUCE_PAGE_API_URL)
    return res.items
  },
}
