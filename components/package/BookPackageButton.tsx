'use client'

import type { ComponentProps, MouseEvent, ReactNode } from 'react'

import { BOOKING_FORM_ID, SELECT_PACKAGE_EVENT } from '@/components/booking/bookingAnchor'
import { ButtonLink } from '@/components/ui/ButtonLink'

type BookPackageButtonProps = {
  packageId: string
  variant?: ComponentProps<typeof ButtonLink>['variant']
  className?: string
  children: ReactNode
}

// Trang có form đặt lịch (trang chủ): cuộn xuống form và chọn sẵn gói.
// Trang không có form: giữ hành vi link thường tới /dat-lich?package=<id>.
export function BookPackageButton({ packageId, variant, className, children }: BookPackageButtonProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Ctrl/⌘/Shift + click: để trình duyệt mở tab mới như link bình thường
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    const form = document.getElementById(BOOKING_FORM_ID)
    if (!form) return

    event.preventDefault()
    window.dispatchEvent(new CustomEvent<string>(SELECT_PACKAGE_EVENT, { detail: packageId }))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <ButtonLink href={`/dat-lich?package=${packageId}`} variant={variant} className={className} onClick={onClick}>
      {children}
    </ButtonLink>
  )
}
