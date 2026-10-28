'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState, useSyncExternalStore, type MouseEvent } from 'react'

import { ShortlistBadge } from '@/components/concept/ShortlistBadge'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { CloseIcon, MenuIcon, PhoneIcon } from '@/components/ui/icons'
import { navItems, sectionIds, site } from '@/data/site'
import { lockScroll } from '@/lib/scrollLock'
import { cn, heroDelay } from '@/lib/style'
import logo from '@/public/images/brand/logo-bacle.png'

// Vạch theo dõi ở 35% chiều cao màn hình: section nào có mép trên đã vượt qua vạch thì mục menu của nó active
const SPY_LINE = 0.35

function subscribeViewport(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  window.addEventListener('resize', onChange)
  return () => {
    window.removeEventListener('scroll', onChange)
    window.removeEventListener('resize', onChange)
  }
}

function getActiveSection(): string | null {
  const sections = navItems
    .map((item) => document.getElementById(item.sectionId))
    .filter((element): element is HTMLElement => element !== null)
  if (sections.length === 0) return null

  // Chạm đáy trang: section cuối có thể không bao giờ vượt vạch, nên active luôn mục cuối
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  if (atBottom) return sections[sections.length - 1].id

  const line = window.innerHeight * SPY_LINE
  let active = sections[0].id
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= line) active = section.id
  }
  return active
}

// Section đang xem trên trang chủ; trang khác (không có section) → null, không mục nào active
function useActiveSection() {
  return useSyncExternalStore(subscribeViewport, getActiveSection, () => null)
}

// Landing page một trang: bấm mục menu thì cuộn mượt tới section.
// Trang không có section đó (vd. 404) → để Link về trang chủ đúng #section như link bình thường.
function scrollToSection(event: MouseEvent<HTMLAnchorElement>, sectionId: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
  const target = document.getElementById(sectionId)
  if (!target) return

  event.preventDefault()
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  if (sectionId === sectionIds.home) window.scrollTo({ top: 0, behavior })
  else target.scrollIntoView({ behavior, block: 'start' })
  window.history.replaceState(null, '', sectionId === sectionIds.home ? '/' : `#${sectionId}`)
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
  const activeSection = useActiveSection()

  // Khoá cuộn nền và cho phép đóng bằng Esc khi menu mobile đang mở
  useEffect(() => {
    if (!menuOpen) return
    const unlockScroll = lockScroll()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      unlockScroll()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  // Đóng menu mobile (nếu đang mở) rồi cuộn tới section
  const goToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    closeMenu()
    scrollToSection(event, sectionId)
  }

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
            onClick={(event) => goToSection(event, sectionIds.home)}
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
                const active = activeSection === item.sectionId
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(event) => goToSection(event, item.sectionId)}
                      aria-current={active ? 'location' : undefined}
                      className={cn(
                        'group relative whitespace-nowrap py-2 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors',
                        active ? 'text-ink' : 'text-muted-foreground hover:text-ink',
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
            {/* <ShortlistBadge /> */}
            {/* bọc ngoài để ẩn trên mobile – ButtonLink luôn mang class inline-flex.
                Trạng thái hero (xl) ẩn nút này: hero đã có nút "Đặt lịch chụp", nhường chỗ cho menu */}
            <span className={cn('hidden sm:block', heroMode && 'xl:hidden')}>
              <ButtonLink
                href={`/#${sectionIds.contact}`}
                size="sm"
                onClick={(event) => goToSection(event, sectionIds.contact)}
              >
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
          // overscroll-contain: vuốt tới mép menu không kéo trang phía sau cuộn theo
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-cream lg:top-20 xl:hidden"
        >
          <nav aria-label="Menu" className="px-4 pb-10 pt-6 sm:px-6">
            <ul className="divide-y divide-line border-y border-line">
              {navItems.map((item, index) => {
                const active = activeSection === item.sectionId
                return (
                  <li key={item.href} className="hero-rise" style={heroDelay(index * 50)}>
                    <Link
                      href={item.href}
                      onClick={(event) => goToSection(event, item.sectionId)}
                      aria-current={active ? 'location' : undefined}
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
              <ButtonLink
                href={`/#${sectionIds.contact}`}
                className="w-full"
                onClick={(event) => goToSection(event, sectionIds.contact)}
              >
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
