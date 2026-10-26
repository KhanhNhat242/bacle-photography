'use client'

import Image from 'next/image'
import { useState } from 'react'

import { ExpandIcon } from '@/components/ui/icons'
import type { ImageAsset } from '@/data/photos'
import { cn, revealDelay } from '@/lib/style'

import { Lightbox } from './Lightbox'

export type GalleryTile = {
  image: ImageAsset
  // vị trí ô trong lưới (đặt sẵn class Tailwind ở component cha)
  className?: string
}

type GalleryGridProps = { tiles: GalleryTile[]; className?: string }

export function GalleryGrid({ tiles, className }: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const images = tiles.map((tile) => tile.image)

  return (
    <>
      <ul className={className}>
        {tiles.map((tile, index) => (
          <li
            key={tile.image.src.src}
            data-reveal="up"
            style={revealDelay((index % 3) * 110)}
            className={cn('relative overflow-hidden rounded-sm bg-ivory', tile.className)}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Xem ảnh phóng to: ${tile.image.alt}`}
              className="group absolute inset-0 block focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-cream"
            >
              <span className="reveal-zoom absolute inset-0">
                <Image
                  src={tile.image.src}
                  alt={tile.image.alt}
                  fill
                  sizes="(max-width: 767px) 50vw, 33vw"
                  placeholder="blur"
                  style={{ objectPosition: tile.image.position }}
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
          </li>
        ))}
      </ul>

      {openIndex !== null ? (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      ) : null}
    </>
  )
}
