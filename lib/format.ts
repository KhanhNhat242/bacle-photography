const vndFormatter = new Intl.NumberFormat('vi-VN')

// Nối 2 chữ cuối bằng khoảng trắng không ngắt (U+00A0) để chữ cuối không bao giờ rớt lẻ xuống dòng:
// "Vườn Xanh Lãng Mạn" → xuống dòng thành "Vườn Xanh / Lãng Mạn". Chạy trên mọi trình duyệt,
// bổ sung cho text-wrap: balance (trình duyệt cũ không hỗ trợ).
export function noOrphan(text: string) {
  return text.trim().replace(/\s+(\S+)$/, ' $1')
}

// 5900000 → "5.900.000 ₫"
export function formatPrice(value: number) {
  return `${vndFormatter.format(value)} ₫`
}
