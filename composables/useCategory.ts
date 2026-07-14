// Category composable
// Thin layer that calls the service -- pages never call API directly
// Flow: Page -> Composable -> Service -> Repository -> API

import type { ProductCategory, ProductCategoryMenuItem } from '~/types'
import { categoryService } from '~/services/category.service'

export function useCategory() {
  async function fetchCategories(): Promise<ProductCategory[]> {
    return categoryService.getList()
  }

  async function fetchCategoryMenu(): Promise<ProductCategoryMenuItem[]> {
    return categoryService.getMenu()
  }

  return { fetchCategories, fetchCategoryMenu }
}
