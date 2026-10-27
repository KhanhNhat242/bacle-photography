// Khoá cuộn trang khi mở menu mobile / hộp thoại.
// Phải khoá trên <html>: globals.css đặt overflow-x: clip cho html nên overflow của body không còn
// lan lên khung cuộn của trang – chỉ khoá body thì trang vẫn cuộn được.
// Đếm số lớp đang khoá để menu và lightbox mở chồng nhau không mở khoá sớm.
let lockCount = 0
let previousOverflow = ''

export function lockScroll() {
  const root = document.documentElement
  if (lockCount === 0) {
    previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
  }
  lockCount += 1

  let released = false
  return function unlockScroll() {
    if (released) return
    released = true
    lockCount -= 1
    if (lockCount === 0) root.style.overflow = previousOverflow
  }
}
