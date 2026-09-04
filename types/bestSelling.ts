// Best selling product domain types
// Defines the data structure returned by the CMS "best_selling_product" record API

export interface BestSellingProductDetail {
  id: number
  name: string
  slug: string
  unit_price: number
  compare_price: number | null
  meta_field: unknown[]
  images: string[]
}

// Raw shape returned by the API -- the product is keyed as `product2`, not `product`
export interface BestSellingApiRecordRaw {
  id: number
  product2: BestSellingProductDetail
  created_at: string
  updated_at: string
}

export interface BestSellingApiRecord {
  id: number
  product: BestSellingProductDetail
  created_at: string
  updated_at: string
}

// Best selling record enriched with brand from the product catalog API
// (the best_selling_product record itself doesn't expose the brand)
export interface BestSellingRecordWithPricing extends BestSellingApiRecord {
  brand: string
}
