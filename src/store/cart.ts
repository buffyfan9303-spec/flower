"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartStore, CartItem } from "@/lib/cart-types";

const clampQty = (n: number) => Math.max(1, Math.min(99, Math.round(n)));

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hydrated: false,

      addItem: (input) => {
        const key = `${input.productId}__${input.optionId}`;
        const items = [...get().items];
        const idx = items.findIndex((i) => i.key === key);
        if (idx >= 0) {
          items[idx] = { ...items[idx], qty: clampQty(items[idx].qty + input.qty) };
        } else {
          const item: CartItem = { ...input, key, qty: clampQty(input.qty) };
          items.push(item);
        }
        set({ items });
      },

      removeItem: (key) => set({ items: get().items.filter((i) => i.key !== key) }),

      setQty: (key, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.key !== key) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.key === key ? { ...i, qty: clampQty(qty) } : i
          ),
        });
      },

      increment: (key) =>
        set({
          items: get().items.map((i) =>
            i.key === key ? { ...i, qty: clampQty(i.qty + 1) } : i
          ),
        }),

      decrement: (key) => {
        const item = get().items.find((i) => i.key === key);
        if (item && item.qty <= 1) {
          set({ items: get().items.filter((i) => i.key !== key) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.key === key ? { ...i, qty: clampQty(i.qty - 1) } : i
          ),
        });
      },

      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "deudieo-cart-v1",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
