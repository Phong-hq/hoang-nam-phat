# Checklist SEO / Marketing / Hiệu suất: Hoàng Nam Phát

Tài liệu tham chiếu cho `SKILL.md`. Mỗi mục ghi **bất biến** (điều phải giữ đúng), **file liên quan** và **dấu hiệu vi phạm** cần tìm trong diff.
Chỉ chặn (BLOCK) khi chính diff này làm vỡ một bất biến. Vấn đề có sẵn từ trước thì ghi vào mục "Đã biết", không chặn.

---

## A. Bản đồ file → rủi ro

| File / glob | Vùng | Mức |
|---|---|---|
| `nuxt.config.ts` (`app.head`, `modules`, `site`, `robots`, `sitemap`, `routeRules`, `image`, `runtimeConfig.public`, `devServer`) | Mọi vùng | Cao |
| `composables/useSeo.ts`, `useBusinessSeo.ts`, `useProductSeo.ts`, `useBreadcrumb.ts`, `useJsonLd.ts` | Meta, canonical, robots, JSON-LD | Cao |
| `composables/useTracking.ts`, `plugins/analytics.client.ts` | Đo lường marketing (GTM/GA4/Pixel) | Cao |
| `stores/cart.store.ts`, `stores/checkout.store.ts` | Sự kiện `add_to_cart`, `purchase` | Cao |
| `server/api/__sitemap__/**`, `services/sitemap.service.ts`, `constants` (`ERP_API_BASE_URL_FALLBACK`, `SITE_URL`) | Sitemap | Cao |
| `pages/**` (thêm/xoá/đổi tên file = đổi URL) | URL, status code, SEO từng trang | Cao |
| `error.vue`, `middleware/**` | Status code, noindex, redirect | Cao |
| `app.vue`, `layouts/**` | Dữ liệu SSR, `useBusinessSeo`, LCP | Cao |
| `public/**` (đặc biệt `google*.html`, `hnp.png`, `fonts/`, `favicon.ico`) | Xác minh Search Console, og:image, font | Trung bình |
| `components/home/HomeHero.vue` | Ảnh LCP | Trung bình |
| `components/layout/Header.vue`, `Footer.vue` | Link liên hệ (tracking), FB SDK, link nội bộ | Trung bình |
| Component có `<NuxtImg>`/`<img>`, `<ClientOnly>`, `tel:` / `zalo.me` / `m.me` | CLS, nội dung SSR, tracking liên hệ | Trung bình |
| `.env.example`, `Dockerfile`, `docker-compose.yml` | Biến môi trường SEO/đo lường | Trung bình |
| `nginx.conf` | Hiện là config SPA tĩnh. Dockerfile chạy thẳng `node .output/server/index.mjs` nên file này **không** phục vụ site. Nếu diff bắt đầu dùng nó, review lại toàn bộ cache/redirect. | Thấp |
| Chỉ style/CSS, test, docs, `.claude/**` | — | Thấp (vẫn xem mục G nếu đổi layout trên màn hình đầu) |

---

## B. Meta, canonical, robots

1. **Mọi trang index được gọi `useSeo()` (hoặc `useProductSeo()`) ở top-level `<script setup>`**, chạy đồng bộ khi SSR, không đặt trong `onMounted`, `watch` hay `setTimeout`.
   - Vi phạm: trang mới trong `pages/` không gọi `useSeo`, hoặc set title/description sau khi mount (Google chỉ thấy title mặc định).
2. **Canonical chỉ do `useSeo` sinh ra**: domain chính (`runtimeConfig.public.siteUrl`) + path, chỉ giữ `?page=N` khi N > 1, bỏ `utm_*`, `fbclid`, `sort`, `category`...
   - Vi phạm: dùng `useCanonical()` (nó lấy `route.fullPath` nên giữ cả utm; hiện không trang nào gọi, đừng bắt đầu gọi), thêm `link rel=canonical` thứ 2, canonical tương đối hoặc dùng domain staging.
3. **Hậu tố " | Hoàng Nam Phát" chỉ thêm một lần**, qua `titleTemplate` trong `useBusinessSeo`. Trang không được tự nối tên site vào title.
4. **Staging luôn noindex**: `useSeo` ép `noindex, nofollow` khi `NUXT_PUBLIC_NO_INDEX=true` hoặc host khớp `*.thanhtoan24on7.xyz`. Không được xoá hay nới điều kiện này.
5. **Trang không nên index phải truyền `noIndex: true`**: giỏ hàng, checkout, tìm kiếm, trang cá nhân, trang kết quả lọc rỗng. Hiện có `/cart`.
6. `app.head` trong `nuxt.config.ts` giữ `lang: 'vi'`, `robots: index, follow` mặc định, `og:site_name`, `og:image` tuyệt đối.
7. Mô tả ≤ 160 ký tự (`useProductSeo` tự cắt). Title nên ≤ 70 ký tự.

