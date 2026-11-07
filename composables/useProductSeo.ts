// Product page SEO composable
// Orchestrates all SEO tags, structured data, and canonical for a product page
// Call server-side only -- inside useAsyncData or setup at top-level

import type { ProductDetail } from '~/types'
import { SITE_URL, SITE_NAME, DEFAULT_HOTLINE } from '~/constants'
import { formatCurrency, getProductImages, getProductThumbnail } from '~/utils'
import { useSeo } from './useSeo'
import { useBreadcrumb } from './useBreadcrumb'
import { useJsonLd } from './useJsonLd'

// Google cắt mô tả ở khoảng 155-160 ký tự.
const MAX_DESCRIPTION_LENGTH = 160

function stripHtml(value?: string | null): string {
  return (value ?? '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
}

function truncate(value: string, max: number): string {
  if (value.length <= max) return value
  const cut = value.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ') > 0 ? cut.lastIndexOf(' ') : cut.length)}…`
}

// Phần lớn sản phẩm trong ERP chưa có mô tả ngắn, nên mô tả hiện dưới kết quả Google
// (và khi chia sẻ link lên Facebook/Zalo) chỉ là tên sản phẩm. Khi thiếu, dựng một câu
// bán hàng từ dữ liệu có sẵn: tên, hãng, giá, hotline.
function buildDescription(product: ProductDetail, price: number, hotline: string): string {
  const short = stripHtml(product.short_description)
  if (short) return truncate(short, MAX_DESCRIPTION_LENGTH)

  const brand = product.brand?.name?.trim()
  const nameHasBrand = brand ? product.name.toLowerCase().includes(brand.toLowerCase()) : true
  const subject = `${product.name} chính hãng${brand && !nameHasBrand ? ` ${brand}` : ''}`
  const priceText = price > 0 ? `giá ${formatCurrency(price)}` : 'giá tốt'
  const full = `Mua ${subject}, ${priceText}. Bảo hành chính hãng, giao hàng toàn quốc. Hotline ${hotline}.`
  if (full.length <= MAX_DESCRIPTION_LENGTH) return full
  // Tên quá dài: bỏ phần đuôi phụ, giữ tên + giá + hotline.
  return truncate(`Mua ${subject}, ${priceText}. Hotline ${hotline}.`, MAX_DESCRIPTION_LENGTH)
}

export function useProductSeo(product: ProductDetail) {
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.siteUrl || SITE_URL
  const hotline = useBusinessStore().businessInfo?.phone?.[0] || DEFAULT_HOTLINE

  const canonicalUrl = `${siteUrl}/products/${product.slug}`
  const image = getProductThumbnail(product)
  const listPrice = product.variants?.unit_price || product.unit_price || 0
  const seoDescription = buildDescription(product, listPrice, hotline)

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
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/products' },
    { name: product.category.name, path: `/products?category=${product.category.slug}` },
    { name: product.name },
  ])

  // Same price the page shows (variant first, then product). 0/empty renders
  // "Liên hệ báo giá" -- quote-only, no fixed price to advertise. Emitting
  // price: 0 would misrepresent the offer to Google, so the Offer is dropped
  // entirely in that case instead of carrying a fake price.
  const price = listPrice
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
