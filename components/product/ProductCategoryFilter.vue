<template>
  <div class="bg-white border border-base-200 rounded-xl p-4 shadow-sm">
    <div class="flex items-center justify-between mb-3">
      <h3 class="font-semibold text-sm text-base-content">Danh mục</h3>
      <button
        v-if="modelValue.length"
        class="text-xs text-primary hover:underline"
        @click="$emit('update:modelValue', [])"
      >
        Xóa lọc
      </button>
    </div>
    <ul class="space-y-2.5">
      <li v-for="cat in categories" :key="cat.slug">
        <label class="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            :value="cat.slug"
            :checked="modelValue.includes(cat.slug)"
            class="checkbox checkbox-sm checkbox-primary"
            @change="handleChange(cat.slug, ($event.target as HTMLInputElement).checked)"
          />
          <span class="text-sm text-base-content/70 group-hover:text-base-content transition-colors select-none">
            {{ cat.label }}
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Category {
  slug: string
  label: string
}

interface Props {
  categories: Category[]
  modelValue: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()

function handleChange(slug: string, checked: boolean) {
  const next = checked
    ? [...props.modelValue, slug]
    : props.modelValue.filter((s) => s !== slug)
  emit('update:modelValue', next)
}
</script>
