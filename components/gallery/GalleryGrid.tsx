'use client'

import Image from 'next/image'
import { useState, type ReactNode } from 'react'

import { ArrowRightIcon, ExpandIcon } from '@/components/ui/icons'
import type { ImageAsset } from '@/data/photos'
import { cn, revealDelay } from '@/lib/style'

import { Lightbox } from './Lightbox'

export type GalleryColumn = {
  // class kích thước cho từng ô ảnh trong cột (đặt sẵn class Tailwind ở component cha);
  // ảnh được lấy lần lượt từ bộ sưu tập theo thứ tự cột → ô
  tiles: string[]
  // cột chứa nút "Xem thêm" (đặt dưới các ảnh của cột)
  withMore?: boolean
  // chi tiết trang trí phía trên cột (chỉ hiện trên desktop)
  decoration?: ReactNode
}

type GalleryGridProps = {
  // toàn bộ bộ sưu tập; lưới hiện số ảnh bằng tổng số ô, phần còn lại xem bằng nút "Xem thêm" (mở lightbox)
  images: ImageAsset[]
  columns: GalleryColumn[]
  className?: string
}

export function GalleryGrid({ images, columns, className }: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const previewCount = columns.reduce((sum, column) => sum + column.tiles.length, 0)
  const rest = images.slice(previewCount)

  // Gắn ảnh cho từng ô theo thứ tự cột → ô
  let cursor = 0
  const placed = columns.map((column) =>
    column.tiles.map((tileClassName) => {
      const index = cursor++
      return { index, image: images[index], tileClassName }
    }),
  )

  return (
    <>
      <div className={className}>
        {columns.map((column, columnIndex) => (
          // Mobile: `contents` để các ô chảy thẳng vào lưới 2 cột; desktop: mỗi cột xếp dọc, căn đáy
          <div key={columnIndex} className="contents lg:flex lg:flex-col lg:gap-5">
            {column.decoration ? (
              <div aria-hidden="true" className="hidden justify-center lg:flex">
                {/* {column.decoration} */}
              </div>
            ) : null}

            {placed[columnIndex].map(({ index, image, tileClassName }) =>
              image ? (
                <div
                  key={image.src.src}
                  data-reveal="up"
                  style={revealDelay(columnIndex * 90)}
                  className={cn('relative aspect-square overflow-hidden rounded-[1.25rem] bg-ivory lg:aspect-auto lg:rounded-[1.75rem]', tileClassName)}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    aria-label={`Xem ảnh phóng to: ${image.alt}`}
                    className="group absolute inset-0 block focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-cream"
                  >
                    <span className="reveal-zoom absolute inset-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1023px) 50vw, 20vw"
                        placeholder="blur"
                        style={{ objectPosition: image.position }}
                        className="object-cover transition-[scale] duration-[1200ms] ease-out group-hover:scale-105"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25"
                    >
                      <span className="glass-panel flex size-12 scale-75 items-center justify-center rounded-full text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                        <ExpandIcon className="size-5" />
                      </span>
                    </span>
                  </button>
                </div>
              ) : null,
            )}

            {/* Nút "Xem thêm": viên thuốc đen dưới ảnh cột giữa; mobile xuống cuối lưới, căn giữa */}
            {column.withMore && rest.length > 0 ? (
              <div data-reveal="up" style={revealDelay(columnIndex * 90 + 120)} className="order-last col-span-2 flex justify-center pt-3 lg:order-none lg:col-span-1 lg:pt-0">
                <button
                  type="button"
                  // mở thẳng trình xem ảnh lớn tại ảnh đầu tiên chưa hiện trên lưới, ←/→ để xem tiếp
                  onClick={() => setOpenIndex(previewCount)}
                  aria-haspopup="dialog"
                  aria-label={`Xem thêm ${rest.length} ảnh trong bộ sưu tập`}
                  className="group inline-flex h-12 w-full max-w-xs items-center justify-center gap-2.5 rounded-full bg-ink px-6 text-[12px] font-medium uppercase tracking-[0.16em] whitespace-nowrap text-cream transition-colors duration-300 hover:bg-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
                >
                  Xem thêm {rest.length} ảnh
                  <ArrowRightIcon className="size-4 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {openIndex !== null ? (
        <Lightbox images={images} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
      ) : null}
    </>
  )
}
