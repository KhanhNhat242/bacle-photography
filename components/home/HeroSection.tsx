import Image from 'next/image'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { HeartIcon } from '@/components/ui/icons'
import { Sprig } from '@/components/ui/Sprig'
import { photos } from '@/data/photos'
import { site } from '@/data/site'
import { heroDelay } from '@/lib/style'

const main = photos.sunlitLaugh
const studio = photos.studioWarmHug
const ring = photos.ringTouch

// Section 1 – Hero: vừa đúng một màn hình.
// Mobile: ảnh nắng ngược sáng phủ toàn màn hình, chữ nằm trên lớp chuyển màu kem phía dưới.
// Desktop: 2 cột – chữ bên trái, cụm 3 ảnh (nắng ngược sáng · studio tối giản · nhẫn cưới) bên phải.
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-cream lg:h-svh lg:max-h-[1000px] lg:min-h-[640px]"
    >
      <div className="mx-auto grid min-h-svh max-w-7xl grid-rows-[1fr_auto] px-4 pt-16 sm:px-6 lg:h-full lg:min-h-0 lg:grid-cols-12 lg:grid-rows-none lg:gap-10 lg:px-8 lg:pt-20">
        {/* Cột chữ */}
        <div className="relative z-10 flex flex-col justify-end pb-24 sm:pb-28 lg:col-span-5 lg:justify-center lg:pb-10">
          <p className="hero-rise flex items-center gap-3 text-accent-ink" style={heroDelay(150)}>
            <span aria-hidden="true" className="h-px w-10 bg-accent" />
            <span className="font-script text-[2rem] leading-none max-lg:short:text-[1.7rem] lg:text-[2.6rem]">
              {site.tagline}
            </span>
          </p>
          <h1
            id="hero-title"
            className="hero-rise mt-4 font-serif text-[2.65rem] font-medium leading-[1.04] text-balance text-ink max-lg:short:text-[2.25rem] sm:text-[3.4rem] lg:mt-6 lg:text-[3.7rem] xl:text-[4.4rem]"
            style={heroDelay(280)}
          >
            Lưu giữ trọn vẹn khoảnh khắc ngày <em className="font-normal text-accent-ink">chung đôi</em>
          </h1>
          <p
            className="hero-rise mt-5 max-w-md text-[15px] leading-relaxed font-light text-pretty text-ink/80 sm:text-base lg:mt-7 lg:text-lg lg:text-muted"
            style={heroDelay(420)}
          >
            Ghi lại câu chuyện tình yêu của hai bạn bằng những khung hình tự nhiên và tinh tế nhất.
          </p>
          {/* Mobile: chừa 4rem bên phải cho cụm nút nổi Zalo/Messenger/Gọi (F10) */}
          <div className="hero-rise mt-7 flex flex-col gap-3 pr-16 sm:flex-row sm:pr-0 lg:mt-10" style={heroDelay(560)}>
            <ButtonLink href="/dat-lich">Đặt lịch chụp</ButtonLink>
            <ButtonLink href="/concept" variant="outline" className="bg-cream/60 lg:bg-transparent">
              Xem concept
            </ButtonLink>
          </div>

          {/* Gợi ý cuộn xuống – chỉ hiện khi màn hình đủ cao để không làm chật hero */}
          <div aria-hidden="true" className="hero-rise mt-14 hidden items-center gap-4 lg:tall:flex" style={heroDelay(800)}>
            <span className="relative h-12 w-px overflow-hidden bg-line">
              <span className="scroll-cue absolute left-0 top-0 h-3 w-px bg-accent-ink" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted">Cuộn để khám phá</span>
          </div>
        </div>

        {/* Cụm ảnh – trên mobile chỉ còn ảnh chính phủ nền */}
        <div className="lg:relative lg:col-span-7 lg:h-full">
          {/* Viền vòm champagne lệch nhẹ phía sau ảnh chính */}
          <div
            aria-hidden="true"
            className="hero-rise absolute right-[-14px] top-[calc(7%-14px)] bottom-[calc(7%+14px)] hidden w-[54%] rounded-t-full border border-accent/70 lg:block"
            style={heroDelay(600)}
          />

          <div className="absolute inset-0 -z-10 overflow-hidden lg:inset-auto lg:bottom-[7%] lg:right-0 lg:top-[7%] lg:z-0 lg:w-[54%] lg:rounded-t-full">
            <Image
              src={main.src}
              alt={main.alt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 36vw, 100vw"
              style={{ objectPosition: main.position }}
              className="hero-zoom object-cover"
            />
          </div>
          {/* Lớp chuyển kem để chữ luôn dễ đọc trên ảnh (chỉ mobile/tablet) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-b from-cream/0 via-cream/45 via-45% to-cream to-80% lg:hidden"
          />

          <div
            className="hero-unveil absolute left-[4%] top-[9%] hidden aspect-square w-[26%] overflow-hidden rounded-full border-[6px] border-cream shadow-xl shadow-ink/15 lg:block"
            style={heroDelay(700)}
          >
            <Image
              src={ring.src}
              alt={ring.alt}
              fill
              placeholder="blur"
              sizes="200px"
              style={{ objectPosition: ring.position }}
              className="object-cover"
            />
          </div>

          <div
            className="hero-unveil absolute bottom-[10%] left-[14%] z-10 hidden aspect-[3/4] w-[36%] overflow-hidden border-[6px] border-cream shadow-2xl shadow-ink/20 lg:block"
            style={heroDelay(900)}
          >
            <Image
              src={studio.src}
              alt={studio.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1280px) 260px, 22vw"
              style={{ objectPosition: studio.position }}
              className="object-cover"
            />
          </div>

          {/* Thẻ thông tin nổi trên ảnh */}
          <div
            className="glass-panel hero-rise absolute bottom-[13%] right-[5%] z-10 hidden items-center gap-3 rounded-full border border-cream/60 py-2.5 pl-2.5 pr-5 shadow-lg shadow-ink/10 xl:flex"
            style={heroDelay(1100)}
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-accent text-ink">
              <HeartIcon filled className="size-4" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-lg font-medium text-ink">{site.name}</span>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-muted">
                Studio ảnh cưới · TP. {site.city}
              </span>
            </span>
          </div>

          <Sprig className="deco-float absolute right-[-6px] top-[1%] hidden w-14 text-accent lg:block xl:w-16" />
          <Sprig className="deco-float absolute bottom-[4%] left-0 hidden w-11 -scale-x-100 text-accent/80 lg:block" />
        </div>
      </div>
    </section>
  )
}
