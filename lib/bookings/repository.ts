import { randomUUID } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import type { BookingRequest, NewBooking } from './types'

// Lớp truy cập dữ liệu duy nhất cho yêu cầu đặt lịch – UI và action không đọc/ghi file trực tiếp.
// Giả định A7 (chờ Q7): lưu file JSON. Trên Vercel chỉ thư mục tạm ghi được, dữ liệu mất khi instance khởi động lại.
const DATA_DIR = process.env.VERCEL ? path.join(os.tmpdir(), 'bacle') : path.join(process.cwd(), '.data')
const DATA_FILE = path.join(DATA_DIR, 'bookings.json')

// Ghi tuần tự để hai yêu cầu gửi cùng lúc không ghi đè lẫn nhau
let queue: Promise<unknown> = Promise.resolve()
function serialize<T>(task: () => Promise<T>) {
  const run = queue.then(task, task)
  queue = run.catch(() => undefined)
  return run
}

async function readAll(): Promise<BookingRequest[]> {
  try {
    const parsed: unknown = JSON.parse(await readFile(DATA_FILE, 'utf8'))
    return Array.isArray(parsed) ? (parsed as BookingRequest[]) : []
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return []
    throw error
  }
}

async function writeAll(bookings: BookingRequest[]) {
  await mkdir(DATA_DIR, { recursive: true })
  // ghi ra file tạm rồi đổi tên: không để lại file JSON dở dang nếu tiến trình dừng giữa chừng
  const tempFile = `${DATA_FILE}.tmp`
  await writeFile(tempFile, JSON.stringify(bookings, null, 2), 'utf8')
  await rename(tempFile, DATA_FILE)
}

export function createBooking(input: NewBooking): Promise<BookingRequest> {
  return serialize(async () => {
    const now = new Date().toISOString()
    const booking: BookingRequest = { ...input, id: randomUUID(), createdAt: now, updatedAt: now, status: 'moi' }
    const bookings = await readAll()
    bookings.push(booking)
    await writeAll(bookings)
    return booking
  })
}
