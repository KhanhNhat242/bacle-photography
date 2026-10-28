import Image from 'next/image'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { Sprig } from '@/components/ui/Sprig'
import { site } from '@/data/site'
import logo from '@/public/images/brand/logo-bacle.png'

export default function NotFound() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-cream px-4 py-24 text-center">
      <Sprig className="deco-float absolute right-[8%] top-[12%] w-16 text-accent" />
      <Image src={logo} alt={site.name} className="h-12 w-auto" sizes="200px" />
      <p className="mt-10 font-serif text-7xl font-medium text-accent-ink">404</p>
      <h1 className="mt-4 font-serif text-[2.2rem] font-medium text-ink">Không tìm thấy trang</h1>
      <p className="mt-3 max-w-md text-[15px] font-light text-muted-foreground">
        Trang bạn tìm có thể đã được di chuyển hoặc chưa sẵn sàng. Mời hai bạn quay lại trang chủ nhé.
      </p>
      <ButtonLink href="/" className="mt-9">
        Về trang chủ
      </ButtonLink>
    </main>
  )
}
