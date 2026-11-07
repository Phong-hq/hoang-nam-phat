// Nạp mã đo lường: Google Tag Manager, GA4, Facebook Pixel.
// Mã lấy từ biến môi trường (NUXT_PUBLIC_GTM_ID, NUXT_PUBLIC_GA4_ID, NUXT_PUBLIC_FB_PIXEL_ID).
// Biến nào trống thì phần đó không chạy -- chưa điền mã thì website y như cũ.
//
// Script ngoài chỉ được tải sau khi trang đã hiện xong (onNuxtReady) để không làm chậm
// tốc độ tải trang (ảnh hưởng điểm Core Web Vitals của Google). Sự kiện phát sinh trước đó
// vẫn được giữ trong hàng đợi (dataLayer / fbq.queue) và gửi đi khi script tải xong.

import { useTracking, type ContactChannel } from '~/composables/useTracking'

type AnyFn = (...args: unknown[]) => void
type FbqStub = AnyFn & { callMethod?: AnyFn; queue: unknown[]; push: unknown; loaded: boolean; version: string }

function loadScript(src: string) {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

// Nhận diện link liên hệ để đo lượt bấm gọi / nhắn tin, áp dụng cho mọi nút trên site
// (header, footer, trang sản phẩm, trang liên hệ...) mà không phải sửa từng component.
function contactChannelOf(href: string): ContactChannel | null {
  if (href.startsWith('tel:')) return 'phone'
  if (/zalo\.me|chat\.zalo/i.test(href)) return 'zalo'
  if (/m\.me\/|messenger\.com/i.test(href)) return 'messenger'
  return null
}

export default defineNuxtPlugin((nuxtApp) => {
  const { gtmId, ga4Id, fbPixelId } = useRuntimeConfig().public as {
    gtmId?: string
    ga4Id?: string
    fbPixelId?: string
  }
  if (!gtmId && !ga4Id && !fbPixelId) return

  const w = window as unknown as {
    dataLayer: unknown[]
    gtag?: AnyFn
    fbq?: FbqStub
    _fbq?: FbqStub
    __hnpGtagDirect?: boolean
  }
  w.dataLayer = w.dataLayer || []

  if (gtmId) {
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  } else if (ga4Id) {
    // Chỉ gắn GA4 trực tiếp khi KHÔNG dùng GTM. Có GTM thì cấu hình GA4 bên trong GTM,
    // gắn cả hai sẽ bị đếm trùng lượt xem.
    w.gtag = function gtag() {
      // gtag bắt buộc đẩy nguyên object `arguments`, không phải mảng.
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments)
    }
    w.gtag('js', new Date())
    w.gtag('config', ga4Id)
    w.__hnpGtagDirect = true
  }

  if (fbPixelId) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args)
      else fbq.queue.push(args)
    } as FbqStub
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    w.fbq = fbq
    w._fbq = fbq
    fbq('init', fbPixelId)
    fbq('track', 'PageView')
  }

  onNuxtReady(() => {
    if (gtmId) loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`)
    else if (ga4Id) loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`)
    if (fbPixelId) loadScript('https://connect.facebook.net/en_US/fbevents.js')
  })

  // Lượt xem khi khách chuyển trang trong site (không tải lại trang).
  // GA4 gắn trực tiếp tự bắt được nhờ "Enhanced measurement"; GTM cần sự kiện này
  // (trigger Custom Event "virtual_page_view"); Pixel cần PageView thủ công.
  let isFirstPage = true
  nuxtApp.hook('page:finish', () => {
    if (isFirstPage) {
      isFirstPage = false
      return
    }
    if (gtmId) {
      w.dataLayer.push({ event: 'virtual_page_view', page_path: window.location.pathname + window.location.search })
    }
    w.fbq?.('track', 'PageView')
  })

  const { contact } = useTracking()
  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element | null)?.closest?.('a[href]')
      const channel = link ? contactChannelOf(link.getAttribute('href') ?? '') : null
      if (channel) contact(channel)
    },
    { capture: true },
  )
})
