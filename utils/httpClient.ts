// Axios HTTP client for the ERP API
// The API wraps every payload as { status, data, messages, code } -- the
// response interceptor unwraps it so callers work with `data` directly.

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { ApiResponse } from '~/types'

// Set `unwrap: false` on a request's config when the endpoint returns the
// payload directly (no `{ status, data, messages, code }` envelope) --
// the response interceptor then skips the extra `.data` unwrap.
declare module 'axios' {
  interface AxiosRequestConfig {
    unwrap?: boolean
  }
}

interface HttpClient extends Omit<AxiosInstance, 'get' | 'post' | 'put' | 'patch' | 'delete'> {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = unknown>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T>
  put<T = unknown>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T>
  patch<T = unknown>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T>
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
}

const instance = axios.create({
  // Server-side rendering waits on these calls -- don't let a hung ERP request
  // hold the whole page response forever.
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Set once from plugins/http-client.ts, where the Nuxt context is available.
export function setHttpClientBaseUrl(baseURL: string) {
  instance.defaults.baseURL = baseURL
}

instance.interceptors.response.use(
  ((response: AxiosResponse) => {
    if (response.config.unwrap === false) {
      return response.data
    }
    return (response.data as ApiResponse).data
  }) as (
    response: AxiosResponse,
  ) => AxiosResponse,
  (error) => Promise.reject(error),
)

export const httpClient = instance as unknown as HttpClient
