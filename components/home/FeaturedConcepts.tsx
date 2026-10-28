import { getImageProps } from 'next/image'

import { ConceptFlexCarousel } from '@/components/concept/ConceptFlexCarousel'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getCategoryName, getFeaturedConcepts } from '@/data/concepts'
import { sectionIds } from '@/data/site'

// Section 3 – Concept nổi bật dạng FlexCarousel (WebGL, React Bits) tràn hết bề ngang màn hình.
// Carousel được ghim khi cuộn tới: cuộn dọc chuyển lần lượt từng thẻ, hết thẻ thì trang cuộn tiếp
export function FeaturedConcepts() {
  const slides = getFeaturedConcepts()
    .slice(0, 6)
    .map((concept) => {
      const cover = concept.coverImage
      return {
        // canvas không dùng được <Image>, nên lấy URL đã tối ưu của next/image (w=1080) để nạp texture
        src: getImageProps({ src: cover.src, alt: cover.alt, width: 540 }).props.src,
        alt: cover.alt,
        name: concept.name,
        category: getCategoryName(concept.categoryId),
        summary: concept.summary,
        aspect: cover.src.width / cover.src.height,
      }
    })

  return (
    // border-t-0!: Intro phía trên đã tan dần về kem (cùng nền section này), không cần đường kẻ
    <Section id={sectionIds.concepts} aria-labelledby="concepts-title" className="border-t-0!">
      <SectionHeading
        id="concepts-title"
        eyebrow="Concept nổi bật"
        title="Chọn phong cách cho câu chuyện của hai bạn"
        description=""
      />

      <ConceptFlexCarousel slides={slides} />
    </Section>
  )
}
