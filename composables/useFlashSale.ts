// Flash sale composable
// Thin layer that calls the service -- pages never call API directly
// The flash_sale record's nested `product.id` is actually a variant id (it can
// collide with unrelated catalog product ids), so pricing is read straight off
// the record's own product payload instead of cross-referencing the catalog by id.

import type { FlashSaleRecordWithPricing } from '~/types'
import { flashSaleService } from '~/services/flashSale.service'

export function useFlashSale() {
  async function fetchFlashSaleProducts(): Promise<FlashSaleRecordWithPricing[]> {
    const records = await flashSaleService.getList()
    return records.map((record) => ({
      ...record,
      unitPrice: record.product.unit_price,
      comparePrice: record.product.compare_price ?? null,
    }))
  }

  return { fetchFlashSaleProducts }
}
