// Flash sale store -- Pinia setup store
// Caches the merged flash-sale + catalog pricing data so pages that need to know
// whether a product is on flash sale (home list, product detail) share one fetch.

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFlashSale } from '~/composables/useFlashSale'
import type { FlashSaleRecordWithPricing } from '~/types'

export const useFlashSaleStore = defineStore('flashSale', () => {
  const records = ref<FlashSaleRecordWithPricing[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchFlashSaleProducts() {
    if (records.value.length) return
    isLoading.value = true
    error.value = null
    try {
      records.value = await useFlashSale().fetchFlashSaleProducts()
    } catch {
      error.value = 'Không thể tải dữ liệu flash sale'
    } finally {
      isLoading.value = false
    }
  }

  return {
    records,
    isLoading,
    error,
    fetchFlashSaleProducts,
  }
})
