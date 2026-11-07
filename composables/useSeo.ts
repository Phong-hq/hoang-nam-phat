// Core SEO composable
// Provides a unified interface for setting page meta, OG, Twitter, and canonical tags
// Always call server-side (in setup or useAsyncData) -- never inside onMounted()
//
// Accepts a plain object, a ref or a getter. Pages whose content changes without
// remounting (e.g. /products?category=a -> ?category=b) pass a getter so the title,
// description and canonical follow the current URL.

import type { MaybeRefOrGetter } from 'vue'
import type { SeoMeta } from '~/types'
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, DEFAULT_TWITTER_CARD, DEFAULT_ROBOTS } from '~/constants'

// Domain staging/test của site. Truy cập bằng domain này thì luôn noindex để Google
// không index một bản trùng của hoangnamphat.vn.
const STAGING_HOST_PATTERN = /\.thanhtoan24on7\.xyz$/i

export function useSeo(input: MaybeRefOrGetter<SeoMeta>) {
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = (runtimeConfig.public.siteUrl || SITE_URL).replace(/\/$/, '')
  const siteName = runtimeConfig.public.siteName || SITE_NAME
  const route = useRoute()
  const requestHost = useRequestURL().hostname
  const forceNoIndex = Boolean(runtimeConfig.public.noIndex) || STAGING_HOST_PATTERN.test(requestHost)

  const meta = computed(() => toValue(input))

  const robots = computed(() => {
    if (forceNoIndex) return 'noindex, nofollow'
    const m = meta.value
    return m.noIndex || m.noFollow
      ? [m.noIndex ? 'noindex' : 'index', m.noFollow ? 'nofollow' : 'follow'].join(', ')
      : (m.robots ?? DEFAULT_ROBOTS)
  })

  // Canonical mặc định = domain chính + đường dẫn, chỉ giữ `?page=` (mỗi trang phân trang
  // là một trang riêng). Bỏ mọi tham số khác (utm_*, fbclid, sort...) để Google không coi
  // cùng một trang là nhiều URL khác nhau.
  const canonical = computed(() => {
    if (meta.value.canonical) return meta.value.canonical
    const page = Number(route.query.page)
    const path = route.path === '/' ? '/' : route.path.replace(/\/+$/, '')
    return `${siteUrl}${path}${page > 1 ? `?page=${page}` : ''}`
  })

  // The " | <site name>" suffix is added once by the titleTemplate in useBusinessSeo.
  const title = computed(() => meta.value.title ?? siteName)
  const ogImage = computed(() => {
    const image = meta.value.ogImage ?? DEFAULT_OG_IMAGE
    return image.startsWith('http') ? image : `${siteUrl}${image}`
  })

  useSeoMeta({
    title: () => title.value,
    description: () => meta.value.description,
    keywords: () => meta.value.keywords,
    robots: () => robots.value,
    ogTitle: () => meta.value.ogTitle ?? meta.value.title ?? siteName,
    ogDescription: () => meta.value.ogDescription ?? meta.value.description,
    ogImage: () => ogImage.value,
    ogType: () => (meta.value.ogType ?? 'website') as 'website' | 'article' | 'product',
    ogUrl: () => meta.value.ogUrl ?? canonical.value,
    ogSiteName: siteName,
    ogLocale: 'vi_VN',
    twitterCard: () => meta.value.twitterCard ?? DEFAULT_TWITTER_CARD,
    twitterTitle: () => meta.value.twitterTitle ?? meta.value.title ?? siteName,
    twitterDescription: () => meta.value.twitterDescription ?? meta.value.description,
    twitterImage: () => ogImage.value,
  })

  useHead({
    title: () => title.value,
    link: [{ rel: 'canonical', href: () => canonical.value }],
  })
}
