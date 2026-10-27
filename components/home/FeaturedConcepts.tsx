import { ConceptCoverflow } from '@/components/concept/ConceptCoverflow'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ArrowRightIcon } from '@/components/ui/icons'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getFeaturedConcepts } from '@/data/concepts'
import { sectionIds } from '@/data/site'

// Section 3 – Concept nổi bật dạng coverflow: thẻ chính ở giữa, rê chuột vào thẻ phụ để đưa vào giữa
export function FeaturedConcepts() {
  const featured = getFeaturedConcepts().slice(0, 6)

  return (
    <Section id={sectionIds.concepts} aria-labelledby="concepts-title">
      <SectionHeading
        id="concepts-title"
        eyebrow="Concept nổi bật"
        title="Chọn phong cách cho câu chuyện của hai bạn"
        description=""
      />

      {/* data-reveal đặt ở khung ngoài: transform của data-reveal không được đè lên transform của từng thẻ */}
      <div data-reveal="up">
        <ConceptCoverflow concepts={featured} />
      </div>
    </Section>
  )
}
