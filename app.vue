<script setup lang="ts">
const categoryStore = useCategoryStore()
const isReady = ref(false)

onMounted(async () => {
  await categoryStore.fetchCategories()
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
