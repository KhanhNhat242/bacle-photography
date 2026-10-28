import type { CSSProperties } from 'react'

import SpotlightCard from '@/components/SpotlightCard'
import { CheckIcon } from '@/components/ui/icons'
import { TiltCard } from '@/components/ui/TiltCard'
import type { Package } from '@/data/packages'
import { formatPrice, noOrphan } from '@/lib/format'
import { cn, revealDelay } from '@/lib/style'

import { BookPackageButton } from './BookPackageButton'

type PackageCardProps = { pkg: Package; index?: number }

// Thẻ nền ink + spotlight kem theo con trỏ. Trên nền tối, chữ nhấn dùng `accent` (champagne sáng)
// thay cho `accent-ink` – accent-ink chỉ đạt tương phản trên nền sáng.
const cardSurface = {
  '--spotlight-card-surface': 'var(--ink)',
  '--spotlight-card-border': 'color-mix(in srgb, var(--cream) 12%, transparent)',
  '--spotlight-card-shadow': '0 24px 48px -24px color-mix(in srgb, var(--ink) 60%, transparent)',
} as CSSProperties

const highlightedSurface = {
  ...cardSurface,
  '--spotlight-card-border': 'var(--accent)',
} as CSSProperties

export function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  return (
    <div data-reveal="up" style={revealDelay(index * 140)} className={cn('flex', pkg.highlighted && 'md:-my-4')}>
      {/* Hover: thẻ nghiêng theo con trỏ và đung đưa nhẹ khi rời ra (theo HoloCard) */}
      <TiltCard tiltMax={14} hoverScale={1.04} className="flex w-full">
        <SpotlightCard
          theme="dark"
          spotlightColor="var(--cream)"
          intensity={0.15}
          spotlightSize={240}
          softness={0.7}
          shape="circle"
          borderGlow={0.6}
          proximity={80}
          smoothing={0.3}
          grain={0}
          ambient={false}
          flare
          style={pkg.highlighted ? highlightedSurface : cardSurface}
          className={cn('flex w-full flex-col p-7! sm:p-8! lg:p-9!', pkg.highlighted && 'md:py-12!')}
        >
          <article className="flex flex-1 flex-col">
            {pkg.highlighted ? (
              <span className="mb-5 self-start rounded-full bg-accent px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] whitespace-nowrap text-ink">
                Nổi bật
              </span>
            ) : null}

            <h3 className="font-serif text-[1.75rem] font-medium leading-tight text-cream">{noOrphan(pkg.name)}</h3>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.24em] text-accent">
              {pkg.price !== null ? 'Giá tham khảo' : 'Liên hệ báo giá'}
            </p>
            <p className="mt-5 font-serif text-cream">
              {pkg.price !== null ? (
                <>
                  <span className="mr-2 text-base text-cream/60">Từ</span>
                  <span className="text-[2.6rem] leading-none font-medium">{formatPrice(pkg.price)}</span>
                </>
              ) : (
                <span className="text-[2.6rem] leading-none font-medium">Liên hệ</span>
              )}
            </p>

            <hr className="my-7 border-cream/15" />

            <ul className="flex-1 space-y-3.5">
              {pkg.includes.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-snug font-light text-cream/75">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                  {noOrphan(item)}
                </li>
              ))}
            </ul>

            <BookPackageButton
              packageId={pkg.id}
              variant={pkg.highlighted ? 'primary' : 'outline-light'}
              className="mt-9 w-full"
            >
              Đặt lịch gói này
            </BookPackageButton>
          </article>
        </SpotlightCard>
      </TiltCard>
    </div>
  )
}
