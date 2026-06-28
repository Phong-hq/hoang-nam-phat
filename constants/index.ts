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
  CHECKOUT: '/api/checkout',
} as const

export const PROVINCES = [
  'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
  'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu',
  'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước',
  'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông',
  'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang',
  'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình',
  'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu',
  'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định',
  'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên',
  'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị',
  'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên',
  'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang',
  'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái',
] as const
