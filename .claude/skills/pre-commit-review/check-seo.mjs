#!/usr/bin/env node
// Kiểm tra HTML do server render (SSR) — cái Google / Facebook / Zalo thực sự đọc.
//
// Cách dùng:
//   node .claude/skills/pre-commit-review/check-seo.mjs <baseUrl> [productSlug]
//   node .claude/skills/pre-commit-review/check-seo.mjs http://127.0.0.1:3003
//   node .claude/skills/pre-commit-review/check-seo.mjs https://hoangnamphat.vn
//
// So sánh trước/sau (không cần git stash):
//   node check-seo.mjs https://hoangnamphat.vn > prod.txt
//   node check-seo.mjs http://127.0.0.1:3003   > local.txt
//   diff prod.txt local.txt        # chỉ những dòng khác nhau mới là do diff gây ra
//
// Exit code 1 nếu có FAIL. Chỉ đọc, không ghi gì.

const SITE_URL = 'https://hoangnamphat.vn'
const STAGING_HOST = /\.thanhtoan24on7\.xyz$/i
const UA = 'Mozilla/5.0 (compatible; hnp-seo-check/1.0)'
const NOT_FOUND_SLUG = '__seo-check-khong-ton-tai__'
const TRACKING_PARAMS = /[?&](utm_[a-z]+|fbclid|gclid|zarsrc)=/i

const base = (process.argv[2] || 'http://127.0.0.1:3003').replace(/\/+$/, '')
let slug = process.argv[3] || ''
const expectNoIndex = STAGING_HOST.test(new URL(base).hostname)

const rows = []
const report = (level, page, check, detail = '') => rows.push({ level, page, check, detail })
const pass = (page, check, detail) => report('PASS', page, check, detail)
const warn = (page, check, detail) => report('WARN', page, check, detail)
const fail = (page, check, detail) => report('FAIL', page, check, detail)
const skip = (page, check, detail) => report('SKIP', page, check, detail)
// `nuxt dev`: @nuxtjs/robots tự chặn crawl và @nuxtjs/sitemap dùng origin của request.
// Hai nhóm check đó chỉ có nghĩa trên bản build (npm run build && npm run preview) hoặc prod.
let devMode = false
const DEV_NOTE = 'nuxt dev — kiểm bằng npm run build && npm run preview'

