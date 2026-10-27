import Image from 'next/image'
import Link from 'next/link'

import { ArrowRightIcon } from '@/components/ui/icons'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Sprig } from '@/components/ui/Sprig'
import { photos } from '@/data/photos'
import { sectionIds, site } from '@/data/site'
import { revealDelay } from '@/lib/style'

const portrait = photos.studioForeheadKiss
const ring = photos.ringExchange

// Section 2 – Giới thiệu ngắn: 2 cột bất đối xứng, ảnh đặt lệch tầng bên trái, chữ bên phải
export function IntroSection() {
  return (
    <Section id={sectionIds.intro} tone="ivory" aria-labelledby="intro-title">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative mx-auto w-full max-w-md pb-14 pr-10 sm:max-w-lg sm:pb-16 sm:pr-16 lg:col-span-6 lg:max-w-none lg:pb-20 lg:pr-24">
          {/* Khung viền mảnh lệch nhẹ phía sau ảnh chính */}
          <div
            aria-hidden="true"
            data-reveal="up"
            className="absolute -left-3 -top-3 bottom-[calc(3.5rem+12px)] right-[calc(2.5rem+12px)] border border-accent/60 sm:bottom-[calc(4rem+12px)] sm:right-[calc(4rem+12px)] lg:bottom-[calc(5rem+12px)] lg:right-[calc(6rem+12px)]"
          />
          <div data-reveal="up" className="relative aspect-[4/5] overflow-hidden rounded-sm bg-cream">
            <span className="reveal-zoom absolute inset-0">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 80vw"
                style={{ objectPosition: portrait.position }}
                className="object-cover"
              />
            </span>
          </div>
          <div
            data-reveal="right"
            style={revealDelay(250)}
            className="absolute bottom-0 right-0 aspect-[2.2/1] w-[64%] overflow-hidden border-[6px] border-ivory shadow-2xl shadow-ink/20 sm:border-8"
          >
            <Image
              src={ring.src}
              alt={ring.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 26vw, 60vw"
              style={{ objectPosition: ring.position }}
              className="object-cover"
            />
          </div>
          <Sprig className="deco-float absolute -left-7 bottom-4 w-12 text-accent sm:-left-9 sm:w-14" />
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div data-reveal="up">
            <Eyebrow>Về BACLE</Eyebrow>
          </div>
          <h2
            id="intro-title"
            data-reveal="up"
            style={revealDelay(100)}
            className="mt-4 font-serif text-[2.15rem] font-medium leading-[1.12] text-balance text-ink sm:text-[2.6rem] lg:text-[3.1rem]"
          >
            Nơi tình yêu hóa thành kỷ niệm.
          </h2>
          <p
            data-reveal="up"
            style={revealDelay(200)}
            className="mt-6 text-[15px] leading-[1.9] font-light text-pretty text-muted lg:text-[17px]"
          >
            Tại {site.name}, chúng tôi tin rằng vẻ đẹp động lòng người nhất chính là ánh mắt và nụ cười tự
            nhiên của hai bạn trong ngày trọng đại. Mỗi bộ ảnh được chăm chút tỉ mỉ từ ánh sáng đến cảm xúc để
            lưu giữ dấu ấn vượt thời gian.
          </p>
          <p data-reveal="up" style={revealDelay(280)} className="mt-6 font-script text-[2.1rem] text-accent-ink">
            {site.tagline}
          </p>
        </div>
      </div>
    </Section>
  )
}
