// Product domain types
// Defines all product-related data structures used across the application

export interface ProductSpecification {
  label: string
  value: string
}

export interface Product {
  id: number
  slug: string
  name: string
  seoTitle: string
  seoDescription: string
  thumbnail: string
  images: string[]
  price: number
  originalPrice?: number
  sku: string
  brand: string
  category: string
  description: string
  specifications?: ProductSpecification[]
  stock?: number
  rating?: number
  reviewCount?: number
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface HomeProduct {
  id: number
  slug?: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  ratingCount: number
  image?: string
  isNew?: boolean
  inStock?: boolean
}

export interface ProductListItem {
  id: number
  slug: string
  name: string
  thumbnail: string
  price: number
  originalPrice?: number
  brand: string
  category: string
  rating?: number
  reviewCount?: number
  updatedAt?: string
}

export interface ProductFilters {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular'
  page?: number
  limit?: number
}
