// Thông tin doanh nghiệp – nguồn duy nhất cho SĐT, link, toạ độ (docs/REQUIREMENTS.md mục 5)

export const site = {
  name: 'BACLE Photography',
  url: 'https://bacle-photo.vercel.app',
  // DEMO: lấy từ watermark trên ảnh, chờ khách xác nhận (giả định A5)
  tagline: 'All you need is love',
  description:
    'BACLE Photography – studio chụp ảnh cưới tại TP. Hồ Chí Minh. Lưu giữ câu chuyện tình yêu của hai bạn bằng những khung hình tự nhiên và tinh tế.',
  phoneDisplay: '093 522 14 63',
  phoneE164: '+84935221463',
  zaloUrl: 'https://zalo.me/0935221463',
  facebookUrl: 'https://www.facebook.com/BACLEphotography',
  messengerUrl: 'https://m.me/BACLEphotography',
  mapsUrl:
    'https://www.google.com/maps/place/BACLE+Photography/@10.7901029,106.6723896,17z/data=!3m1!4b1!4m6!3m5!1s0x31752f001df21d13:0x1717c36cd08b4794!8m2!3d10.7901029!4d106.6749645!16s%2Fg%2F11nbwd8hy3?entry=ttu&g_ep=EgoyMDI2MTAxOC4wIKXMDSoASAFQAw%3D%3D',
  geo: { lat: 10.7901029, lng: 106.6749645 },
  // Chờ khách cung cấp (Q2)
  address: null as string | null,
  openingHours: null as string | null,
  city: 'Hồ Chí Minh',
} as const

export const mapEmbedUrl = `https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=16&hl=vi&output=embed`

export type NavItem = { href: string; label: string }

export const navItems: NavItem[] = [
  { href: '/', label: 'Trang chủ' },
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/concept', label: 'Concept' },
  { href: '/bang-gia', label: 'Bảng giá' },
  { href: '/bo-suu-tap', label: 'Bộ sưu tập' },
  { href: '/lien-he', label: 'Liên hệ' },
]
