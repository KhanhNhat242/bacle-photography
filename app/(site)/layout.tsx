import { ShortlistBar } from '@/components/concept/ShortlistBar'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollReveal } from '@/components/layout/ScrollReveal'

// Layout các trang công khai: Header, Footer, nút liên hệ nổi (F10), thanh concept đã chọn (F07)
export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Header />
      <main id="noi-dung" className="flex-1">
        {children}
      </main>
      <Footer />
      <ShortlistBar />
      <FloatingContact />
      <ScrollReveal />
    </>
  )
}
