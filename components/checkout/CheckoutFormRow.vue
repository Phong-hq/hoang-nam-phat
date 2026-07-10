<template>
  <div class="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
    <label class="sm:w-36 sm:pt-2.5 shrink-0 text-sm font-medium text-base-content/80">
      {{ label }}
      <span v-if="required" class="text-error ml-0.5">*</span>
    </label>
    <div class="flex-1 min-w-0">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  required?: boolean
}>()
</script>
