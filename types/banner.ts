// Banner domain types
// Defines the data structure returned by the CMS "banner" record API

export interface BannerApiRecord {
  id: number
  main: string
  left: string[]
  right: string[]
  created_at: string
  updated_at: string
}
