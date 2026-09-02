// Flash sale domain types
// Defines the data structure returned by the CMS "variant" record API

export interface FlashSaleProductDetail {
  // This is the variant id, NOT the catalog product's own id -- it collides
  // with real product ids by coincidence, never rely on it to match a product.
  // `slug` is the only reliable identity shared with the product catalog.
  id: number
  name: string
  slug: string
  unit_price: number
  compare_price: number | null
  meta_field: unknown[]
  images: string[]
}

export interface FlashSaleApiRecord {
  id: number
  product: FlashSaleProductDetail
  // The flash sale's own discounted price -- distinct from the catalog's unit_price/compare_price.
  new_price: number
  // Stock allocated to this flash sale, shown as an urgency indicator.
  quantity: number
  created_at: string
  updated_at: string
}

// Flash sale record with pricing lifted to the top level for display convenience.
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
  quantity: number
}
