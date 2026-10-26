import { cn } from '@/lib/style'

// Nhành lá vẽ nét mảnh – chi tiết trang trí, dùng kèm .deco-float
export function Sprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 220"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
    >
      <path d="M60 216C58 172 66 122 60 72C56 42 62 22 72 6" />
      <path d="M60 182C40 174 28 160 25 141C44 147 56 161 60 182Z" />
      <path d="M59 181C49 168 37 155 25 141" opacity={0.55} />
      <path d="M61 152C80 144 92 130 95 111C76 117 64 131 61 152Z" />
      <path d="M62 151C72 138 84 124 95 111" opacity={0.55} />
      <path d="M60 122C42 114 32 100 29 83C46 89 57 102 60 122Z" />
      <path d="M59 121C50 109 39 96 29 83" opacity={0.55} />
      <path d="M60 94C76 86 86 74 89 57C73 63 62 75 60 94Z" />
      <path d="M61 93C69 81 79 69 89 57" opacity={0.55} />
      <path d="M62 64C50 56 44 45 44 33C55 39 61 49 62 64Z" />
      <circle cx="72" cy="6" r="2.4" />
      <circle cx="80" cy="16" r="1.6" />
    </svg>
  )
}
