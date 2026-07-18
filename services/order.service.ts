// Order service
// Calls the ERP API directly via httpClient -- no repository layer
// Flow: Composable -> Service -> API

import { httpClient } from '~/utils/httpClient'
import type { OrderCreateRequest, OrderCreateResponse } from '~/types'

const ORDER_CREATE_API_URL = '/api/v1/frontend/order/site/create'

export const orderService = {
  async create(payload: OrderCreateRequest): Promise<OrderCreateResponse> {
    return httpClient.post<OrderCreateResponse>(ORDER_CREATE_API_URL, payload)
  },
}
