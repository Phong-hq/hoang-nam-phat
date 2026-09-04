// Best selling composable
// Thin layer that calls the service -- pages never call API directly
// The best_selling_product record doesn't expose the brand, so it's fetched
// from the product catalog and merged in.

import type { BestSellingRecordWithPricing } from '~/types'
import { bestSellingService } from '~/services/bestSelling.service'
import { productCatalogService } from '~/services/productCatalog.service'

export function useBestSelling() {
  async function fetchBestSellingProducts(): Promise<BestSellingRecordWithPricing[]> {
    const records = await bestSellingService.getList()
    if (!records.length) return []

    const ids = [...new Set(records.map((record) => record.product?.id))].join(',')
    const products = await productCatalogService.getList({ ids })
    const brandById = new Map(products.map((product) => [product.id, product.brand?.name ?? '']))

    return records.map((record) => ({
      ...record,
      brand: brandById.get(record.product?.id) ?? '',
    }))
  }

  return { fetchBestSellingProducts }
}
