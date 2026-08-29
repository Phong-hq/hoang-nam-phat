// Brand service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import { buildQueryString } from '~/utils'
import type { ApiListResponse, Brand } from '~/types'

const BRAND_API_URL = '/api/v1/frontend/product/brand/'
// Brands are a small, fully-rendered filter list -- pull them in one page instead
// of paging. The API caps `per-page` at 50, which comfortably covers the catalog.
const BRAND_PER_PAGE = 100

export const brandService = {
  async getList(): Promise<Brand[]> {
    const query = buildQueryString({ 'per-page': BRAND_PER_PAGE })
    const res = await httpClient.get<ApiListResponse<Brand>>(`${BRAND_API_URL}${query}`)
    return res.items
  },
}
