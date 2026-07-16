// Social service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, SocialApiRecord } from '~/types'

const SOCIAL_API_URL = '/api/v1/frontend/cms/record/social'

export const socialService = {
  async getList(): Promise<SocialApiRecord[]> {
    const res = await httpClient.get<ApiListResponse<SocialApiRecord>>(SOCIAL_API_URL)
    return res.items
  },
}
