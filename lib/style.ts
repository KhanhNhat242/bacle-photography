import type { CSSProperties } from 'react'

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

// Độ trễ cho hiệu ứng data-reveal (đọc bởi biến --reveal-delay trong globals.css)
export function revealDelay(ms: number) {
  return { '--reveal-delay': `${ms}ms` } as CSSProperties
}

// Độ trễ cho hiệu ứng tải trang của hero (.hero-rise, .hero-unveil)
export function heroDelay(ms: number) {
  return { '--hero-delay': `${ms}ms` } as CSSProperties
}
