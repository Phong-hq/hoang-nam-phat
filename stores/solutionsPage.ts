// Solutions page store -- Pinia setup store
// Manages data fetched from the CMS "solutions_page" record API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { solutionsPageService } from '~/services/solutionsPage.service'
import type { SolutionsPageApiRecord } from '~/types'

export const useSolutionsPageStore = defineStore('solutionsPage', () => {
  const solutionsInfo = ref<SolutionsPageApiRecord | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchSolutionsInfo() {
    if (solutionsInfo.value) {
      return
    }
    isLoading.value = true
    error.value = null
    try {
      const [first] = await solutionsPageService.getList()
      solutionsInfo.value = first ?? null
    } catch {
      error.value = 'Không thể tải nội dung giải pháp'
    } finally {
      isLoading.value = false
    }
  }

  return {
    solutionsInfo,
    isLoading,
    error,
    fetchSolutionsInfo,
  }
})
