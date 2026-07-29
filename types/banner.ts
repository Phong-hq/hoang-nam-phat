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

export interface BannerApiRecord {
  id: number
  main: string
  left: string[]
  right: string[]
  created_at: string
  updated_at: string
}
