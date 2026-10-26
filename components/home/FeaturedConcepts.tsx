import { ConceptCard } from '@/components/concept/ConceptCard'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ArrowRightIcon } from '@/components/ui/icons'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getFeaturedConcepts } from '@/data/concepts'

// Section 3 – Concept nổi bật. Mobile: vuốt ngang (thẻ kế tiếp ló ra để gợi ý), từ md: lưới 3 cột.
export function FeaturedConcepts() {
  const featured = getFeaturedConcepts().slice(0, 6)

  return (
    <Section aria-labelledby="concepts-title">
      <SectionHeading
        id="concepts-title"
        eyebrow="Concept nổi bật"
        title="Chọn phong cách cho câu chuyện của hai bạn"
        description="Đánh dấu tối đa 3 concept yêu thích – BACLE sẽ tư vấn chi tiết khi hai bạn đặt lịch."
      />

      <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-8">
        {featured.map((concept, index) => (
          <ConceptCard
            key={concept.slug}
            concept={concept}
            index={index}
            className="w-[82%] shrink-0 snap-start sm:w-[58%] md:w-auto"
          />
        ))}
      </div>

      <div data-reveal="up" className="mt-10 flex justify-center lg:mt-14">
        <ButtonLink href="/concept" variant="outline">
          Xem tất cả concept
          <ArrowRightIcon className="size-4" />
        </ButtonLink>
      </div>
    </Section>
  )
}
