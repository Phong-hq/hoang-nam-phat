// Product composable
// Thin layer that calls the service -- pages never call API directly
// Flow: Page -> Composable -> Service -> Repository -> API

import type { Product, ProductListItem, ProductFilters, PaginatedResponse } from '~/types'
import { productService } from '~/services/product.service'

export function useProduct() {
  async function fetchProduct(slug: string): Promise<Product | null> {
    return productService.getBySlug(slug)
  }

  async function fetchProducts(filters?: ProductFilters): Promise<PaginatedResponse<ProductListItem>> {
    return productService.getList(filters)
  }

  return { fetchProduct, fetchProducts }
}
