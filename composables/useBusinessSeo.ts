// Business SEO composable
// Applies CMS business_info (name, logo, address, phone, email) as global site meta + Organization JSON-LD
// Call once, synchronously, in app.vue setup -- reacts to the business store once fetchBusinessInfo() resolves

import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '~/constants'

export function useBusinessSeo() {
  const businessStore = useBusinessStore()
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.siteUrl || SITE_URL

  const siteName = computed(() => businessStore.businessInfo?.name || SITE_NAME)
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
    ogImage: () => logo.value ?? DEFAULT_OG_IMAGE,
    twitterImage: () => logo.value ?? DEFAULT_OG_IMAGE,
    description: () => description.value,
  })

  useHead({
    titleTemplate: () => `%s | ${siteName.value}`,
  })

  watch(
    () => businessStore.businessInfo,
    (info) => {
      if (!info) return
      useJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: info.name,
        url: siteUrl,
        logo: logo.value,
        image: logo.value,
        email: info.email,
        telephone: info.phone[0],
        address: info.address,
      })
    },
    { immediate: true },
  )
}
