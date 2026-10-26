const vndFormatter = new Intl.NumberFormat('vi-VN')

// 5900000 → "5.900.000 ₫"
export function formatPrice(value: number) {
  return `${vndFormatter.format(value)} ₫`
}
