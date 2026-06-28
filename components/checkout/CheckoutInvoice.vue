<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div v-if="modelValue" class="mt-4 p-4 bg-base-50 rounded-xl border border-base-200 space-y-3">
      <p class="text-xs font-semibold text-base-content/50 uppercase tracking-wide">Thông tin xuất hoá đơn</p>

      <BaseInput
        :model-value="companyName"
        label="Tên công ty"
        placeholder="Công ty TNHH ABC"
        :error="errors.companyName"
        required
        @update:model-value="$emit('update:companyName', $event)"
        @blur="touch('companyName')"
      />

      <BaseInput
        :model-value="taxCode"
        label="Mã số thuế"
        placeholder="0123456789"
        :error="errors.taxCode"
        required
        @update:model-value="$emit('update:taxCode', $event)"
        @blur="touch('taxCode')"
      />

      <BaseInput
        :model-value="companyAddress"
        label="Địa chỉ công ty"
        placeholder="Số nhà, đường, quận, thành phố"
        :error="errors.companyAddress"
        required
        @update:model-value="$emit('update:companyAddress', $event)"
        @blur="touch('companyAddress')"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { CheckoutErrors } from '~/types'

defineProps<{
  modelValue: boolean
  companyName: string
  taxCode: string
  companyAddress: string
  errors: CheckoutErrors
}>()

defineEmits<{
  'update:companyName': [value: string]
  'update:taxCode': [value: string]
  'update:companyAddress': [value: string]
}>()

const { touch } = useCheckout()
</script>
