// GET /api/products
// Returns paginated product list -- hardcoded data until real DB is connected

import type { ProductListItem, PaginatedResponse } from '~/types'

const PRODUCTS: ProductListItem[] = [
  {
    id: 1,
    slug: 'tp-link-er605',
    name: 'TP-Link TL-ER605 Router VPN Multi-WAN',
    thumbnail: '/images/products/tp-link-er605.jpg',
    price: 1250000,
    brand: 'TP-Link',
    category: 'router',
    rating: 4.7,
    reviewCount: 52,
  },
  {
    id: 2,
    slug: 'tp-link-archer-ax73',
    name: 'TP-Link Archer AX73 Router WiFi 6 AX5400',
    thumbnail: '/images/products/tp-link-ax73.jpg',
    price: 2850000,
    originalPrice: 3200000,
    brand: 'TP-Link',
    category: 'router',
    rating: 4.8,
    reviewCount: 73,
  },
  {
    id: 3,
    slug: 'ubiquiti-unifi-ap-ac-lite',
    name: 'Ubiquiti UniFi AP-AC-Lite Wireless Access Point',
    thumbnail: '/images/products/unifi-ap-lite.jpg',
    price: 2100000,
    brand: 'Ubiquiti',
    category: 'wifi',
    rating: 4.8,
    reviewCount: 88,
  },
  {
    id: 4,
    slug: 'ruijie-rg-ap820-l',
    name: 'Ruijie RG-AP820-L(V3) WiFi 6 Indoor AP',
    thumbnail: '/images/products/ruijie-ap820.jpg',
    price: 3450000,
    brand: 'Ruijie',
    category: 'wifi',
    rating: 4.7,
    reviewCount: 41,
  },
  {
    id: 5,
    slug: 'cisco-sg110-16',
    name: 'Cisco SG110-16 16-Port Gigabit Switch',
    thumbnail: '/images/products/cisco-sg110.jpg',
    price: 3200000,
    brand: 'Cisco',
    category: 'switch',
    rating: 4.9,
    reviewCount: 34,
  },
  {
    id: 6,
    slug: 'tp-link-tl-sg108',
    name: 'TP-Link TL-SG108 8-Port Gigabit Switch',
    thumbnail: '/images/products/tp-link-sg108.jpg',
    price: 490000,
    originalPrice: 550000,
    brand: 'TP-Link',
    category: 'switch',
    rating: 4.6,
    reviewCount: 120,
  },
  {
    id: 7,
    slug: 'hikvision-ds-2cd2143g2-i',
    name: 'Camera IP Hikvision DS-2CD2143G2-I 4MP',
    thumbnail: '/images/products/hikvision-camera.jpg',
    price: 1850000,
    brand: 'Hikvision',
    category: 'camera',
    rating: 4.6,
    reviewCount: 61,
  },
  {
    id: 8,
    slug: 'dahua-ipc-hfw2849s',
    name: 'Camera IP Dahua IPC-HFW2849S-S-IL 8MP',
    thumbnail: '/images/products/dahua-hfw2849.jpg',
    price: 2200000,
    originalPrice: 2500000,
    brand: 'Dahua',
    category: 'camera',
    rating: 4.7,
    reviewCount: 38,
  },
  {
    id: 9,
    slug: 'reolink-e1-outdoor-pro',
    name: 'Reolink E1 Outdoor Pro WiFi Camera 4K',
    thumbnail: '/images/products/reolink-e1-outdoor.jpg',
    price: 1690000,
    brand: 'Reolink',
    category: 'wifi-camera',
    rating: 4.5,
    reviewCount: 55,
  },
  {
    id: 10,
    slug: 'synology-ds223',
    name: 'Synology DiskStation DS223 NAS 2-bay',
    thumbnail: '/images/products/synology-ds223.jpg',
    price: 6500000,
    brand: 'Synology',
    category: 'nas',
    rating: 4.8,
    reviewCount: 27,
  },
  {
    id: 11,
    slug: 'macbook-pro-m4',
    name: 'MacBook Pro M4 14"',
    thumbnail: '/images/products/macbook-pro-m4.jpg',
    price: 45000000,
    originalPrice: 48000000,
    brand: 'Apple',
    category: 'laptop',
    rating: 5.0,
    reviewCount: 45,
  },
  {
    id: 12,
    slug: 'dell-latitude-5540',
    name: 'Dell Latitude 5540 Intel Core i5 Gen 13',
    thumbnail: '/images/products/dell-latitude-5540.jpg',
    price: 22000000,
    originalPrice: 25000000,
    brand: 'Dell',
    category: 'laptop',
    rating: 4.6,
    reviewCount: 18,
  },
]

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 20

  const categoryParam = query.category ? String(query.category) : ''
  const selectedCategories = categoryParam.split(',').filter(Boolean)

  const filtered = selectedCategories.length
    ? PRODUCTS.filter((p) => selectedCategories.includes(p.category))
    : PRODUCTS

  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  const response: PaginatedResponse<ProductListItem> = {
    data: paginated,
    meta: {
      currentPage: page,
      totalPages: Math.ceil(filtered.length / limit),
      totalItems: filtered.length,
      itemsPerPage: limit,
      hasNextPage: start + limit < filtered.length,
      hasPrevPage: page > 1,
    },
  }

  return response
})
