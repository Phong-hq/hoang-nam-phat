// Product catalog composable
// Thin layer that calls the service -- pages never call API directly

import type { ProductCatalogItem, ProductDetail, ProductQueryParams } from '~/types'
import { productCatalogService } from '~/services/productCatalog.service'

export function useProductCatalog() {
  async function fetchProducts(params?: ProductQueryParams): Promise<ProductCatalogItem[]> {
    return productCatalogService.getList(params)
  }

  async function fetchProductDetail(slug: string): Promise<ProductDetail> {
    return productCatalogService.getDetail(slug)
  }

  return { fetchProducts, fetchProductDetail }
}
