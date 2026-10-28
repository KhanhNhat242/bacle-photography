import { photos, type ImageAsset } from '@/data/photos'
import { sectionIds } from '@/data/site'

export type ProcessStep = {
  title: string
  description: string
  // ảnh nền chỉ hiện khi hover/focus vào bước
  image: ImageAsset
  href: string
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Tư vấn',
    description: 'BACLE lắng nghe câu chuyện, mong muốn và ngân sách của hai bạn để gợi ý hướng chụp phù hợp nhất.',
    image: photos.aoDaiFlowerArch,
    href: `/#${sectionIds.contact}`,
  },
  {
    title: 'Chọn concept',
    description: 'Cùng định hình phong cách, bối cảnh và trang phục, rồi chốt lịch chụp thuận tiện cho hai bạn.',
    image: photos.forestPlayful,
    href: `/#${sectionIds.concepts}`,
  },
  {
    title: 'Ngày chụp',
    description: 'Ê-kíp đồng hành suốt buổi chụp, hướng dẫn tạo dáng nhẹ nhàng để hai bạn thật tự nhiên trước ống kính.',
    image: photos.studioSeatedLaugh,
    href: `/#${sectionIds.gallery}`,
  },
  {
    title: 'Hậu kỳ & nhận ảnh',
    description: 'Từng bức ảnh được chỉnh sửa tỉ mỉ, giữ màu da và ánh sáng tự nhiên trước khi bàn giao trọn bộ.',
    image: photos.teaCeremonyTable,
    href: `/#${sectionIds.pricing}`,
  },
]
