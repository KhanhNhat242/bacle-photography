<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BACLE Photography — Quy tắc dự án (BẮT BUỘC)

Áp dụng cho mọi người và mọi AI agent làm việc trong repo này. Phần trên (block `nextjs-agent-rules`) do `next dev` tự sinh — **không sửa trong block đó**; quy tắc dự án chỉ viết từ đây trở xuống.

## 0. Nguồn sự thật

- Phạm vi, nội dung, dữ liệu, thiết kế: **[docs/REQUIREMENTS.md](docs/REQUIREMENTS.md)**. Đọc trước khi bắt đầu bất kỳ việc gì.
- Mỗi thay đổi phải gắn với một mã chức năng `F01`–`F11`, hoặc một mục hiện trạng `H*` trong tài liệu đó.
- Yêu cầu mới **không có** trong tài liệu, hoặc **mâu thuẫn** với tài liệu → dừng lại, hỏi người yêu cầu, cập nhật `docs/REQUIREMENTS.md` (kể cả mục Nhật ký thay đổi) **trước**, rồi mới code.
- Không tự thêm tính năng ngoài phạm vi (xem "Ngoài phạm vi" mục 3 của tài liệu).
- Khi một câu hỏi mở (`Q*`) được trả lời hoặc một giả định (`A*`) bị thay đổi → cập nhật tài liệu cùng lúc với code.

## 1. Next.js 16 (phiên bản trong repo: 16.4.3)

- Trước khi dùng API nào của Next, đọc hướng dẫn tương ứng trong `node_modules/next/dist/docs/`. Không viết theo trí nhớ về Next 13/14/15.
- `cacheComponents: true` đang bật: dữ liệu mặc định là động; muốn cache thì dùng `'use cache'` + `cacheLife`/`cacheTag`. Đọc `cookies()`, `headers()`, `searchParams` hoặc dữ liệu chưa cache phải nằm trong `<Suspense>`. Không dùng route segment config `dynamic`, `revalidate`, `fetchCache`, `dynamicParams`, `runtime` (bị thay thế/không hỗ trợ — xem `02-guides/migrating-to-cache-components.md`).
- `params` và `searchParams` là `Promise` → phải `await`. Dùng helper toàn cục `PageProps<'/route'>` và `LayoutProps<'/route'>` để định kiểu.
- Middleware giờ là `proxy.ts` (không tạo `middleware.ts`).
- Ghi dữ liệu bằng Server Functions (`'use server'`), đặt trong file riêng, không làm API route nếu không có lý do.
- Mặc định là **Server Component**. Chỉ thêm `'use client'` ở component lá thật sự cần state, effect, sự kiện hoặc API trình duyệt. Không đặt `'use client'` cho cả trang.
- Ảnh dùng `next/image`, font dùng `next/font`, link nội bộ dùng `next/link`.

## 2. Cấu trúc thư mục & đặt tên

```
app/
  (site)/                    # trang công khai: layout có Header, Footer, nút nổi F10
    page.tsx                 # F01
    gioi-thieu/  concept/  concept/[slug]/  bang-gia/  bo-suu-tap/  dat-lich/  lien-he/
  quan-ly/                   # F11 – layout riêng, có kiểm tra đăng nhập, noindex
  sitemap.ts  robots.ts  not-found.tsx
components/
  layout/                    # Header, Footer, FloatingContact, ScrollReveal
  ui/                        # dùng chung: ButtonLink, Section, SectionHeading/Eyebrow, Sprig, icons
  home/                      # 7 section của trang chủ
  <feature>/                 # concept/, gallery/, package/, booking/, admin/…
data/                        # nội dung tĩnh có kiểu: site.ts, photos.ts, concepts.ts, packages.ts, process.ts
lib/
  style.ts  format.ts        # cn(), revealDelay(), heroDelay(), formatPrice()
  bookings/                  # types, repository (lớp truy cập dữ liệu duy nhất), actions, validation
public/images/               # brand/ (logo), library/ (ảnh gốc), concepts/<slug>/
docs/REQUIREMENTS.md
```

- Route và slug: **tiếng Việt không dấu, kebab-case** (`/bang-gia`, `/concept/ngoai-canh-rung-xanh`). Không đổi route đã chốt trong tài liệu.
- Tên component, biến, hàm, kiểu: tiếng Anh (`ConceptCard`, `getConceptBySlug`). File component: `PascalCase.tsx`; file tiện ích/dữ liệu: `camelCase.ts`.
- Comment trong code được viết tiếng Việt (giống `globals.css` hiện có), chỉ ghi khi giải thích *tại sao*.
- Import tuyệt đối qua alias `@/` (`@/data/site`, `@/components/ui/Button`).

## 3. Dữ liệu & nội dung

