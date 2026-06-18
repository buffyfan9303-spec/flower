"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import KakaoFloat from "@/components/KakaoFloat";
import type { SiteSettings } from "@/lib/data";

/** /admin 경로에서는 스토어프론트 크롬(헤더/푸터/장바구니)을 숨깁니다. */
export default function SiteChrome({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header announcements={settings.announcements} />
      <main>{children}</main>
      <Footer contact={settings.contact} social={settings.social} />
      <CartDrawer />
      <KakaoFloat />
    </>
  );
}
