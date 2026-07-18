// Application-wide constants
// Import from here instead of defining inline magic strings

export const SITE_NAME = 'Hoang Nam Phat'
export const SITE_URL = 'https://hoangnamphat.vn'
export const SITE_DESCRIPTION = 'Mua sam thiet bi cong nghe chinh hang tai Hoang Nam Phat.'
export const SITE_KEYWORDS = 'dien thoai, laptop, tablet, phu kien, chinh hang'
export const DEFAULT_OG_IMAGE = '/images/og-default.jpg'
export const DEFAULT_TWITTER_CARD = 'summary_large_image' as const
export const DEFAULT_ROBOTS = 'index, follow'
export const CURRENCY = 'VND'
export const CURRENCY_LOCALE = 'vi-VN'
export const ITEMS_PER_PAGE = 20
export const MAX_SITEMAP_URLS = 50000

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT: (slug: string) => `/products/${slug}`,
  CATEGORIES: '/categories',
  CATEGORY: (slug: string) => `/categories/${slug}`,
  SEARCH: '/search',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ACCOUNT: '/account',
  ADMIN: '/admin',
} as const

export const API_ROUTES = {
  PRODUCTS: '/api/products',
  PRODUCT: (slug: string) => `/api/products/${slug}`,
  CATEGORIES: '/api/categories',
} as const