- **Không hard-code** SĐT, link Zalo/Messenger/Facebook/Maps, toạ độ, tên doanh nghiệp trong component. Luôn lấy từ `@/data/site`.
- Concept, gói giá, ảnh bộ sưu tập chỉ khai báo trong `data/*.ts` theo đúng kiểu ở mục 5 của tài liệu. Component không chứa dữ liệu nội dung.
- Nội dung mẫu (chưa được khách xác nhận) phải có `isDemo: true` hoặc comment `// DEMO`. **Không bịa** số liệu, giải thưởng, báo chí, số năm kinh nghiệm hay đánh giá đứng tên người thật. Giá chưa xác nhận hiển thị nhãn "Giá tham khảo" hoặc "Liên hệ".
- Văn bản giao diện: tiếng Việt có dấu, giọng ấm áp lịch sự, xưng "BACLE" – "bạn"/"hai bạn". Không để chữ tiếng Anh/lorem ipsum trên giao diện (trừ tên thương hiệu, tagline đã chốt).
- Định dạng: tiền `1.500.000 ₫` (dùng `Intl.NumberFormat('vi-VN')`), ngày `dd/MM/yyyy`, SĐT hiển thị `093 522 14 63`.

## 4. Giao diện & thiết kế

- Phong cách: hiện đại, tươi sáng, **trắng kem**, nhiều khoảng trắng, ảnh là trọng tâm. **Không có dark mode.**
- Màu chỉ dùng token đã khai báo trong `app/globals.css` (`cream`, `ivory`, `line`, `ink`, `muted-foreground`, `accent`, `accent-ink` — xem mục 6 tài liệu). Không viết mã hex rời rạc trong component; cần màu mới → thêm token và cập nhật tài liệu.
- Chữ phụ dùng `text-muted-foreground`, **không** dùng `text-muted` (`muted` là màu nền theo quy ước shadcn/ui). Biến semantic của shadcn trong `globals.css` phải trỏ về token thương hiệu; chạy lại `shadcn init` sẽ ghi đè chúng → kiểm tra và khôi phục.
- **Chữ** màu champagne luôn dùng `text-accent-ink`, không dùng `text-accent` (không đạt tương phản). `accent` chỉ dành cho nền nút, viền, đường kẻ, icon trang trí. Nút chính: `bg-accent text-ink`, không đặt chữ trắng trên nền champagne.
- Section mới dùng `<Section tone="cream|ivory">` + `<SectionHeading>` để giữ khoảng cách chuẩn và nhịp nền xen kẽ. Không tự đặt padding dọc riêng cho từng section.
- Nút/link dạng nút dùng `ButtonLink`. Không truyền class đổi `display` (`hidden`, `block`…) vào `ButtonLink` vì nó luôn có `inline-flex`; muốn ẩn/hiện theo breakpoint thì bọc bằng một thẻ ngoài.
- Nội dung đầu trang (hero, above the fold) **không** dùng `data-reveal`, vì nội dung bị ẩn tới khi JS chạy và làm chậm LCP. Thay vào đó dùng hiệu ứng CSS `.hero-rise`/`.hero-unveil`/`.hero-zoom`.
- Phần tử nổi cố định (cụm F10 bên phải, thanh F07 bên trái) không được che nút CTA ở vị trí cố định như hero. Trên mobile, chừa `pr-16` cho hàng nút nằm sát đáy màn hình.
- **Tailwind CSS v4** cho layout và style. **Ant Design v6** chỉ cho thành phần tương tác phức tạp: Form, DatePicker, Select, Table, Modal, message/notification (chủ yếu ở F08, F11). Theme antd phải khớp token màu qua `ConfigProvider` (một chỗ duy nhất). Giữ nguyên thứ tự `@layer theme, base, antd, components, utilities;`.
- Font phải hỗ trợ tiếng Việt (subset `vietnamese` khi tải qua `next/font`).
- Hiệu ứng: tái sử dụng `data-reveal`, `.reveal-zoom`, `.deco-float`, `.lightbox-fade`, `.glass-panel` trong `globals.css`. Không cài thư viện animation mới. Mọi chuyển động mới phải tắt được dưới `prefers-reduced-motion`.
- Mobile-first. Kiểm tra 360 / 768 / 1280 / 1536px. Không cuộn ngang. Nút bấm trên mobile ≥ 44×44px. Nút nổi F10 không được che CTA hoặc nút gửi form.
- Logo: dùng `public/images/brand/logo-bacle.png` (nền trong suốt, chữ đen), chỉ đặt trên nền sáng hoặc kính mờ. Không dùng trực tiếp `main-logo.jpg` (nền trắng).
- Hero trang chủ chia đôi theo tỉ lệ **44% ảnh / 56% panel** từ `lg`. Header đọc trạng thái `hero | top | scrolled` (hàm `useHeaderMode` trong `Header.tsx`), và vị trí menu ở trạng thái hero được tính theo `44vw + 4rem`. Đổi tỉ lệ hoặc padding của hero thì phải sửa cả hai nơi.
- Mọi breakpoint dùng mặc định của Tailwind. Menu ngang chỉ hiện từ `xl`. Chiều cao màn hình dùng biến thể `tall:` (≥ 820px) và `short:` (≤ 700px) khai báo trong `globals.css`.

## 5. Ảnh

