import type { ReactNode } from 'react'

import { cn } from '@/lib/style'

type SectionProps = {
  id?: string
  tone?: 'cream' | 'ivory'
  className?: string
  children: ReactNode
  'aria-labelledby'?: string
}

// Khoảng nghỉ chuẩn giữa các section: 64–80px trên mobile, 96–112px trên desktop.
// Nền cream/ivory xen kẽ + đường kẻ 1px màu line để tách section mà không rời rạc.
export function Section({ id, tone = 'cream', className, children, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        // scroll-mt = chiều cao header cố định: cuộn tới section (menu, #anchor) không bị header che
        'scroll-mt-16 border-t border-line py-16 md:py-20 lg:scroll-mt-20 lg:py-24 xl:py-28',
        tone === 'ivory' ? 'bg-ivory' : 'bg-cream',
        className,
      )}
      {...rest}
    >
      <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
