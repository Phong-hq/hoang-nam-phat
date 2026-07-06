// Featured product composable
// Thin layer that calls the service -- pages never call API directly

import type { FeaturedProduct } from '~/types'
import { featuredProductService } from '~/services/featuredProduct.service'

export function useFeaturedProduct() {
  async function fetchFeaturedProducts(): Promise<FeaturedProduct[]> {
    return featuredProductService.getList()
  }

  return { fetchFeaturedProducts }
}
