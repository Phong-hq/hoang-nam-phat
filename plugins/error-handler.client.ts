// Global client-side error handler plugin

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, _instance, info) => {
    console.error('[Vue Error]', error, info)
  }

  nuxtApp.hook('vue:error', (error) => {
    console.error('[Nuxt Vue Error]', error)
  })
})
