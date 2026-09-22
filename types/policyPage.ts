// Policy page domain type
// Defines the data structure returned by the CMS "policy_page" record API

export interface PolicyPageApiRecord {
  id: number
  title: string
  description: string | null
  banner: string | null
  info: string | null
  created_at: string
  updated_at: string
}
