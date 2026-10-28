import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond, Great_Vibes, Geist } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Suspense } from "react";
import { AntdProvider } from "@/components/layout/AntdProvider";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// Mọi font đều tải subset "vietnamese" để hiển thị đúng dấu tiếng Việt
const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin", "vietnamese"],
  weight: "400",
  display: "swap",
});

const ogImage = photos.studioSweet.src;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Chụp ảnh cưới tại TP. ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: site.name,
    images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: photos.studioSweet.alt }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={cn("h-full", "antialiased", beVietnamPro.variable, cormorant.variable, greatVibes.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-cream font-sans text-ink">
        <Suspense fallback={null}>
          <AntdRegistry>
            <AntdProvider>{children}</AntdProvider>
          </AntdRegistry>
        </Suspense>
      </body>
    </html>
  );
}
