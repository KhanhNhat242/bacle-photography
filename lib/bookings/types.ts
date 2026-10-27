// Kiểu dữ liệu yêu cầu đặt lịch (docs/REQUIREMENTS.md mục 5, F08, F11)

export const BOOKING_STATUSES = ['moi', 'da_lien_he', 'da_xac_nhan', 'hoan_thanh', 'huy'] as const
export type BookingStatus = (typeof BOOKING_STATUSES)[number]

export const TIME_SLOTS = ['sang', 'chieu', 'ca_ngay'] as const
export type TimeSlot = (typeof TIME_SLOTS)[number]

export type BookingRequest = {
  id: string
  createdAt: string
  fullName: string
  phone: string
  email?: string
  conceptSlug: string
  packageId?: string
  preferredDate: string
  timeSlot?: TimeSlot
  weddingDate?: string
  note?: string
  status: BookingStatus
  adminNote?: string
  updatedAt: string
}

// Dữ liệu form gửi lên Server Action (ngày dạng YYYY-MM-DD)
export type BookingInput = {
  fullName: string
  phone: string
  email?: string
  conceptSlug: string
  packageId?: string
  preferredDate: string
  timeSlot?: TimeSlot
  weddingDate?: string
  note?: string
  // honeypot chống spam – người thật không thấy trường này
  website?: string
}

export type BookingField = Exclude<keyof BookingInput, 'website'>
export type BookingFieldErrors = Partial<Record<BookingField, string>>

// Yêu cầu đã qua kiểm tra, chưa có các trường do hệ thống sinh
export type NewBooking = Omit<BookingRequest, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'adminNote'>

export type SubmitBookingResult = { ok: true } | { ok: false; errors: BookingFieldErrors; message?: string }
