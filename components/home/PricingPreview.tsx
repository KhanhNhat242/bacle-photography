import Link from 'next/link'

import { PackageCard } from '@/components/package/PackageCard'
import { ArrowRightIcon } from '@/components/ui/icons'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { packages } from '@/data/packages'

// Section 4 – Bảng giá tóm tắt: 3 gói, gói nổi bật ở giữa viền champagne
export function PricingPreview() {
  return (
    <Section tone="ivory" aria-labelledby="pricing-title">
      <SectionHeading
        id="pricing-title"
        eyebrow="Bảng giá theo gói"
        title="Gói chụp cưới cho từng mong muốn"
        description="Giá tham khảo – BACLE sẽ tư vấn và báo giá chi tiết theo concept hai bạn chọn."
      />

      <div className="mx-auto grid max-w-md items-stretch gap-8 md:max-w-none md:grid-cols-3 md:gap-6 lg:gap-8">
        {packages.map((pkg, index) => (
          <PackageCard key={pkg.id} pkg={pkg} index={index} />
        ))}
      </div>

      <div data-reveal="up" className="mt-12 flex justify-center lg:mt-16">
        <Link
          href="/bang-gia"
          className="group inline-flex items-center gap-3 border-b border-accent pb-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ink"
        >
          Xem chi tiết bảng giá
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  )
}
