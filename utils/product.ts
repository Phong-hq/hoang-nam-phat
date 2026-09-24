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

// The ERP sometimes leaves the selling price empty/0 and only fills in the
// "before discount" price. In that case the before-discount price IS the real
// selling price: promote it to unit_price and drop compare_price, so no screen
// shows "Liên hệ báo giá" next to a struck-through price. Applied once at the
// API boundary (services) so every screen gets the corrected pair.
type PricedItem = {
  unit_price: number | null
  compare_price: number | null
  variants?: { unit_price: number | null } | null
}

export function normalizeProductPrice<T extends PricedItem>(item: T): T {
  const comparePrice = item.compare_price ?? 0
  if ((item.unit_price ?? 0) > 0 || comparePrice <= 0) return item
  const variants = item.variants && !((item.variants.unit_price ?? 0) > 0)
    ? { ...item.variants, unit_price: comparePrice }
    : item.variants
  return { ...item, unit_price: comparePrice, compare_price: null, variants } as T
}