async function get(path) {
  try {
    const res = await fetch(base + path, { redirect: 'manual', headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' } })
    return { status: res.status, headers: res.headers, body: await res.text() }
  } catch (e) {
    return { status: 0, headers: new Headers(), body: '', error: String(e?.cause?.code || e) }
  }
}

function decode(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

function attrs(tag) {
  const out = {}
  for (const m of tag.matchAll(/([a-zA-Z_:][\w:.-]*)\s*=\s*("([^"]*)"|'([^']*)')/g)) {
    out[m[1].toLowerCase()] = decode(m[3] ?? m[4] ?? '')
  }
  return out
}

function parseHead(html) {
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => attrs(m[0]))
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => attrs(m[0]))
  const meta = (key) => metas.find((a) => a.name === key || a.property === key)?.content
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').trim())
  const canonicals = links.filter((a) => a.rel === 'canonical').map((a) => a.href)
  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(
    (m) => {
      try {
        return { ok: true, data: JSON.parse(m[1]) }
      } catch (e) {
        return { ok: false, error: String(e.message) }
      }
    },
  )
  const ldTypes = jsonLd.filter((j) => j.ok).flatMap((j) => [].concat(j.data).map((d) => d?.['@type']))
  return { metas, links, meta, title, canonicals, jsonLd, ldTypes, lang: html.match(/<html\b[^>]*\blang=["']([^"']+)/i)?.[1] }
}

function checkIndexable(page, res, { expectCanonical, ldRequired = [] } = {}) {
  if (res.status !== 200) {
    fail(page, 'status 200', `nhận ${res.status}${res.error ? ` (${res.error})` : ''}`)
    return null
  }
  pass(page, 'status 200')
  const h = parseHead(res.body)

  h.lang === 'vi' ? pass(page, 'html lang=vi') : warn(page, 'html lang=vi', `lang=${h.lang}`)

  if (!h.title) fail(page, 'title', 'trống')
  else if (h.title.length > 70) warn(page, 'title <= 70 ký tự', `${h.title.length}: ${h.title}`)
  else pass(page, 'title', h.title)

  const desc = h.meta('description')
  if (!desc) fail(page, 'meta description', 'thiếu')
  else if (desc.length > 170) warn(page, 'meta description <= 160', `${desc.length} ký tự`)
  else pass(page, 'meta description', `${desc.length} ký tự`)

  if (h.canonicals.length !== 1) fail(page, 'đúng 1 canonical', `có ${h.canonicals.length}: ${h.canonicals.join(' , ')}`)
  else {
    const c = h.canonicals[0]
    if (!c.startsWith(SITE_URL)) fail(page, 'canonical về domain chính', c)
    else if (TRACKING_PARAMS.test(c)) fail(page, 'canonical không chứa utm/fbclid', c)
    else if (expectCanonical && c !== expectCanonical) fail(page, 'canonical đúng URL', `${c} != ${expectCanonical}`)
    else pass(page, 'canonical', c)
  }

  const robots = (h.meta('robots') || '').toLowerCase()
  if (expectNoIndex) {
    robots.includes('noindex') ? pass(page, 'robots noindex (staging)') : fail(page, 'robots noindex (staging)', robots || 'thiếu')
  } else if (robots.includes('noindex') || robots.includes('nofollow')) {
    fail(page, 'robots index,follow', robots)
  } else pass(page, 'robots', robots || '(mặc định)')

  for (const key of ['og:title', 'og:description', 'og:url']) {
    h.meta(key) ? pass(page, key) : warn(page, key, 'thiếu')
  }
  const ogImage = h.meta('og:image')
  if (!ogImage) fail(page, 'og:image', 'thiếu (share Facebook/Zalo mất ảnh)')
  else if (!/^https?:\/\//.test(ogImage)) fail(page, 'og:image tuyệt đối', ogImage)
  else pass(page, 'og:image', ogImage)

  const bad = h.jsonLd.filter((j) => !j.ok)
  bad.length ? fail(page, 'JSON-LD parse được', bad.map((b) => b.error).join('; ')) : pass(page, 'JSON-LD', h.ldTypes.join(', ') || '(không có)')
  for (const t of ldRequired) {
    h.ldTypes.includes(t) ? pass(page, `JSON-LD có ${t}`) : fail(page, `JSON-LD có ${t}`, 'thiếu')
  }

  const h1 = (res.body.match(/<h1\b/gi) || []).length
  h1 === 1 ? pass(page, 'đúng 1 <h1>') : warn(page, 'đúng 1 <h1>', `có ${h1}`)

  // Script đo lường phải nạp trễ (plugins/analytics.client.ts), không nằm sẵn trong HTML.
  const eagerTags = [...res.body.matchAll(/<script\b[^>]*src=["']([^"']*(googletagmanager\.com|connect\.facebook\.net)[^"']*)/gi)]
  eagerTags.length
    ? fail(page, 'GTM/Pixel/FB SDK không chặn render', eagerTags.map((m) => m[1]).join(' , '))
    : pass(page, 'GTM/Pixel/FB SDK nạp trễ')

  return h
}

async function main() {
  console.log(`# check-seo ${base}${expectNoIndex ? ' (staging: mong đợi noindex)' : ''}`)

  // --- robots.txt + sitemap ---
  const robotsTxt = await get('/robots.txt')
  if (robotsTxt.status !== 200) fail('/robots.txt', 'status 200', String(robotsTxt.status))
  else if (/indexing is blocked in development/i.test(robotsTxt.body)) {
    devMode = true
    pass('/robots.txt', 'status 200')
    skip('/robots.txt', 'khai báo Sitemap + không chặn toàn site', DEV_NOTE)
  } else {
    pass('/robots.txt', 'status 200')
    ;/^sitemap:\s*\S+/im.test(robotsTxt.body) ? pass('/robots.txt', 'khai báo Sitemap') : fail('/robots.txt', 'khai báo Sitemap', 'thiếu')
    const blocksAll = /^disallow:\s*\/\s*$/im.test(robotsTxt.body)
    if (expectNoIndex) blocksAll ? pass('/robots.txt', 'chặn crawl (staging)') : warn('/robots.txt', 'chặn crawl (staging)', 'không có Disallow: /')
    else blocksAll ? fail('/robots.txt', 'không chặn toàn site', 'có "Disallow: /"') : pass('/robots.txt', 'không chặn toàn site')
  }

  const index = await get('/sitemap_index.xml')
  const children = [...index.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]))
  if (index.status !== 200 || !children.length) fail('/sitemap_index.xml', 'có sitemap con', `status ${index.status}, ${children.length} sitemap`)
  else pass('/sitemap_index.xml', 'có sitemap con', children.map((c) => c.replace(/^https?:\/\/[^/]+/, '')).join(' , '))

  for (const name of ['products', 'categories']) {
    const path = `/__sitemap__/${name}.xml`
    const sm = await get(path)
    const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]))
    const pageLocs = locs.filter((l) => !/\.(png|jpe?g|webp|gif|avif)(\?|$)/i.test(l))
    if (sm.status !== 200) fail(path, 'status 200', String(sm.status))
    else if (!pageLocs.length) warn(path, 'có URL', '0 URL (ERP lỗi hoặc source trả [])')
    else {
      pass(path, 'có URL', `${pageLocs.length} URL`)
      const wrong = pageLocs.filter((l) => !l.startsWith(SITE_URL))
      if (devMode && wrong.length && wrong.every((l) => l.startsWith(base))) skip(path, '<loc> dùng domain chính', DEV_NOTE)
      else wrong.length ? fail(path, '<loc> dùng domain chính', `${wrong.length} sai, vd ${wrong[0]}`) : pass(path, '<loc> dùng domain chính')
    }
    if (name === 'products' && !slug) {
      const first = pageLocs.find((l) => /\/products\/[^/?#]+$/.test(l))
      if (first) slug = first.split('/products/')[1]
    }
  }

  // --- Trang index được ---
  const home = await get('/')
  const homeHead = checkIndexable('/', home, { expectCanonical: `${SITE_URL}/`, ldRequired: ['LocalBusiness'] })
  if (homeHead) {
    const imgPreload = homeHead.links.some((a) => a.rel === 'preload' && a.as === 'image')
    imgPreload ? pass('/', 'preload ảnh LCP (hero)') : warn('/', 'preload ảnh LCP (hero)', 'thiếu <link rel=preload as=image>')
    const fontPreload = homeHead.links.some((a) => a.rel === 'preload' && a.as === 'font')
    fontPreload ? pass('/', 'preload font tự host') : warn('/', 'preload font tự host', 'thiếu')
    ;/fonts\.googleapis\.com/.test(home.body) ? warn('/', 'không dùng Google Fonts', 'có fonts.googleapis.com') : pass('/', 'không dùng Google Fonts')
  }

  const utm = await get('/?utm_source=seo-check&utm_medium=test&fbclid=abc')
  checkIndexable('/?utm_source=…', utm, { expectCanonical: `${SITE_URL}/` })

  const list = await get('/products')
  checkIndexable('/products', list)

  const page2 = await get('/products?page=2')
  checkIndexable('/products?page=2', page2, { expectCanonical: `${SITE_URL}/products?page=2` })

  if (slug) {
    const p = `/products/${slug}`
    const res = await get(p)
    const h = checkIndexable(p, res, { expectCanonical: `${SITE_URL}${p}`, ldRequired: ['Product', 'BreadcrumbList'] })
    if (h) {
      const product = h.jsonLd.filter((j) => j.ok).map((j) => j.data).find((d) => d?.['@type'] === 'Product')
      const offer = product?.offers
      if (offer && !(Number(offer.price) > 0)) fail(p, 'Offer price > 0', `price=${offer.price}`)
      else pass(p, 'Offer', offer ? `price=${offer.price}` : 'không có (giá liên hệ)')
      const imgs = [].concat(product?.image ?? [])
      imgs.every((u) => /^https?:\/\//.test(u)) ? pass(p, 'Product.image tuyệt đối', `${imgs.length} ảnh`) : fail(p, 'Product.image tuyệt đối', imgs.join(' , '))
      product?.name && res.body.includes(product.name.slice(0, 20).replace(/&/g, '&amp;'))
        ? pass(p, 'nội dung SSR có tên sản phẩm')
        : warn(p, 'nội dung SSR có tên sản phẩm', 'không thấy tên trong HTML')
      const cc = res.headers.get('cache-control') || ''
      if (/s-maxage/.test(cc)) pass(p, 'cache-control s-maxage', cc)
      else warn(p, 'cache-control s-maxage', cc || 'thiếu')
    }
  } else warn('/products/<slug>', 'có slug để test', 'sitemap rỗng — truyền slug làm tham số thứ 2')

  // --- Trang không được index / mã lỗi ---
  const nf = await get(`/products/${NOT_FOUND_SLUG}`)
  if (nf.status === 404) pass('/products/<không tồn tại>', 'status 404')
  else if (nf.status >= 300 && nf.status < 400) fail('/products/<không tồn tại>', 'status 404', `redirect ${nf.status} -> ${nf.headers.get('location')} (soft 404)`)
  else if (nf.status === 200) fail('/products/<không tồn tại>', 'status 404', '200 (soft 404)')
  else warn('/products/<không tồn tại>', 'status 404', `nhận ${nf.status}`)
  if (nf.body) {
    const r = (parseHead(nf.body).meta('robots') || '').toLowerCase()
    r.includes('noindex') ? pass('/products/<không tồn tại>', 'trang lỗi noindex') : fail('/products/<không tồn tại>', 'trang lỗi noindex', r || 'thiếu')
  }

  const cart = await get('/cart')
  if (cart.status === 200) {
    const r = (parseHead(cart.body).meta('robots') || '').toLowerCase()
    r.includes('noindex') ? pass('/cart', 'noindex') : fail('/cart', 'noindex', r || 'thiếu')
  } else warn('/cart', 'status 200', String(cart.status))

  // --- In kết quả ---
  for (const r of rows) console.log(`${r.level.padEnd(4)}  ${r.page}  |  ${r.check}${r.detail ? `  |  ${r.detail}` : ''}`)
  const count = (l) => rows.filter((r) => r.level === l).length
  console.log(`# ${count('PASS')} PASS, ${count('WARN')} WARN, ${count('FAIL')} FAIL, ${count('SKIP')} SKIP`)
  process.exit(count('FAIL') ? 1 : 0)
}

main()
