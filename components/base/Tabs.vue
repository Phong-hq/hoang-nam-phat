<template>
  <div>
    <div class="tabs tabs-bordered">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['tab', { 'tab-active': modelValue === tab.key }]"
        @click="$emit('update:modelValue', tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  key: string
  label: string
}
interface Props {
  modelValue: string
  tabs: Tab[]
}
defineProps<Props>()
defineEmits<{ 'update:modelValue': [key: string] }>()
</script>
