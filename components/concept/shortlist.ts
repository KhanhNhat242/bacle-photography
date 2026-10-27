'use client'

import { useSyncExternalStore } from 'react'

// F07 – danh sách concept khách đánh dấu, lưu tạm trong localStorage.
// Mọi thao tác storage đều bọc try/catch: không đọc/ghi được thì vẫn chạy trong bộ nhớ.

const STORAGE_KEY = 'bacle:concept-shortlist'
// Giả định A4: shortlist giữ tối đa 3 concept (form đặt lịch chỉ chốt 1)
export const SHORTLIST_LIMIT = 3

export type ShortlistState = {
  slugs: string[]
  // thời điểm khách bấm chọn khi đã đủ giới hạn – để hiển thị nhắc nhở
  limitReachedAt: number
}

const emptyState: ShortlistState = { slugs: [], limitReachedAt: 0 }
let state: ShortlistState | null = null
const listeners = new Set<() => void>()

function readStorage(): string[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is string => typeof item === 'string').slice(0, SHORTLIST_LIMIT)
  } catch {
    return []
  }
}

function getSnapshot() {
  if (!state) state = { slugs: readStorage(), limitReachedAt: 0 }
  return state
}

function getServerSnapshot() {
  return emptyState
}

function emit(next: ShortlistState) {
  state = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next.slugs))
  } catch {
    // bỏ qua: chế độ ẩn danh hoặc bị chặn storage
  }
  listeners.forEach((listener) => listener())
}

function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return
  state = { slugs: readStorage(), limitReachedAt: 0 }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1) window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) window.removeEventListener('storage', onStorage)
  }
}

export function useShortlist() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function toggleConcept(slug: string) {
  const current = getSnapshot()
  if (current.slugs.includes(slug)) {
    emit({ ...current, slugs: current.slugs.filter((item) => item !== slug) })
    return
  }
  if (current.slugs.length >= SHORTLIST_LIMIT) {
    emit({ ...current, limitReachedAt: Date.now() })
    return
  }
  emit({ ...current, slugs: [...current.slugs, slug] })
}

// Gửi đặt lịch thành công thì xoá shortlist (F08)
export function clearShortlist() {
  emit({ slugs: [], limitReachedAt: 0 })
}
