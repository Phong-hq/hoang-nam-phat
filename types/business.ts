// Business info domain type
// Defines the data structure returned by the CMS "business_info" record API

export interface BusinessInfoApiRecord {
  id: number
  name: string
  phone: string
  address: string
  working_hour: string
  logo: string | null
  tax_code: string
  email: string
  map: string | null
  created_at: string
  updated_at: string
}

export interface BusinessInfoRecord extends Omit<BusinessInfoApiRecord, 'phone'> {
  phone: string[]
}
