// Product repository
// Responsible only for HTTP communication -- no business logic here
// Flow: Service -> Repository -> API

import type { Product, ProductListItem, ProductFilters, PaginatedResponse } from '~/types'
import { buildQueryString } from '~/utils'

export const productRepository = {
  async getBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await useFetch<Product>(`/api/products/${slug}`)
    if (error.value || !data.value) return null
    return data.value
  },

  async getList(filters?: ProductFilters): Promise<PaginatedResponse<ProductListItem>> {
    const query = buildQueryString((filters as Record<string, string | number | boolean | undefined>) ?? {})
    const { data } = await useFetch<PaginatedResponse<ProductListItem>>(`/api/products${query}`)
    return data.value ?? {
      data: [],
      meta: { currentPage: 1, totalPages: 0, totalItems: 0, itemsPerPage: 20, hasNextPage: false, hasPrevPage: false },
    }
  },
}
