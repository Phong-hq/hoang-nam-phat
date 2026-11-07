// Gửi sự kiện đo lường (GA4 / Google Tag Manager / Facebook Pixel).
// Mã đo lường được nạp ở plugins/analytics.client.ts. Chưa điền mã (env trống) thì mọi
// hàm ở đây chỉ đẩy vào hàng đợi rỗng, không gây lỗi và không gửi gì đi đâu.

import { CURRENCY } from '~/constants'

export interface TrackItem {
  id: number | string
  name: string
  price: number
  quantity?: number
  brand?: string
  category?: string
}

export type ContactChannel = 'phone' | 'zalo' | 'messenger'

type AnyFn = (...args: unknown[]) => void
interface TrackingWindow {
  dataLayer?: unknown[]
  gtag?: AnyFn
  fbq?: AnyFn
  // Đặt bởi plugin khi GA4 được gắn trực tiếp (không qua GTM) -- khi đó sự kiện phải
  // đi qua gtag('event'), vì gtag không đọc các object { event } đẩy thẳng vào dataLayer.
  __hnpGtagDirect?: boolean
}

function getWindow(): TrackingWindow | null {
  return import.meta.client ? (window as unknown as TrackingWindow) : null
}

function sendEcommerce(event: string, items: TrackItem[], extra: Record<string, unknown> = {}) {
  const w = getWindow()
  if (!w) return

  const gaItems = items.map((item) => ({
    item_id: String(item.id),
    item_name: item.name,
    price: item.price,
    quantity: item.quantity ?? 1,
    ...(item.brand ? { item_brand: item.brand } : {}),
    ...(item.category ? { item_category: item.category } : {}),
  }))
  const value = items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0)
  const ecommerce = { currency: CURRENCY, value, items: gaItems, ...extra }

  if (w.__hnpGtagDirect && w.gtag) {
    w.gtag('event', event, ecommerce)
  } else {
    w.dataLayer = w.dataLayer || []
    // GTM khuyến nghị xoá ecommerce cũ trước mỗi sự kiện để dữ liệu không bị trộn.
    w.dataLayer.push({ ecommerce: null })
    w.dataLayer.push({ event, ecommerce })
  }
  return value
}

function sendPixel(event: string, params: Record<string, unknown> = {}) {
  getWindow()?.fbq?.('track', event, params)
}

export function useTracking() {
  function viewItem(item: TrackItem) {
    const value = sendEcommerce('view_item', [item])
    sendPixel('ViewContent', {
      content_ids: [String(item.id)],
      content_name: item.name,
      content_type: 'product',
      value,
      currency: CURRENCY,
    })
  }

  function addToCart(item: TrackItem) {
    const value = sendEcommerce('add_to_cart', [item])
    sendPixel('AddToCart', {
      content_ids: [String(item.id)],
      content_name: item.name,
      content_type: 'product',
      value,
      currency: CURRENCY,
    })
  }

  function purchase(orderId: string, items: TrackItem[]) {
    const value = sendEcommerce('purchase', items, { transaction_id: orderId })
    sendPixel('Purchase', {
      content_ids: items.map((item) => String(item.id)),
      content_type: 'product',
      num_items: items.reduce((sum, item) => sum + (item.quantity ?? 1), 0),
      value,
      currency: CURRENCY,
    })
  }

  // Khách bấm gọi hotline / mở Zalo / Messenger -- với shop này đây là chuyển đổi chính,
  // nhiều khách chốt đơn qua điện thoại thay vì đặt trên web.
  function contact(channel: ContactChannel) {
    const w = getWindow()
    if (!w) return
    if (w.__hnpGtagDirect && w.gtag) {
      w.gtag('event', 'contact_click', { channel })
    } else {
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push({ event: 'contact_click', channel })
    }
    sendPixel('Contact', { channel })
  }

  return { viewItem, addToCart, purchase, contact }
}
