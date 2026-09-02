// Terms store -- Pinia setup store
// Manages data fetched from the CMS "terms" record API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { termsService } from '~/services/terms.service'
import type { TermsApiRecord } from '~/types'

export const useTermsStore = defineStore('terms', () => {
  const termsInfo = ref<TermsApiRecord | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTermsInfo() {
    if (termsInfo.value) {
      return
    }
    isLoading.value = true
    error.value = null
    try {
      const [first] = await termsService.getList()
      termsInfo.value = first ?? null
    } catch {
      error.value = 'Không thể tải nội dung điều khoản'
    } finally {
      isLoading.value = false
    }
  }

  return {
    termsInfo,
    isLoading,
    error,
    fetchTermsInfo,
  }
})
