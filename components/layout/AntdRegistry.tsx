'use client'

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import CacheEntity from '@ant-design/cssinjs/es/Cache'
import { useServerInsertedHTML } from 'next/navigation'
import { useId, useState, type ReactNode } from 'react'

// Thay cho @ant-design/nextjs-registry: bản gốc gọi createCache() (dùng Math.random()) ngay khi render.
// Với cacheComponents, Next coi đó là giá trị không ổn định lúc prerender → cả trang bị đẩy vào
// Suspense rỗng và trên Vercel chỉ còn màn hình trắng. Ở server id cache chỉ cần ổn định nên dùng useId();
// ở trình duyệt vẫn gọi createCache() để giữ bước gom/khử trùng thẻ <style> SSR của antd.
export function AntdRegistry({ children }: { children: ReactNode }) {
  const id = useId()
  const [cache] = useState(() => (typeof window === 'undefined' ? new CacheEntity(id) : createCache()))

  useServerInsertedHTML(() => {
    const styleText = extractStyle(cache, { plain: true, once: true })
    if (styleText.includes('.data-ant-cssinjs-cache-path{content:"";}')) return null
    return (
      <style
        id="antd-cssinjs"
        // chèn trước style antd sinh ở client
        data-rc-order="prepend"
        data-rc-priority="-1000"
        dangerouslySetInnerHTML={{ __html: styleText }}
      />
    )
  })

  return <StyleProvider cache={cache}>{children}</StyleProvider>
}
