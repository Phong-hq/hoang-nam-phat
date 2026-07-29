// Best selling composable
// Thin layer that calls the service -- pages never call API directly
// The best_selling_product record only exposes the variant's unit_price, so the real
// unit_price/compare_price/brand is fetched from the product catalog and merged in.

import type { BestSellingRecordWithPricing } from '~/types'
import { bestSellingService } from '~/services/bestSelling.service'
import { productCatalogService } from '~/services/productCatalog.service'

export function useBestSelling() {
  async function fetchBestSellingProducts(): Promise<BestSellingRecordWithPricing[]> {
    const records = await bestSellingService.getList()
    if (!records.length) return []

    const ids = [...new Set(records.map((record) => record.product.id))].join(',')
    const products = await productCatalogService.getList({ ids })
    const productById = new Map(products.map((product) => [product.id, product]))

    return records.map((record) => {
      const product = productById.get(record.product.id)
      return {
        ...record,
        unitPrice: product?.unit_price ?? record.product.unit_price,
        comparePrice: product?.compare_price ?? null,
        brand: product?.brand.name ?? '',
      }
    })
  }

  return { fetchBestSellingProducts }
}
