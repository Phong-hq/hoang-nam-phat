<template>
  <div class="bg-white border border-base-200 rounded-xl p-4 shadow-sm">
    <h3 class="font-semibold text-sm text-base-content mb-3">{{ title }}</h3>
    <ul class="space-y-1">
      <li v-for="option in options" :key="option.value">
        <label
          class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 cursor-pointer transition-colors"
          :class="modelValue === option.value ? 'bg-primary/10 ring-1 ring-primary/25' : 'hover:bg-base-200/60'"
        >
          <input
            type="radio"
            :name="name"
            :value="option.value"
            :checked="modelValue === option.value"
            class="sr-only"
            @change="$emit('update:modelValue', option.value)"
          />
          <span
            class="flex-1 min-w-0 truncate text-sm transition-colors select-none"
            :class="modelValue === option.value ? 'text-primary font-semibold' : 'text-base-content/70'"
          >
            {{ option.label }}
          </span>
          <span
            class="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border transition-colors"
            :class="modelValue === option.value ? 'border-primary' : 'border-base-300'"
          >
            <span v-if="modelValue === option.value" class="h-2 w-2 rounded-full bg-primary" />
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface SortOption {
  value: string
  label: string
}

defineProps<{
  title: string
  name: string
  options: SortOption[]
  modelValue: string
}>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
