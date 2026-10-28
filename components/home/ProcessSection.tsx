import Image from 'next/image'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { processSteps } from '@/data/process'
import { noOrphan } from '@/lib/format'
import { revealDelay } from '@/lib/style'

// Section 6 – Quy trình chụp: 4 cột số lớn 01–04; hover/focus vào bước nào thì ảnh nền
// của bước đó hiện lên (phủ lớp ink để chữ cream đủ tương phản), mặc định nền trơn
export function ProcessSection() {
  return (
    <Section aria-labelledby="process-title">
      <SectionHeading
        id="process-title"
        eyebrow="Quy trình chụp"
        title="4 bước đến bộ ảnh cưới trọn vẹn"
      />

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {processSteps.map((step, index) => (
          <li key={step.title} data-reveal="up" style={revealDelay(index * 120)}>
            <article className="group relative isolate flex h-full flex-col overflow-hidden px-7 py-10 transition-shadow duration-500 hover:shadow-2xl focus-within:shadow-2xl lg:px-8 lg:py-14 motion-reduce:transition-none">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
              >
                <Image
                  src={step.image.src}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="scale-110 object-cover transition-transform duration-1000 group-hover:scale-100 group-focus-within:scale-100 motion-reduce:transition-none"
                  style={{ objectPosition: step.image.position }}
                />
                <span className="absolute inset-0 bg-ink/60" />
              </div>

              <span className="font-serif text-[4.5rem] font-light leading-none text-ink transition-colors duration-500 group-hover:text-cream group-focus-within:text-cream lg:text-[5.5rem]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="ml-1.5 mt-6 h-12 border-l border-dotted border-accent" />

              <h3 className="mt-6 font-serif text-[1.6rem] font-medium leading-tight text-ink transition-colors duration-500 group-hover:text-cream group-focus-within:text-cream">
                {noOrphan(step.title)}
              </h3>
              <p className="mt-3 flex-1 text-[15px] font-light leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-cream/90 group-focus-within:text-cream/90">
                {noOrphan(step.description)}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
