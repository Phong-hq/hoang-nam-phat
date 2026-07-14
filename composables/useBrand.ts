// Brand composable
// Thin layer that calls the service -- pages never call API directly

import type { Brand } from '~/types'
import { brandService } from '~/services/brand.service'

export function useBrand() {
  async function fetchBrands(): Promise<Brand[]> {
    return brandService.getList()
  }

  return { fetchBrands }
}
