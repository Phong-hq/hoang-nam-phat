---
name: pre-commit-review
description: Review thay đổi chưa commit trong repo Hoàng Nam Phát (Nuxt 3 SSR) trước khi commit. Gồm kiểm tra chất lượng code chung và một cổng bắt buộc đảm bảo diff không làm hỏng SEO (meta, canonical, robots, JSON-LD, sitemap, status code, URL), luồng đo lường marketing (GTM/GA4/Facebook Pixel, sự kiện view_item/add_to_cart/purchase/contact_click) và hiệu suất SEO (Core Web Vitals LCP/CLS/TBT, cache, nội dung SSR). Dùng khi user nói "review trước khi commit", "check code trước commit", "commit code", "review diff", "có ảnh hưởng SEO không", "pre-commit review", hoặc trước khi tạo commit trong repo này.
---

# Pre-commit review: Hoàng Nam Phát

Mục tiêu: trước mỗi commit, trả lời được 2 câu hỏi:
1. Code có đúng, an toàn và gọn không?
2. Diff có làm hỏng **SEO**, **đo lường marketing** hay **hiệu suất SEO** (Core Web Vitals) không?

Câu 2 luôn phải có câu trả lời rõ ràng, kể cả khi câu trả lời là "không ảnh hưởng".

**Skill này review, không tự sửa code.** Chỉ commit khi chính user đã yêu cầu commit và kết luận là PASS (xem "Sau báo cáo" ở cuối).

Tài liệu đi kèm (đọc khi cần):
- [seo-checklist.md](seo-checklist.md): bản đồ file → rủi ro và các bất biến SEO/marketing/perf của repo. **Bắt buộc đọc ở bước 3.**
- [check-seo.mjs](check-seo.mjs): script kiểm tra HTML SSR thật (status, canonical, robots, JSON-LD, sitemap, 404, script nạp trễ...).

---

## Bước 1: Xác định phạm vi diff

```bash
git status --porcelain
git diff --cached --stat        # nếu có file đã stage thì review phần đã stage
git diff --stat                 # nếu không có gì stage thì review phần chưa stage
```

- Có file đã stage: phạm vi = `git diff --cached`. Không có: phạm vi = `git diff`.
- **File untracked (`??`) không hiện trong `git diff`.** Phải đọc trực tiếp (trang, component, composable mới).
- File xoá hoặc đổi tên trong `pages/` nghĩa là **URL thay đổi**, xếp vào rủi ro Cao.
- Bỏ qua file sinh ra (`.nuxt/`, `.output/`, `dist/`, lockfile chỉ đổi do cài lại).
- Kiểm tra không commit nhầm `.env` hay secret (`git diff --cached --name-only | grep -E '^\.env$'`).

Đọc toàn bộ diff, kèm đủ ngữ cảnh xung quanh mỗi hunk để hiểu code.

## Bước 2: Kiểm tra tự động

Chỉ chạy trên file đổi để nhanh:

```bash
npx eslint <các file .ts/.vue/.mjs đã đổi>
```

- Đổi `.ts`/`.vue` có logic: chạy thêm `npx nuxt typecheck` (chậm, khoảng 1 phút; config đặt `typeCheck: false` nên build không tự check type).
- Đổi `nuxt.config.ts`, `package.json` (dependency), `server/**`, thêm hoặc xoá module: chạy `npm run build` để chắc chắn build được.
- Lỗi lint hoặc type **do diff gây ra** thì BLOCK. Lỗi có sẵn ở dòng không đổi thì chỉ ghi chú.

## Bước 3: Cổng SEO / Marketing / Hiệu suất (bắt buộc)

