import { PackageCard } from '@/components/package/PackageCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { packages } from '@/data/packages'
import { sectionIds } from '@/data/site'

// Section 4 – Bảng giá tóm tắt: 3 gói, gói nổi bật ở giữa viền champagne
export function PricingPreview() {
  return (
    <Section id={sectionIds.pricing} aria-labelledby="pricing-title">
      <SectionHeading
        id="pricing-title"
        eyebrow="Bảng giá theo gói"
        title="Gói chụp cưới cho từng mong muốn"
        description=""
      />

      <div className="mx-auto grid max-w-md items-stretch gap-8 md:max-w-none md:grid-cols-3 md:gap-6 lg:gap-8">
        {packages.map((pkg, index) => (
          <PackageCard key={pkg.id} pkg={pkg} index={index} />
        ))}
      </div>
    </Section>
  )
}
