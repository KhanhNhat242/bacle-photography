import type { TimeSlot } from './types'

// Quy tắc kiểm tra form đặt lịch (bảng trường F08) – định nghĩa một lần,
// dùng chung cho antd Form ở client và validation.ts ở server. Không import dữ liệu/Node ở đây.

export const BOOKING_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 120,
  noteMax: 1000,
} as const

export const BOOKING_MESSAGES = {
  fullNameRequired: 'Bạn vui lòng cho BACLE biết tên người liên hệ',
  fullNameLength: `Họ tên cần từ ${BOOKING_LIMITS.nameMin} đến ${BOOKING_LIMITS.nameMax} ký tự`,
  phoneRequired: 'Bạn vui lòng nhập số điện thoại hoặc Zalo',
  phoneInvalid: 'Số điện thoại chưa đúng (ví dụ: 093 522 14 63)',
  emailInvalid: 'Email chưa đúng định dạng',
  conceptRequired: 'Bạn chọn concept muốn chụp nhé',
  conceptUnknown: 'Concept đã chọn không còn trong danh sách',
  packageUnknown: 'Gói dịch vụ không còn trong danh sách',
  preferredDateRequired: 'Bạn chọn ngày muốn chụp nhé',
  preferredDatePast: 'Ngày chụp không được trước hôm nay',
  dateInvalid: 'Ngày chưa đúng định dạng',
  optionInvalid: 'Lựa chọn không hợp lệ',
  noteLength: `Ghi chú tối đa ${BOOKING_LIMITS.noteMax} ký tự`,
} as const

export const TIME_SLOT_OPTIONS: { value: TimeSlot; label: string }[] = [
  { value: 'sang', label: 'Buổi sáng' },
  { value: 'chieu', label: 'Buổi chiều' },
  { value: 'ca_ngay', label: 'Cả ngày' },
]

// SĐT Việt Nam: 0 + 9 số hoặc +84 + 9 số, cho phép dấu cách/chấm
const PHONE_PATTERN = /^(0|\+84)\d{9}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

function compactPhone(value: string) {
  return value.replace(/[\s.]/g, '')
}

export function isValidPhone(value: string) {
  return PHONE_PATTERN.test(compactPhone(value))
}

// "093 522 14 63" → "+84935221463"
export function normalizePhone(value: string) {
  const compact = compactPhone(value)
  return compact.startsWith('0') ? `+84${compact.slice(1)}` : compact
}

export function isValidEmail(value: string) {
  return value.length <= BOOKING_LIMITS.emailMax && EMAIL_PATTERN.test(value)
}

// YYYY-MM-DD và là ngày có thật (loại 2026-02-30…)
export function isValidIsoDate(value: string) {
  if (!ISO_DATE_PATTERN.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value)
}
