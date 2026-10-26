export type Package = {
  id: string
  name: string
  price: number | null
  priceNote?: string
  includes: string[]
  highlighted?: boolean
  isDemo?: boolean
}

// DEMO: giá và hạng mục mẫu, hiển thị nhãn "Giá tham khảo" cho đến khi khách xác nhận (Q6)
export const packages: Package[] = [
  {
    id: 'studio-tinh-gon',
    name: 'Gói Studio Tinh Gọn',
    price: 5_900_000,
    includes: [
      'Chụp trọn một buổi tại studio',
      '2 bộ trang phục cô dâu – chú rể',
      'Trang điểm và làm tóc cô dâu',
      '30 ảnh chỉnh sửa hoàn thiện',
    ],
    isDemo: true,
  },
  {
    id: 'ngoai-canh-studio',
    name: 'Gói Ngoại Cảnh & Studio',
    price: 12_900_000,
    includes: [
      'Một buổi studio và một buổi ngoại cảnh',
      '3 bộ trang phục theo từng concept',
      'Trang điểm cô dâu theo từng bối cảnh',
      '60 ảnh chỉnh sửa kèm album ảnh cưới',
    ],
    highlighted: true,
    isDemo: true,
  },
  {
    id: 'phong-su-le-gia-tien',
    name: 'Gói Phóng Sự Lễ Gia Tiên',
    price: 6_900_000,
    includes: [
      'Ghi hình trọn vẹn buổi lễ gia tiên',
      'Một thợ chụp chính và một thợ phụ',
      'Toàn bộ ảnh gốc đã chỉnh màu',
      '80 ảnh chọn lọc chỉnh sửa kỹ',
    ],
    isDemo: true,
  },
]
