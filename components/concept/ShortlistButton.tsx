'use client'

import { HeartIcon } from '@/components/ui/icons'
import { cn } from '@/lib/style'

import { toggleConcept, useShortlist } from './shortlist'

type ShortlistButtonProps = { slug: string; conceptName: string; className?: string }

export function ShortlistButton({ slug, conceptName, className }: ShortlistButtonProps) {
  const { slugs } = useShortlist()
  const selected = slugs.includes(slug)

  return (
    <button
      type="button"
      onClick={() => toggleConcept(slug)}
      aria-pressed={selected}
      aria-label={selected ? `Bỏ chọn concept ${conceptName}` : `Chọn concept ${conceptName}`}
      className={cn(
        'inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-300',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink',
        selected
          ? 'border-accent bg-accent text-ink'
          : 'border-line bg-cream text-ink hover:border-accent hover:text-accent-ink',
        className,
      )}
    >
      <HeartIcon filled={selected} className="size-4" />
      {/* một span duy nhất để "concept" không bị tách thành flex item riêng (thừa khoảng gap) */}
      <span>
        {selected ? 'Đã chọn' : 'Chọn'}
        {selected ? null : <span className="hidden sm:inline"> concept</span>}
      </span>
    </button>
  )
}
