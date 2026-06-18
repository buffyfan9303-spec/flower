"use client";

import SmartImage from "@/components/SmartImage";
import { useCart } from "@/store/cart";
import { formatKRW } from "@/lib/data";
import type { CartItem } from "@/lib/cart-types";

export default function CartLineItem({ item }: { item: CartItem }) {
  const increment = useCart((s) => s.increment);
  const decrement = useCart((s) => s.decrement);
  const removeItem = useCart((s) => s.removeItem);

  return (
    <div className="flex gap-3 py-4">
      <div className="w-20 shrink-0">
        <SmartImage
          src={item.image}
          alt={item.name}
          palette={item.palette}
          ratio="aspect-[4/5]"
          className="rounded-[3px]"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="truncate text-sm font-medium text-ink">{item.name}</h4>
            <p className="mt-0.5 truncate text-xs text-stone">{item.optionLabel}</p>
          </div>
          <button
            onClick={() => removeItem(item.key)}
            aria-label="삭제"
            className="shrink-0 text-stone transition hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {item.deliveryDate && (
          <p className="mt-1 text-[11px] text-sage-dark">수령 {item.deliveryDate}</p>
        )}
        {item.ribbon?.body && (
          <p className="mt-1 line-clamp-1 text-[11px] text-stone">“{item.ribbon.body}”</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center rounded-full border border-line">
            <button
              onClick={() => decrement(item.key)}
              aria-label="수량 감소"
              className="flex h-7 w-7 items-center justify-center text-stone transition hover:text-ink"
            >
              −
            </button>
            <span className="w-6 text-center text-sm">{item.qty}</span>
            <button
              onClick={() => increment(item.key)}
              aria-label="수량 증가"
              className="flex h-7 w-7 items-center justify-center text-stone transition hover:text-ink"
            >
              +
            </button>
          </div>
          <span className="text-sm font-medium text-ink">
            {formatKRW(item.unitPrice * item.qty)}
          </span>
        </div>
      </div>
    </div>
  );
}
