// Product image helpers
// `images` is parsed once at the API boundary (see productCatalog.service.ts);
// `variants.images` is kept as a fallback for products where it's empty.

import type { ProductCatalogItem } from '~/types'

type ProductImageSource = Pick<ProductCatalogItem, 'images' | 'variants'>

export function getProductImages(product: ProductImageSource): string[] {
  return product.images.length ? product.images : (product.variants?.images ?? [])
}

export function getProductThumbnail(product: ProductImageSource): string | undefined {
  return getProductImages(product)[0]
}
