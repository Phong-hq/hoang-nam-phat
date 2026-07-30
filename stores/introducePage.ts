// Introduce page store -- Pinia setup store
// Manages data fetched from the CMS "introduce_page" record API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { introducePageService } from '~/services/introducePage.service'
import type { IntroducePageApiRecord } from '~/types'

export const useIntroducePageStore = defineStore('introducePage', () => {
  const introduceInfo = ref<IntroducePageApiRecord | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchIntroduceInfo() {
    if (introduceInfo.value) {
      return
    }
    isLoading.value = true
    error.value = null
    try {
      const [first] = await introducePageService.getList()
      introduceInfo.value = first ?? null
    } catch {
      error.value = 'Không thể tải nội dung giới thiệu'
    } finally {
      isLoading.value = false
    }
  }

  return {
    introduceInfo,
    isLoading,
    error,
    fetchIntroduceInfo,
  }
})
