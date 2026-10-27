import { concepts } from '@/data/concepts'
import { packages } from '@/data/packages'

import {
  BOOKING_LIMITS,
  BOOKING_MESSAGES,
  isValidEmail,
  isValidIsoDate,
  isValidPhone,
  normalizePhone,
} from './rules'
import { TIME_SLOTS, type BookingFieldErrors, type NewBooking } from './types'

export type BookingValidation = { ok: true; data: NewBooking } | { ok: false; errors: BookingFieldErrors }

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function isOneOf<T extends string>(options: readonly T[], value: string): value is T {
  return (options as readonly string[]).includes(value)
}

// Ngày hiện tại theo giờ Việt Nam, dạng YYYY-MM-DD (so sánh chuỗi được)
function todayInVietnam() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date())
}

// Kiểm tra ở server – nơi quyết định cuối cùng (client chỉ để trải nghiệm)
export function validateBooking(raw: unknown): BookingValidation {
  const input: Record<string, unknown> = typeof raw === 'object' && raw !== null ? { ...raw } : {}
  const errors: BookingFieldErrors = {}

  const fullName = text(input.fullName).replace(/\s+/g, ' ')
  if (!fullName) errors.fullName = BOOKING_MESSAGES.fullNameRequired
  else if (fullName.length < BOOKING_LIMITS.nameMin || fullName.length > BOOKING_LIMITS.nameMax)
    errors.fullName = BOOKING_MESSAGES.fullNameLength

  const phone = text(input.phone)
  if (!phone) errors.phone = BOOKING_MESSAGES.phoneRequired
  else if (!isValidPhone(phone)) errors.phone = BOOKING_MESSAGES.phoneInvalid

  const email = text(input.email)
  if (email && !isValidEmail(email)) errors.email = BOOKING_MESSAGES.emailInvalid

  const conceptSlug = text(input.conceptSlug)
  if (!conceptSlug) errors.conceptSlug = BOOKING_MESSAGES.conceptRequired
  else if (!concepts.some((concept) => concept.slug === conceptSlug)) errors.conceptSlug = BOOKING_MESSAGES.conceptUnknown

  const packageId = text(input.packageId)
  if (packageId && !packages.some((item) => item.id === packageId)) errors.packageId = BOOKING_MESSAGES.packageUnknown

  const preferredDate = text(input.preferredDate)
  if (!preferredDate) errors.preferredDate = BOOKING_MESSAGES.preferredDateRequired
  else if (!isValidIsoDate(preferredDate)) errors.preferredDate = BOOKING_MESSAGES.dateInvalid
  else if (preferredDate < todayInVietnam()) errors.preferredDate = BOOKING_MESSAGES.preferredDatePast

  const timeSlot = text(input.timeSlot)
  if (timeSlot && !isOneOf(TIME_SLOTS, timeSlot)) errors.timeSlot = BOOKING_MESSAGES.optionInvalid

  const weddingDate = text(input.weddingDate)
  if (weddingDate && !isValidIsoDate(weddingDate)) errors.weddingDate = BOOKING_MESSAGES.dateInvalid

  const note = text(input.note)
  if (note.length > BOOKING_LIMITS.noteMax) errors.note = BOOKING_MESSAGES.noteLength

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  return {
    ok: true,
    data: {
      fullName,
      phone: normalizePhone(phone),
      email: email || undefined,
      conceptSlug,
      packageId: packageId || undefined,
      preferredDate,
      timeSlot: isOneOf(TIME_SLOTS, timeSlot) ? timeSlot : undefined,
      weddingDate: weddingDate || undefined,
      note: note || undefined,
    },
  }
}
