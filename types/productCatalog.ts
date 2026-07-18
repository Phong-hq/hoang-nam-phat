// Product catalog domain types
// Defines the data structure returned by the ERP "product/product" list API

export interface ProductBrand {
  id: number
  name: string
  icon: string | false
  slug: string
}

export interface ProductCategorySummary {
  id: number
  name: string
  slug: string
}

export interface ProductOptionValue {
  value: string
  slug: string
  additional_data: string | null
}

export interface ProductOption {
  key: string
  name: string
  values: ProductOptionValue[]
}

export interface ProductVariantMetaField {
  key: string
  name: string
  value: string
  additional_data: string | null
  slug: string
}

export interface ProductVariant {
  id: number
  name: string
  slug: string
  extra_fields: unknown
  meta_field: ProductVariantMetaField[]
  unit_price: number
  images: string[]
}

export interface ProductCatalogItem {
  id: number
  name: string
  slug: string
  unit_price: number
  compare_price: number | null
  brand: ProductBrand
  category: ProductCategorySummary
  product_options: ProductOption[]
  variants: ProductVariant[]
}

export interface ProductDetail extends ProductCatalogItem {
  specifications: string
  description: string
  short_description: string
  warranty_description: string
}

export interface ProductQueryParams {
  type?: string
  keyword?: string
  brand_slug?: string
  category_slug?: string
  category_id?: string
  brand_id?: string
  ids?: string
  min_price?: number
  max_price?: number
  tags?: string
  [key: string]: string | number | undefined
}
