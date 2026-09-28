// Sets the ERP API base URL on the shared axios instance once, while the Nuxt
// context is guaranteed to be available. Resolving it inside the request
// interceptor instead breaks during SSR: after the first `await` in a data
// fetch the Nuxt context is gone and useRuntimeConfig() throws.

import { setHttpClientBaseUrl } from '~/utils/httpClient'

export default defineNuxtPlugin(() => {
  setHttpClientBaseUrl(useRuntimeConfig().public.erpApiBaseUrl)
})
