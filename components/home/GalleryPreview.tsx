import { GalleryGrid, type GalleryTile } from '@/components/gallery/GalleryGrid'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ArrowRightIcon } from '@/components/ui/icons'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { photos } from '@/data/photos'

// Lưới 3 cột × 4 hàng (từ md): mỗi cột có 1 ô cao (2 hàng) đặt so le để tạo nhịp.
// Mobile: 2 cột ô vuông, hiện 6 ảnh; lightbox vẫn xem được đủ 9 ảnh.
const tiles: GalleryTile[] = [
  { image: photos.pinkAltarBride, className: 'md:col-[1] md:row-[1/span_2]' },
  { image: photos.confettiCeremony, className: 'md:col-[2] md:row-[1]' },
  { image: photos.veilPortrait, className: 'md:col-[3] md:row-[1]' },
  { image: photos.vuQuyPetals, className: 'md:col-[2] md:row-[2/span_2]' },
  { image: photos.gardenCheers, className: 'md:col-[3] md:row-[2]' },
  { image: photos.palaceWindows, className: 'md:col-[1] md:row-[3]' },
  { image: photos.ringCeremony, className: 'hidden md:col-[3] md:row-[3/span_2] md:block' },
  { image: photos.redProcession, className: 'hidden md:col-[1] md:row-[4] md:block' },
  { image: photos.studioSweet, className: 'hidden md:col-[2] md:row-[4] md:block' },
]

// Section 5 – Bộ sưu tập xem trước
export function GalleryPreview() {
  return (
    <Section aria-labelledby="gallery-title">
      <SectionHeading
        id="gallery-title"
        eyebrow="Bộ sưu tập"
        title="Khoảnh khắc yêu thương tại BACLE"
        description="Chạm vào từng khung hình để cảm nhận niềm hạnh phúc."
      />

      <GalleryGrid
        tiles={tiles}
        className="grid grid-cols-2 gap-3 *:aspect-square sm:gap-4 md:grid-cols-3 md:auto-rows-[170px] md:*:aspect-auto lg:auto-rows-[210px] lg:gap-6 xl:auto-rows-[235px]"
      />

      <div data-reveal="up" className="mt-10 flex justify-center lg:mt-14">
        <ButtonLink href="/bo-suu-tap" variant="outline">
          Khám phá toàn bộ thư viện ảnh
          <ArrowRightIcon className="size-4" />
        </ButtonLink>
      </div>
    </Section>
  )
}
