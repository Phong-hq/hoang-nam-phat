import type { CheckoutOrder, OrderResult } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<CheckoutOrder>(event)

  if (!body?.form || !body?.items?.length) {
    throw createError({ statusCode: 400, statusMessage: 'Dữ liệu đơn hàng không hợp lệ' })
  }

  await new Promise((resolve) => setTimeout(resolve, 1200))

  const orderId = `HNP-${Date.now()}`

  const result: OrderResult = {
    orderId,
    status: 'success',
    message: `Đặt hàng thành công! Mã đơn hàng: ${orderId}`,
  }

  return result
})
