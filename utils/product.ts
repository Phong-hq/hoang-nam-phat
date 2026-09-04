// Product image helpers
// `images` is parsed once at the API boundary (see productCatalog.service.ts);
// `variants.images` is kept as a fallback for products where it's empty.

import { PRODUCT_IMAGE_PLACEHOLDER } from '~/constants'
import type { ProductCatalogItem } from '~/types'

type ProductImageSource = Pick<ProductCatalogItem, 'images' | 'variants'>

export function getProductImages(product: ProductImageSource): string[] {
  return product.images.length ? product.images : (product.variants?.images ?? [])
}

// Falls back to the shop logo when the product has no photo yet, so every
// screen that renders a thumbnail gets a real image instead of a blank/broken one.
export function getProductThumbnail(product: ProductImageSource): string {
  return getProductImages(product)[0] ?? PRODUCT_IMAGE_PLACEHOLDER
}
