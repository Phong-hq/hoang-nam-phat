<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="text-6xl mb-4">{{ icon }}</div>
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <p v-if="message" class="text-base-content/60 mb-4">{{ message }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  title?: string
  message?: string
}
withDefaults(defineProps<Props>(), {
  icon: 'inbox',
  title: 'Khong co du lieu',
})
</script>
