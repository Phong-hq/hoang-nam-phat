// Category service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, ProductCategory, ProductCategoryMenuItem } from '~/types'

const CATEGORY_API_URL = '/api/v1/frontend/product/category'

export const categoryService = {
  async getList(): Promise<ProductCategory[]> {
    const res = await httpClient.get<ApiListResponse<ProductCategory>>(CATEGORY_API_URL)
    return res.items
  },

  // The menu is built from the same category list endpoint -- categories carry
  // their `brands`, which is what the menu flyout renders.
  async getMenu(): Promise<ProductCategoryMenuItem[]> {
    const res = await httpClient.get<ApiListResponse<ProductCategoryMenuItem>>(CATEGORY_API_URL)
    return res.items
  },
}