1. Đọc [seo-checklist.md](seo-checklist.md).
2. Đối chiếu từng file trong diff với **bảng A (file → rủi ro)** để biết cần soi mục nào (B–G).
3. Với mỗi mục liên quan, kiểm tra diff có vi phạm bất biến không. Grep nhanh trong phần diff. **Dùng đúng phạm vi đã chọn ở bước 1**: nếu bước 1 chọn staged thì thay `git diff` bằng `git diff --cached` ở cả 2 lệnh dưới. File untracked không có trong output, nên phải grep trực tiếp trên file đó với cùng pattern.

   ```bash
   git diff -U0 | grep -nE '^\+[^+].*(onMounted|ClientOnly|loading="lazy"|navigateTo\(|createError|useHead|useSeoMeta|useSeo\(|useCanonical|noIndex|robots|canonical|<script|app\.head|dataLayer|gtag|fbq|useTracking|tel:|zalo|m\.me|window\.open|routeRules|swr|s-maxage|NuxtImg|<img)'
   git diff -U0 | grep -nE '^-[^-].*(useSeo|useProductSeo|useTracking|viewItem|addToCart|purchase|contact\(|href="tel:|createError|jsonld-|fetchpriority|preload)'
   ```

   Dòng `+` cho biết diff thêm gì có rủi ro. Dòng `-` cho biết diff **xoá** gì quan trọng (mất tracking, mất SEO, mất preload).
4. Phân loại từng phát hiện:
   - **Do diff này gây ra** → có thể BLOCK hoặc WARN.
   - **Có sẵn từ trước** (mục H "Đã biết", hoặc dòng không nằm trong diff) → ghi ở "Đã biết", **không bao giờ BLOCK**.

### Khi nào phải chạy kiểm tra runtime (`check-seo.mjs`)

Bắt buộc khi diff đụng file mức **Cao** trong bảng A, hoặc đổi `<head>`, status code, URL, `routeRules`, sitemap, plugin hay component trên màn hình đầu trang chủ / trang sản phẩm. Diff chỉ đổi style, text hay logic không liên quan thì bỏ qua và ghi rõ lý do bỏ qua.

```bash
# 1. Dev server (nếu chưa chạy): npm run dev  -> http://127.0.0.1:3003
# 2. Baseline = production, so sánh với local; KHÔNG dùng git stash (user đang có thay đổi chưa commit)
node .claude/skills/pre-commit-review/check-seo.mjs https://hoangnamphat.vn > "$TMP/seo-prod.txt"
node .claude/skills/pre-commit-review/check-seo.mjs http://127.0.0.1:3003   > "$TMP/seo-local.txt"
diff "$TMP/seo-prod.txt" "$TMP/seo-local.txt"
```

- `$TMP` = thư mục scratchpad của phiên. Không ghi file kết quả vào repo.
- Script tự lấy một slug sản phẩm từ sitemap. Diff đụng một sản phẩm hay trang cụ thể thì truyền slug đó làm tham số thứ 2.
- Chạy trên `nuxt dev` thì check robots.txt và `<loc>` sitemap bị `SKIP` (module tự chặn crawl và dùng origin local khi dev). Diff đụng `robots`/`sitemap`/`site` trong `nuxt.config.ts` hay `server/api/__sitemap__/**` thì kiểm trên bản build: `npm run build && npm run preview` (port 3000).
- **Chỉ những dòng khác nhau giữa prod và local mới tính là do diff.** FAIL có ở cả hai là vấn đề có sẵn.
- Khác biệt do dữ liệu (số URL sitemap, title sản phẩm khác vì ERP local/prod khác) không phải lỗi. Đọc kỹ trước khi kết luận.
- Diff đụng tracking: không có script tự động. Đọc code theo mục F và ghi rõ sự kiện nào bị ảnh hưởng. Nếu cần, hướng dẫn user kiểm tra bằng GTM Preview / Meta Pixel Helper.
- Diff đụng LCP/CLS (hero, ảnh màn hình đầu, font, script, layout trên cùng): đề nghị user chạy Lighthouse mobile hoặc PageSpeed trên bản deploy thử. Không tự khẳng định điểm số khi chưa đo.

## Bước 4: Review chất lượng chung (gọn)

