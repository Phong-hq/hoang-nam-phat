// Record test service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse } from '~/types'

const RECORD_TEST_API_URL = '/api/v1/frontend/cms/record'

export const recordTestService = {
  async getList(recordType: string = 'test'): Promise<any[]> {
    const res = await httpClient.get<ApiListResponse<any>>(`${RECORD_TEST_API_URL}/${recordType}`)
    return res.items
  },
}
