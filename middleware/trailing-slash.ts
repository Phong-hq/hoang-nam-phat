// Removes trailing slashes from URLs to avoid duplicate content SEO issues

export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== '/' && to.path.endsWith('/')) {
    const { path, query, hash } = to
    const nextPath = path.replace(/\/+$/, '') || '/'
    return navigateTo({ path: nextPath, query, hash }, { redirectCode: 301 })
  }
})
