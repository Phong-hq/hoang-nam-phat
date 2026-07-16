<script setup lang="ts">
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
const businessStore = useBusinessStore()
const socialStore = useSocialStore()
const isReady = ref(false)

useBusinessSeo()

onMounted(async () => {
  brandStore.fetchBrands()
  await Promise.all([
    categoryStore.fetchCategories(),
    businessStore.fetchBusinessInfo(),
    socialStore.fetchSocialLinks(),
  ])
  isReady.value = true
})
</script>

<template>
  <div>
    <div id="fb-root" />
    <LayoutAppSplash v-if="!isReady" />
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
