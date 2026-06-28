<template>
  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold leading-none" :class="variantClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'ghost'
}>()

const variantClass = computed(() => ({
  primary: 'bg-primary text-white',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  error: 'bg-error/15 text-error',
  ghost: 'bg-base-200 text-base-content/60',
}[props.variant ?? 'primary']))
</script>
