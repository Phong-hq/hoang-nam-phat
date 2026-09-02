// Category domain types
// Defines the category data structure returned by the ERP frontend API

export interface CategoryBrand {
  id: number
  name: string
  icon: string | false
  slug: string
}

export interface ProductCategory {
  id: number
  name: string
  code: string
  // The icon's key into CATEGORY_ICONS (see ~/constants/categoryIcons).
  icon: string | false
  description: string
  created_at: string
  updated_at: string
  brands: CategoryBrand[]
  status: number
  slug: string
}

// The category menu renders the same payload as the list endpoint -- alias kept
// so menu consumers stay decoupled from the plain list type.
export type ProductCategoryMenuItem = ProductCategory
