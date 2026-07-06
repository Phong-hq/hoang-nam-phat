// API response types
// Shared across repositories and services

export interface ApiResponse<T = unknown> {
  status: boolean
  data: T
  messages: string
  code: number
}

export interface ApiError {
  statusCode: number
  message: string
  errors?: Record<string, string[]>
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: unknown
  query?: Record<string, string | number | boolean>
}

export interface ApiListLinks {
  self: { href: string }
  first: { href: string }
  last: { href: string }
  next?: { href: string }
  prev?: { href: string }
}

export interface ApiListMeta {
  totalCount: number
  pageCount: number
  currentPage: number
  perPage: number
}

export interface ApiListResponse<T> {
  items: T[]
  _links: ApiListLinks
  _meta: ApiListMeta
}

export interface SitemapEntry {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}
