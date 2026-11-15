<template>
  <div class="bg-[#EEF2F7] min-h-screen">
    <div v-if="pending" class="container mx-auto px-4 py-8">
      <BaseSkeleton class="h-8 w-1/2 mb-4" />
      <BaseSkeleton class="h-4 w-full mb-2" />
      <BaseSkeleton class="h-64 w-full" />
    </div>

    <template v-else-if="item">
      <!-- Page banner -->
      <div class="bg-white border-b border-gray-200 py-8">
        <div class="container mx-auto px-4">
          <nav class="text-sm text-gray-400 mb-3 flex items-center gap-1.5">
            <NuxtLink to="/" class="hover:text-primary transition-colors">Trang chủ</NuxtLink>
            <span>/</span>
            <NuxtLink to="/news" class="hover:text-primary transition-colors">Tin tức</NuxtLink>
            <span>/</span>
            <span class="text-gray-600 truncate">{{ item.title }}</span>
          </nav>
          <h1 class="heading-1 mb-2">{{ item.title }}</h1>
          <p v-if="item.description" class="heading-2 max-w-2xl">{{ item.description }}</p>
          <p class="text-xs text-gray-400 mt-3">Cập nhật: {{ formatDate(item.updated_at) }}</p>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <div class="flex gap-8 items-start">
          <!-- Main content -->
          <div class="flex-1 min-w-0">
            <div class="bg-white rounded-2xl border border-gray-200 shadow p-5 sm:p-8">
              <img
                v-if="item.banner"
                :src="item.banner"
                :alt="item.title"
                class="w-full rounded-xl mb-6 object-cover max-h-96"
              />
              <div class="cms-content" v-html="infoHtml" />
            </div>

            <NuxtLink
              to="/news"
              class="inline-flex items-center gap-1.5 mt-6 text-primary text-sm font-semibold hover:underline"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại danh sách tin tức
            </NuxtLink>
          </div>

          <!-- Right sidebar: best-selling products (desktop only) -->
          <ProductBestSellingSidebar />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsPageStore } from '~/stores/newsPage'
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '~/constants'
import { formatDate, newsPath, newsSlug, resolveOembedTags, slugify } from '~/utils'

// Bài tin tức: /news/<slug>. URL cũ /news/<id> chuyển 301 sang URL có slug.
const route = useRoute()
const param = String(route.params.slug)
const runtimeConfig = useRuntimeConfig()
const siteUrl = (runtimeConfig.public.siteUrl || SITE_URL).replace(/\/$/, '')

const newsPageStore = useNewsPageStore()

const { data: item, pending, error } = await useAsyncData(`news-${param}`, async () => {
  await newsPageStore.fetchNewsList()
  return newsPageStore.newsList.find((n) => newsSlug(n) === param) ?? null
})

// URL không khớp slug hiện tại của bài nào -> thử các dạng URL cũ rồi 301 sang URL đúng:
//   /news/<id>                 URL đầu tiên của site
//   /news/<slug dựng từ title> URL tạm khi bài chưa có slug; admin điền/sửa slug tay sau đó
if (!item.value) {
  const legacy = /^\d+$/.test(param)
    ? newsPageStore.getById(Number(param))
    : newsPageStore.newsList.find((n) => slugify(n.title) === param)
  if (legacy) await navigateTo(newsPath(legacy), { redirectCode: 301 })
}

if (error.value || !item.value) {
  throw createError({ statusCode: 404, statusMessage: 'Không tìm thấy bài viết tin tức' })
}

const article = item.value
const canonical = `${siteUrl}${newsPath(article)}`
const image = article.banner || `${siteUrl}${DEFAULT_OG_IMAGE}`

useSeo({
  title: article.title,
  description: article.description ?? undefined,
  canonical,
  ogType: 'article',
  ogImage: article.banner || undefined,
})

useBreadcrumb([
  { name: 'Trang chủ', path: '/' },
  { name: 'Tin tức', path: '/news' },
  { name: article.title, path: newsPath(article) },
])

useJsonLd(
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    ...(article.description ? { description: article.description } : {}),
    image: [image],
    datePublished: toIsoDate(article.created_at),
    dateModified: toIsoDate(article.updated_at || article.created_at),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    author: { '@type': 'Organization', name: SITE_NAME, url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${siteUrl}${DEFAULT_OG_IMAGE}` },
    },
  },
  'jsonld-article',
)

// ERP trả "YYYY-MM-DD HH:mm:ss" (giờ VN); schema cần ISO 8601 kèm múi giờ.
function toIsoDate(value: string): string {
  return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(value) ? `${value.replace(' ', 'T')}+07:00` : value
}

const infoHtml = computed(() => (item.value?.info ? resolveOembedTags(item.value.info) : ''))
</script>
