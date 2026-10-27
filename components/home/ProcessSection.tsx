import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { processSteps } from '@/data/process'
import { noOrphan } from '@/lib/format'
import { revealDelay } from '@/lib/style'

// Section 6 – Quy trình chụp: trục ngang (desktop) / trục dọc (mobile), số 01–05 màu champagne
export function ProcessSection() {
  return (
    <Section tone="ivory" aria-labelledby="process-title">
      <SectionHeading
        id="process-title"
        eyebrow="Quy trình chụp"
        title="5 bước đến bộ ảnh cưới trọn vẹn"
      />

      <ol className="relative mx-auto grid max-w-md gap-9 md:max-w-none md:grid-cols-5 md:gap-6">
        {/* Đường nối các bước */}
        <span
          aria-hidden="true"
          className="absolute bottom-7 left-7 top-7 w-px bg-accent/45 md:bottom-auto md:left-[10%] md:right-[10%] md:top-7 md:h-px md:w-auto"
        />
        {processSteps.map((step, index) => (
          <li
            key={step.title}
            data-reveal="up"
            style={revealDelay(index * 120)}
            className="relative flex items-start gap-5 md:flex-col md:items-center md:text-center"
          >
            <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-accent bg-ivory font-serif text-[1.35rem] font-medium text-accent-ink">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="pt-2 md:pt-0">
              <h3 className="font-serif text-[1.45rem] font-medium leading-tight text-ink md:mt-5">{noOrphan(step.title)}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed font-light text-muted">{noOrphan(step.description)}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
