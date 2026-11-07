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

// No splash overlay: a full-screen cover that only lifts after hydration made
// the real page invisible until all JS had run, pushing LCP past 10s on mobile.

// The hero banner (the LCP element) is painted as a CSS background, which the
// browser's preload scanner cannot discover -- hint it so the download starts
// together with the HTML instead of after CSS has been parsed.
const firstHeroImage = computed(() => bannerStore.banner?.main?.[0])
useHead(() => ({
  link: firstHeroImage.value
    ? [{ rel: 'preload', as: 'image', href: firstHeroImage.value, fetchpriority: 'high' as const }]
    : [],
}))
</script>

<template>
  <div>
    <div id="fb-root" />
    <NuxtLoadingIndicator color="#e52020" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
