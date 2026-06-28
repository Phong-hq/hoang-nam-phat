// Canonical URL composable
// Generates and sets the canonical URL for the current page

import { SITE_URL } from '~/constants'

export function useCanonical(path?: string) {
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.siteUrl || SITE_URL
  const route = useRoute()

  const canonicalPath = path ?? route.fullPath
  const canonicalUrl = `${siteUrl.replace(/\/$/, '')}${canonicalPath}`

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
  })

  return canonicalUrl
}
