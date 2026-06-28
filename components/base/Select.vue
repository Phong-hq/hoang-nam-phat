<template>
  <div class="form-control w-full">
    <label v-if="label" class="label pb-1">
      <span class="label-text font-medium text-sm text-base-content/80">
        {{ label }}
        <span v-if="required" class="text-error ml-0.5">*</span>
      </span>
    </label>
    <select
      :value="modelValue"
      :disabled="disabled"
      class="select select-bordered w-full text-sm focus:outline-none focus:border-primary"
      :class="{ 'select-error': error }"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      @blur="$emit('blur')"
    >
      <option value="" disabled>{{ placeholder ?? 'Chọn...' }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <label v-if="error" class="label pt-1">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string
  label?: string
  placeholder?: string
  options: { value: string; label: string }[]
  error?: string
  required?: boolean
  disabled?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()
</script>