Soi nhanh các lỗi phổ biến của Nuxt/Vue trong diff:
- Code chỉ chạy được ở client (`window`, `document`, `localStorage`) đặt trong setup mà không có guard `import.meta.client` / `onMounted`: lỗi SSR hoặc hydration mismatch.
- `useAsyncData` / `useFetch` thiếu key ổn định, trùng key, hoặc thiếu xử lý `error`.
- `await` trong setup đặt **trước** các composable cần context (`useSeo`, `useRoute`...): vẫn chạy nhờ `<script setup>`, nhưng callback `.then()` hay `setTimeout` thì **mất context**.
- `v-html` với dữ liệu không tin cậy (XSS), secret hay token hardcode, `console.log` debug còn sót.
- Logic giá, giỏ hàng, checkout: làm tròn, `0` hay `null` hiển thị "Liên hệ báo giá".

Diff lớn hoặc phức tạp: giao cho agent `ecc:vue-reviewer` / `ecc:typescript-reviewer` (bỏ qua nếu máy không có ECC). Truyền cho agent phạm vi diff, không truyền kết luận của mình.

## Bước 5: Báo cáo

Format cố định, ngắn gọn, viết tiếng Việt:

```
## Kết luận: BLOCK | WARN | PASS
Phạm vi: <staged|unstaged>, N file (+untracked M)

### SEO / Marketing / Hiệu suất
- SEO (meta, canonical, robots, JSON-LD, sitemap, URL, status): <không ảnh hưởng + lý do | phát hiện>
- Đo lường marketing (GTM/GA4/Pixel): <không ảnh hưởng + lý do | sự kiện bị ảnh hưởng>
- Hiệu suất (LCP/CLS/TBT, cache, SSR): <không ảnh hưởng + lý do | phát hiện>
- Runtime check: <đã chạy: prod vs local khác X dòng | bỏ qua vì ...>

### Phát hiện (nặng nhất trước)
1. [BLOCK|WARN] path/to/file.vue:42
   Issue: ...
   Cause: ...
   Fix: ...

### Đã biết (có từ trước, không chặn)
- ...

### Kiểm tra đã chạy
- eslint: ok/lỗi ...   typecheck: ok/bỏ qua   build: ok/bỏ qua
```

Quy tắc kết luận:
- **BLOCK**: diff làm vỡ một bất biến trong seo-checklist.md (vd mất `useSeo` ở trang index được, canonical sai, soft 404, đổi URL không có 301, đổi tên hoặc mất sự kiện tracking, nút liên hệ không còn là `<a href>`, script bên thứ ba chặn render, dữ liệu riêng từng người trong HTML được cache, hero bị lazy hoặc `ClientOnly`); hoặc lỗi build/lint/type mới; lỗi logic hay bảo mật rõ ràng.
- **WARN**: rủi ro cần user xác nhận (title > 70 ký tự, thiếu width/height ảnh, import nặng, trang mới chưa có trong sitemap...).
- **PASS**: không có gì ở trên. Vẫn phải điền đủ 3 dòng SEO / Marketing / Hiệu suất, kèm lý do vì sao không ảnh hưởng.

Mỗi phát hiện phải chỉ ra `file:line` cụ thể trong diff. Không báo lỗi suy đoán mà không có dòng code làm bằng chứng.

### Sau báo cáo

Tuỳ theo user yêu cầu gì khi skill được gọi:

| Yêu cầu ban đầu | PASS | WARN | BLOCK |
|---|---|---|---|
| **Commit** ("commit code", "commit giúp tôi"...) | Commit luôn (user đã yêu cầu). Message theo Conventional Commits, kèm dòng attribution nếu harness yêu cầu. | Liệt kê cảnh báo, hỏi có commit không. | Dừng, không commit. Hỏi có muốn sửa không. |
| **Chỉ review** ("review trước commit", "check SEO"...) | Không commit. | Không commit. | Hỏi có muốn sửa không. |

Không bao giờ dùng `--no-verify`, không `git add -A` gom cả file lạ. Chỉ add những file thuộc phạm vi đã review.
