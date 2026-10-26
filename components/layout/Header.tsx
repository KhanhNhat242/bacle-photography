'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

import { ShortlistBadge } from '@/components/concept/ShortlistBadge'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { CloseIcon, MenuIcon, PhoneIcon } from '@/components/ui/icons'
import { navItems, site } from '@/data/site'
import { cn, heroDelay } from '@/lib/style'
import logo from '@/public/images/brand/logo-bacle.png'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

// 'hero': đang ở đầu trang chủ – header trong suốt, menu nằm bên phải (trên panel kem của hero)
// 'top': đầu các trang khác · 'scrolled': đã cuộn – nền kính mờ, menu ở giữa
type HeaderMode = 'hero' | 'top' | 'scrolled'

const SCROLL_THRESHOLD = 12

function subscribeScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

function useHeaderMode(pathname: string): HeaderMode {
  const atTopMode: HeaderMode = pathname === '/' ? 'hero' : 'top'
  const getSnapshot = useCallback(
    (): HeaderMode => (window.scrollY > SCROLL_THRESHOLD ? 'scrolled' : atTopMode),
    [atTopMode],
  )
  return useSyncExternalStore(subscribeScroll, getSnapshot, () => atTopMode)
}

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const mode = useHeaderMode(pathname)
  const heroMode = mode === 'hero' && !menuOpen

  // Khoá cuộn nền và cho phép đóng bằng Esc khi menu mobile đang mở
  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a
        href="#noi-dung"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
      >
        Bỏ qua đến nội dung chính
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        {/* Nền kính mờ tách thành lớp riêng để mờ dần/hiện dần khi vào – rời trạng thái hero (từ lg) */}
        <div
          aria-hidden="true"
          className={cn(
            'glass-panel absolute inset-0 -z-10 border-b transition-[opacity,box-shadow,border-color] duration-500',
            mode === 'scrolled' || menuOpen ? 'border-line shadow-lg shadow-ink/5' : 'border-transparent',
            heroMode && 'lg:opacity-0',
          )}
        />
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link
            href="/"
            onClick={closeMenu}
            aria-label={`${site.name} – Trang chủ`}
            className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ink"
          >
            <Image src={logo} alt={site.name} loading="eager" className="h-9 w-auto lg:h-11" sizes="180px" />
          </Link>

          {/* Menu ngang từ 1280px – hẹp hơn thì 6 mục bị xuống dòng, dùng menu mobile.
              Trạng thái hero: căn trái thẳng lề chữ panel phải của hero (44vw + padding 4rem,
              trừ phần lề của khung max-w-7xl); khi cuộn: trượt về chính giữa. */}
          <nav
            aria-label="Điều hướng chính"
            className={cn(
              'absolute top-1/2 hidden -translate-y-1/2 transition-[left,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] xl:block',
              heroMode
                ? 'left-[calc(44vw_+_4rem_-_max(0px,(100vw_-_80rem)/2))] translate-x-0'
                : 'left-1/2 -translate-x-1/2',
            )}
          >
            <ul
              className={cn(
                'flex items-center transition-[gap] duration-700',
                heroMode ? 'gap-5 [&_a]:tracking-[0.12em]' : 'gap-9',
              )}
            >
              {navItems.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group relative whitespace-nowrap py-2 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors',
                        active ? 'text-ink' : 'text-muted hover:text-ink',
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500',
                          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                        )}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <ShortlistBadge />
            {/* bọc ngoài để ẩn trên mobile – ButtonLink luôn mang class inline-flex.
                Trạng thái hero (xl) ẩn nút này: hero đã có nút "Đặt lịch chụp", nhường chỗ cho menu */}
            <span className={cn('hidden sm:block', heroMode && 'xl:hidden')}>
              <ButtonLink href="/dat-lich" size="sm">
                Đặt lịch chụp
              </ButtonLink>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
              className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ivory focus-visible:outline-2 focus-visible:outline-accent-ink xl:hidden"
            >
              {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-cream lg:top-20 xl:hidden"
        >
          <nav aria-label="Menu" className="px-4 pb-10 pt-6 sm:px-6">
            <ul className="divide-y divide-line border-y border-line">
              {navItems.map((item, index) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href} className="hero-rise" style={heroDelay(index * 50)}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between py-4 font-serif text-[1.7rem] leading-none',
                        active ? 'text-accent-ink' : 'text-ink',
                      )}
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-sm text-accent">
                        0{index + 1}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="mt-8 grid gap-3">
              <ButtonLink href="/dat-lich" className="w-full">
                Đặt lịch chụp
              </ButtonLink>
              <ButtonLink href={`tel:${site.phoneE164}`} variant="outline" className="w-full">
                <PhoneIcon className="size-4" />
                {site.phoneDisplay}
              </ButtonLink>
            </div>
            <p className="mt-8 text-center font-script text-3xl text-accent-ink">{site.tagline}</p>
          </nav>
        </div>
      ) : null}
    </>
  )
}
