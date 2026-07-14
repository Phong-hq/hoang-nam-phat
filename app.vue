<script setup lang="ts">
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
const isReady = ref(false)

onMounted(async () => {
  await Promise.all([categoryStore.fetchCategories(), brandStore.fetchBrands()])
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
