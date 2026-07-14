// Session store -- Pinia setup store
// Manages data fetched from the CMS "test" record API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { recordTestService } from '~/services/recordTest.service'
import type { SessionRecord } from '~/types'

export const useSessionStore = defineStore('session', () => {
  const session = ref<SessionRecord[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchRecords(recordType: string = 'dashboard_session') {
    isLoading.value = true
    error.value = null
    try {
      if(session.value.length > 0) {
        return
      }
      session.value = await recordTestService.getList(recordType)
      console.log('Fetched session records:', session.value)
    } catch {
      error.value = 'Không thể tải dữ liệu'
    } finally {
      isLoading.value = false
    }
  }

  return {
    session,
    isLoading,
    error,
    fetchRecords,
  }
})
