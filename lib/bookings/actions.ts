'use server'

import { createBooking } from './repository'
import type { BookingInput, SubmitBookingResult } from './types'
import { validateBooking } from './validation'

// F08 – nhận yêu cầu đặt lịch. Dữ liệu từ client không đáng tin: luôn kiểm tra lại ở đây.
export async function submitBooking(input: BookingInput): Promise<SubmitBookingResult> {
  // Honeypot: bot điền trường ẩn → trả về như thành công nhưng không lưu
  const honeypot: unknown = typeof input === 'object' && input !== null ? input.website : undefined
  if (typeof honeypot === 'string' && honeypot.trim() !== '') return { ok: true }

  const result = validateBooking(input)
  if (!result.ok) return { ok: false, errors: result.errors }

  try {
    await createBooking(result.data)
  } catch {
    // không ghi dữ liệu khách ra log
    console.error('[dat-lich] Không lưu được yêu cầu đặt lịch')
    return {
      ok: false,
      errors: {},
      message: 'Chưa gửi được yêu cầu. Bạn thử lại sau ít phút hoặc nhắn Zalo cho BACLE nhé.',
    }
  }

  return { ok: true }
}
