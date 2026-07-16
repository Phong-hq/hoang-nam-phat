// Business composable
// Thin layer that calls the service -- pages never call API directly

import type { BusinessInfoApiRecord } from '~/types'
import { businessService } from '~/services/business.service'

export function useBusiness() {
  async function fetchBusinessInfo(): Promise<BusinessInfoApiRecord[]> {
    return businessService.getList()
  }

  return { fetchBusinessInfo }
}
