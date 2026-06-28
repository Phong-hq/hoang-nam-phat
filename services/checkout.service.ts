import type { CheckoutOrder, OrderResult } from '~/types'
import { API_ROUTES } from '~/constants'

export async function submitOrder(order: CheckoutOrder): Promise<OrderResult> {
  return $fetch<OrderResult>(API_ROUTES.CHECKOUT, {
    method: 'POST',
    body: order,
  })
}
