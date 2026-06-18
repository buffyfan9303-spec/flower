"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";
import CartCountBadge from "@/components/cart/CartCountBadge";

const NAV = [
  { href: "/shop", label: "SHOP" },
  { href: "/subscription", label: "SUBSCRIPTION" },
  { href: "/about", label: "ABOUT" },
  { href: "/journal", label: "JOURNAL" },
];

const DEFAULT_ANNOUNCEMENTS = [
  "서울 당일배송 · 전국 새벽배송",
  "정기구독 첫 달 10% 할인",
  "5만원 이상 무료배송",
  "신선도 100% 책임 보장",
];

export default function Header({
  announcements = DEFAULT_ANNOUNCEMENTS,
}: {
  announcements?: string[];
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 라우트 이동 시 모바일 메뉴 닫기
  useEffect(() => setOpen(false), [pathname]);

  const openCart = useCart((s) => s.openCart);

  // 홈 최상단에서는 투명(흰 글자), 그 외엔 솔리드(크림 배경)
  const solid = !isHome || scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* 공지 마퀴 바 */}
      <div className="overflow-hidden bg-sage-dark text-ivory">
        <div className="flex w-max animate-marquee">
          {[...announcements, ...announcements].map((a, i) => (
            <span
              key={i}
              className="flex items-center gap-3 whitespace-nowrap px-6 py-2 text-[11px] tracking-wider"
            >
              {a}
              <span className="opacity-40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* 내비게이션 */}
      <div
        className={`transition-colors duration-500 ${
          solid
            ? "bg-cream/95 text-ink shadow-[0_1px_0_rgba(0,0,0,0.05)] backdrop-blur"
            : "bg-transparent text-ivory"
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between lg:h-20">
          {/* 좌측: 모바일 메뉴 토글 + 데스크탑 내비 */}
          <div className="flex flex-1 items-center gap-7">
            <button
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              <Burger open={open} />
            </button>
            <ul className="hidden items-center gap-7 text-xs font-medium tracking-widest lg:flex">
              {NAV.slice(0, 2).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 중앙: 로고 */}
          <Link
            href="/"
            className="flex shrink-0 select-none flex-col items-center leading-none"
          >
            <span className="font-serif text-2xl tracking-tight lg:text-[28px]">
              드디어 플라워
            </span>
            <span className="mt-0.5 text-[9px] tracking-widest2 opacity-70">
              DEUDIEO FLOWER
            </span>
          </Link>

          {/* 우측: 데스크탑 내비 + 아이콘 */}
          <div className="flex flex-1 items-center justify-end gap-5">
            <ul className="hidden items-center gap-7 text-xs font-medium tracking-widest lg:flex">
              {NAV.slice(2).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button aria-label="검색" className="transition hover:opacity-60">
              <IconSearch />
            </button>
            <button
              onClick={openCart}
              aria-label="장바구니 열기"
              className="relative transition hover:opacity-60"
            >
              <IconBag />
              <CartCountBadge />
            </button>
          </div>
        </nav>
      </div>

      {/* 모바일 드로어 */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={`overflow-hidden bg-cream text-ink transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-96 border-b border-line" : "invisible max-h-0"
        }`}
      >
        <ul className="container-x flex flex-col gap-1 py-4">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="block py-3 font-serif text-xl tracking-tight"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <div className="flex h-4 w-6 flex-col justify-between">
      <span
        className={`h-px w-full bg-current transition-transform duration-300 ${
          open ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`h-px w-full bg-current transition-opacity duration-300 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`h-px w-full bg-current transition-transform duration-300 ${
          open ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </div>
  );
}

function IconSearch() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m20 20-3.2-3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBag() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 8h12l-1 12H7L6 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V6a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
