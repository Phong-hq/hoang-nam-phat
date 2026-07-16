// Social store -- Pinia setup store
// Manages data fetched from the CMS "social" record API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { socialService } from '~/services/social.service'
import type { SocialApiRecord } from '~/types'

export const useSocialStore = defineStore('social', () => {
  const socialLinks = ref<SocialApiRecord | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchSocialLinks() {
    if (socialLinks.value) {
      return
    }
    isLoading.value = true
    error.value = null
    try {
      const [first] = await socialService.getList()
      socialLinks.value = first ?? null
    } catch {
      error.value = 'Không thể tải liên kết mạng xã hội'
    } finally {
      isLoading.value = false
    }
  }

  return {
    socialLinks,
    isLoading,
    error,
    fetchSocialLinks,
  }
})
