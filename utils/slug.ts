// Slug generation and validation utilities

export function slugify(text: string): string {
  return text
    .toLowerCase()
    // "đ" không tách dấu khi normalize nên phải đổi riêng, nếu không sẽ bị xoá mất.
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}
