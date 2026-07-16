// Flash sale domain types
// Defines the data structure returned by the CMS "variant" record API

export interface FlashSaleProductDetail {
  id: number
  name: string
  slug: string
  unit_price: number
  meta_field: unknown[]
  images: string[]
}

export interface FlashSaleApiRecord {
  id: number
  product: FlashSaleProductDetail
  created_at: string
  updated_at: string
}

// Display-ready shape consumed by the Flash Sale card component
export interface FlashSaleProduct {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  discount: number
  image?: string
  soldPercent: number
}
