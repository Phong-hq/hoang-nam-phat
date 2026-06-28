<template>
  <button
    :class="[
      'btn',
      variantClass,
      sizeClass,
      { loading: loading, 'btn-block': block }
    ]"
    :disabled="disabled || loading"
    :type="type"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'error' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  block: false,
  type: 'button',
})
const variantClass = computed(() => `btn-${props.variant}`)
const sizeClass = computed(() => (props.size !== 'md' ? `btn-${props.size}` : ''))
</script>
