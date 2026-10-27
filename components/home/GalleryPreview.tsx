import { GalleryGrid, type GalleryColumn } from '@/components/gallery/GalleryGrid'
import { SparkleIcon } from '@/components/ui/icons'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { galleryCollection } from '@/data/gallery'
import { sectionIds } from '@/data/site'

// Lưới 5 cột đối xứng, chân các cột thẳng hàng (desktop):
// hai cột ngoài: ảnh dọc + ảnh ngang thấp · hai cột kế: ảnh dọc cao · cột giữa: ảnh thấp nhất + nút "Xem thêm".
// Đỉnh các cột hạ dần vào giữa tạo hình bậc thang. Chiều cao tính theo --gu (đơn vị co theo màn hình).
// Mobile: 2 cột ô vuông – 6 ảnh (ẩn ô ngang cột 5) + nút "Xem thêm" ở cuối.
const columns: GalleryColumn[] = [
  { tiles: ['lg:h-[calc(var(--gu)*22)]', 'lg:h-[calc(var(--gu)*10.5)]'] },
  { tiles: ['lg:h-[calc(var(--gu)*30)]'] },
  {
    tiles: ['lg:h-[calc(var(--gu)*19.5)]'],
    withMore: true,
    decoration: <SparkleIcon className="size-7 text-accent" />,
  },
  { tiles: ['lg:h-[calc(var(--gu)*30)]'] },
  { tiles: ['lg:h-[calc(var(--gu)*23)]', 'hidden lg:block lg:h-[calc(var(--gu)*10.5)]'] },
]

// Section 5 – Bộ sưu tập xem trước
export function GalleryPreview() {
  return (
    <Section id={sectionIds.gallery} tone="ivory" aria-labelledby="gallery-title">
      <SectionHeading
        id="gallery-title"
        eyebrow="Bộ sưu tập"
        title="Khoảnh khắc yêu thương tại BACLE"
        description=""
      />

      <GalleryGrid
        images={galleryCollection}
        columns={columns}
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[1fr_1.08fr_1fr_1.08fr_1fr] lg:items-end lg:gap-5 lg:[--gu:0.78rem] xl:[--gu:0.95rem]"
      />
    </Section>
  )
}
