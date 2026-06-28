<template>
  <div class="bg-white rounded-2xl shadow-sm border border-base-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-base-200">
      <h2 class="text-lg font-bold text-base-content">Thông tin đặt hàng</h2>
      <p class="text-sm text-base-content/50 mt-0.5">Vui lòng điền đầy đủ thông tin để giao hàng</p>
    </div>

    <form class="px-6 py-6 space-y-5" @submit.prevent>
      <!-- Gender -->
      <div>
        <p class="text-sm font-medium text-base-content/80 mb-2">Danh xưng</p>
        <div class="flex items-center gap-6">
          <BaseRadio
            v-model="form.gender"
            value="mr"
            label="Anh"
            name="gender"
          />
          <BaseRadio
            v-model="form.gender"
            value="ms"
            label="Chị"
            name="gender"
          />
        </div>
      </div>

      <!-- Name + Phone -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BaseInput
          v-model="form.fullName"
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          :error="errors.fullName"
          required
          @blur="touch('fullName')"
        />
        <BaseInput
          v-model="form.phone"
          label="Số điện thoại"
          placeholder="0901 234 567"
          type="tel"
          :error="errors.phone"
          required
          @blur="touch('phone')"
        />
      </div>

      <!-- Email + Province -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BaseInput
          v-model="form.email"
          label="Email"
          placeholder="email@example.com"
          type="email"
          :error="errors.email"
          required
          @blur="touch('email')"
        />
        <BaseSelect
          v-model="form.province"
          label="Tỉnh / Thành phố"
          placeholder="Chọn tỉnh / TP"
          :options="provinceOptions"
          :error="errors.province"
          required
          @blur="touch('province')"
        />
      </div>

      <!-- District + Ward -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BaseInput
          v-model="form.district"
          label="Quận / Huyện"
          placeholder="Quận 1"
        />
        <BaseInput
          v-model="form.ward"
          label="Phường / Xã"
          placeholder="Phường Bến Nghé"
        />
      </div>

      <!-- Address -->
      <BaseInput
        v-model="form.address"
        label="Địa chỉ giao hàng"
        placeholder="Số nhà, tên đường..."
        :error="errors.address"
        required
        @blur="touch('address')"
      />

      <!-- Notes -->
      <BaseTextarea
        v-model="form.notes"
        label="Ghi chú đơn hàng"
        placeholder="Giao giờ hành chính, gọi trước khi giao..."
        :rows="3"
        hint="Không bắt buộc"
      />

      <!-- Divider -->
      <div class="divider my-1" />

      <!-- Invoice -->
      <div>
        <BaseCheckbox
          v-model="form.invoiceRequested"
          label="Xuất hoá đơn VAT công ty"
        />
        <CheckoutInvoice
          :model-value="form.invoiceRequested"
          :company-name="form.companyName"
          :tax-code="form.taxCode"
          :company-address="form.companyAddress"
          :errors="errors"
          @update:company-name="form.companyName = $event"
          @update:tax-code="form.taxCode = $event"
          @update:company-address="form.companyAddress = $event"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { PROVINCES } from '~/constants'

const { form, errors, touch } = useCheckout()

const provinceOptions = PROVINCES.map((p) => ({ value: p, label: p }))
</script>
