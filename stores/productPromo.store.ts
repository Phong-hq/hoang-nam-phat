// Product promo store -- Pinia setup store
// Manages data fetched from the CMS "product_promo" record API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productPromoService } from '~/services/productPromo.service'
import type { ProductPromoApiRecord } from '~/types'

export const useProductPromoStore = defineStore('productPromo', () => {
  const productPromo = ref<ProductPromoApiRecord | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProductPromo() {
    if (productPromo.value) {
      return
    }
    isLoading.value = true
    error.value = null
    try {
      const [first] = await productPromoService.getList()
      productPromo.value = first ?? null
    } catch {
      error.value = 'Không thể tải thông tin khuyến mãi sản phẩm'
    } finally {
      isLoading.value = false
    }
  }

  return {
    productPromo,
    isLoading,
    error,
    fetchProductPromo,
  }
})
