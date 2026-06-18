import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { getSettings } from "@/lib/catalog-store";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: "드디어 플라워",
  description: "드디어, 당신에게 어울리는 꽃. 서울 당일배송·전국 새벽배송 플라워샵.",
  image: "https://deudieo.flower/og.jpg",
  telephone: "+82-2-1234-5678",
  email: "hello@deudieo.flower",
  priceRange: "₩₩",
  address: {
    "@type": "PostalAddress",
    streetAddress: "성수일로 12",
    addressLocality: "성동구",
    addressRegion: "서울특별시",
    addressCountry: "KR",
  },
  openingHours: "Mo-Fr 10:00-18:00",
};

export const metadata: Metadata = {
  title: {
    default: "드디어 플라워 — 드디어, 당신에게 어울리는 꽃",
    template: "%s | 드디어 플라워",
  },
  description:
    "매일 가장 신선한 꽃을 플로리스트의 손길로. 시그니처 부케부터 정기구독까지, 서울 당일배송·전국 새벽배송 드디어 플라워.",
  keywords: ["꽃집", "꽃다발", "꽃배달", "플라워", "정기구독", "프리저브드", "부케"],
  openGraph: {
    title: "드디어 플라워",
    description: "드디어, 당신에게 어울리는 꽃",
    type: "website",
    locale: "ko_KR",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Noto+Serif+KR:wght@300;400;500;600&display=swap"
        />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteChrome settings={settings}>{children}</SiteChrome>
      </body>
    </html>
  );
}
