<template>
  <div class="inline-flex items-center rounded-lg border border-base-300 overflow-hidden h-9 bg-white">
    <button
      type="button"
      class="w-9 h-full flex items-center justify-center text-base-content/50 hover:bg-base-100 hover:text-base-content transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      :disabled="modelValue <= minVal"
      @click="$emit('update:modelValue', modelValue - 1)"
    >
      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
      </svg>
    </button>

    <input
      type="number"
      class="w-10 h-full text-center text-sm font-semibold border-x border-base-300 bg-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      :value="modelValue"
      :min="minVal"
      :max="maxVal"
      @change="onInputChange"
    />

    <button
      type="button"
      class="w-9 h-full flex items-center justify-center text-base-content/50 hover:bg-base-100 hover:text-base-content transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      :disabled="modelValue >= maxVal"
      @click="$emit('update:modelValue', modelValue + 1)"
    >
      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  min?: number
  max?: number
}>()

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const minVal = computed(() => props.min ?? 1)
const maxVal = computed(() => props.max ?? 99)

function onInputChange(e: Event) {
  const val = parseInt((e.target as HTMLInputElement).value)
  if (!isNaN(val)) {
    emit('update:modelValue', Math.min(maxVal.value, Math.max(minVal.value, val)))
  }
}
</script>
