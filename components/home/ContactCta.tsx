import { BOOKING_FORM_ID } from '@/components/booking/bookingAnchor'
import { BookingForm } from '@/components/booking/BookingForm'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { MapPinIcon, PhoneIcon, ZaloIcon } from '@/components/ui/icons'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Sprig } from '@/components/ui/Sprig'
import { concepts } from '@/data/concepts'
import { packages } from '@/data/packages'
import { mapEmbedUrl, sectionIds, site } from '@/data/site'
import { formatPrice } from '@/lib/format'

const conceptOptions = concepts.map((concept) => ({ value: concept.slug, label: concept.name }))
// Giá chưa được khách xác nhận (isDemo) ghi kèm "giá tham khảo"
const packageOptions = packages.map((item) => ({
  value: item.id,
  label:
    item.price === null
      ? `${item.name} · Liên hệ`
      : `${item.name} · ${formatPrice(item.price)}${item.isDemo ? ' (giá tham khảo)' : ''}`,
}))

// Section 7 – CTA cuối trang: nền ngà phủ kín section, form đặt lịch trên thẻ nền kem.
// Desktop: cột trái lời mời + liên hệ nhanh + bản đồ, cột phải form đặt lịch (F08).
// Mobile: lời mời → form → bản đồ (đúng thứ tự DOM, desktop đặt lại vị trí bằng grid).
export function ContactCta() {
  return (
    // Nền ngà phủ kín cả section (không còn hộp viền bên trong); khoảng đệm do <Section> lo
    <Section id={sectionIds.contact} tone="ivory" aria-labelledby="cta-title">
      <div
        data-reveal="up"
        className="relative grid gap-y-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 xl:gap-x-20"
      >
        <Sprig className="deco-float absolute -right-2 -top-6 w-14 text-accent/70 lg:hidden" />

        <div className="relative lg:pt-6">
          <Eyebrow>Đặt lịch chụp</Eyebrow>
          <h2
            id="cta-title"
            className="mt-4 font-serif text-[2.15rem] font-medium leading-[1.12] text-balance text-ink sm:text-[2.6rem] lg:text-[3rem]"
          >
            Cùng BACLE ghi dấu ngày chung đôi của hai bạn
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed font-light text-pretty text-muted lg:text-base">
            Để lại thông tin, BACLE sẽ gọi lại tư vấn concept và lên lịch chụp phù hợp với hai bạn. Cần trao đổi
            ngay? Gọi hoặc nhắn Zalo nhé.
          </p>

          {/* items-start trên mobile: nút không kéo dài tới vùng cụm nút nổi bên phải */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={`tel:${site.phoneE164}`} variant="outline">
              <PhoneIcon className="size-4" />
              Gọi {site.phoneDisplay}
            </ButtonLink>
            <ButtonLink href={site.zaloUrl} variant="outline">
              <ZaloIcon className="size-5" />
              Nhắn Zalo
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {/* Đích cuộn của nút "Đặt lịch gói này"; scroll-mt chừa chỗ cho header cố định */}
          <div
            id={BOOKING_FORM_ID}
            className="scroll-mt-24 rounded-[1.5rem] border border-line bg-cream p-5 shadow-sm shadow-ink/5 sm:p-8"
          >
            <h3 className="font-serif text-[1.6rem] font-medium leading-tight text-ink sm:text-[1.85rem]">
              Gửi yêu cầu đặt lịch
            </h3>
            <p className="mt-2 mb-6 text-[14px] font-light text-muted">
              Đây là yêu cầu tư vấn – BACLE sẽ gọi lại để xác nhận lịch chụp với hai bạn.
            </p>
            <BookingForm conceptOptions={conceptOptions} packageOptions={packageOptions} />
          </div>
        </div>

        <div className="relative min-h-[260px] overflow-hidden rounded-[1.25rem] border border-accent/40 sm:min-h-[300px] lg:col-start-1 lg:row-start-2">
          <iframe
            title={`Bản đồ vị trí ${site.name}`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 saturate-[0.85]"
          />
        </div>
      </div>
    </Section>
  )
}
