// JSON-LD structured data composable
// Injects schema.org structured data as script tags for Google rich results

import type { JsonLdProduct, JsonLdBreadcrumb } from '~/types'

export function useJsonLd(schema: JsonLdProduct | JsonLdBreadcrumb | Record<string, unknown>) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
      },
    ],
  })
}

export function useMultipleJsonLd(schemas: Array<JsonLdProduct | JsonLdBreadcrumb | Record<string, unknown>>) {
  useHead({
    script: schemas.map((schema) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema),
    })),
  })
}
