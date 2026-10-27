import type { ReactNode } from 'react'

import { noOrphan } from '@/lib/format'
import { cn, revealDelay } from '@/lib/style'

type SectionHeadingProps = {
  id?: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'center' | 'left'
  className?: string
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-accent-ink sm:text-xs',
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-accent" />
      {children}
    </p>
  )
}

// Cụm tiêu đề section: cách lưới nội dung 32px (mobile) – 48/56px (desktop)
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-8 md:mb-12 xl:mb-14',
        align === 'center' && 'mx-auto max-w-2xl text-center',
        className,
      )}
    >
      <div data-reveal="up">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2
        id={id}
        data-reveal="up"
        style={revealDelay(100)}
        className="mt-4 font-serif text-[2.15rem] font-medium leading-[1.12] text-balance text-ink sm:text-[2.6rem] lg:text-[3.1rem]"
      >
        {typeof title === 'string' ? noOrphan(title) : title}
      </h2>
      {description ? (
        <p
          data-reveal="up"
          style={revealDelay(200)}
          className="mt-4 text-[15px] leading-relaxed font-light text-pretty text-muted lg:text-base"
        >
          {typeof description === 'string' ? noOrphan(description) : description}
        </p>
      ) : null}
    </div>
  )
}
