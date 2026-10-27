import { CheckIcon } from '@/components/ui/icons'
import type { Package } from '@/data/packages'
import { formatPrice, noOrphan } from '@/lib/format'
import { cn, revealDelay } from '@/lib/style'

import { BookPackageButton } from './BookPackageButton'

type PackageCardProps = { pkg: Package; index?: number }

export function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  return (
    <article
      data-reveal="up"
      style={revealDelay(index * 140)}
      className={cn(
        'relative flex flex-col rounded-sm border bg-cream p-7 sm:p-8 lg:p-9',
        pkg.highlighted ? 'border-accent shadow-2xl shadow-accent/20 md:-my-4 md:py-12' : 'border-line',
      )}
    >
      {pkg.highlighted ? (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] whitespace-nowrap text-ink">
          Nổi bật
        </span>
      ) : null}

      <h3 className="font-serif text-[1.75rem] font-medium leading-tight text-ink">{noOrphan(pkg.name)}</h3>
      <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.24em] text-accent-ink">
        {pkg.price !== null ? 'Giá tham khảo' : 'Liên hệ báo giá'}
      </p>
      <p className="mt-5 font-serif text-ink">
        {pkg.price !== null ? (
          <>
            <span className="mr-2 text-base text-muted">Từ</span>
            <span className="text-[2.6rem] leading-none font-medium">{formatPrice(pkg.price)}</span>
          </>
        ) : (
          <span className="text-[2.6rem] leading-none font-medium">Liên hệ</span>
        )}
      </p>

      <hr className="my-7 border-line" />

      <ul className="flex-1 space-y-3.5">
        {pkg.includes.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-snug font-light text-muted">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent-ink" />
            {noOrphan(item)}
          </li>
        ))}
      </ul>

      <BookPackageButton
        packageId={pkg.id}
        variant={pkg.highlighted ? 'primary' : 'outline'}
        className="mt-9 w-full"
      >
        Đặt lịch gói này
      </BookPackageButton>
    </article>
  )
}
