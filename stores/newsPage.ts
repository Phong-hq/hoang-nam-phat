// News page store -- Pinia setup store
// Manages the list of posts fetched from the CMS "news_page" record API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { newsPageService } from '~/services/newsPage.service'
import type { NewsPageApiRecord } from '~/types'

export const useNewsPageStore = defineStore('newsPage', () => {
  const newsList = ref<NewsPageApiRecord[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchNewsList() {
    if (newsList.value.length) {
      return
    }
    isLoading.value = true
    error.value = null
    try {
      newsList.value = await newsPageService.getList()
    } catch {
      error.value = 'Không thể tải danh sách tin tức'
    } finally {
      isLoading.value = false
    }
  }

  function getById(id: number): NewsPageApiRecord | undefined {
    return newsList.value.find((item) => item.id === id)
  }

  return {
    newsList,
    isLoading,
    error,
    fetchNewsList,
    getById,
  }
})
