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
  // null on a top-level category; the parent category's id on a sub-category.
  parent_id: number | null
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
  brand: ProductBrand | null
  category: ProductCategorySummary
  // The sub-category the product sits in, when it has one. `category` always stays
  // the top-level parent, so the two are shown side by side rather than one replacing
  // the other.
  sub_category: ProductCategorySummary | null
  product_options: ProductOption[]
  variants: ProductVariant
  images: string[]
}

export interface ProductAdditionalDataItem {
  name: string
  value: string
}

export interface ProductDetail extends ProductCatalogItem {
  specifications: string
  description: string
  short_description: string
  warranty_description: string
  additional_data: ProductAdditionalDataItem[]
}

export interface ProductQueryParams {
  type?: string
  keyword?: string
  brand_slug?: string
  category_slug?: string
  category_id?: string
  sub_category_id?: string
  brand_id?: string
  ids?: string
  min_price?: number
  max_price?: number
  tags?: string
  // Field name to sort by, ascending; prefix with `-` for descending (e.g. `-unit_price`).
  sort?: string
  page?: number
  'per-page'?: number
  [key: string]: string | number | undefined
}
