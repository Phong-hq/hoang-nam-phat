// Best selling product domain types
// Defines the data structure returned by the CMS "best_selling_product" record API

export interface BestSellingProductDetail {
  id: number
  name: string
  slug: string
  unit_price: number
  meta_field: unknown[]
  images: string[]
}

export interface BestSellingApiRecord {
  id: number
  product: BestSellingProductDetail
  created_at: string
  updated_at: string
}

// Best selling record enriched with real pricing/brand from the product catalog API
// (the best_selling_product record itself only exposes the variant's unit_price)
export interface BestSellingRecordWithPricing extends BestSellingApiRecord {
  unitPrice: number
  comparePrice: number | null
  brand: string
}
