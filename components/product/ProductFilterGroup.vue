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
    <TransitionGroup
      tag="ul"
      name="filter-item"
      class="space-y-1 max-h-72 overflow-y-auto pr-1 -mr-1"
    >
      <li v-for="(item, index) in items" :key="item.id" :style="{ transitionDelay: `${index * 30}ms` }">
        <label
          class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 cursor-pointer transition-colors"
          :class="isSelected(item.id) ? 'bg-primary/10 ring-1 ring-primary/25' : 'hover:bg-base-200/60'"
        >
          <input
            type="checkbox"
            :value="item.id"
            :checked="isSelected(item.id)"
            class="sr-only"
            @change="handleChange(item.id, ($event.target as HTMLInputElement).checked)"
          />
          <span
            v-if="item.icon"
            class="w-5 h-5 flex-shrink-0 flex items-center justify-center transition-colors"
            :class="isSelected(item.id) ? 'text-primary' : 'text-base-content/35'"
            v-html="item.icon"
          />
          <span
            class="flex-1 min-w-0 truncate text-sm transition-colors select-none"
            :class="isSelected(item.id) ? 'text-primary font-semibold' : 'text-base-content/70'"
          >
            {{ item.label }}
          </span>
          <span
            class="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border transition-colors"
            :class="isSelected(item.id) ? 'border-primary bg-primary' : 'border-base-300'"
          >
            <svg v-if="isSelected(item.id)" class="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </label>
      </li>
      <li v-if="!items.length" key="__empty" class="px-2.5 py-2 text-xs text-base-content/40">
        Không có lựa chọn nào
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
interface FilterItem {
  id: string | number
  label: string
  // Pre-resolved inline SVG markup (e.g. from CATEGORY_ICONS) -- the component
  // just renders it, it doesn't know where icons come from.
  icon?: string
}

interface Props {
  title: string
  items: FilterItem[]
  modelValue: (string | number)[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: (string | number)[]] }>()

function isSelected(id: string | number) {
  return props.modelValue.includes(id)
}

function handleChange(id: string | number, checked: boolean) {
  const next = checked
    ? [...props.modelValue, id]
    : props.modelValue.filter((v) => v !== id)
  emit('update:modelValue', next)
}
</script>

<style scoped>
.filter-item-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.filter-item-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
  position: absolute;
}
.filter-item-enter-from,
.filter-item-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.filter-item-move {
  transition: transform 0.25s ease;
}
</style>
