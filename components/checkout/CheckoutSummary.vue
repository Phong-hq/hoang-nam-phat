<template>
  <div class="bg-white rounded-2xl shadow-sm border border-base-200 overflow-hidden">
    <div class="px-5 py-4 border-b border-base-200">
      <h3 class="font-bold text-base text-base-content">Tổng đơn hàng</h3>
    </div>

    <div class="px-5 py-4 space-y-3">
      <!-- Subtotal -->
      <div class="flex items-center justify-between text-sm">
        <span class="text-base-content/60">Tạm tính</span>
        <span class="font-medium">{{ formatCurrency(subtotal) }}</span>
      </div>

      <!-- Shipping -->
      <div class="flex items-center justify-between text-sm">
        <span class="text-base-content/60">Phí vận chuyển</span>
        <span v-if="shippingFee === 0" class="font-medium text-success">Miễn phí</span>
        <span v-else class="font-medium">{{ formatCurrency(shippingFee) }}</span>
      </div>
      <p v-if="shippingFee > 0" class="text-xs text-base-content/40 -mt-1.5">
        Miễn phí ship cho đơn từ {{ formatCurrency(10000000) }}
      </p>

      <!-- Discount -->
      <div v-if="discount > 0" class="flex items-center justify-between text-sm">
        <span class="text-base-content/60">Giảm giá</span>
        <span class="font-medium text-success">-{{ formatCurrency(discount) }}</span>
      </div>

      <div class="divider my-0" />

      <!-- Total -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-base-content">Tổng cộng</span>
        <span class="text-xl font-extrabold text-primary">{{ formatCurrency(total) }}</span>
      </div>

      <p class="text-xs text-base-content/40 text-right">Đã bao gồm VAT (nếu có)</p>
    </div>

    <!-- Error state -->
    <div v-if="isError" class="mx-5 mb-4 px-4 py-3 bg-error/10 rounded-xl border border-error/20 flex items-start gap-2">
      <svg class="w-4 h-4 text-error flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <p class="text-sm font-semibold text-error">Đặt hàng thất bại</p>
        <p class="text-xs text-error/70 mt-0.5">Đã có lỗi xảy ra. Vui lòng thử lại.</p>
        <button class="text-xs text-error underline mt-1" @click="retryAfterError">Thử lại</button>
      </div>
    </div>

    <!-- CTA -->
    <div class="px-5 pb-5">
      <BaseButton
        variant="primary"
        size="lg"
        class="w-full"
        :disabled="isSubmitting || !hasItems"
        @click="submit"
      >
        <span v-if="isSubmitting" class="flex items-center gap-2">
          <span class="loading loading-spinner loading-sm" />
          Đang xử lý...
        </span>
        <span v-else class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Đặt hàng ngay
        </span>
      </BaseButton>

      <p class="text-xs text-base-content/40 text-center mt-3 leading-relaxed">
        Bằng cách đặt hàng, bạn đồng ý với
        <a href="#" class="underline hover:text-primary">Điều khoản dịch vụ</a>
        và <a href="#" class="underline hover:text-primary">Chính sách bảo mật</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils'

const { subtotal, shippingFee, discount, total, isSubmitting, isError, hasItems, submit, retryAfterError } = useCheckout()
</script>
