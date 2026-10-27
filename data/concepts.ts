import { photos, type ImageAsset } from '@/data/photos'

export type ConceptCategory = { id: string; name: string }

export type Concept = {
  slug: string
  name: string
  categoryId: string
  summary: string
  description: string
  location?: string
  outfits?: string
  duration?: string
  coverImage: ImageAsset
  images: ImageAsset[]
  packageIds: string[]
  featured?: boolean
  isDemo?: boolean
}

// DEMO: phân loại dựng từ bộ ảnh hiện có, chờ khách xác nhận danh sách concept thật (Q4)
export const conceptCategories: ConceptCategory[] = [
  { id: 'ngoai-canh', name: 'Ngoại cảnh' },
  { id: 'studio', name: 'Studio' },
  { id: 'le-gia-tien', name: 'Lễ gia tiên' },
]

// Thứ tự trong mảng = thứ tự trên coverflow trang chủ; concept ở giữa mảng hiện ở vị trí chính
export const concepts: Concept[] = [
  {
    slug: 'vuon-xanh-lang-man',
    name: 'Vườn Xanh Lãng Mạn',
    categoryId: 'ngoai-canh',
    summary: 'Bàn trà giữa khu vườn, hoa trắng và nắng nhẹ – dịu dàng như một buổi hẹn hò.',
    description:
      'Không gian vườn xanh với bàn trà, hoa trắng và cây lá tự nhiên – nơi hai bạn thả lỏng và trò chuyện như ngày đầu.',
    coverImage: photos.gardenTable,
    images: [photos.gardenTable, photos.gardenCheers, photos.forestKiss, photos.forestPlayful],
    packageIds: ['ngoai-canh-studio'],
    featured: true,
    isDemo: true,
  },
  {
    slug: 'studio-thanh-lich',
    name: 'Studio Thanh Lịch',
    categoryId: 'studio',
    summary: 'Vest đen và váy cưới cúp ngực trắng tinh khôi – phong cách minimalist tối giản mà sang trọng.',
    description:
      'Phông nền trắng, ánh sáng mềm và bố cục tối giản giúp mọi ánh nhìn đổ dồn vào cảm xúc của hai bạn.',
    coverImage: photos.studioClassic,
    images: [photos.studioClassic, photos.studioHands, photos.studioEmbrace, photos.studioForeheadKiss, photos.studioSweet],
    packageIds: ['studio-tinh-gon', 'ngoai-canh-studio'],
    featured: true,
    isDemo: true,
  },
  {
    slug: 'ngoai-canh-nang-som',
    name: 'Ngoại cảnh Nắng Sớm',
    categoryId: 'ngoai-canh',
    summary: 'Ảnh cặp đôi dưới ánh nắng vàng tươi tắn, trong trẻo và tràn đầy năng lượng.',
    description:
      'Những khung hình đón nắng sớm, bóng lá và gió nhẹ – để nụ cười của hai bạn tự nhiên như chính buổi sáng hôm ấy.',
    coverImage: photos.sunlightWall,
    images: [photos.sunlightWall, photos.sunlitLaugh, photos.sunlitSit],
    packageIds: ['ngoai-canh-studio'],
    featured: true,
    isDemo: true,
  },
  {
    slug: 'le-gia-tien-ao-dai-do',
    name: 'Lễ Gia Tiên & Áo Dài Đỏ',
    categoryId: 'le-gia-tien',
    summary: 'Bộ ảnh Lễ Vu Quy bên bao lì xì chữ Hỷ, áo dài đỏ – trắng truyền thống rạng rỡ.',
    description:
      'Ghi lại trọn vẹn nghi lễ gia tiên, nụ cười của gia đình và sắc đỏ may mắn trong ngày trọng đại.',
    coverImage: photos.redAoDaiEnvelopes,
    images: [photos.redAoDaiEnvelopes, photos.redEnvelopesFan, photos.redCouple, photos.vuQuyPetals, photos.confettiCeremony],
    packageIds: ['phong-su-le-gia-tien'],
    featured: true,
    isDemo: true,
  },
  {
    slug: 'lau-dai-co-dien',
    name: 'Lâu Đài Cổ Điển',
    categoryId: 'ngoai-canh',
    summary: 'Cầu thang xoắn, đèn chùm và hàng cửa vòm – sang trọng như một thước phim châu Âu.',
    description:
      'Bối cảnh lâu đài với cầu thang, đèn chùm pha lê và ô cửa kính lớn cho bộ ảnh cưới đậm chất điện ảnh.',
    coverImage: photos.palaceStaircase,
    images: [photos.palaceStaircase, photos.palaceWindows],
    packageIds: ['ngoai-canh-studio'],
    featured: true,
    isDemo: true,
  },
]

export function getFeaturedConcepts() {
  return concepts.filter((concept) => concept.featured)
}

export function getCategoryName(categoryId: string) {
  return conceptCategories.find((category) => category.id === categoryId)?.name ?? ''
}
