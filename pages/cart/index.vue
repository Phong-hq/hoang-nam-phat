<template>
  <div class="bg-[#EEF2F7] min-h-screen">
    <div class="container mx-auto px-4 max-w-screen-xl py-6 lg:py-8">

      <!-- Breadcrumb -->
      <nav class="breadcrumbs text-sm mb-4">
        <ul>
          <li><NuxtLink to="/">Trang chủ</NuxtLink></li>
          <li><NuxtLink to="/products">Sản phẩm</NuxtLink></li>
          <li class="text-base-content/50">Giỏ hàng</li>
        </ul>
      </nav>

      <!-- Back link -->
      <NuxtLink
        to="/products"
        class="inline-flex items-center gap-1.5 text-sm text-base-content/60 hover:text-primary transition-colors mb-6"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Tiếp tục mua sắm
      </NuxtLink>

      <!-- ===== SUCCESS STATE ===== -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
      >
        <div v-if="isSuccess" class="max-w-lg mx-auto">
          <div class="bg-white rounded-2xl shadow-sm border border-base-200 p-8 text-center">
            <div class="w-16 h-16 bg-success/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="text-2xl font-extrabold text-base-content mb-2">Đặt hàng thành công!</h2>
            <p class="text-base-content/60 text-sm mb-4">Cảm ơn bạn đã tin tưởng Hoàng Nam Phát.</p>

            <p class="text-sm text-base-content/60 mb-6 leading-relaxed">
              Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.
            </p>

            <div class="flex flex-col sm:flex-row gap-3">
              <NuxtLink to="/" class="btn btn-outline flex-1">Về trang chủ</NuxtLink>
              <NuxtLink to="/products" class="btn btn-primary flex-1">Tiếp tục mua sắm</NuxtLink>
            </div>
          </div>
        </div>
      </Transition>

      <!-- ===== CHECKOUT LAYOUT ===== -->
      <div v-if="!isSuccess" class="checkout-cols">
        <div class="checkout-main space-y-5">
          <CheckoutForm />
        </div>
        <div class="checkout-side">
          <div class="checkout-sticky space-y-4">
            <CheckoutCart />
            <CheckoutSummary />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'

const { isSuccess, resetOrder } = useCheckout()

onBeforeRouteLeave(() => {
  if (isSuccess.value) resetOrder()
})

useSeo({
  title: 'Giỏ hàng',
  description: 'Hoàn tất đơn hàng của bạn tại Hoàng Nam Phát.',
})
</script>

<style scoped>
.checkout-cols {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.checkout-main {
  width: 100%;
  min-width: 0;
}

.checkout-side {
  width: 100%;
  min-width: 0;
}

@media (min-width: 768px) {
  .checkout-cols {
    flex-direction: row;
    gap: 1.5rem;
  }

  .checkout-main {
    flex: 7;
  }

  .checkout-side {
    flex: 3;
  }

  .checkout-sticky {
    position: sticky;
    top: calc(var(--header-height, 5rem) + 1rem);
    z-index: 10;
  }
}
</style>
