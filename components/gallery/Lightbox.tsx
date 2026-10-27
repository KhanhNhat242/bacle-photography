'use client'

import Image from 'next/image'
import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from 'react'

import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@/components/ui/icons'
import type { ImageAsset } from '@/data/photos'
import { lockScroll } from '@/lib/scrollLock'

type LightboxProps = {
  images: ImageAsset[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

const SWIPE_DISTANCE = 50

const controlClass =
  'flex size-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const pointerStartX = useRef<number | null>(null)
  const image = images[index]
  const total = images.length

  const showPrevious = () => onNavigate((index - 1 + total) % total)
  const showNext = () => onNavigate((index + 1) % total)

  // Khoá cuộn nền, đưa focus vào hộp thoại, trả focus về ảnh đã bấm khi đóng
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null
    const unlockScroll = lockScroll()
    closeRef.current?.focus()
    return () => {
      unlockScroll()
      trigger?.focus()
    }
  }, [])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') onClose()
    else if (event.key === 'ArrowLeft') showPrevious()
    else if (event.key === 'ArrowRight') showNext()
    else if (event.key === 'Tab') {
      // giữ focus trong hộp thoại
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return
    const distance = event.clientX - pointerStartX.current
    pointerStartX.current = null
    if (distance > SWIPE_DISTANCE) showPrevious()
    else if (distance < -SWIPE_DISTANCE) showNext()
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh phóng to"
      // tabIndex -1: bấm vào ảnh/khoảng trống thì focus vẫn ở trong hộp thoại, phím ←/→/Esc vẫn chạy
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[60] flex flex-col bg-ink/95 outline-none"
    >
      <div className="flex items-center justify-between px-4 py-4 text-cream sm:px-6">
        <p className="text-[13px] tracking-[0.2em]" aria-live="polite">
          {index + 1} / {total}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Đóng" className={controlClass}>
          <CloseIcon className="size-5" />
        </button>
      </div>

      <div
        className="relative flex-1 touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pointerStartX.current = null)}
      >
        <div key={index} className="lightbox-fade absolute inset-0 mx-4 sm:mx-20">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-contain"
          />
        </div>

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Ảnh trước"
          className={`${controlClass} absolute left-4 top-1/2 hidden -translate-y-1/2 sm:flex`}
        >
          <ChevronLeftIcon className="size-5" />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Ảnh tiếp theo"
          className={`${controlClass} absolute right-4 top-1/2 hidden -translate-y-1/2 sm:flex`}
        >
          <ChevronRightIcon className="size-5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 px-4 py-5 text-center">
        <button type="button" onClick={showPrevious} aria-label="Ảnh trước" className={`${controlClass} sm:hidden`}>
          <ChevronLeftIcon className="size-5" />
        </button>
        <p className="max-w-xl text-[14px] font-light text-cream/85">{image.alt}</p>
        <button type="button" onClick={showNext} aria-label="Ảnh tiếp theo" className={`${controlClass} sm:hidden`}>
          <ChevronRightIcon className="size-5" />
        </button>
      </div>
    </div>
  )
}
