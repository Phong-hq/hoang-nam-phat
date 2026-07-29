// Swaps the tab favicon to a spinner during route navigation so users see
// feedback in the Chrome tab bar itself -- Nuxt's client-side routing never
// triggers the browser's native tab loading spinner since there's no real
// document load.

const DEFAULT_FAVICON = { href: '/favicon.ico', type: 'image/x-icon' }
const LOADING_FAVICON = { href: '/favicon-loading.svg', type: 'image/svg+xml' }

export default defineNuxtPlugin((nuxtApp) => {
  const getFaviconLink = () => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    return link
  }

  const setFavicon = ({ href, type }: { href: string, type: string }) => {
    const link = getFaviconLink()
    link.type = type
    link.href = href
  }

  nuxtApp.hook('page:start', () => setFavicon(LOADING_FAVICON))
  nuxtApp.hook('page:finish', () => setFavicon(DEFAULT_FAVICON))
})
