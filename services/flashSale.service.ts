// Flash sale service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, FlashSaleApiRecord } from '~/types'

const FLASH_SALE_API_URL = '/api/v1/frontend/cms/record/flash_sale'

export const flashSaleService = {
  async getList(): Promise<FlashSaleApiRecord[]> {
    const res = await httpClient.get<ApiListResponse<FlashSaleApiRecord>>(FLASH_SALE_API_URL)
    return res.items
  },
}
