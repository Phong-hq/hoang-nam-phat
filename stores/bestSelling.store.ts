// Best selling store -- Pinia setup store
// Caches the merged best-selling + catalog pricing data so every page that shows
// a "best selling" sidebar/section (solutions, about, product detail, home) shares one fetch.

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useBestSelling } from '~/composables/useBestSelling'
import type { BestSellingRecordWithPricing } from '~/types'

export const useBestSellingStore = defineStore('bestSelling', () => {
  const records = ref<BestSellingRecordWithPricing[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchBestSellingProducts() {
    if (records.value.length) return
    isLoading.value = true
    error.value = null
    try {
      records.value = await useBestSelling().fetchBestSellingProducts()
    } catch {
      error.value = 'Không thể tải sản phẩm bán chạy'
    } finally {
      isLoading.value = false
    }
  }

  return {
    records,
    isLoading,
    error,
    fetchBestSellingProducts,
  }
})
