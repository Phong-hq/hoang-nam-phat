// Category service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { ApiListResponse, ProductCategory, ProductCategoryMenuItem } from '~/types'

const CATEGORY_API_URL = '/api/v1/frontend/product/category/'

export const categoryService = {
  async getList(): Promise<ProductCategory[]> {
    const res = await httpClient.get<ApiListResponse<ProductCategory>>(CATEGORY_API_URL)
    console.log('categoryService.getList() response:', res)
    return res.items
  },

  async getMenu(): Promise<ProductCategoryMenuItem[]> {
    return httpClient.get<ProductCategoryMenuItem[]>(`${CATEGORY_API_URL}menu`)
  },
}
