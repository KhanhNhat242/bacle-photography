import Image from 'next/image'
import Link from 'next/link'

import { ArrowRightIcon } from '@/components/ui/icons'
import { getCategoryName, type Concept } from '@/data/concepts'
import { noOrphan } from '@/lib/format'
import { cn, revealDelay } from '@/lib/style'

import { ShortlistButton } from './ShortlistButton'

type ConceptCardProps = { concept: Concept; index?: number; className?: string }

export function ConceptCard({ concept, index = 0, className }: ConceptCardProps) {
  return (
    <article
      data-reveal="up"
      style={revealDelay(index * 140)}
      className={cn('group relative flex flex-col', className)}
    >
      {/* Khung ảnh giữ đúng tỉ lệ 2:3 để không cắt đầu hay tà váy */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-ivory">
        <span className="reveal-zoom absolute inset-0">
          <Image
            src={concept.coverImage.src}
            alt={concept.coverImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            placeholder="blur"
            style={{ objectPosition: concept.coverImage.position }}
            className="object-cover transition-[scale] duration-[1200ms] ease-out group-hover:scale-105"
          />
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="glass-panel absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-ink">
          {getCategoryName(concept.categoryId)}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-serif text-[1.65rem] font-medium leading-tight text-ink">
          {/* Liên kết phủ toàn thẻ (after:inset-0); nút chọn concept nằm trên lớp này */}
          <Link
            href={`/concept/${concept.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent-ink"
          >
            {noOrphan(concept.name)}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed font-light text-muted-foreground">{noOrphan(concept.summary)}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.16em] text-accent-ink">
            Xem chi tiết
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <ShortlistButton slug={concept.slug} conceptName={concept.name} className="relative z-10" />
        </div>
      </div>
    </article>
  )
}
