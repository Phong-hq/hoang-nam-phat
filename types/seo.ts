// SEO type definitions
// Used by composables/useSeo.ts and related SEO utilities

export interface SeoMeta {
  title?: string
  description?: string
  keywords?: string
  robots?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  ogUrl?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  noIndex?: boolean
  noFollow?: boolean
}

export interface JsonLdProduct {
  '@context': string
  '@type': string
  name: string
  description: string
  sku: string
  url?: string
  category?: string
  image: string | string[]
  brand: {
    '@type': string
    name: string
  }
  offers: {
    '@type': string
    priceCurrency: string
    price?: number
    lowPrice?: number
    highPrice?: number
    offerCount?: number
    availability: string
    itemCondition?: string
    url?: string
    seller?: {
      '@type': string
      name: string
    }
  }
  aggregateRating?: {
    '@type': string
    ratingValue: number
    reviewCount: number
  }
}

export interface JsonLdBreadcrumb {
  '@context': string
  '@type': string
  itemListElement: Array<{
    '@type': string
    position: number
    name: string
    item?: string
  }>
}

export interface BreadcrumbItem {
  name: string
  path?: string
}

export interface AlternateLink {
  hreflang: string
  href: string
}
