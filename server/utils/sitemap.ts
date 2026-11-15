// ERP trả "YYYY-MM-DD HH:mm:ss"; sitemap chỉ cần phần ngày (W3C datetime).
export function toLastmod(value?: string | null): string | undefined {
  const date = value?.slice(0, 10)
  return date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined
}
