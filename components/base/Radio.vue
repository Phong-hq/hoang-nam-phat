<template>
  <label class="flex items-center gap-2.5 cursor-pointer group">
    <input
      type="radio"
      class="radio radio-primary radio-sm"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      @change="$emit('update:modelValue', value)"
    />
    <span class="text-sm font-medium text-base-content select-none">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string
  value: string
  label: string
  name: string
  disabled?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
