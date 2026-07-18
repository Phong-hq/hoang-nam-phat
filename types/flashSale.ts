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

// Flash sale record enriched with real pricing from the product catalog API
// (the flash_sale record itself only exposes the variant's unit_price, not compare_price)
export interface FlashSaleRecordWithPricing extends FlashSaleApiRecord {
  unitPrice: number
  comparePrice: number | null
}

// Display-ready shape consumed by the Flash Sale card component
export interface FlashSaleProduct {
  id: number
  slug: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  discount?: number
  image?: string
  soldPercent: number
}
