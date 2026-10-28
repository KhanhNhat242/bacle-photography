'use client'

import Image from 'next/image'
import { useEffect, useRef, type ReactNode } from 'react'

import type { ImageAsset } from '@/data/photos'

// Hiệu ứng theo ScrollExpand (React Bits): khung ảnh nhỏ được ghim, cuộn xuống thì mở rộng ra
// toàn màn hình (clip-path) và ảnh thu từ zoom về 1. Khác ScrollExpand: nội dung không nằm trong khung
// (form đặt lịch + bản đồ cao hơn một màn hình sẽ bị cắt), mà cuộn lên đè trên ảnh đã ghim;
// ảnh mờ dần trong lúc mở rộng để nội dung nổi lên.
const START_HEIGHT = 58 // % chiều cao màn hình
const START_WIDTH = { mobile: 80, desktop: 42 } // % bề ngang; 42% trên mobile quá hẹp
const START_RADIUS = 24
const MEDIA_ZOOM = 1.35
const END_OPACITY = 0.28
// Quãng cuộn (× chiều cao màn hình) để khung mở hết cỡ
const EXPAND_DISTANCE = 1
const SMOOTHING = 0.1

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
const smoothstep = (from: number, to: number, x: number) => {
  const t = clamp((x - from) / (to - from), 0, 1)
  return t * t * (3 - 2 * t)
}

type ContactBackdropProps = { image: ImageAsset; title?: string; children: ReactNode }

export function ContactBackdrop({ image, title, children }: ContactBackdropProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const frame = frameRef.current
    const media = mediaRef.current
    if (!wrap || !frame || !media) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let startWidth = START_WIDTH.desktop
    let current = 0
    let target = 0
    let raf = 0

    const apply = (p: number) => {
      const e = smoothstep(0, 1, p)
      const w = startWidth + (100 - startWidth) * e
      const h = START_HEIGHT + (100 - START_HEIGHT) * e
      const r = START_RADIUS * (1 - e)
      frame.style.clipPath = `inset(${(100 - h) / 2}% ${(100 - w) / 2}% round ${r}px)`
      // ảnh nhỏ giữ nguyên độ đậm, mở rộng tới đâu mờ dần tới đó
      frame.style.opacity = `${1 - (1 - END_OPACITY) * e}`
      media.style.transform = `scale(${MEDIA_ZOOM + (1 - MEDIA_ZOOM) * e})`
      if (titleRef.current) {
        const out = smoothstep(0.15, 0.6, p)
        titleRef.current.style.opacity = `${1 - out}`
        titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0)`
      }
    }

    const read = () => {
      const distance = window.innerHeight * EXPAND_DISTANCE
      return clamp(-wrap.getBoundingClientRect().top / distance, 0, 1)
    }

    const tick = () => {
      current += (target - current) * SMOOTHING * 1.6
      if (Math.abs(target - current) < 0.0005) current = target
      apply(current)
      raf = current === target ? 0 : requestAnimationFrame(tick)
    }

    const onScroll = () => {
      target = read()
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onResize = () => {
      startWidth = window.innerWidth < 768 ? START_WIDTH.mobile : START_WIDTH.desktop
      target = current = read()
      apply(current)
    }

    // Giảm chuyển động: bỏ hiệu ứng, hiện thẳng trạng thái cuối (ảnh phủ kín, đã mờ)
    if (reduceMotion) {
      apply(1)
      return
    }

    onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    // Tràn hết bề ngang màn hình, thoát khỏi khung max-w của Section (html đã chặn cuộn ngang)
    <div ref={wrapRef} className="relative ml-[calc(50%-50vw)] w-screen">
      {/* Khung ảnh ghim; nằm dưới header cố định (header kính mờ nên vẫn thấy ảnh) */}
      <div className="sticky top-0 h-svh overflow-hidden">
        <div
          ref={frameRef}
          className="absolute inset-0 will-change-[clip-path,opacity]"
          style={{ clipPath: `inset(${(100 - START_HEIGHT) / 2}% ${(100 - START_WIDTH.desktop) / 2}% round ${START_RADIUS}px)` }}
        >
          <div ref={mediaRef} className="absolute inset-0 will-change-transform" style={{ transform: `scale(${MEDIA_ZOOM})` }}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              placeholder="blur"
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: image.position }}
            />
          </div>
        </div>
        {title ? (
          <p
            ref={titleRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center font-script text-[3rem] text-[#8c6239] drop-shadow-xl drop-shadow-ink/45 sm:text-[4.5rem] lg:text-[5.5rem]"
          >
            {title}
          </p>
        ) : null}
      </div>

      {/* Nội dung bắt đầu lộ ra khi khung đã mở ~60%, rồi cuộn lên đè trên ảnh đang ghim */}
      <div className="relative mx-auto mt-[60svh] max-w-7xl px-4 pb-16 sm:px-6 md:pb-20 lg:px-8 lg:pb-28">
        {children}
      </div>
    </div>
  )
}
