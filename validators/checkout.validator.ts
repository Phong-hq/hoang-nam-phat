import { isEmail, isPhone, required } from '~/utils'
import type { CheckoutFormData, CheckoutErrors } from '~/types'

export function validateCheckout(form: CheckoutFormData): CheckoutErrors {
  const errors: CheckoutErrors = {}

  if (!required(form.fullName)) {
    errors.fullName = 'Vui lòng nhập họ và tên'
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = 'Họ và tên phải có ít nhất 2 ký tự'
  }

  if (!required(form.email)) {
    errors.email = 'Vui lòng nhập địa chỉ email'
  } else if (!isEmail(form.email.trim())) {
    errors.email = 'Địa chỉ email không hợp lệ'
  }

  if (!required(form.phone)) {
    errors.phone = 'Vui lòng nhập số điện thoại'
  } else if (!isPhone(form.phone)) {
    errors.phone = 'Số điện thoại không hợp lệ (VD: 0901234567)'
  }

  if (!required(form.province)) {
    errors.province = 'Vui lòng chọn tỉnh / thành phố'
  }

  if (!required(form.address)) {
    errors.address = 'Vui lòng nhập địa chỉ giao hàng'
  }

  if (form.invoiceRequested) {
    if (!required(form.companyName)) errors.companyName = 'Vui lòng nhập tên công ty'
    if (!required(form.taxCode)) errors.taxCode = 'Vui lòng nhập mã số thuế'
    if (!required(form.companyAddress)) errors.companyAddress = 'Vui lòng nhập địa chỉ công ty'
  }

  return errors
}

export function isCheckoutValid(errors: CheckoutErrors): boolean {
  return Object.keys(errors).length === 0
}
