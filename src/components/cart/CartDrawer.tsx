"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/store/cart";
import {
  selectSubtotal,
  selectShippingFee,
  selectTotal,
  selectToFreeShip,
  selectCount,
} from "@/store/cart-selectors";
import { formatKRW, FREE_SHIP_THRESHOLD } from "@/lib/data";
import CartLineItem from "./CartLineItem";

export default function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const closeCart = useCart((s) => s.closeCart);
  const items = useCart((s) => s.items);
  const count = useCart(selectCount);
  const subtotal = useCart(selectSubtotal);
  const shipping = useCart(selectShippingFee);
  const total = useCart(selectTotal);
  const toFree = useCart(selectToFreeShip);

  // ESC 닫기 + 열림 시 스크롤 락
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, closeCart]);

  const progress = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));

  return (
    <>
      {/* 오버레이 */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      />

      {/* 패널 */}
      <aside
        className={`fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="장바구니"
        aria-modal="true"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-serif text-xl text-ink">
            장바구니 <span className="text-base text-stone">({count})</span>
          </h2>
          <button onClick={closeCart} aria-label="닫기" className="text-stone transition hover:text-ink">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-2xl text-ink">장바구니가 비어 있어요</p>
            <p className="text-sm text-stone">마음에 드는 꽃을 담아보세요.</p>
            <Link href="/shop" onClick={closeCart} className="btn-primary mt-2">
              꽃 둘러보기
            </Link>
          </div>
        ) : (
          <>
            {/* 무료배송 프로그레스 */}
            <div className="border-b border-line px-6 py-4">
              {toFree > 0 ? (
                <p className="text-xs text-ink">
                  <b className="text-sage-dark">{formatKRW(toFree)}</b> 더 담으면 무료배송!
                </p>
              ) : (
                <p className="text-xs font-medium text-sage-dark">무료배송 적용 완료 ✦</p>
              )}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-sage transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* 라인 아이템 */}
            <div className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {items.map((item) => (
                <CartLineItem key={item.key} item={item} />
              ))}
            </div>

            {/* 합계 + CTA */}
            <div className="border-t border-line px-6 py-5">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-stone">
                  <span>상품 합계</span>
                  <span>{formatKRW(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone">
                  <span>배송비</span>
                  <span>{shipping === 0 ? "무료" : formatKRW(shipping)}</span>
                </div>
                <div className="flex justify-between pt-1.5 text-base font-semibold text-ink">
                  <span>합계</span>
                  <span>{formatKRW(total)}</span>
                </div>
              </div>
              <Link href="/order" onClick={closeCart} className="btn-primary mt-4 w-full">
                주문하기
              </Link>
              <button
                onClick={closeCart}
                className="mt-2 w-full py-2 text-center text-xs text-stone transition hover:text-ink"
              >
                쇼핑 계속하기
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