- Ảnh đưa vào giao diện phải khai báo **một lần** trong `data/photos.ts` (import tĩnh + `alt` + `position` nếu cần), rồi tham chiếu bằng khoá có nghĩa (`photos.sunlitLaugh`). Không viết đường dẫn `/images/library/…` trong component.
- Ảnh review/testimonial (ảnh chụp màn hình bình luận) và ảnh ghép collage trong thư viện **không** dùng làm ảnh nội dung.
- Mọi ảnh qua `next/image`; ảnh chụp dùng `placeholder="blur"`, `fill` + `sizes` (hoặc kích thước tĩnh) đúng tỉ lệ thật; ảnh thư viện chủ yếu dọc 2:3.
- Chỉ ảnh hero đầu trang dùng `preload` (prop `priority` đã deprecated từ Next 16); còn lại lazy.
- `alt` tiếng Việt mô tả nội dung ảnh (ví dụ: "Cô dâu chú rể trong rừng cây xanh"), không để trống, không ghi "image".
- Ảnh mới đặt tên kebab-case có nghĩa, xếp theo concept: `public/images/concepts/<slug>/01.jpg`. Không thêm ảnh trùng lặp; nén ảnh trước khi commit.
- Ảnh có watermark ở phần trên khung → khi cắt `object-cover` chú ý `object-position` để không cắt mất dở dang chữ.

## 6. Đặt lịch (F07, F08) & quản trị (F11)

- Kiểm tra dữ liệu ở **server** trong Server Action (bắt buộc), client chỉ để trải nghiệm. Quy tắc kiểm tra theo bảng trường ở F08 trong tài liệu, định nghĩa **một lần** trong `lib/bookings/` và dùng chung.
- SĐT được chuẩn hoá về `+84…` trước khi lưu.
- Mọi đọc/ghi yêu cầu đặt lịch chỉ đi qua repository trong `lib/bookings/`. UI và action không gọi thẳng CSDL/file.
- Trạng thái chỉ dùng các giá trị `moi | da_lien_he | da_xac_nhan | hoan_thanh | huy` và đúng vòng đời trong tài liệu.
- `/quan-ly/*`: bắt buộc kiểm tra phiên đăng nhập **ở server** (trong layout/page/action, không chỉ ở `proxy.ts` hay client). Mật khẩu và secret lấy từ biến môi trường; cookie `httpOnly`, `secure`, `sameSite=lax`. Trang `noindex`, chặn trong `robots.ts`, không có trong sitemap.
- Không ghi dữ liệu cá nhân của khách ra log, URL hay trang công khai.
- Shortlist F07 trong `localStorage`: luôn bọc `try/catch`, trang vẫn chạy khi không đọc/ghi được.

## 7. SEO & truy cập

- Mỗi trang có `metadata`/`generateMetadata` riêng: title `<Tên trang> | BACLE Photography`, description tiếng Việt, Open Graph có ảnh.
- `<html lang="vi">`. Mỗi trang đúng một `<h1>`, các heading theo thứ tự.
- Phần tử tương tác dùng thẻ ngữ nghĩa (`button`, `a`), điều khiển được bằng bàn phím, có focus hiển thị rõ. Nút chỉ có icon phải có `aria-label` tiếng Việt.
- Link ra ngoài (Zalo, Messenger, Facebook, Maps): `target="_blank" rel="noopener noreferrer"`.

## 8. Thư viện & cấu hình

- Hạn chế thêm dependency. Thêm package mới phải có lý do rõ ràng (không làm được bằng Next/React/antd/Tailwind sẵn có) và ghi vào mô tả commit.
- Không sửa `next.config.ts`, `tsconfig.json`, `eslint.config.mjs` nếu không cần cho nhiệm vụ đang làm.
- TypeScript `strict`: không dùng `any`, không `@ts-ignore`, không tắt rule ESLint để cho qua.
- Bí mật chỉ trong `.env*` (đã gitignore). Biến mới phải được liệt kê trong `README.md` (tên + ý nghĩa, không kèm giá trị).

## 9. Git

- Commit nhỏ, mỗi commit một mục đích, thông điệp có mã chức năng: `feat(F08): form đặt lịch chụp`, `fix(H2): đổi lang thành vi`, `docs: cập nhật Q6 bảng giá`.
- Không commit `.env*`, file build, ảnh gốc chưa nén.
- Block `nextjs-agent-rules` trong file này do `next dev` sinh ra: nếu nó thay đổi thì commit kèm, không xoá.

## 10. Definition of Done (kiểm trước khi báo xong)

- [ ] Thay đổi truy được về mã `F*`/`H*` trong `docs/REQUIREMENTS.md`; tài liệu đã cập nhật nếu phạm vi/giả định thay đổi
- [ ] `npm run lint` và `npm run build` chạy không lỗi
- [ ] Đã xem trên trình duyệt ở 360px và 1280px; không có lỗi console; không cuộn ngang
- [ ] Văn bản tiếng Việt, đúng giọng; dữ liệu liên hệ lấy từ `data/site.ts`
- [ ] Ảnh dùng `next/image`, có `alt` tiếng Việt
- [ ] Không có màu hex rời, không `any`, không `'use client'` thừa
- [ ] Nội dung mẫu được đánh dấu `isDemo`/`// DEMO`
- [ ] Báo cáo trung thực: bước nào chưa kiểm tra được thì nói rõ
