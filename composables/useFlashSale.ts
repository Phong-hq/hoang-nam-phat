// Flash sale composable
// Thin layer that calls the service -- pages never call API directly

import type { FlashSaleApiRecord } from '~/types'
import { flashSaleService } from '~/services/flashSale.service'

export function useFlashSale() {
  async function fetchFlashSaleProducts(): Promise<FlashSaleApiRecord[]> {
    return flashSaleService.getList()
  }

  return { fetchFlashSaleProducts }
}
