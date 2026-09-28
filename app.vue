<script setup lang="ts">
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
const businessStore = useBusinessStore()
const socialStore = useSocialStore()
const bannerStore = useBannerStore()

useBusinessSeo()

// Shared site data is fetched during server-side rendering so the HTML sent to
// the browser (and to Google / Facebook / Zalo crawlers) already holds the real
// page -- menu, banner, headings, products -- instead of an empty loading
// screen. callOnce runs it on the server only; Pinia hands the state over to
// the client, so the browser does not fetch it again. Each store action catches
// its own errors, so one failing API never blocks the page from rendering.
await callOnce('app-init', () =>
  Promise.all([
    categoryStore.fetchCategories(),
    businessStore.fetchBusinessInfo(),
    bannerStore.fetchBanner(),
    brandStore.fetchBrands(),
    socialStore.fetchSocialLinks(),
  ]),
)

// The splash is only an overlay on top of the real page: the page itself is
// always rendered underneath (so crawlers still get the full HTML). It is part
// of the server HTML so visitors see it right away, then fades out once the app
// has taken over in the browser.
const showSplash = ref(true)
onMounted(() => {
  showSplash.value = false
})
</script>

<template>
  <div>
    <div id="fb-root" />
    <NuxtLoadingIndicator color="#e52020" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Transition name="splash-fade">
      <LayoutAppSplash v-if="showSplash" aria-hidden="true" />
    </Transition>
  </div>
</template>

<style>
.splash-fade-leave-active {
  transition: opacity 0.4s ease;
}

.splash-fade-leave-to {
  opacity: 0;
}
</style>
