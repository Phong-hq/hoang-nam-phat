// Order composable
// Thin layer that calls the service -- pages never call API directly

import { orderService } from '~/services/order.service'
import type { OrderCreateRequest } from '~/types'

export function useOrder() {
  async function createOrder(payload: OrderCreateRequest) {
    return orderService.create(payload)
  }

  return { createOrder }
}
