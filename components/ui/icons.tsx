import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Stroke>
  )
}

export function PhoneIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </Stroke>
  )
}

export function HeartIcon({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <Stroke fill={filled ? 'currentColor' : 'none'} {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Stroke>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Stroke>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Stroke>
  )
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="m15 18-6-6 6-6" />
    </Stroke>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="m9 18 6-6-6-6" />
    </Stroke>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M4 8h16M4 16h16" />
    </Stroke>
  )
}

export function MapPinIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </Stroke>
  )
}

export function ExpandIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </Stroke>
  )
}

export function MessengerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.35.27.57l.05 1.78c.02.57.6.94 1.12.71l1.99-.88c.17-.07.36-.09.54-.04.91.25 1.88.39 2.89.39 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm6 7.46-2.93 4.67c-.47.74-1.47.93-2.17.4l-2.33-1.75a.6.6 0 0 0-.72 0l-3.15 2.4c-.42.32-.97-.18-.69-.63l2.93-4.67c.47-.74 1.47-.93 2.17-.4l2.33 1.75a.6.6 0 0 0 .72 0l3.15-2.4c.42-.32.97.18.69.63z" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 9h3V5h-3c-2.76 0-5 2.24-5 5v2H6v4h3v8h4v-8h3l1-4h-4v-2c0-.55.45-1 1-1z" />
    </svg>
  )
}

// Chữ "Zalo" trong bong bóng chat – gợi nhận diện ứng dụng mà vẫn giữ tông màu thương hiệu
export function ZaloIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3C6.75 3 2.5 6.58 2.5 11c0 2.4 1.25 4.55 3.24 6.02L5 20.5l3.66-1.86c1.04.31 2.16.48 3.34.48 5.25 0 9.5-3.58 9.5-8S17.25 3 12 3z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <text
        x="12"
        y="13.4"
        textAnchor="middle"
        fontSize="6.2"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fill="currentColor"
      >
        Zalo
      </text>
    </svg>
  )
}
