import type { Metadata } from 'next'

import { ContactCta } from '@/components/home/ContactCta'
import { FeaturedConcepts } from '@/components/home/FeaturedConcepts'
import { GalleryPreview } from '@/components/home/GalleryPreview'
import { HeroSection } from '@/components/home/HeroSection'
import { IntroSection } from '@/components/home/IntroSection'
import { PricingPreview } from '@/components/home/PricingPreview'
import { ProcessSection } from '@/components/home/ProcessSection'
import { photos } from '@/data/photos'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: { absolute: `${site.name} – Chụp ảnh cưới tại TP. ${site.city}` },
  description: site.description,
  alternates: { canonical: '/' },
}

// JSON-LD cho Google hiểu đây là doanh nghiệp địa phương
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phoneE164,
  image: new URL(photos.sunlitLaugh.src.src, site.url).toString(),
  sameAs: [site.facebookUrl],
  hasMap: site.mapsUrl,
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  address: {
    '@type': 'PostalAddress',
    ...(site.address ? { streetAddress: site.address } : {}),
    addressLocality: site.city,
    addressCountry: 'VN',
  },
}

// F01 – Trang chủ: 7 section, nền cream/ivory xen kẽ
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, '\\u003c') }}
      />
      <HeroSection />
      <IntroSection />
      <FeaturedConcepts />
      <GalleryPreview />
      <PricingPreview />
      <ContactCta />
    </>
  )
}
