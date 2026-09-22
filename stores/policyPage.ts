// Policy page store -- Pinia setup store
// Manages the list of posts fetched from the CMS "policy_page" record API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { policyPageService } from '~/services/policyPage.service'
import type { PolicyPageApiRecord } from '~/types'

export const usePolicyPageStore = defineStore('policyPage', () => {
  const policyList = ref<PolicyPageApiRecord[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPolicyList() {
    if (policyList.value.length) {
      return
    }
    isLoading.value = true
    error.value = null
    try {
      policyList.value = await policyPageService.getList()
    } catch {
      error.value = 'Không thể tải danh sách chính sách'
    } finally {
      isLoading.value = false
    }
  }

  function getById(id: number): PolicyPageApiRecord | undefined {
    return policyList.value.find((item) => item.id === id)
  }

  return {
    policyList,
    isLoading,
    error,
    fetchPolicyList,
    getById,
  }
})
