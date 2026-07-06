// Product store -- Pinia setup store
// Manages the product list, fetched from the ERP product catalog API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productCatalogService } from '~/services/productCatalog.service'
import type { ProductCatalogItem, ProductQueryParams } from '~/types'

export const useProductStore = defineStore('product', () => {
  const products = ref<ProductCatalogItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProducts(params: ProductQueryParams = { type: 'new' }) {
    isLoading.value = true
    error.value = null
    try {
      products.value = await productCatalogService.getList(params)
    } catch {
      error.value = 'Không thể tải sản phẩm'
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    isLoading,
    error,
    fetchProducts,
  }
})
