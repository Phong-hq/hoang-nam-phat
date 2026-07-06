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
    { name: product.category.name, path: `/categories/${product.category.slug}` },
    { name: product.name },
  ])

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: seoDescription,
    image: product.variants.flatMap((v) => v.images),
    brand: {
      '@type': 'Brand',
      name: product.brand.name,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      price: product.unit_price,
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
  }

  useJsonLd(productSchema)
}
