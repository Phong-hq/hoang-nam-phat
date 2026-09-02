// Terms service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, TermsApiRecord } from '~/types'

const TERMS_API_URL = '/api/v1/frontend/cms/record/terms'

export const termsService = {
  async getList(): Promise<TermsApiRecord[]> {
    const res = await httpClient.get<ApiListResponse<TermsApiRecord>>(TERMS_API_URL)
    return res.items
  },
}
