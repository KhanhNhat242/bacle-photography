'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Gắn class .is-revealed cho các phần tử [data-reveal] khi cuộn tới (CSS nằm trong globals.css).
// Chỉ ẩn lại khi phần tử rơi xuống DƯỚI màn hình – cuộn ngược lên rồi xuống sẽ thấy hiệu ứng lần nữa,
// còn phần tử đã đi qua phía trên thì giữ nguyên để không nhấp nháy.
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
          } else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('is-revealed')
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
