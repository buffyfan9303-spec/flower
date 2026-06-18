"use client";

import { useCart } from "@/store/cart";
import type { CartItem } from "@/lib/cart-types";

type Props = {
  item: Omit<CartItem, "key">;
  className?: string;
  children?: React.ReactNode;
  openAfter?: boolean;
};

/** 어디서나 재사용하는 장바구니 담기 버튼 */
export default function AddToCartButton({
  item,
  className = "",
  children = "장바구니 담기",
  openAfter = true,
}: Props) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(item);
        if (openAfter) openCart();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
