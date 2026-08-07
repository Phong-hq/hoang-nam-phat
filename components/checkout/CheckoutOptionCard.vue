<template>
  <label
    class="flex items-start gap-3 rounded-xl border p-3.5 cursor-pointer transition-colors"
    :class="modelValue === value ? 'border-primary bg-primary/5' : 'border-base-200 hover:border-base-300'"
  >
    <input
      type="radio"
      class="radio radio-primary radio-sm mt-0.5"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
    />
    <span class="flex-1 min-w-0">
      <span class="block text-sm font-semibold text-base-content">{{ title }}</span>
      <span v-if="description" class="block text-xs text-base-content/50 mt-0.5">{{ description }}</span>
    </span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string
  value: string
  name: string
  title: string
  description?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
