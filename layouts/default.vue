<template>
  <div class="layout-default flex flex-col min-h-screen" :data-theme="uiStore.theme">
    <LayoutHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutFooter />
    <BaseToast />
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '~/stores/ui.store'
const uiStore = useUiStore()
</script>
