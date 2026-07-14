// Brand store -- Pinia setup store
// Manages brand list state and fetching from the ERP API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { brandService } from '~/services/brand.service'
import type { Brand } from '~/types'

export const useBrandStore = defineStore('brand', () => {
  const brands = ref<Brand[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchBrands() {
    isLoading.value = true
    error.value = null
    try {
      brands.value = await brandService.getList()
    } catch {
      error.value = 'Không thể tải thương hiệu'
    } finally {
      isLoading.value = false
    }
  }

  return {
    brands,
    isLoading,
    error,
    fetchBrands,
  }
})
