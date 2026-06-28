<template>
  <div :class="['card bg-base-100', { 'shadow-xl': shadow, 'card-compact': compact }]">
    <figure v-if="$slots.figure">
      <slot name="figure" />
    </figure>
    <div class="card-body">
      <h2 v-if="title" class="card-title">{{ title }}</h2>
      <slot />
      <div v-if="$slots.actions" class="card-actions justify-end">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  shadow?: boolean
  compact?: boolean
}
withDefaults(defineProps<Props>(), { shadow: true, compact: false })
</script>
