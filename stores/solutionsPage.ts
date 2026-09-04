// Solutions page store -- Pinia setup store
// Manages the list of posts fetched from the CMS "solutions_page" record API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { solutionsPageService } from '~/services/solutionsPage.service'
import type { SolutionsPageApiRecord } from '~/types'

export const useSolutionsPageStore = defineStore('solutionsPage', () => {
  const solutionsList = ref<SolutionsPageApiRecord[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchSolutionsList() {
    if (solutionsList.value.length) {
      return
    }
    isLoading.value = true
    error.value = null
    try {
      solutionsList.value = await solutionsPageService.getList()
    } catch {
      error.value = 'Không thể tải danh sách giải pháp'
    } finally {
      isLoading.value = false
    }
  }

  function getById(id: number): SolutionsPageApiRecord | undefined {
    return solutionsList.value.find((item) => item.id === id)
  }

  return {
    solutionsList,
    isLoading,
    error,
    fetchSolutionsList,
    getById,
  }
})
