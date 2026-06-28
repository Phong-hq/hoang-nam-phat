<template>
  <div class="form-control">
    <label class="label cursor-pointer justify-start gap-3">
      <input
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        class="toggle"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <span v-if="label" class="label-text">{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean
  label?: string
  disabled?: boolean
}
defineProps<Props>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>
