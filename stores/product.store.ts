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

  // Set right before navigating to a product's detail page (see product card
  // click handlers) so that page can render instantly from cache instead of
  // waiting on a fresh API call.
  const selectedProduct = ref<ProductCatalogItem | null>(null)

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

  function setSelectedProduct(product: ProductCatalogItem) {
    selectedProduct.value = product
  }

  // Returns the cached product only if it matches the requested slug, and
  // clears it so it isn't reused for a later, unrelated visit.
  function consumeSelectedProduct(slug: string): ProductCatalogItem | null {
    if (selectedProduct.value?.slug !== slug) return null

    const product = selectedProduct.value
    selectedProduct.value = null
    return product
  }

  return {
    products,
    isLoading,
    error,
    selectedProduct,
    fetchProducts,
    setSelectedProduct,
    consumeSelectedProduct,
  }
})
