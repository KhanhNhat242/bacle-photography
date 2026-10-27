import Image from 'next/image'
import Link from 'next/link'

import { FacebookIcon, MapPinIcon, MessengerIcon, PhoneIcon, ZaloIcon } from '@/components/ui/icons'
import { navItems, site } from '@/data/site'
import { noOrphan } from '@/lib/format'
import { cn } from '@/lib/style'
import logo from '@/public/images/brand/logo-bacle.png'

const linkClass =
  'inline-flex items-center gap-3 text-[15px] font-light text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-accent-ink'

export function Footer() {
  return (
    <footer className="border-t border-line bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-14 md:grid-cols-12 md:gap-8 lg:py-16">
          <div className="md:col-span-5">
            <Image src={logo} alt={site.name} className="h-12 w-auto" sizes="200px" />
            <p className="mt-5 font-script text-3xl text-accent-ink">{site.tagline}</p>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed font-light text-muted">
              Studio chụp ảnh cưới tại TP. {site.city} – lưu giữ câu chuyện tình yêu của hai bạn.
            </p>
          </div>

          <nav aria-label="Liên kết chân trang" className="md:col-span-3">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent-ink">Khám phá</h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent-ink">Liên hệ</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`tel:${site.phoneE164}`} className={linkClass}>
                  <PhoneIcon className="size-4 text-accent-ink" />
                  Hotline
                </a>
              </li>
              <li>
                <a href={site.zaloUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <ZaloIcon className="size-4 text-accent-ink" />
                  Zalo
                </a>
              </li>
              <li>
                <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <FacebookIcon className="size-4 text-accent-ink" />
                  Facebook
                </a>
              </li>
              <li>
                <a href={site.messengerUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <MessengerIcon className="size-4 text-accent-ink" />
                  Messenger
                </a>
              </li>
              <li>
                {/* items-start: địa chỉ dài xuống dòng thì icon vẫn thẳng dòng đầu.
                    "· Chỉ đường" luôn đi liền một cụm – không để chữ "đường" rớt lẻ xuống dòng */}
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={cn(linkClass, 'items-start')}>
                  <MapPinIcon className="mt-1 size-4 shrink-0 text-accent-ink" />
                  <span>
                    {noOrphan(site.address ?? `TP. ${site.city}`)}{' '}
                    <span className="whitespace-nowrap">· Chỉ đường</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 pb-24 text-[13px] font-light text-muted sm:flex-row sm:items-center sm:justify-between sm:pb-6 sm:pr-20">
          <p>© {site.name}</p>
          <p>Chụp ảnh cưới · TP. {site.city}</p>
        </div>
      </div>
    </footer>
  )
}
