// Business store -- Pinia setup store
// Manages data fetched from the CMS "business_info" record API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { businessService } from '~/services/business.service'
import type { BusinessInfoRecord } from '~/types'

export const useBusinessStore = defineStore('business', () => {
  const businessInfo = ref<BusinessInfoRecord | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchBusinessInfo() {
    if (businessInfo.value) {
      return
    }
    isLoading.value = true
    error.value = null
    try {
      const [first] = await businessService.getList()
      businessInfo.value = first
        ? { ...first, phone: first.phone.split(',').map(p => p.trim()) }
        : null
    } catch {
      error.value = 'Không thể tải thông tin doanh nghiệp'
    } finally {
      isLoading.value = false
    }
  }

  return {
    businessInfo,
    isLoading,
    error,
    fetchBusinessInfo,
  }
})
