// Product promo domain type
// Defines the data structure returned by the CMS "product_promo" record API

export interface ProductPromoApiRecord {
  id: number
  content: string | null
  created_at: string
  updated_at: string
}
