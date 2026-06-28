<template>
  <dialog class="modal" :class="{ 'modal-open': modelValue }">
    <div class="modal-box w-11/12 max-w-2xl">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="$emit('update:modelValue', false)"
      >x</button>
      <h3 v-if="title" class="font-bold text-lg mb-4">{{ title }}</h3>
      <slot />
      <div v-if="$slots.actions" class="modal-action">
        <slot name="actions" />
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="$emit('update:modelValue', false)">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
}
defineProps<Props>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>
