// Product page SEO composable
// Orchestrates all SEO tags, structured data, and canonical for a product page
// Call server-side only -- inside useAsyncData or setup at top-level

import type { Product } from '~/types'
import { SITE_URL, SITE_NAME } from '~/constants'
import { useSeo } from './useSeo'
import { useBreadcrumb } from './useBreadcrumb'
import { useJsonLd } from './useJsonLd'

export function useProductSeo(product: Product) {
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.siteUrl || SITE_URL

  const canonicalUrl = `${siteUrl}/products/${product.slug}`

  useSeo({
    title: product.seoTitle,
    description: product.seoDescription,
    canonical: canonicalUrl,
    ogTitle: product.seoTitle,
    ogDescription: product.seoDescription,
    ogImage: product.thumbnail || undefined,
    ogType: 'product',
    ogUrl: canonicalUrl,
    twitterCard: 'summary_large_image',
  })

  useBreadcrumb([
    { name: 'Trang chu', path: '/' },
    { name: product.category, path: `/categories/${product.category.toLowerCase()}` },
    { name: product.name },
  ])

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.images?.length ? product.images : product.thumbnail ? [product.thumbnail] : [],
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      price: product.price,
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    ...(product.rating && product.reviewCount
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
  }

  useJsonLd(productSchema)
}
