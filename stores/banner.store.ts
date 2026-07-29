// Banner store -- Pinia setup store
// Manages data fetched from the CMS "banner" record API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { bannerService } from '~/services/banner.service'
import type { BannerApiRecord } from '~/types'

export const useBannerStore = defineStore('banner', () => {
  const banner = ref<BannerApiRecord | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchBanner() {
    if (banner.value) {
      return
    }
    isLoading.value = true
    error.value = null
    try {
      const [first] = await bannerService.getList()
      banner.value = first ?? null
    } catch {
      error.value = 'Không thể tải banner'
    } finally {
      isLoading.value = false
    }
  }

  return {
    banner,
    isLoading,
    error,
    fetchBanner,
  }
})
