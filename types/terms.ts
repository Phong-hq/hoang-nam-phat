// Terms page domain type
// Defines the data structure returned by the CMS "terms" record API

export interface TermsApiRecord {
  id: number
  info: string | null
  created_at: string
  updated_at: string
}
