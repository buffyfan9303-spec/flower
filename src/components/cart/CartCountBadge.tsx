"use client";

import { useCart } from "@/store/cart";
import { selectCount } from "@/store/cart-selectors";

/** Header 장바구니 아이콘 배지 — 하이드레이션 전엔 숨김 */
export default function CartCountBadge() {
  const count = useCart(selectCount);
  const hydrated = useCart((s) => s.hydrated);
  if (!hydrated || count === 0) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-blush-dark px-1 text-[9px] font-semibold text-ivory">
      {count > 99 ? "99+" : count}
    </span>
  );
}
