// Category store -- Pinia setup store
// Manages category list state and fetching from the ERP API

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categoryService } from '~/services/category.service'
import type { ProductCategoryMenuItem } from '~/types'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<ProductCategoryMenuItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCategories() {
    isLoading.value = true
    error.value = null
    try {
      // API tra ve thu tu nguoc voi thu tu hien thi -- dao ngay khi luu,
      // moi noi dung store da co dung thu tu, khong can sort lai
      categories.value = (await categoryService.getMenu()).reverse()
    } catch {
      error.value = 'Không thể tải danh mục'
    } finally {
      isLoading.value = false
    }
  }

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
  }
})
