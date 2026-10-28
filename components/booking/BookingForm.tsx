'use client'

import { DatePicker, Form, Input, Select } from 'antd'
import type { Dayjs } from 'dayjs'
import { useEffect, useState, useTransition } from 'react'

import { clearShortlist, useShortlist } from '@/components/concept/shortlist'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ArrowRightIcon, CheckIcon, ZaloIcon } from '@/components/ui/icons'
import { site } from '@/data/site'
import { submitBooking } from '@/lib/bookings/actions'
import {
  BOOKING_LIMITS,
  BOOKING_MESSAGES,
  TIME_SLOT_OPTIONS,
  isValidEmail,
  isValidPhone,
} from '@/lib/bookings/rules'
import type { BookingField, BookingInput } from '@/lib/bookings/types'

import { SELECT_PACKAGE_EVENT } from './bookingAnchor'

type Option = { value: string; label: string }

type BookingFormProps = {
  conceptOptions: Option[]
  packageOptions: Option[]
}

type FormValues = Omit<BookingInput, 'conceptSlug' | 'preferredDate' | 'weddingDate'> & {
  conceptSlug?: string
  preferredDate?: Dayjs
  weddingDate?: Dayjs
}

const DATE_FORMAT = 'DD/MM/YYYY'

// F08 – form gửi yêu cầu đặt lịch (dùng ở CTA trang chủ và trang /dat-lich).
// antd kiểm tra ở client cho trải nghiệm; Server Action submitBooking mới là nơi quyết định.
export function BookingForm({ conceptOptions, packageOptions }: BookingFormProps) {
  const [form] = Form.useForm<FormValues>()
  const [pending, startTransition] = useTransition()
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const { slugs } = useShortlist()

  // Điền sẵn concept đầu tiên trong shortlist F07, nếu khách chưa tự chọn trong form
  useEffect(() => {
    const first = slugs.find((slug) => conceptOptions.some((option) => option.value === slug))
    if (first && !form.isFieldTouched('conceptSlug')) form.setFieldValue('conceptSlug', first)
  }, [form, slugs, conceptOptions])

  // Nút "Đặt lịch gói này" (F05) trên cùng trang: chọn sẵn gói, mở lại form nếu đang ở màn hình cảm ơn
  useEffect(() => {
    const onSelectPackage = (event: Event) => {
      if (!(event instanceof CustomEvent) || typeof event.detail !== 'string') return
      const packageId = event.detail
      if (!packageOptions.some((option) => option.value === packageId)) return
      form.setFieldValue('packageId', packageId)
      setSubmitted(false)
    }
    window.addEventListener(SELECT_PACKAGE_EVENT, onSelectPackage)
    return () => window.removeEventListener(SELECT_PACKAGE_EVENT, onSelectPackage)
  }, [form, packageOptions])

  const onFinish = (values: FormValues) => {
    setFormError(null)
    startTransition(async () => {
      const result = await submitBooking({
        ...values,
        conceptSlug: values.conceptSlug ?? '',
        preferredDate: values.preferredDate?.format('YYYY-MM-DD') ?? '',
        weddingDate: values.weddingDate?.format('YYYY-MM-DD'),
      })
      if (result.ok) {
        clearShortlist()
        form.resetFields()
        setSubmitted(true)
        return
      }
      // Thất bại: giữ nguyên dữ liệu đã nhập, hiện lỗi theo từng trường
      form.setFields(
        Object.entries(result.errors).map(([name, error]) => ({ name: name as BookingField, errors: [error] })),
      )
      if (result.message) setFormError(result.message)
    })
  }

  return (
    <>
      {submitted ? (
        <div role="status" className="flex flex-col items-start py-6">
          <span className="flex size-12 items-center justify-center rounded-full bg-accent text-ink">
            <CheckIcon className="size-6" />
          </span>
          <h3 className="mt-5 font-serif text-[1.75rem] font-medium leading-tight text-ink">Đã nhận yêu cầu</h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed font-light text-muted-foreground">
            Cảm ơn hai bạn! BACLE sẽ liên hệ trong thời gian sớm nhất để tư vấn và xác nhận lịch chụp.
          </p>
          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={site.zaloUrl}>
              <ZaloIcon className="size-5" />
              Nhắn Zalo ngay
            </ButtonLink>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="h-11 px-2 text-[13px] text-ink underline decoration-accent underline-offset-4 transition-colors hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              Gửi thêm yêu cầu khác
            </button>
          </div>
        </div>
      ) : null}

      {/* Form luôn được giữ trong cây (chỉ ẩn khi gửi xong) để nút chọn gói vẫn điền được giá trị */}
      <div hidden={submitted}>
        <Form<FormValues>
          form={form}
          layout="vertical"
          requiredMark="optional"
          onFinish={onFinish}
          disabled={pending}
          scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
          className="relative grid gap-x-4 sm:grid-cols-2"
        >
          {/* Honeypot: ẩn khỏi người dùng và trình đọc màn hình, bot điền vào thì bị bỏ qua */}
          <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
            <Form.Item name="website" noStyle>
              <Input tabIndex={-1} autoComplete="off" />
            </Form.Item>
          </div>

          <Form.Item
            name="fullName"
            label="Họ tên"
            rules={[
              { required: true, whitespace: true, message: BOOKING_MESSAGES.fullNameRequired },
              { min: BOOKING_LIMITS.nameMin, max: BOOKING_LIMITS.nameMax, message: BOOKING_MESSAGES.fullNameLength },
            ]}
          >
            <Input autoComplete="name" placeholder="Tên của bạn" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại / Zalo"
            validateTrigger="onBlur"
            rules={[
              { required: true, whitespace: true, message: BOOKING_MESSAGES.phoneRequired },
              {
                validator: (_, value?: string) =>
                  !value || isValidPhone(value) ? Promise.resolve() : Promise.reject(new Error(BOOKING_MESSAGES.phoneInvalid)),
              },
            ]}
          >
            <Input type="tel" inputMode="tel" autoComplete="tel" placeholder={site.phoneDisplay} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            className="sm:col-span-2"
            validateTrigger="onBlur"
            rules={[
              {
                validator: (_, value?: string) =>
                  !value?.trim() || isValidEmail(value.trim())
                    ? Promise.resolve()
                    : Promise.reject(new Error(BOOKING_MESSAGES.emailInvalid)),
              },
            ]}
          >
            <Input type="email" inputMode="email" autoComplete="email" placeholder="ban@email.com" />
          </Form.Item>

          <Form.Item
            name="conceptSlug"
            label="Concept muốn chụp"
            className="sm:col-span-2"
            rules={[{ required: true, message: BOOKING_MESSAGES.conceptRequired }]}
          >
            <Select options={conceptOptions} placeholder="Chọn một concept" />
          </Form.Item>

          <Form.Item name="packageId" label="Gói dịch vụ" className="sm:col-span-2">
            <Select options={packageOptions} placeholder="Chưa chọn – BACLE sẽ tư vấn" allowClear />
          </Form.Item>

          <Form.Item
            name="preferredDate"
            label="Ngày chụp mong muốn"
            rules={[{ required: true, message: BOOKING_MESSAGES.preferredDateRequired }]}
          >
            <DatePicker
              format={DATE_FORMAT}
              placeholder="Chọn ngày"
              inputReadOnly
              disabledDate={(current) => current.isBefore(new Date(), 'day')}
              className="w-full"
            />
          </Form.Item>

          <Form.Item name="timeSlot" label="Buổi chụp">
            <Select options={TIME_SLOT_OPTIONS} placeholder="Chọn buổi" allowClear />
          </Form.Item>

          <Form.Item name="weddingDate" label="Ngày cưới dự kiến" className="sm:col-span-2">
            <DatePicker format={DATE_FORMAT} placeholder="Chọn ngày" inputReadOnly className="w-full" />
          </Form.Item>

          <Form.Item
            name="note"
            label="Ghi chú"
            className="sm:col-span-2"
            rules={[{ max: BOOKING_LIMITS.noteMax, message: BOOKING_MESSAGES.noteLength }]}
          >
            <Input.TextArea
              rows={3}
              maxLength={BOOKING_LIMITS.noteMax}
              showCount
              placeholder="Phong cách hai bạn yêu thích, địa điểm mong muốn…"
            />
          </Form.Item>

          <div className="mt-2 flex flex-col items-center gap-3 sm:col-span-2">
            {formError ? (
              <p role="alert" className="text-[14px] text-ink">
                {formError}
              </p>
            ) : null}
            {/* không kéo hết bề ngang: tránh vùng cụm nút nổi F10 ở góc phải trên mobile */}
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-7 text-[13px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink disabled:cursor-wait disabled:opacity-70"
            >
              {pending ? 'Đang gửi…' : 'Gửi yêu cầu đặt lịch'}
              <ArrowRightIcon className="size-4" />
            </button>
          </div>
        </Form>
      </div>
    </>
  )
}
