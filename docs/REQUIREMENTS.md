# BACLE Photography — Tài liệu yêu cầu website (Phiếu Dev 44)

> **Đây là nguồn sự thật duy nhất (single source of truth) về phạm vi dự án.**
> Mọi tính năng, trang, nội dung thêm vào phải truy được về một mục trong tài liệu này (mã `F01`–`F11`).
> Khi phạm vi thay đổi: cập nhật tài liệu này **trước**, ghi vào [Nhật ký thay đổi](#12-nhật-ký-thay-đổi), rồi mới code.
> Quy tắc thực thi nằm ở [AGENTS.md](../AGENTS.md).

---

## 1. Thông tin phiếu (chép nguyên văn từ phiếu sale)

### 1.1 Phần Dev điền

Phiếu ghi "Dev điền 3 ô vàng", nhưng thực tế có **4 ô** gắn biểu tượng bút chì. Chọn trạng thái **"Xong - chờ sale gửi"** thì phiếu tự đóng.

| Trường | Giá trị hiện tại |
|---|---|
| STT | 44 |
| ✏ Dev phụ trách | _(trống — dev chọn tên)_ |
| ✏ Trạng thái demo | _(trống)_ |
| ✏ Link demo | Link 1: https://bacle-photo.vercel.app/ |
| ✏ Trạng thái gửi sale | _(trống)_ |

### 1.2 Thông tin hồ sơ (sale ghi)

Dấu `*` = trường bắt buộc trên phiếu.

| Trường | Giá trị | Ghi chú của dev |
|---|---|---|
| Ngày giao hồ sơ * | 24/10/2026 | |
| Sale phụ trách * | Minh Toàn | |
| Mã DN (file sale) | DN0114 | |
| Tên doanh nghiệp * | BACLE Photography | Logo viết "Bacle" + "PHOTOGRAPHY" |
| Ngành | Studio | |
| Tỉnh / TP | Hồ Chí Minh | |
| Người liên hệ | _(trống)_ | ⚠ Thiếu |
| SĐT / Zalo * | 093 522 14 63 | Dùng chung cho gọi điện và Zalo |
| Link Facebook Page | https://www.facebook.com/BACLEphotography | Messenger: `https://m.me/BACLEphotography` |
| Link Google Maps | [Link gốc](https://www.google.com/maps/place/BACLE+Photography/@10.7901029,106.6723896,17z/data=!3m1!4b1!4m6!3m5!1s0x31752f001df21d13:0x1717c36cd08b4794!8m2!3d10.7901029!4d106.6749645!16s%2Fg%2F11nbwd8hy3?entry=ttu&g_ep=EgoyMDI2MTAxOC4wIKXMDSoASAFQAw%3D%3D) | Toạ độ ghim: **10.7901029, 106.6749645**. Chưa có địa chỉ dạng chữ |
| Website hiện tại | _(trống)_ | Khách chưa có website |
| Khách đồng ý xem demo? * | _(trống)_ | ⚠ Trường bắt buộc nhưng chưa điền |
| Mục tiêu website * | Giới thiệu công ty/dịch vụ | |
| Sản phẩm / dịch vụ chính (3-5 mục) * | Chụp ảnh cưới | ⚠ Yêu cầu 3–5 mục, mới có 1 |
| Khách hàng mục tiêu * | Cặp đôi chuẩn bị kết hôn | |
| Điểm mạnh / khác biệt (USP) | _(trống)_ | ⚠ Thiếu |
| Link Logo (Drive) * | https://drive.google.com/drive/u/0/folders/1s5cuitauzCvKU_Cr4Z_MUOUzTJrapKn3 | Cùng thư mục với link ảnh |
| Link ảnh / tư liệu (Drive) * | https://drive.google.com/drive/u/0/folders/1s5cuitauzCvKU_Cr4Z_MUOUzTJrapKn3 | |
| Màu chủ đạo / phong cách * | Hiện đại tươi sáng / trắng kem | |
| Website tham khảo khách thích | _(trống)_ | |
| Chức năng cần có | Trang chủ; Giới thiệu; Danh sách concept; Chi tiết concept; Bảng giá theo gói; Bộ sưu tập ảnh; Chọn concept; Đặt lịch chụp; Liên hệ; Zalo/Messenger; Quản lý yêu cầu đặt lịch | Xem mục 3 (11 chức năng) |
| Ngôn ngữ | _(trống)_ | Mặc định: **chỉ tiếng Việt** (giả định A1) |
| Nội dung sẵn có (giới thiệu, bảng giá, giờ mở cửa...) | _(trống)_ | ⚠ Chưa có nội dung thật |
| Lưu ý / điều cần tránh | _(trống)_ | |
| Ưu tiên (GĐ chọn) | _(trống)_ | |
| Hạn giao demo | _(trống)_ | ⚠ Phiếu nhắc: **"SALE GHI HẠN"** |
| Ngày gửi khách | _(trống)_ | |
| Phản hồi của khách | _(trống)_ | |
| Nhắc | SALE GHI HẠN | |

### 1.3 Tư liệu đã có trong repo

| Tư liệu | Vị trí | Nhận xét |
|---|---|---|
| Logo gốc | `public/images/main-logo.jpg` | Chữ ký script màu đen + chữ "PHOTOGRAPHY" serif in hoa, **nền trắng, file JPG (không trong suốt)** |
| Logo dùng trên web | `public/images/brand/logo-bacle.png` | Tách từ JPG gốc: cắt sát chữ (1081×290), nền **trong suốt**, màu `ink`. Đủ dùng cho web; vẫn nên xin bản vector (Q5) |
| Thư viện ảnh | `public/images/library/` | 108 ảnh (~23 MB), tên file kiểu Facebook (không có nghĩa), **chưa phân loại theo concept**. Chủ yếu ảnh dọc ~1365×2048 (2:3). Nội dung quan sát được: ngoại cảnh rừng/cỏ xanh, ngoại cảnh nắng sáng, lễ phục áo dài đỏ |
| Watermark trên ảnh | — | `BACLEPHOTOGRAPHY` / `-all you need is love` ở phần trên ảnh → có thể dùng "All you need is love" làm tagline (cần khách xác nhận) |

---

## 2. Mục tiêu & đối tượng

- **Mục tiêu:** website giới thiệu studio và dịch vụ chụp ảnh cưới; dẫn khách tới **đặt lịch chụp** hoặc **liên hệ qua Zalo/Messenger/điện thoại**.
- **Khách hàng mục tiêu:** các cặp đôi chuẩn bị kết hôn, chủ yếu xem bằng **điện thoại** (mobile-first).
- **Hành động chuyển đổi chính (CTA):**
  1. Gửi yêu cầu đặt lịch (F08)
  2. Nhắn Zalo / Messenger (F10)
  3. Gọi điện (`tel:`)
- **Bản chất giai đoạn hiện tại:** bản **demo** để sale gửi khách xem (link: https://bacle-photo.vercel.app/). Ưu tiên ấn tượng thị giác + luồng đặt lịch chạy được.

---

## 3. Danh sách chức năng (phạm vi chốt)

Mỗi chức năng có mã cố định. Code, commit, PR phải tham chiếu mã này.

| Mã | Chức năng (theo phiếu) | Route | Loại |
|---|---|---|---|
| F01 | Trang chủ ✅ (26/10/2026) | `/` | Trang công khai |
| F02 | Giới thiệu | `/gioi-thieu` | Trang công khai |
| F03 | Danh sách concept | `/concept` | Trang công khai |
| F04 | Chi tiết concept | `/concept/[slug]` | Trang công khai |
| F05 | Bảng giá theo gói | `/bang-gia` | Trang công khai |
| F06 | Bộ sưu tập ảnh | `/bo-suu-tap` | Trang công khai |
| F07 | Chọn concept | (thành phần dùng trong F03, F04, F08) | Tương tác |
| F08 | Đặt lịch chụp | `/dat-lich` | Form |
| F09 | Liên hệ (kèm bản đồ) | `/lien-he` | Trang công khai |
| F10 | Zalo / Messenger | (nút nổi trên mọi trang công khai) | Tương tác |
| F11 | Quản lý yêu cầu đặt lịch | `/quan-ly/dat-lich` | Trang quản trị (có đăng nhập) |

Ngoài ra (hạ tầng, không phải chức năng riêng): Header/menu, Footer, trang 404 tiếng Việt, SEO (metadata, `sitemap.ts`, `robots.ts`).

**Ngoài phạm vi** (không làm nếu chưa cập nhật tài liệu này): giỏ hàng/thanh toán online, đa ngôn ngữ, blog/tin tức, tài khoản khách hàng, đánh giá/bình luận, chat tự xây.

---

## 4. Đặc tả chi tiết từng chức năng

### F01 — Trang chủ `/`
Các khối theo thứ tự:
1. **Hero:** ảnh cưới toàn màn hình (hoặc slideshow nhẹ), logo, tagline, 2 nút: "Đặt lịch chụp" → `/dat-lich`, "Xem concept" → `/concept`.
2. **Giới thiệu ngắn:** 2–3 câu + link "Về BACLE" → `/gioi-thieu`.
3. **Concept nổi bật:** 3–6 concept có `featured: true` (thẻ concept dùng chung với F03) + link "Xem tất cả".
4. **Bảng giá tóm tắt:** các gói (rút gọn từ F05) + link "Xem chi tiết bảng giá".
5. **Bộ sưu tập xem trước:** lưới 6–9 ảnh + link `/bo-suu-tap`.
6. **Quy trình chụp** (tuỳ chọn): Tư vấn → Chọn concept → Chụp → Hậu kỳ → Nhận ảnh.
7. **CTA cuối trang:** kêu gọi đặt lịch + SĐT/Zalo.

### F02 — Giới thiệu `/gioi-thieu`
- Câu chuyện thương hiệu, phong cách chụp, đội ngũ (nếu có), lý do chọn BACLE (USP — **đang thiếu**, xem Q3).
- Ảnh minh hoạ từ thư viện. CTA đặt lịch ở cuối.

### F03 — Danh sách concept `/concept`
- Lưới thẻ concept: ảnh bìa, tên, mô tả ngắn, loại concept, giá "từ …" (nếu có).
- Lọc theo loại concept (ví dụ: Ngoại cảnh, Studio, Lễ gia tiên/áo dài — **danh mục cần khách xác nhận**, Q4).
- Mỗi thẻ: click → F04; có nút **"Chọn concept"** (F07).

### F04 — Chi tiết concept `/concept/[slug]`
- Tiêu đề, mô tả, địa điểm/bối cảnh, gợi ý trang phục, thời lượng, gói giá áp dụng.
- Album ảnh của concept, bấm ảnh mở lightbox (dùng chung với F06).
- Nút **"Chọn concept này"** (F07) và **"Đặt lịch với concept này"** → `/dat-lich?concept=<slug>`.
- Khối "Concept khác" ở cuối.
- Dùng `generateStaticParams` cho các slug; slug không tồn tại → `notFound()`.

### F05 — Bảng giá theo gói `/bang-gia`
- Thẻ gói: tên, giá (hoặc "Liên hệ" nếu chưa có giá), danh sách hạng mục bao gồm, gói nổi bật được làm nổi.
- Ghi chú chung (phát sinh, đặt cọc…) — nội dung chờ khách.
- Mỗi gói có nút "Đặt lịch gói này" → `/dat-lich?package=<id>`.
- Giá chưa được khách xác nhận phải hiển thị nhãn "Giá tham khảo".

### F06 — Bộ sưu tập ảnh `/bo-suu-tap`
- Lưới ảnh (masonry hoặc grid), lọc theo concept/loại.
- Lightbox: xem ảnh lớn, trước/sau, phím ←/→/Esc, vuốt trên mobile, hiệu ứng `.lightbox-fade` có sẵn.
- Tải ảnh lười (lazy), chỉ ảnh đầu màn hình được ưu tiên tải.

### F07 — Chọn concept
Hiểu theo phiếu: khách **đánh dấu (shortlist) một hoặc nhiều concept** mình thích, rồi mang danh sách đó vào form đặt lịch.
- Nút "Chọn concept" trên thẻ (F03) và trang chi tiết (F04); bấm lại để bỏ chọn.
- Hiển thị số concept đã chọn (badge trên header hoặc thanh nổi) + nút "Đặt lịch với concept đã chọn".
- Lưu tạm ở phía trình duyệt (`localStorage`, bọc `try/catch`; mất dữ liệu vẫn hoạt động bình thường).
- Trong F08 có ô chọn concept (multi-select) — đây là nơi chốt cuối cùng; dữ liệu shortlist chỉ dùng để điền sẵn.
- Giới hạn tối đa: 3 concept/yêu cầu (giả định A4, chờ khách xác nhận).

### F08 — Đặt lịch chụp `/dat-lich`
Form gửi yêu cầu (không phải đặt chỗ tức thì — studio sẽ liên hệ xác nhận).

| Trường | Bắt buộc | Kiểm tra |
|---|---|---|
| Họ tên người liên hệ | ✔ | 2–80 ký tự |
| Số điện thoại / Zalo | ✔ | SĐT Việt Nam: `0` + 9 số hoặc `+84` + 9 số (cho phép dấu cách/chấm) |
| Email | | Định dạng email |
| Concept muốn chụp | ✔ | 1–3 concept, phải tồn tại trong dữ liệu; điền sẵn từ `?concept=` hoặc shortlist F07 |
| Gói dịch vụ | | Phải tồn tại; điền sẵn từ `?package=` |
| Ngày chụp mong muốn | ✔ | Không trước ngày hiện tại |
| Buổi chụp | | Sáng / Chiều / Cả ngày |
| Ngày cưới dự kiến | | |
| Kênh liên hệ ưu tiên | | Gọi điện / Zalo / Messenger |
| Ghi chú | | ≤ 1000 ký tự |

- Kiểm tra **cả phía client (antd Form) lẫn phía server (Server Action)**. Server là nơi quyết định.
- Chống spam tối thiểu: trường honeypot ẩn.
- Thành công: thông báo "Đã nhận yêu cầu, BACLE sẽ liên hệ trong thời gian sớm nhất" + nút Zalo để liên hệ ngay; xoá shortlist F07.
- Thất bại: giữ nguyên dữ liệu đã nhập, hiện lỗi theo từng trường.
- Yêu cầu tạo ra có trạng thái `moi` và xuất hiện trong F11.

### F09 — Liên hệ `/lien-he`
- SĐT (bấm gọi), Zalo, Facebook/Messenger, địa chỉ (chờ khách — Q2), giờ làm việc (chờ khách).
- Bản đồ Google Maps nhúng (iframe, lazy) theo toạ độ `10.7901029,106.6749645` + nút "Chỉ đường" mở link Maps gốc.
- Khối CTA dẫn sang `/dat-lich` (không làm form liên hệ thứ hai trùng chức năng F08).

### F10 — Zalo / Messenger
- Cụm nút nổi góc dưới phải trên **mọi trang công khai** (không hiện ở `/quan-ly`): Zalo, Messenger, Gọi điện.
- Link: Zalo `https://zalo.me/0935221463`, Messenger `https://m.me/BACLEphotography`, Gọi `tel:+84935221463`.
- Mở tab mới với Zalo/Messenger (`rel="noopener noreferrer"`), có `aria-label` tiếng Việt.
- Không che nội dung/nút quan trọng trên mobile 360px.

### F11 — Quản lý yêu cầu đặt lịch `/quan-ly/dat-lich`
- **Bắt buộc đăng nhập.** Giai đoạn demo: 1 tài khoản quản trị, mật khẩu lấy từ biến môi trường (`ADMIN_PASSWORD`), phiên lưu bằng cookie `httpOnly`. Không bao giờ hard-code mật khẩu.
- Bảng danh sách: thời gian gửi, tên, SĐT, concept, ngày chụp mong muốn, trạng thái.
- Lọc theo trạng thái, khoảng ngày chụp; tìm theo tên/SĐT; mới nhất lên đầu.
- Xem chi tiết; đổi trạng thái; ghi chú nội bộ; nút gọi / mở Zalo nhanh.
- Vòng đời trạng thái:
  `moi` (Mới) → `da_lien_he` (Đã liên hệ) → `da_xac_nhan` (Đã xác nhận lịch) → `hoan_thanh` (Hoàn thành); có thể chuyển sang `huy` (Đã huỷ) từ bất kỳ trạng thái chưa hoàn thành.
- Trang quản trị: `noindex`, bị chặn trong `robots.ts`, không có trong sitemap.
- Nơi lưu trữ dữ liệu: **chưa chốt** (Q7). Mọi truy cập dữ liệu phải đi qua một lớp repository duy nhất để đổi nơi lưu không ảnh hưởng UI.

---

## 5. Mô hình dữ liệu

Nội dung tĩnh nằm trong `data/*.ts` (có kiểu TypeScript), dữ liệu động (yêu cầu đặt lịch) qua `lib/bookings/`.

```ts
// data/site.ts — thông tin doanh nghiệp (nguồn duy nhất cho SĐT, link, toạ độ…)
type SiteInfo = {
  name: 'BACLE Photography'
  tagline: string                  // đề xuất: "All you need is love" (chờ xác nhận)
  phoneDisplay: '093 522 14 63'
  phoneE164: '+84935221463'
  zaloUrl: 'https://zalo.me/0935221463'
  facebookUrl: 'https://www.facebook.com/BACLEphotography'
  messengerUrl: 'https://m.me/BACLEphotography'
  mapsUrl: string                  // link Google Maps gốc trong phiếu
  geo: { lat: 10.7901029; lng: 106.6749645 }
  address: string | null           // chờ khách
  openingHours: string | null      // chờ khách
  city: 'Hồ Chí Minh'
}

type ConceptCategory = { id: string; name: string }

type Concept = {
  slug: string                     // kebab-case không dấu, duy nhất
  name: string
  categoryId: string
  summary: string                  // 1–2 câu cho thẻ
  description: string
  location?: string
  outfits?: string
  duration?: string
  coverImage: ImageAsset
  images: ImageAsset[]
  packageIds: string[]
  featured?: boolean
  isDemo?: boolean                 // true = nội dung mẫu, chưa được khách xác nhận
}

type Package = {
  id: string
  name: string
  price: number | null             // VND; null → hiển thị "Liên hệ"
  priceNote?: string
  includes: string[]
  highlighted?: boolean
  isDemo?: boolean
}

// data/photos.ts – danh mục ảnh: import tĩnh (có sẵn width/height/blurDataURL),
// tham chiếu bằng khoá có nghĩa (photos.sunlitLaugh…) thay vì tên file Facebook
type ImageAsset = {
  src: StaticImageData
  alt: string                      // tiếng Việt, mô tả nội dung ảnh
  position?: string                // object-position khi ảnh bị cắt khung, vd '50% 20%'
}

type BookingStatus = 'moi' | 'da_lien_he' | 'da_xac_nhan' | 'hoan_thanh' | 'huy'

type BookingRequest = {
  id: string
  createdAt: string                // ISO 8601
  fullName: string
  phone: string                    // chuẩn hoá về +84…
  email?: string
  conceptSlugs: string[]           // 1–3
  packageId?: string
  preferredDate: string            // YYYY-MM-DD
  timeSlot?: 'sang' | 'chieu' | 'ca_ngay'
  weddingDate?: string
  contactChannel?: 'goi' | 'zalo' | 'messenger'
  note?: string
  status: BookingStatus
  adminNote?: string
  updatedAt: string
}
```

---

## 6. Thiết kế & nhận diện

- **Phong cách (theo phiếu):** hiện đại, tươi sáng, tông **trắng kem**. Tinh tế, nhiều khoảng trắng, ảnh là nhân vật chính.
- **Bảng màu đề xuất** (khai báo token trong `app/globals.css`, không dùng mã màu rời rạc trong component):

  | Token | Mã | Dùng cho |
  |---|---|---|
  | `cream` | `#FFFDF9` | Nền chính |
  | `ivory` | `#F7F1E8` | Nền khối xen kẽ |
  | `line` | `#EFE8DC` | Viền, đường kẻ (đã có trong `globals.css`) |
  | `ink` | `#1C1A17` | Chữ chính, logo |
  | `muted` | `#6B645A` | Chữ phụ |
  | `accent` | `#B8956A` | Champagne: nền nút chính, viền, đường kẻ, icon trang trí |
  | `accent-ink` | `#7F5F37` | Champagne đậm cho **chữ** nhấn (eyebrow, số bước, giá, link) |

  Champagne `#B8956A` chỉ đạt tương phản ~2,7:1 trên nền sáng, nên **không dùng cho chữ**. Chữ trắng đặt trên nền champagne cũng không đạt chuẩn. Vì vậy nút chính dùng nền `accent` với chữ `ink` (6,2:1). Còn `accent-ink` đạt ≥ 5:1 trên cả `cream` và `ivory`.

- **Không có chế độ tối (dark mode):** thương hiệu trắng kem; nền luôn sáng.
- **Typography** (đều tải subset `vietnamese` qua `next/font`):
  - Tiêu đề: **Cormorant Garamond** 500, dùng số thẳng hàng (`lining-nums`, đã đặt sẵn cho `.font-serif`).
  - Nội dung: **Be Vietnam Pro** 300/400/500.
  - Tagline "All you need is love": **Great Vibes** (`font-script`).
- **Logo:** dùng `public/images/brand/logo-bacle.png` (nền trong suốt, chữ đen). Chỉ đặt trên nền sáng hoặc kính mờ.
- **Khoảng cách section** (đóng gói trong `components/ui/Section.tsx` và `SectionHeading.tsx`):
  - Padding dọc: mobile 64–80px (`py-16 md:py-20`), desktop 96–112px (`lg:py-24 xl:py-28`).
  - Từ tiêu đề xuống nội dung: 32px trên mobile, 48–56px trên desktop. Khoảng cách lưới: 24–32px.
  - Các section xen kẽ nền `cream`/`ivory`, phân cách bằng viền trên 1px `line`.
- **Hero:** cao đúng một màn hình (`h-svh`, giới hạn 640–1000px trên desktop).
  - Mobile/tablet: ảnh phủ toàn màn hình, chữ đặt trên lớp chuyển kem.
  - Desktop (từ `lg`): bố cục chia đôi.
    - Nửa trái (44%) là ảnh chính tràn mép trên, trái và dưới; logo nằm trên ảnh, có chữ chìm "BACLE" ở góc dưới.
    - Nửa phải là panel kem chứa tagline, H1, mô tả và 2 nút. Đáy panel có ảnh nhỏ vắt qua mép giữa hai nửa cùng 2 điểm nhấn có icon.
  - Hero chạy hiệu ứng bằng CSS (`.hero-rise`, `.hero-zoom`, `.hero-unveil`), **không dùng `data-reveal`** để không làm chậm LCP.
- **Header trên trang chủ** có 2 trạng thái:
  - Khi đang ở đầu trang (chưa cuộn): nền trong suốt từ `lg`, menu ngang dịch sang phải, căn thẳng với lề chữ của panel phải; nút "Đặt lịch chụp" trên header ẩn vì hero đã có nút này.
  - Khi cuộn xuống: header hiện nền kính mờ, menu trượt về giữa như các trang khác.
- **Menu ngang** từ 1280px (`xl`); dưới mức đó dùng menu ☰.
- **Chuyển động:** dùng hệ `data-reveal`, `.deco-float`, `.lightbox-fade`, `.glass-panel` đã có trong `globals.css`; tôn trọng `prefers-reduced-motion`.
- **Responsive:** kiểm tra ở 360px, 768px, 1280px, 1536px. Không cuộn ngang.

---

## 7. Yêu cầu phi chức năng

- **Ngôn ngữ:** toàn bộ giao diện tiếng Việt có dấu; `<html lang="vi">`.
- **Hiệu năng:** ảnh qua `next/image` (có `sizes`, lazy, chỉ ảnh hero dùng `preload`); mục tiêu Lighthouse mobile ≥ 85 Performance, ≥ 95 Accessibility/SEO.
- **SEO:** metadata riêng mỗi trang (title dạng `<Trang> | BACLE Photography`), Open Graph, `sitemap.ts`, `robots.ts`, JSON-LD `LocalBusiness` ở trang chủ/liên hệ.
- **Truy cập (a11y):** ảnh có `alt` tiếng Việt mô tả; điều khiển bàn phím được; tương phản chữ đạt WCAG AA; nút icon có `aria-label`.
- **Bảo mật:** kiểm tra dữ liệu ở server; trang quản trị yêu cầu đăng nhập; bí mật chỉ nằm trong biến môi trường; không lộ dữ liệu khách ra trang công khai.
- **Triển khai:** Vercel (link demo hiện tại).

---

## 8. Hiện trạng code cần sửa (tại thời điểm viết tài liệu)

| # | Vấn đề | Vị trí | Hướng sửa |
|---|---|---|---|
| H1 | ✅ `metadata.title` = "Booking Homestay", description mặc định của create-next-app | `app/layout.tsx` | Đã đổi sang thông tin BACLE + Open Graph |
| H2 | ✅ `<html lang="en">` | `app/layout.tsx` | Đã đổi `lang="vi"` |
| H3 | ✅ Font Geist chỉ tải subset `latin`, và `body` bị ghi đè `font-family: Arial` | `app/layout.tsx`, `app/globals.css` | Đã thay bằng 3 font có subset `vietnamese`, bỏ Arial |
| H4 | ✅ Có `@media (prefers-color-scheme: dark)` đổi nền sang đen | `app/globals.css` | Đã bỏ |
| H5 | ✅ `app/page.tsx` là `'use client'` toàn trang | `app/(site)/page.tsx` | Trang chủ là Server Component, chỉ phần tương tác là client |
| H6 | ✅ SVG mẫu của Next (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) | `public/` | Đã xoá |
| H7 | ⏳ Ảnh thư viện tên vô nghĩa, chưa phân loại, ~23 MB (108 ảnh) | `public/images/library/` | Ảnh đang dùng đã có khoá có nghĩa trong `data/photos.ts`; đổi tên/xếp thư mục khi khách chốt concept |
| H8 | ⏳ `README.md` là mẫu create-next-app | `README.md` | Viết lại ngắn gọn cho dự án |
| H9 | ✅ Hệ `data-reveal` có CSS nhưng chưa có component gắn class `is-revealed` | `components/layout/ScrollReveal.tsx` | Đã tạo, dùng `IntersectionObserver` |
| H10 | ⏳ Link trên trang chủ trỏ tới các trang chưa xây (`/concept`, `/dat-lich`, …) → 404, và Next prefetch các link này sinh lỗi 404 trong console | toàn site | Hết khi xây xong F02–F11; trong lúc chờ đã có trang 404 tiếng Việt (`app/not-found.tsx`) |

---

## 9. Giả định đang áp dụng (cho đến khi khách/sale xác nhận)

| Mã | Giả định |
|---|---|
| A1 | Ngôn ngữ: chỉ tiếng Việt |
| A2 | Dịch vụ: chụp ảnh cưới (pre-wedding ngoại cảnh, studio, lễ phục/áo dài); concept & gói giá là **nội dung mẫu** (`isDemo: true`): 3 concept (Ngoại cảnh Nắng Sớm, Studio Thanh Lịch, Lễ Gia Tiên & Áo Dài Đỏ) và 3 gói (Studio Tinh Gọn 5,9tr · Ngoại Cảnh & Studio 12,9tr · Phóng Sự Lễ Gia Tiên 6,9tr), hiển thị nhãn "Giá tham khảo" |
| A3 | Đặt lịch = gửi yêu cầu, studio gọi lại xác nhận; không đặt cọc online |
| A4 | Tối đa 3 concept cho một yêu cầu đặt lịch |
| A5 | Tagline "All you need is love" lấy từ watermark ảnh |
| A6 | Chỉ có 1 tài khoản quản trị |

## 10. Câu hỏi mở (cần sale hỏi khách)

| Mã | Câu hỏi | Ảnh hưởng |
|---|---|---|
| Q1 | Khách đã đồng ý xem demo chưa? Hạn giao demo là ngày nào? (phiếu: "SALE GHI HẠN") | Tiến độ |
| Q2 | Địa chỉ cụ thể, giờ làm việc, tên người liên hệ | F09, footer, JSON-LD |
| Q3 | Điểm mạnh/khác biệt (USP), số năm hoạt động, đội ngũ | F01, F02 |
| Q4 | Danh sách concept thật + phân loại + ảnh tương ứng; 3–5 dịch vụ chính | F03, F04, F06 |
| Q5 | Logo dạng SVG (vector) và bản màu trắng (nếu có). Hiện đã tự tách được PNG trong suốt từ JPG nên không còn chặn tiến độ | Header, hero |
| Q6 | Bảng giá thật theo gói, chính sách cọc/phát sinh | F05 |
| Q7 | Nơi lưu yêu cầu đặt lịch (CSDL nào, tài khoản ai trả phí) và có cần báo qua email/Zalo khi có yêu cầu mới không | F08, F11 |
| Q8 | Website tham khảo khách thích; điều cần tránh | Thiết kế |

---

## 11. Tiêu chí nghiệm thu demo

- [ ] Đủ 11 chức năng F01–F11 hoạt động trên https://bacle-photo.vercel.app/
- [ ] Gửi đặt lịch thành công từ mobile; yêu cầu hiện trong F11; đổi trạng thái được
- [ ] `/quan-ly/*` không vào được khi chưa đăng nhập
- [ ] Nút Zalo / Messenger / Gọi hoạt động trên mọi trang công khai
- [ ] Bản đồ hiển thị đúng vị trí ghim
- [ ] Không còn dấu vết template (H1–H8 đã xử lý)
- [ ] `npm run lint` và `npm run build` không lỗi
- [ ] Hiển thị đẹp ở 360px / 768px / 1280px, không cuộn ngang
- [ ] Nội dung mẫu được liệt kê rõ để sale báo khách

**Quy trình đóng phiếu:** dev điền tên, trạng thái demo, link demo, trạng thái gửi sale → chọn **"Xong - chờ sale gửi"**.

---

## 12. Nhật ký thay đổi

| Ngày | Nội dung | Người |
|---|---|---|
| 26/10/2026 | Tạo tài liệu từ Phiếu Dev 44 | Dev |
| 26/10/2026 | Hoàn thành F01 (Trang chủ 7 section) + Header, Footer, F10 nút nổi, F07 chọn concept, lightbox. Thêm token `accent-ink`, logo PNG trong suốt, `ImageAsset` dùng ảnh import tĩnh. Xử lý H1–H6, H9; thêm H10 | Dev |
| 26/10/2026 | Đổi hero desktop sang bố cục chia đôi (ảnh trái tràn mép, panel kem phải) theo mẫu khách gửi; header trang chủ có trạng thái "hero" (menu bên phải) và trạng thái cuộn (menu về giữa) | Dev |
