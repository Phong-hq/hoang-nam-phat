// Core SEO composable
// Provides a unified interface for setting page meta, OG, Twitter, and canonical tags
// Always call server-side (in setup or useAsyncData) -- never inside onMounted()

import type { SeoMeta } from '~/types'
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, DEFAULT_TWITTER_CARD, DEFAULT_ROBOTS } from '~/constants'

export function useSeo(meta: SeoMeta) {
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.siteUrl || SITE_URL
  const siteName = runtimeConfig.public.siteName || SITE_NAME

  const robots = meta.noIndex || meta.noFollow
    ? [meta.noIndex ? 'noindex' : 'index', meta.noFollow ? 'nofollow' : 'follow'].join(', ')
    : (meta.robots ?? DEFAULT_ROBOTS)

  const title = meta.title ? `${meta.title} | ${siteName}` : siteName
  const ogImage = meta.ogImage ?? DEFAULT_OG_IMAGE
  const ogImageAbsolute = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`
  const canonical = meta.canonical ?? useRequestURL().href

  useSeoMeta({
    title,
    description: meta.description,
    keywords: meta.keywords,
    robots,
    ogTitle: meta.ogTitle ?? meta.title ?? siteName,
    ogDescription: meta.ogDescription ?? meta.description,
    ogImage: ogImageAbsolute,
    ogType: (meta.ogType ?? 'website') as 'website' | 'article' | 'product',
    ogUrl: meta.ogUrl ?? canonical,
    ogSiteName: siteName,
    twitterCard: meta.twitterCard ?? DEFAULT_TWITTER_CARD,
    twitterTitle: meta.twitterTitle ?? meta.title ?? siteName,
    twitterDescription: meta.twitterDescription ?? meta.description,
    twitterImage: ogImageAbsolute,
  })

  useHead({
    title,
    link: [{ rel: 'canonical', href: canonical }],
  })
}
