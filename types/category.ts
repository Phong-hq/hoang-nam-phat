// Category domain types
// Defines the category data structure returned by the ERP frontend API

export interface CategoryBrand {
  id: number
  name: string
  icon: string | false
  slug: string
}

// A sub-category. Carries its own `brands` -- a separate set from the parent's,
// not inherited -- shaped the same as the parent's.
export interface ProductCategoryChild {
  id: number
  name: string
  slug: string
  code: string
  icon: string | false
  description: string
  parent_id: number
  priority: number
  show_on_home: number
  brands: CategoryBrand[]
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
  children?: ProductCategoryChild[]
  status: number
  slug: string
}

// The category menu renders the same payload as the list endpoint -- alias kept
// so menu consumers stay decoupled from the plain list type.
export type ProductCategoryMenuItem = ProductCategory
