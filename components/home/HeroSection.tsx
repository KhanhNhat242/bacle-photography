import Image from 'next/image'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { MetallicSwirl } from '@/components/home/MetallicSwirl'
import { CameraIcon, SparkleIcon } from '@/components/ui/icons'
import { Sprig } from '@/components/ui/Sprig'
import { photos } from '@/data/photos'
import { sectionIds, site } from '@/data/site'
import { heroDelay } from '@/lib/style'

const main = photos.sunlitLaugh
const thumb = photos.studioWarmHug

const highlights = [
  {
    icon: SparkleIcon,
    title: 'Tự nhiên & tinh tế',
    description: 'Ánh sáng mềm, bố cục tối giản để cảm xúc thật của hai bạn lên tiếng.',
  },
  {
    icon: CameraIcon,
    title: 'Concept riêng cho bạn',
    description: 'Chọn tối đa 3 concept yêu thích để BACLE tư vấn kỹ hơn.',
  },
]

// Section 1 – Hero: vừa đúng một màn hình.
// Mobile/tablet: ảnh phủ toàn màn hình, chữ nằm trên lớp chuyển màu kem phía dưới.
// Desktop (lg): chia đôi – ảnh tràn mép bên trái (44%), panel bên phải chứa chữ trên nền kim loại lỏng
// xoáy (MetallicSwirl, WebGL – chỉ desktop vì mobile ảnh đã phủ kín màn hình);
// đáy panel có ảnh nhỏ vắt qua mép giữa hai nửa và 2 điểm nhấn.
// --hero-thumb: cỡ ảnh nhỏ co theo chiều cao màn hình để hero luôn vừa một màn hình.
export function HeroSection() {
  return (
    <section
      id={sectionIds.home}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-cream [--hero-thumb:clamp(8rem,21vh,11rem)] lg:h-svh lg:max-h-[1000px] lg:min-h-[660px]"
    >
      {/* Ảnh chính */}
      <div className="absolute inset-0 -z-10 overflow-hidden lg:right-auto lg:z-0 lg:w-[44%]">
        <Image
          src={main.src}
          alt={main.alt}
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 1024px) 44vw, 100vw"
          style={{ objectPosition: main.position }}
          className="hero-zoom object-cover"
        />
        {/* Lớp kem mờ phía trên để logo trên header đọc rõ khi nằm đè lên ảnh */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 hidden h-36 bg-gradient-to-b from-cream/75 to-cream/0 lg:block"
        />
        {/* Chữ chìm lớn ở góc dưới ảnh */}
        <p
          aria-hidden="true"
          className="hero-rise pointer-events-none absolute -bottom-[0.02em] left-5 hidden select-none font-serif text-[clamp(6rem,10vw,10rem)] leading-none tracking-[0.06em] text-cream/50 uppercase lg:block xl:left-8"
          style={heroDelay(700)}
        >
          Bacle
        </p>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 left-[44%] -z-10 hidden bg-linear-to-r from-cream/80 via-cream/45 via-55% to-cream/0 lg:block"
      />
      {/* Đáy panel tan về kem để nối liền với mép trên của Intro (cũng tan từ kem) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 left-[44%] -z-10 hidden h-40 bg-linear-to-t from-cream to-cream/0 lg:block"
      />

      {/* Lớp chuyển kem để chữ luôn dễ đọc trên ảnh (chỉ mobile/tablet) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-cream/0 via-cream/45 via-45% to-cream to-80% lg:hidden"
      />

      {/* Panel nội dung: mobile nằm dưới đáy ảnh, desktop là nửa phải */}
      <div className="relative flex min-h-svh flex-col px-4 pt-16 sm:px-6 lg:ml-[44%] lg:h-full lg:min-h-0 lg:px-14 lg:pt-20 xl:px-16">
        <div className="flex flex-1 flex-col justify-end pb-24 sm:pb-28 lg:justify-center lg:py-6">
          <p className="hero-rise flex items-center gap-3 text-accent-ink" style={heroDelay(150)}>
            <span aria-hidden="true" className="h-px w-10 bg-accent" />
            <span className="font-script text-[2rem] leading-none max-lg:short:text-[1.7rem] lg:text-[2.4rem]">
              {site.tagline}
            </span>
          </p>
          <h1
            id="hero-title"
            className="hero-rise mt-4 max-w-2xl font-serif text-[2.65rem] font-medium leading-[1.04] text-balance text-ink max-lg:short:text-[2.25rem] sm:text-[3.4rem] lg:mt-5 lg:text-[clamp(2.8rem,min(4.4vw,7.4vh),4.6rem)]"
            style={heroDelay(280)}
          >
            Lưu giữ trọn vẹn khoảnh khắc ngày <em className="font-normal text-accent-ink">chung đôi</em>
          </h1>
          <p
            className="hero-rise mt-5 max-w-md text-[15px] leading-relaxed font-light text-pretty text-ink/80 sm:text-base lg:mt-6 lg:pb-15 lg:text-lg lg:text-muted-foreground"
            style={heroDelay(420)}
          >
            Ghi lại câu chuyện tình yêu của hai bạn bằng những khung hình tự nhiên và tinh tế nhất.
          </p>
        </div>
      </div>

      {/* Ảnh nhỏ vắt qua mép giữa ảnh chính và panel */}
      <div
        className="hero-unveil absolute bottom-10 left-[44%] z-10 hidden aspect-[4/5] w-(--hero-thumb) -translate-x-1/2 overflow-hidden border-[6px] border-cream shadow-2xl shadow-ink/20 lg:block"
        style={heroDelay(800)}
      >
        <Image
          src={thumb.src}
          alt={thumb.alt}
          fill
          placeholder="blur"
          sizes="180px"
          style={{ objectPosition: thumb.position }}
          className="object-cover"
        />
      </div>

      <Sprig className="deco-float absolute right-6 top-24 hidden w-12 text-accent/80 lg:block xl:right-10 xl:w-14" />
    </section>
  )
}
