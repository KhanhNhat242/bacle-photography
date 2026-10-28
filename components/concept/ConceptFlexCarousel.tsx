'use client'

import { useEffect, useRef, useState } from 'react'

import FlexCarousel from '@/components/FlexCarousel'
import { noOrphan } from '@/lib/format'

export type ConceptSlide = {
  src: string
  alt: string
  name: string
  category: string
  summary: string
  // rộng / cao của ảnh bìa – thẻ giữa giữ đúng tỉ lệ ảnh (fit="natural")
  aspect: number
}

// Thẻ cao bằng 72% khung ghim; lớp chữ đè dùng cùng tỉ lệ để trùng khít thẻ giữa
const CARD_HEIGHT = 0.72
// Quãng cuộn dọc (theo svh) dành cho mỗi thẻ trong lúc carousel được ghim
const SCROLL_PER_SLIDE = 55
// Ngừng cuộn bao lâu thì coi là đã dừng (hiện lại chữ)
const SCROLL_IDLE_MS = 180

export function ConceptFlexCarousel({ slides }: { slides: ConceptSlide[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [active, setActive] = useState(0)
  const current = slides[active] ?? slides[0]
  const total = slides.length

  // Cuộn dọc trong vùng ghim → chọn thẻ: chia đều quãng cuộn cho từng thẻ, hết thẻ thì trang cuộn tiếp
  useEffect(() => {
    const track = trackRef.current
    const sticky = stickyRef.current
    if (!track || !sticky) return

    let frame = 0
    let idleTimer = 0

    const update = () => {
      frame = 0
      const top = parseFloat(getComputedStyle(sticky).top) || 0
      const distance = track.offsetHeight - sticky.offsetHeight
      const scrolled = top - track.getBoundingClientRect().top
      const progress = distance > 0 ? Math.min(1, Math.max(0, scrolled / distance)) : 0
      setIndex(Math.min(total - 1, Math.floor(progress * total)))

      // đang cuộn qua vùng ghim → ẩn chữ trên thẻ giữa (CSS: [data-scrolling])
      if (scrolled > 0 && scrolled < distance) {
        track.setAttribute('data-scrolling', '')
        window.clearTimeout(idleTimer)
        idleTimer = window.setTimeout(() => track.removeAttribute('data-scrolling'), SCROLL_IDLE_MS)
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(idleTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [total])

  return (
    // Tràn hết bề ngang màn hình, thoát khỏi khung max-w của Section (html đã chặn cuộn ngang)
    <div
      ref={trackRef}
      className="relative ml-[calc(50%-50vw)] w-screen"
      style={{ height: `calc(100svh + ${total * SCROLL_PER_SLIDE}svh)` }}
    >
      {/* top = chiều cao header cố định */}
      <div ref={stickyRef} className="sticky top-16 h-[calc(100svh-4rem)] lg:top-20 lg:h-[calc(100svh-5rem)]">
        <FlexCarousel
          items={slides.map(({ src, alt, name }) => ({ src, alt, title: name }))}
          index={index}
          ariaLabel="Concept nổi bật"
          className="concept-carousel"
          preset="liquid"
          intro="rise"
          cardHeight={CARD_HEIGHT}
          gap={12}
          squeeze={0.2}
          focusOnClick
          // tên + mô tả đã đè lên thẻ giữa nên tắt chú thích có sẵn bên dưới thẻ
          captions={false}
          fit="natural"
          radius={0}
          lensWidth={0.74}
          lensHeight={1.18}
          tilt={62}
          roundness={1}
          bend={0.34}
          reach={0.38}
          curl="twist"
          dispersion={0.45}
          liquid={0}
          followCursor={false}
          autoplay={false}
          interval={4}
          // lăn chuột dọc để trang cuộn (và điều khiển carousel qua vùng ghim), không bị carousel giữ lại
          captureWheel={false}
          onChange={setActive}
        />

        {/* Chữ đè lên thẻ giữa (thẻ phụ hai bên không có chữ). Thẻ giữa luôn nằm chính giữa khung,
            nên đặt cùng vị trí/kích thước; ẩn khi đang cuộn, đang trượt hoặc phóng to (CSS trong globals.css) */}
        {current ? (
          <div
            className="concept-carousel-overlay pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            style={{ height: `${CARD_HEIGHT * 100}%`, aspectRatio: current.aspect }}
          >
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-ink/85 via-ink/40 to-ink/0" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">{current.category}</p>
              <h3 className="mt-2 font-serif text-[1.7rem] font-medium leading-tight text-balance text-cream sm:text-[2rem]">
                {noOrphan(current.name)}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed font-light text-cream/85 sm:text-[15px]">
                {noOrphan(current.summary)}
              </p>
              <p className="mt-4 text-[12px] font-light tracking-[0.18em] text-cream/60">
                {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