## C. Dữ liệu có cấu trúc (JSON-LD)

1. Key cố định, không trùng: `jsonld-business` (app.vue), `jsonld-product`, `jsonld-breadcrumb`. Đổi key hoặc bỏ key sẽ sinh script trùng khi chuyển trang.
2. **Product Offer bị bỏ khi giá = 0** ("Liên hệ báo giá"). Không được phát `price: 0`.
3. `Product.image` chỉ chứa ảnh thật dạng URL tuyệt đối, không chứa ảnh placeholder logo.
4. `LocalBusiness` lấy từ store business (SSR qua `callOnce` trong `app.vue`), đăng ký một lần bằng `computed`, không đăng ký trong callback của `watch`.
5. JSON phải parse được. Không tự nối chuỗi JSON bằng tay.

## D. Status code, URL, redirect

1. **Thực thể không tồn tại thì `throw createError({ statusCode: 404 })`.** Không được `navigateTo('/')` hay redirect về trang chủ (lỗi soft 404, Google gỡ hoặc phạt). Lỗi API thì dùng 503.
2. `error.vue` giữ `robots: noindex, nofollow`.
3. **Đổi URL đã index** (đổi tên file trong `pages/`, đổi format slug, đổi `/products/:slug`, đổi query `category`/`page`) thì bắt buộc có redirect 301 từ URL cũ (`routeRules: { '/old': { redirect: { to: '/new', statusCode: 301 } } }`) và sitemap phải cập nhật theo. Thiếu redirect là BLOCK.
4. Link nội bộ dùng `<NuxtLink>` / `<a href>` thật để crawler đi theo được. Phân trang dùng `pageHref` (link `?page=N`), không chỉ dùng `@click`.
5. `middleware/trailing-slash.ts` **chưa được trang nào dùng** (không phải `.global`), nên hiện **không** có đảm bảo 301 bỏ dấu `/` cuối. Đừng coi là đã có. Nếu diff bật nó lên, kiểm tra cả `/` và query.

## E. Robots.txt và sitemap

1. Không thêm `public/robots.txt` hay `public/sitemap*.xml`: chúng đè lên `@nuxtjs/robots` / `@nuxtjs/sitemap`.
2. `robots.groups` không được có `disallow: ['/']` trên prod. `robots.sitemap` = `/sitemap_index.xml`.
3. Source sitemap (`server/api/__sitemap__/*.ts`) phải bắt lỗi và **trả `[]`**, không throw, để một API lỗi không làm hỏng cả sitemap index.
4. Handler sitemap chạy ngoài Nuxt app context nên **không dùng `useRuntimeConfig()`** để lấy URL ERP. Dùng `ERP_API_BASE_URL_FALLBACK` (xem comment trong `constants`).
5. `<loc>` phải dùng domain chính. Giữ `devServer.host = 127.0.0.1` (IPv6 `::1` làm hỏng `<loc>`).
6. Thêm loại trang mới cần index (tin tức, giải pháp...) thì cân nhắc thêm source sitemap.
7. Không xoá `public/google154049303985a329.html`: đây là file xác minh Google Search Console.

## F. Đo lường marketing (GTM / GA4 / Facebook Pixel)

Tên sự kiện là **hợp đồng với GTM container và báo cáo quảng cáo**. Đổi tên hoặc đổi tham số thì báo cáo hỏng mà không có lỗi nào hiện ra.

| Sự kiện dataLayer / gtag | Pixel | Gọi ở |
|---|---|---|
| `view_item` | `ViewContent` | `pages/products/[slug].vue` (onMounted) |
| `add_to_cart` | `AddToCart` | `stores/cart.store.ts` |
| `purchase` (+ `transaction_id`) | `Purchase` | `stores/checkout.store.ts` |
| `contact_click` (+ `channel`) | `Contact` | `plugins/analytics.client.ts`: bắt click toàn cục |
| `virtual_page_view` (+ `page_path`) | `PageView` | hook `page:finish` |

