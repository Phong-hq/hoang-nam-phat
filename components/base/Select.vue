<template>
  <div ref="rootRef" class="form-control w-full relative">
    <label v-if="label" class="label pb-1">
      <span class="label-text font-medium text-sm text-base-content/80">
        {{ label }}
        <span v-if="required" class="text-error ml-0.5">*</span>
      </span>
    </label>

    <div class="relative">
      <input
        type="text"
        :value="isOpen ? query : selectedLabel"
        :placeholder="placeholder ?? 'Chọn...'"
        :disabled="disabled"
        class="input input-bordered w-full text-sm pr-9 focus:outline-none focus:border-primary"
        :class="{ 'input-error': error }"
        autocomplete="off"
        @focus="open"
        @click="open"
        @input="onInput"
        @keydown.esc="close"
        @blur="onBlur"
      />
      <svg
        class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
      </svg>

      <ul
        v-if="isOpen"
        class="absolute z-20 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-base-200 bg-white shadow-lg py-1 text-sm"
      >
        <li v-if="!filteredOptions.length" class="px-3 py-2 text-base-content/40">
          Không tìm thấy kết quả
        </li>
        <li
          v-for="opt in filteredOptions"
          :key="opt.value"
          class="px-3 py-2 cursor-pointer hover:bg-base-100"
          :class="{ 'bg-primary/10 text-primary font-medium': opt.value === modelValue }"
          @mousedown.prevent="select(opt)"
        >
          {{ opt.label }}
        </li>
      </ul>
    </div>

    <label v-if="error" class="label pt-1">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
}

const props = defineProps<{
  modelValue?: string
  label?: string
  placeholder?: string
  options: Option[]
  error?: string
  required?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()

const rootRef = ref<HTMLElement>()
const isOpen = ref(false)
const query = ref('')

const selectedLabel = computed(
  () => props.options.find((o) => o.value === props.modelValue)?.label ?? '',
)

const filteredOptions = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.options
  return props.options.filter((o) => o.label.toLowerCase().includes(q))
})

function open() {
  if (props.disabled) return
  query.value = ''
  isOpen.value = true
}

function close() {
  isOpen.value = false
  query.value = ''
}

function onInput(e: Event) {
  query.value = (e.target as HTMLInputElement).value
  isOpen.value = true
}

function select(opt: Option) {
  emit('update:modelValue', opt.value)
  close()
}

function onBlur() {
  emit('blur')
}

onClickOutside(rootRef, close)
</script>
