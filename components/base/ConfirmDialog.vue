<template>
  <BaseModal :model-value="modelValue" :title="title" @update:model-value="$emit('update:modelValue', $event)">
    <p class="text-base-content/80">{{ message }}</p>
    <template #actions>
      <BaseButton variant="ghost" @click="$emit('update:modelValue', false)">Huy</BaseButton>
      <BaseButton variant="error" @click="handleConfirm">Xac nhan</BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  message?: string
}
withDefaults(defineProps<Props>(), {
  title: 'Xac nhan',
  message: 'Ban co chac chan muon thuc hien hanh dong nay?',
})
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; confirm: [] }>()

function handleConfirm() {
  emit('confirm')
  emit('update:modelValue', false)
}
</script>