1. Không đổi tên sự kiện, tên field (`item_id`, `item_name`, `price`, `quantity`, `item_brand`, `item_category`, `currency`, `value`, `transaction_id`, `channel`, `page_path`) hay kiểu dữ liệu (`item_id` là string).
2. **Tracking liên hệ (chuyển đổi chính của shop) chỉ bắt `<a href="tel:...">`, `zalo.me` / `chat.zalo`, `m.me` / `messenger.com`.** Đổi nút liên hệ thành `<button @click>`, `window.open(...)` hay `location.href = ...` là mất đo lường. BLOCK, trừ khi diff gọi `useTracking().contact(channel)` thủ công.
3. Mỗi luồng (thêm giỏ, đặt hàng thành công, xem sản phẩm) phải giữ đúng **một** lần gọi tracking: không mất, không gọi 2 lần (ví dụ gọi trong cả component lẫn store).
4. Không bao giờ nạp GA4 trực tiếp khi đã có GTM (đếm trùng). Logic `if (gtmId) ... else if (ga4Id)` phải giữ nguyên.
5. Script ngoài (GTM, Pixel, FB SDK, chat widget, heatmap...) **không được thêm vào `app.head` hay `<script>` trong template**. Script mới phải nạp trễ giống `analytics.client.ts` (lần tương tác đầu tiên hoặc 5s sau `onNuxtReady`) hoặc qua GTM.
6. Mã đo lường lấy từ env (`NUXT_PUBLIC_GTM_ID`, `NUXT_PUBLIC_GA4_ID`, `NUXT_PUBLIC_FB_PIXEL_ID`). Không hardcode ID.
7. Tracking chỉ chạy ở client (`import.meta.client`). Không gọi `window` khi SSR.
8. UTM / fbclid / gclid trên URL không được bị xoá trước khi GTM đọc (ví dụ redirect hay `router.replace` bỏ query ngay khi vào trang).

## G. Hiệu suất / Core Web Vitals (ảnh hưởng xếp hạng)

**LCP**
1. Banner hero chính (`HomeHero.vue`, `mainBanners[0]`) giữ `loading="eager"`, `fetchpriority="high"`, `:preload`. Không bọc trong `<ClientOnly>`, không ẩn sau `v-if` phụ thuộc dữ liệu client.
2. Không thêm overlay hay splash toàn màn hình chờ hydrate xong (đã từng đẩy LCP > 10s).
3. Ảnh trên màn hình đầu không dùng `loading="lazy"`. Ảnh bên dưới thì phải `lazy`.

**CLS**
4. `<NuxtImg>` / `<img>` phải có `width`/`height` hoặc khung `aspect-*` cố định.
5. `<ClientOnly>` chứa nội dung chiếm chỗ phải có `#fallback` / placeholder cùng kích thước.
6. Font: giữ Roboto tự host + preload (`/fonts/roboto-*.woff2`). Không thêm Google Fonts hay font CDN.

**TBT / JS**
7. Không import cả thư viện nặng (lodash, moment, cả bộ icon, cả `swiper/modules`) vào component dùng ở mọi trang hay vào plugin toàn cục. Plugin mới nên là `.client.ts` và nhẹ.
8. FB SDK chỉ nạp khi Footer cuộn tới (IntersectionObserver trong `Footer.vue`). Giữ nguyên cách này.

**Ảnh**
9. Ảnh ERP đi qua `<NuxtImg>` và domain ERP phải có trong `image.domains`, nếu không sẽ trả file gốc (PNG 2MB).

**Cache / TTFB**
10. `routeRules`: `'/': { swr: 300 }`, `'/products/**': s-maxage=3600`. **HTML trên các route này được cache chung cho mọi khách**, nên không render dữ liệu riêng từng người (giỏ hàng, tên đăng nhập, giá theo user) vào SSR của các route đó. Dữ liệu riêng phải lấy ở client.
11. Payload trang chủ: không đẩy cả danh sách lớn hay object ERP thô vào `useAsyncData` hoặc Pinia state khi SSR (phình `__NUXT_DATA__`). Dùng `pick`/`transform`.

**Nội dung SSR (để crawler đọc được)**
12. Nội dung cần index (tên, giá, mô tả sản phẩm, danh sách sản phẩm, breadcrumb, heading) phải lấy qua `useAsyncData` / `useFetch` / `callOnce` khi SSR, không lấy trong `onMounted`, và không nằm trong `<ClientOnly>`.

---

## H. Đã biết (có từ trước, không chặn commit, chỉ nhắc nếu diff đụng vào)

- `server/api/__sitemap__/products.ts`: còn `console.log('vvvv…', e)` debug trong `catch`.
- `pages/products/[slug].vue`: `useProductSeo(product.value)` được gọi lại trong `.then()`, ngoài setup context. Nhánh này chỉ chạy khi điều hướng phía client từ card sản phẩm (`servedFromCache`). Nhiều khả năng composable throw và bị `.catch(() => {})` nuốt mất, nên meta description/JSON-LD không được làm mới sau khi chuyển trang. SSR không bị ảnh hưởng.
- `middleware/trailing-slash.ts` không được dùng ở đâu (xem D.5).
- `composables/useCanonical.ts` giữ utm trong canonical (xem B.2). Không ai gọi.
- `nginx.conf` là config SPA, không dùng khi chạy SSR bằng node.
