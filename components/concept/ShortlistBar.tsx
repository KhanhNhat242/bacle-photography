'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { ArrowRightIcon, HeartIcon } from '@/components/ui/icons'

import { SHORTLIST_LIMIT, useShortlist } from './shortlist'

const LIMIT_NOTICE_MS = 2800

// Thanh nhắc ở góc dưới bên TRÁI – không đè lên cụm nút Zalo/Messenger/Gọi ở góc phải
export function ShortlistBar() {
  const { slugs, limitReachedAt } = useShortlist()
  const [dismissedAt, setDismissedAt] = useState(0)
  const showLimit = limitReachedAt > dismissedAt

  useEffect(() => {
    if (!limitReachedAt) return
    const timer = window.setTimeout(() => setDismissedAt(limitReachedAt), LIMIT_NOTICE_MS)
    return () => window.clearTimeout(timer)
  }, [limitReachedAt])

  if (slugs.length === 0) return null

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-[calc(100%-6rem)] sm:bottom-6 sm:left-6">
      <p aria-live="polite" className="sr-only">
        {`Đã chọn ${slugs.length} trên ${SHORTLIST_LIMIT} concept`}
      </p>
      {showLimit ? (
        <p
          role="status"
          className="lightbox-fade mb-2 rounded-2xl bg-ink px-4 py-2 text-[13px] text-cream shadow-lg"
        >
          Bạn chỉ chọn được tối đa {SHORTLIST_LIMIT} concept.
        </p>
      ) : null}
      <Link
        href="/dat-lich"
        className="glass-panel lightbox-fade flex items-center gap-3 rounded-full border border-accent py-2 pl-3 pr-4 text-[13px] text-ink shadow-lg shadow-accent/15 transition-colors hover:bg-ivory focus-visible:outline-2 focus-visible:outline-accent-ink"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
          <HeartIcon filled className="size-4" />
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block font-medium">
            Đã chọn {slugs.length}/{SHORTLIST_LIMIT} concept
          </span>
          <span className="block text-[12px] text-accent-ink">Đặt lịch ngay</span>
        </span>
        <ArrowRightIcon className="size-4 shrink-0" />
      </Link>
    </div>
  )
}
