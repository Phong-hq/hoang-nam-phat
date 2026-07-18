<template>
  <div class="bg-white rounded-2xl shadow-sm border border-base-200 overflow-hidden">
    <div class="px-6 py-5 border-b border-base-200">
      <h2 class="text-lg font-bold text-base-content">Thông tin đặt hàng</h2>
      <p class="text-sm text-base-content/50 mt-0.5">Vui lòng điền đầy đủ thông tin để giao hàng</p>
    </div>

    <form class="px-6 py-6 space-y-4" @submit.prevent>
      <!-- Gender -->
      <CheckoutFormRow label="Danh xưng">
        <div class="flex items-center gap-6 sm:pt-2">
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
      </CheckoutFormRow>

      <div class="divider my-0" />

      <!-- Full Name -->
      <CheckoutFormRow label="Họ và tên" required>
        <BaseInput
          v-model="form.fullName"
          placeholder="Nguyễn Văn A"
          :error="errors.fullName"
          @blur="touch('fullName')"
        />
      </CheckoutFormRow>

      <!-- Phone -->
      <CheckoutFormRow label="Số điện thoại" required>
        <BaseInput
          v-model="form.phone"
          placeholder="0901 234 567"
          type="tel"
          :error="errors.phone"
          @blur="touch('phone')"
        />
      </CheckoutFormRow>

      <!-- Email -->
      <CheckoutFormRow label="Email" required>
        <BaseInput
          v-model="form.email"
          placeholder="email@example.com"
          type="email"
          :error="errors.email"
          @blur="touch('email')"
        />
      </CheckoutFormRow>

      <!-- Province -->
      <CheckoutFormRow label="Tỉnh / Thành phố" required>
        <BaseSelect
          v-model="form.province"
          :placeholder="loadingProvinces ? 'Đang tải...' : 'Chọn tỉnh / TP'"
          :options="provinceOptions"
          :disabled="loadingProvinces"
          :error="errors.province"
          @blur="touch('province')"
        />
      </CheckoutFormRow>

      <!-- Ward -->
      <CheckoutFormRow label="Phường / Xã">
        <BaseSelect
          v-model="form.ward"
          :placeholder="loadingWards ? 'Đang tải...' : 'Chọn phường / xã'"
          :options="wardOptions"
          :disabled="!form.province || loadingWards"
        />
      </CheckoutFormRow>

      <!-- Address -->
      <CheckoutFormRow label="Địa chỉ giao hàng" required>
        <BaseInput
          v-model="form.address"
          placeholder="Số nhà, tên đường..."
          :error="errors.address"
          @blur="touch('address')"
        />
      </CheckoutFormRow>

      <!-- Notes -->
      <CheckoutFormRow label="Ghi chú đơn hàng">
        <BaseTextarea
          v-model="form.notes"
          placeholder="Giao giờ hành chính, gọi trước khi giao..."
          :rows="3"
          hint="Không bắt buộc"
        />
      </CheckoutFormRow>

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
const { form, errors, touch } = useCheckout()
const { provinces, wards, loadingProvinces, loadingWards, fetchProvinces, fetchWards } = useVietnamAddress()

const provinceOptions = computed(() =>
  provinces.value.map((p) => ({ value: String(p.code), label: p.name })),
)
const wardOptions = computed(() =>
  wards.value.map((w) => ({ value: String(w.code), label: w.name })),
)

onMounted(fetchProvinces)

watch(() => form.province, (code) => {
  form.ward = ''
  form.wardName = ''
  form.provinceName = provinceOptions.value.find((p) => p.value === code)?.label ?? ''
  fetchWards(code)
})

watch(() => form.ward, (code) => {
  form.wardName = wardOptions.value.find((w) => w.value === code)?.label ?? ''
})
</script>
