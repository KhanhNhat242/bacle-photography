'use client'

import Image from 'next/image'
import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'

import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/icons'
import { getCategoryName, type Concept } from '@/data/concepts'
import { noOrphan } from '@/lib/format'
import { cn } from '@/lib/style'

import { ShortlistButton } from './ShortlistButton'

// Vị trí theo khoảng cách tới thẻ chính: dịch ngang = shift × bề rộng thẻ + số khe × gap.
// tilt: góc nghiêng (độ) quanh trục dọc – mặt thẻ phụ hướng vào thẻ giữa, càng xa nghiêng càng nhiều.
// Chỉ hiện tối đa 2 thẻ mỗi bên, xa hơn thì ẩn (xoay vòng nên luôn có thẻ để điền vào).
const SLOTS = [
  { shift: 0, scale: 1, tilt: 0, opacity: 1 },
  { shift: 0.88, scale: 0.84, tilt: 16, opacity: 1 },
  { shift: 1.56, scale: 0.7, tilt: 26, opacity: 0.85 },
]
const MAX_VISIBLE = SLOTS.length - 1
const SWIPE_DISTANCE = 50

function circularOffset(index: number, active: number, total: number) {
  let offset = (index - active) % total
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

function slotStyle(offset: number): CSSProperties {
  const distance = Math.abs(offset)
  const slot = SLOTS[Math.min(distance, MAX_VISIBLE)]
  const direction = Math.sign(offset)
  return {
    // perspective() riêng từng thẻ: điểm tụ ở tâm thẻ nên độ nghiêng đều hai bên
    transform: `perspective(1200px) translateX(calc(-50% + ${direction} * (var(--cf-w) * ${slot.shift} + var(--cf-gap) * ${distance}))) rotateY(${-direction * slot.tilt}deg) scale(${slot.scale})`,
    opacity: distance > MAX_VISIBLE ? 0 : slot.opacity,
    zIndex: 30 - distance * 10,
  }
}

type ConceptCoverflowProps = { concepts: Concept[] }

export function ConceptCoverflow({ concepts }: ConceptCoverflowProps) {
  const total = concepts.length
  const [active, setActive] = useState(Math.floor(total / 2))
  const swipeStartX = useRef<number | null>(null)
  const swiped = useRef(false)

  const goTo = (index: number) => setActive(((index % total) + total) % total)

  const onStagePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipeStartX.current = event.pointerType === 'mouse' ? null : event.clientX
    swiped.current = false
  }

  const onStagePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null) return
    const distance = event.clientX - swipeStartX.current
    swipeStartX.current = null
    if (Math.abs(distance) < SWIPE_DISTANCE) return
    swiped.current = true
    goTo(active + (distance < 0 ? 1 : -1))
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') goTo(active - 1)
    else if (event.key === 'ArrowRight') goTo(active + 1)
  }

  const current = concepts[active]

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Concept nổi bật"
      onKeyDown={onKeyDown}
      className="[--cf-gap:0.875rem] [--cf-w:min(16.5rem,66vw)] md:[--cf-gap:1.25rem] md:[--cf-w:16rem] lg:[--cf-w:17.5rem] xl:[--cf-gap:1.5rem] xl:[--cf-w:18.5rem]"
    >
      <p aria-live="polite" className="sr-only">
        {`Concept ${active + 1} trên ${total}: ${current.name}`}
      </p>

      {/* overflow-x-clip: các thẻ xa ở hai bên tràn ra ngoài khung trên mobile */}
      <div className="-mx-4 overflow-x-clip sm:-mx-6 lg:-mx-8">
        <div
          onPointerDown={onStagePointerDown}
          onPointerUp={onStagePointerUp}
          onPointerCancel={() => (swipeStartX.current = null)}
          className="relative mx-auto h-[calc(var(--cf-w)*1.5)] touch-pan-y"
        >
          {concepts.map((concept, index) => {
            const offset = circularOffset(index, active, total)
            const isActive = offset === 0
            const hidden = Math.abs(offset) > MAX_VISIBLE
            return (
              <article
                key={concept.slug}
                aria-roledescription="slide"
                aria-label={`${index + 1} / ${total}: ${concept.name}`}
                aria-hidden={hidden || undefined}
                style={slotStyle(offset)}
                className={cn(
                  'group absolute left-1/2 top-0 h-full w-(--cf-w) overflow-hidden rounded-[1.75rem] bg-ivory shadow-ink/20 transition-[transform,opacity,box-shadow] duration-[1100ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none',
                  isActive ? 'shadow-2xl' : 'shadow-lg',
                  hidden && 'pointer-events-none',
                )}
              >
                {/* Ảnh concept làm nền phủ kín thẻ */}
                <Image
                  src={concept.coverImage.src}
                  alt={concept.coverImage.alt}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 768px) 66vw, 19rem"
                  style={{ objectPosition: concept.coverImage.position }}
                  className={cn(
                    'object-cover transition-[scale] duration-[1200ms] ease-out group-hover:scale-105',
                  )}
                />
                {/* Lớp tối dần về đáy để chữ trắng luôn đọc rõ trên ảnh */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-0 bg-gradient-to-t transition-opacity duration-[1100ms]',
                    isActive
                      ? 'from-ink/85 via-ink/25 via-55% to-ink/0'
                      : 'from-ink/70 via-ink/15 to-ink/10 group-hover:opacity-75',
                  )}
                />

                <span className="glass-panel absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-ink">
                  {getCategoryName(concept.categoryId)}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <h3 className="font-serif text-[1.6rem] font-medium leading-tight text-balance text-cream sm:text-[1.8rem]">
                    {noOrphan(concept.name)}
                  </h3>

                  {/* Mô tả và nút chỉ mở ra ở thẻ chính */}
                  <div
                    className={cn(
                      'grid transition-[grid-template-rows,opacity] duration-[1100ms] ease-[cubic-bezier(0.33,1,0.68,1)]',
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-2 text-[14px] leading-relaxed font-light text-cream/85">{noOrphan(concept.summary)}</p>
                    </div>
                  </div>
                </div>

                {/* Thẻ phụ: bấm (chạm) để đưa vào giữa */}
                {!isActive && !hidden ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (swiped.current) return
                      goTo(index)
                    }}
                    aria-label={`Xem concept ${concept.name}`}
                    className="absolute inset-0 cursor-pointer focus-visible:rounded-[1.75rem] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-cream"
                  />
                ) : null}
              </article>
            )
          })}
        </div>
      </div>

      {/* Điều khiển: mũi tên + chấm vị trí */}
      {/* <div className="mt-8 flex items-center justify-center gap-5 lg:mt-10">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Concept trước"
          className="flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:bg-ivory focus-visible:outline-2 focus-visible:outline-accent-ink"
        >
          <ChevronLeftIcon className="size-5" />
        </button>
        <div className="flex items-center gap-2">
          {concepts.map((concept, index) => (
            <button
              key={concept.slug}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Chuyển tới concept ${concept.name}`}
              aria-current={index === active ? 'true' : undefined}
              className="group flex h-11 items-center px-1 focus-visible:outline-2 focus-visible:outline-accent-ink"
            >
              <span
                className={cn(
                  'block h-1.5 rounded-full transition-all duration-500',
                  index === active ? 'w-7 bg-accent' : 'w-1.5 bg-line group-hover:bg-accent/60',
                )}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Concept tiếp theo"
          className="flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:bg-ivory focus-visible:outline-2 focus-visible:outline-accent-ink"
        >
          <ChevronRightIcon className="size-5" />
        </button>
      </div> */}
    </div>
  )
}
