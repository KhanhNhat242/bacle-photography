import { MessengerIcon, PhoneIcon, ZaloIcon } from '@/components/ui/icons'
import { site } from '@/data/site'

const itemClass =
  'relative flex size-12 items-center justify-center rounded-full shadow-lg shadow-ink/15 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink'

// F10 – cụm nút liên hệ nổi ở góc dưới bên phải trên mọi trang công khai
export function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={site.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn tin Zalo cho BACLE"
        className={`${itemClass} glass-panel border border-line text-ink`}
      >
        <ZaloIcon className="size-7" />
      </a>
      <a
        href={site.messengerUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn tin Messenger cho BACLE"
        className={`${itemClass} glass-panel border border-line text-ink`}
      >
        <MessengerIcon className="size-6" />
      </a>
      <a
        href={`tel:${site.phoneE164}`}
        aria-label={`Gọi BACLE theo số ${site.phoneDisplay}`}
        className={`${itemClass} pulse-ring bg-accent text-ink`}
      >
        <PhoneIcon className="size-5" />
      </a>
    </div>
  )
}
