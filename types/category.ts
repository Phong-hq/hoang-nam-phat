// Category domain types
// Defines the category data structure returned by the ERP frontend API

export interface CategoryBrand {
  id: number
  name: string
  type: string
  code: string
  description: string
  icon: unknown
  images: unknown
  color: string | null
  priority: number
  parent_id: number | null
}

export interface ProductCategory {
  id: number
  name: string
  code: string
  icon: string | false
  created_at: string
  updated_at: string
  brands: CategoryBrand[]
  status: number
  slug: string
}
