// Product store -- Pinia setup store
// Manages product list, filters, and active product state

import { defineStore } from 'pinia'
import type { Product, ProductListItem, ProductFilters, PaginatedResponse } from '~/types'

export const useProductStore = defineStore('product', () => {
  const products = ref<ProductListItem[]>([])
  const currentProduct = ref<Product | null>(null)
  const pagination = ref<PaginatedResponse<ProductListItem>['meta'] | null>(null)
  const filters = ref<ProductFilters>({})
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  function setProducts(data: PaginatedResponse<ProductListItem>) {
    products.value = data.data
    pagination.value = data.meta
  }

  function setCurrentProduct(product: Product | null) {
    currentProduct.value = product
  }

  function setFilters(newFilters: Partial<ProductFilters>) {
    filters.value = { ...filters.value, ...newFilters }
  }

  function resetFilters() {
    filters.value = {}
  }

  function setLoading(value: boolean) {
    isLoading.value = value
  }

  function setError(message: string | null) {
    error.value = message
  }

  return {
    products,
    currentProduct,
    pagination,
    filters,
    isLoading,
    error,
    setProducts,
    setCurrentProduct,
    setFilters,
    resetFilters,
    setLoading,
    setError,
  }
})
