<template>
  <div class="bg-white border border-base-200 rounded-xl p-4 shadow-sm">
    <div class="flex items-center justify-between mb-3">
      <h3 class="font-semibold text-sm text-base-content">{{ title }}</h3>
      <button
        v-if="modelValue.length"
        class="text-xs text-primary hover:underline"
        @click="$emit('update:modelValue', [])"
      >
        Xóa lọc
      </button>
    </div>
    <ul class="space-y-2.5">
      <li v-for="item in items" :key="item.id">
        <label class="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            :value="item.id"
            :checked="modelValue.includes(item.id)"
            class="checkbox checkbox-sm checkbox-primary"
            @change="handleChange(item.id, ($event.target as HTMLInputElement).checked)"
          />
          <span class="text-sm text-base-content/70 group-hover:text-base-content transition-colors select-none">
            {{ item.label }}
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface FilterItem {
  id: string | number
  label: string
}

interface Props {
  title: string
  items: FilterItem[]
  modelValue: (string | number)[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: (string | number)[]] }>()

function handleChange(id: string | number, checked: boolean) {
  const next = checked
    ? [...props.modelValue, id]
    : props.modelValue.filter((v) => v !== id)
  emit('update:modelValue', next)
}
</script>
