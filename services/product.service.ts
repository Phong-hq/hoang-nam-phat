// Product service
// Contains business logic between composable and repository
// Flow: Composable -> Service -> Repository

import type { Product, ProductListItem, ProductFilters, PaginatedResponse } from '~/types'
import { productRepository } from '~/repositories/product.repository'

export const productService = {
  async getBySlug(slug: string): Promise<Product | null> {
    if (!slug || typeof slug !== 'string') return null
    return productRepository.getBySlug(slug.trim().toLowerCase())
  },

  async getList(filters?: ProductFilters): Promise<PaginatedResponse<ProductListItem>> {
    return productRepository.getList(filters)
  },
}
