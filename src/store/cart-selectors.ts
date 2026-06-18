import type { CartStore } from "@/lib/cart-types";
import { FREE_SHIP_THRESHOLD, SHIPPING_FEE } from "@/lib/data";

export const selectCount = (s: CartStore) =>
  s.items.reduce((n, i) => n + i.qty, 0);

export const selectSubtotal = (s: CartStore) =>
  s.items.reduce((n, i) => n + i.unitPrice * i.qty, 0);

export const selectShippingFee = (s: CartStore) => {
  const sub = selectSubtotal(s);
  return sub === 0 || sub >= FREE_SHIP_THRESHOLD ? 0 : SHIPPING_FEE;
};

export const selectTotal = (s: CartStore) =>
  selectSubtotal(s) + selectShippingFee(s);

/** 무료배송까지 남은 금액 (0이면 달성) */
export const selectToFreeShip = (s: CartStore) => {
  const sub = selectSubtotal(s);
  if (sub === 0 || sub >= FREE_SHIP_THRESHOLD) return 0;
  return FREE_SHIP_THRESHOLD - sub;
};
