import { ButtonLink } from '@/components/ui/ButtonLink'
import { ArrowRightIcon, MapPinIcon, PhoneIcon, ZaloIcon } from '@/components/ui/icons'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Sprig } from '@/components/ui/Sprig'
import { mapEmbedUrl, site } from '@/data/site'
import { revealDelay } from '@/lib/style'

// Section 7 – CTA cuối trang & liên hệ: hộp bo góc nền ngà viền champagne, chữ trái – bản đồ phải
export function ContactCta() {
  return (
    <Section aria-labelledby="cta-title">
      <div
        data-reveal="up"
        className="relative grid overflow-hidden rounded-[1.75rem] border border-accent bg-ivory lg:grid-cols-2"
      >
        <Sprig className="deco-float absolute -right-2 top-4 w-14 text-accent/70 lg:hidden" />

        <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <Eyebrow>Đặt lịch chụp</Eyebrow>
          <h2
            id="cta-title"
            className="mt-4 font-serif text-[2.15rem] font-medium leading-[1.12] text-balance text-ink sm:text-[2.6rem] lg:text-[3rem]"
          >
            Cùng BACLE ghi dấu ngày chung đôi của hai bạn
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed font-light text-pretty text-muted lg:text-base">
            Gửi yêu cầu đặt lịch hoặc nhắn tin ngay để nhận tư vấn concept phù hợp nhất.
          </p>

          {/* items-start trên mobile: nút không kéo dài tới vùng cụm nút nổi bên phải */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/dat-lich">
              Đặt lịch chụp ngay
              <ArrowRightIcon className="size-4" />
            </ButtonLink>
            <ButtonLink href={`tel:${site.phoneE164}`} variant="outline">
              <PhoneIcon className="size-4" />
              Gọi {site.phoneDisplay}
            </ButtonLink>
            <ButtonLink href={site.zaloUrl} variant="outline">
              <ZaloIcon className="size-5" />
              Nhắn Zalo
            </ButtonLink>
          </div>

          <p className="mt-8 flex items-center gap-2 text-[14px] font-light text-muted">
            <MapPinIcon className="size-4 shrink-0 text-accent-ink" />
            {site.address ?? `TP. ${site.city}`}
            <span aria-hidden="true">·</span>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-accent underline-offset-4 transition-colors hover:text-accent-ink"
            >
              Chỉ đường
            </a>
          </p>
        </div>

        <div
          data-reveal="up"
          style={revealDelay(200)}
          className="relative min-h-[320px] border-t border-accent/40 sm:min-h-[380px] lg:min-h-full lg:border-l lg:border-t-0"
        >
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
