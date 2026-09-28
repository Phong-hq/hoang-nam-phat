// Product page SEO composable
// Orchestrates all SEO tags, structured data, and canonical for a product page
// Call server-side only -- inside useAsyncData or setup at top-level

import type { ProductDetail } from '~/types'
import { SITE_URL, SITE_NAME } from '~/constants'
import { getProductImages, getProductThumbnail } from '~/utils'
import { useSeo } from './useSeo'
import { useBreadcrumb } from './useBreadcrumb'
import { useJsonLd } from './useJsonLd'

export function useProductSeo(product: ProductDetail) {
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.siteUrl || SITE_URL

  const canonicalUrl = `${siteUrl}/products/${product.slug}`
  const image = getProductThumbnail(product)
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

  // Same price the page shows (variant first, then product). 0/empty renders
  // "Liên hệ báo giá" -- quote-only, no fixed price to advertise. Emitting
  // price: 0 would misrepresent the offer to Google, so the Offer is dropped
  // entirely in that case instead of carrying a fake price.
  const price = product.variants?.unit_price || product.unit_price || 0
  const offers = price > 0
    ? {
        '@type': 'Offer',
        priceCurrency: 'VND',
        price,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: canonicalUrl,
        seller: {
          '@type': 'Organization',
          name: SITE_NAME,
        },
      }
    : null

  // Real product photos only, as absolute URLs -- the shop-logo placeholder
  // isn't a product image and must not be reported as one.
  const images = getProductImages(product).map((src) => new URL(src, siteUrl).href)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: seoDescription,
    sku: String(product.id),
    url: canonicalUrl,
    category: product.category.name,
    ...(images.length ? { image: images } : {}),
    ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand.name } } : {}),
    ...(offers ? { offers } : {}),
  }

  useJsonLd(productSchema, 'jsonld-product')
}
