import Link from 'next/link'
import type { MouseEventHandler, ReactNode } from 'react'

import { cn } from '@/lib/style'

type Variant = 'primary' | 'outline' | 'outline-light' | 'ghost'
type Size = 'md' | 'sm'

const variants: Record<Variant, string> = {
  // nền champagne + chữ ink: đạt tương phản AA (chữ trắng trên champagne thì không)
  primary: 'bg-accent text-ink hover:bg-ink hover:text-cream',
  outline: 'border border-ink/70 text-ink hover:border-ink hover:bg-ink hover:text-cream',
  // dùng trên nền tối (thẻ ink)
  'outline-light': 'border border-cream/50 text-cream hover:border-cream hover:bg-cream hover:text-ink',
  ghost: 'text-ink hover:text-accent-ink',
}

const sizes: Record<Size, string> = {
  md: 'h-12 px-5 text-[12px] tracking-[0.14em] sm:px-7 sm:text-[13px] sm:tracking-[0.16em]',
  sm: 'h-10 px-5 text-[12px] tracking-[0.14em]',
}

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant?: Variant
  size?: Size
  external?: boolean
  className?: string
  'aria-label'?: string
  // chỉ truyền được từ Client Component (vd. BookPackageButton)
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  external = false,
  className,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium uppercase transition-colors duration-300',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink',
    variants[variant],
    sizes[size],
    className,
  )

  // tel:, Zalo, Messenger… không đi qua router của Next
  if (external || !href.startsWith('/')) {
    const opensNewTab = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  )
}
