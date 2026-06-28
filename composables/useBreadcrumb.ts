// Breadcrumb composable
// Generates both the visual breadcrumb array and the JSON-LD BreadcrumbList schema

import type { BreadcrumbItem, JsonLdBreadcrumb } from '~/types'
import { SITE_URL } from '~/constants'
import { useJsonLd } from './useJsonLd'

export function useBreadcrumb(items: BreadcrumbItem[]) {
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.siteUrl || SITE_URL

  const breadcrumbJsonLd: JsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${siteUrl}${item.path}` } : {}),
    })),
  }

  useJsonLd(breadcrumbJsonLd)

  return { breadcrumbJsonLd, items }
}
