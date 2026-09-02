// Solutions page service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, SolutionsPageApiRecord } from '~/types'

const SOLUTIONS_PAGE_API_URL = '/api/v1/frontend/cms/record/solutions_page'

export const solutionsPageService = {
  async getList(): Promise<SolutionsPageApiRecord[]> {
    const res = await httpClient.get<ApiListResponse<SolutionsPageApiRecord>>(SOLUTIONS_PAGE_API_URL)
    return res.items
  },
}
