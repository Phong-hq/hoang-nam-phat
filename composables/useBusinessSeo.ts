// Business SEO composable
// Applies CMS business_info (name, logo, address, phone, email) as global site meta + LocalBusiness JSON-LD
// Call once, synchronously, in app.vue setup -- reacts to the business store once fetchBusinessInfo() resolves

import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, BUSINESS_POSTAL_ADDRESS } from '~/constants'

export function useBusinessSeo() {
  const businessStore = useBusinessStore()
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.siteUrl || SITE_URL

  const siteName = computed(() => businessStore.businessInfo?.name || SITE_NAME)
  const defaultOgImage = `${siteUrl}${DEFAULT_OG_IMAGE}`
  const logo = computed(() => {
    const raw = businessStore.businessInfo?.logo
    if (!raw) return null
    return raw.startsWith('http') ? raw : `${siteUrl}${raw}`
  })
  const description = computed(() => {
    const info = businessStore.businessInfo
    return info ? `${info.name} - ${info.address}` : undefined
  })

  useSeoMeta({
    ogSiteName: () => siteName.value,
    ogImage: () => logo.value ?? defaultOgImage,
    twitterImage: () => logo.value ?? defaultOgImage,
    description: () => description.value,
  })

  useHead({
    // Single place the site name is appended to page titles. A page with no title
    // shows just the site name; a title that already names the site is kept as is.
    titleTemplate: (title?: string) => {
      if (!title) return siteName.value
      return title.includes(siteName.value) ? title : `${title} | ${siteName.value}`
    },
  })

  // Registered once with a computed body (not from a watch callback, which never re-runs
  // during SSR) so the schema is in the server HTML as soon as business_info has loaded.
  const businessJsonLd = computed(() => {
    const info = businessStore.businessInfo
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: siteName.value,
      url: siteUrl,
      logo: logo.value ?? defaultOgImage,
      image: logo.value ?? defaultOgImage,
      email: info?.email,
      telephone: info?.phone[0],
      address: BUSINESS_POSTAL_ADDRESS,
    })
  })

  useHead({
    script: [{ key: 'jsonld-business', type: 'application/ld+json', innerHTML: businessJsonLd }],
  })
}
