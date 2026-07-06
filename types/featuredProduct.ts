// Featured product domain types
// Defines the data structure returned by the CMS "product_featured" record API

export interface FeaturedProductOptionValue {
  value: string
  slug: string
  additional_data: string | null
}

export interface FeaturedProductOption {
  key: string
  name: string
  values: FeaturedProductOptionValue[]
}

export interface FeaturedProductVariant {
  id: number
  name: string
  slug: string
  unit_price: number
  images: string[]
}

export interface FeaturedProductDetail {
  id: number
  name: string
  slug: string
  unit_price: number
  product_options: FeaturedProductOption[]
  variants: FeaturedProductVariant[]
}

export interface FeaturedProduct {
  id: number
  product: FeaturedProductDetail
  created_at: string
  updated_at: string
}
