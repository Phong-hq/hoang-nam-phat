// Best selling product service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import { normalizeProductPrice } from '~/utils/product'
import type { ApiListResponse, BestSellingApiRecord, BestSellingApiRecordRaw } from '~/types'

const BEST_SELLING_API_URL = '/api/v1/frontend/cms/record/best_selling_product'

// The API keys the product as `product2`; normalize it to `product` right at the
// API boundary so the rest of the app never has to know about that naming quirk.
function normalizeRecord(record: BestSellingApiRecordRaw): BestSellingApiRecord {
  const { product2, ...rest } = record
  return { ...rest, product: normalizeProductPrice(product2) }
}

export const bestSellingService = {
  async getList(): Promise<BestSellingApiRecord[]> {
    const res = await httpClient.get<ApiListResponse<BestSellingApiRecordRaw>>(BEST_SELLING_API_URL)
    return res.items.map(normalizeRecord)
  },
}
