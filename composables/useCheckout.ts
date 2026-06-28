export function useCheckout() {
  const store = useCheckoutStore()

  const isSubmitting = computed(() => store.status === 'submitting')
  const isSuccess = computed(() => store.status === 'success')
  const isError = computed(() => store.status === 'error')
  const hasItems = computed(() => store.items.length > 0)

  return {
    form: store.form,
    errors: computed(() => store.errors),
    items: computed(() => store.items),
    status: computed(() => store.status),
    orderResult: computed(() => store.orderResult),
    subtotal: computed(() => store.subtotal),
    shippingFee: computed(() => store.shippingFee),
    discount: computed(() => store.discount),
    total: computed(() => store.total),
    isSubmitting,
    isSuccess,
    isError,
    hasItems,
    touch: store.touch,
    submit: store.submit,
    updateQuantity: store.updateQuantity,
    removeItem: store.removeItem,
    retryAfterError: store.retryAfterError,
  }
}
