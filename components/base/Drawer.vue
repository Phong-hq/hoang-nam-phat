<template>
  <div class="drawer" :class="{ 'drawer-open': modelValue }">
    <input type="checkbox" class="drawer-toggle" :checked="modelValue" />
    <div class="drawer-content">
      <slot />
    </div>
    <div class="drawer-side z-50">
      <label class="drawer-overlay" @click="$emit('update:modelValue', false)" />
      <div class="min-h-full w-80 bg-base-100 p-4">
        <slot name="sidebar" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
}
defineProps<Props>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>
