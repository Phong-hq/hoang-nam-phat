// Product page SEO composable
// Orchestrates all SEO tags, structured data, and canonical for a product page
// Call server-side only -- inside useAsyncData or setup at top-level

import type { ProductDetail } from '~/types'
import { SITE_URL, SITE_NAME } from '~/constants'
import { useSeo } from './useSeo'
import { useBreadcrumb } from './useBreadcrumb'
import { useJsonLd } from './useJsonLd'

export function useProductSeo(product: ProductDetail) {
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.siteUrl || SITE_URL

  const canonicalUrl = `${siteUrl}/products/${product.slug}`
  const image = product.variants[0]?.images[0]
  const seoDescription = product.short_description || product.name

  useSeo({
    title: product.name,
    description: seoDescription,
    canonical: canonicalUrl,
    ogTitle: product.name,
    ogDescription: seoDescription,
    ogImage: image,
    ogType: 'product',
    ogUrl: canonicalUrl,
    twitterCard: 'summary_large_image',
  })

  useBreadcrumb([
    { name: 'Trang chu', path: '/' },
    { name: product.category.name, path: `/products?category=${product.category.slug}` },
    { name: product.name },
  ])

  const prices = product.variants.length ? product.variants.map((v) => v.unit_price) : [product.unit_price]
  const lowPrice = Math.min(...prices)
  const highPrice = Math.max(...prices)

  const offers = lowPrice === highPrice
    ? {
        '@type': 'Offer',
        priceCurrency: 'VND',
        price: lowPrice,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: canonicalUrl,
        seller: {
          '@type': 'Organization',
          name: SITE_NAME,
        },
      }
    : {
        '@type': 'AggregateOffer',
        priceCurrency: 'VND',
        lowPrice,
        highPrice,
        offerCount: prices.length,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: canonicalUrl,
        seller: {
          '@type': 'Organization',
          name: SITE_NAME,
        },
      }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: seoDescription,
    sku: String(product.id),
    url: canonicalUrl,
    category: product.category.name,
    image: product.variants.flatMap((v) => v.images),
    brand: {
      '@type': 'Brand',
      name: product.brand.name,
    },
    offers,
  }

  useJsonLd(productSchema)
}
