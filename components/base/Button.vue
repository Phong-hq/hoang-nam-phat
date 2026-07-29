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
const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
  outline: 'btn-outline',
  error: 'btn-error',
  success: 'btn-success',
}
const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
}
const variantClass = computed(() => variantClasses[props.variant])
const sizeClass = computed(() => sizeClasses[props.size])
</script>
