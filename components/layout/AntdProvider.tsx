'use client'

import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import type { ReactNode } from 'react'

// Tên tháng/thứ trong DatePicker lấy từ locale của dayjs
dayjs.locale('vi')

// Nơi duy nhất cấu hình theme antd. antd cần mã màu thật để tự sinh màu hover/active,
// nên giá trị ở đây phải khớp với token trong :root của app/globals.css.
const brand = {
  cream: '#FFFDF9',
  ivory: '#F7F1E8',
  ink: '#1C1A17',
  muted: '#6B645A',
  accent: '#B8956A',
  accentInk: '#7F5F37',
}

export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          // nền ô đang chọn trong DatePicker/Select dùng colorPrimary với chữ trắng → dùng champagne đậm để đạt tương phản
          colorPrimary: brand.accentInk,
          colorText: brand.ink,
          colorTextSecondary: brand.muted,
          colorTextPlaceholder: brand.muted,
          colorBorder: brand.accent,
          colorBgContainer: brand.cream,
          colorBgElevated: brand.cream,
          fontFamily: 'var(--font-be-vietnam), ui-sans-serif, system-ui, sans-serif',
          fontSize: 15,
          borderRadius: 14,
          // ≥ 44px cho vùng chạm trên mobile
          controlHeight: 48,
        },
        components: {
          Select: { optionSelectedBg: brand.ivory, optionActiveBg: brand.ivory },
          Form: { labelColor: brand.ink, verticalLabelPadding: '0 0 6px' },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
