'use client'

import Link from 'next/link'

import { HeartIcon } from '@/components/ui/icons'

import { useShortlist } from './shortlist'

// Huy hiệu trên header: số concept đã chọn (F07), dẫn sang form đặt lịch
export function ShortlistBadge() {
  const { slugs } = useShortlist()
  const count = slugs.length

  return (
    <Link
      href="/dat-lich"
      aria-label={count > 0 ? `${count} concept đã chọn – đặt lịch chụp` : 'Concept đã chọn'}
      className="relative inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ivory hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-accent-ink"
    >
      <HeartIcon filled={count > 0} className="size-5" />
      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-ink">
          {count}
        </span>
      ) : null}
    </Link>
  )
}
