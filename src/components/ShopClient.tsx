"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import type { Product, Collection } from "@/lib/data";

export default function ShopClient({
  products,
  collections,
}: {
  products: Product[];
  collections: Collection[];
}) {
  const TABS = useMemo(
    () => [{ slug: "all", name: "전체" }, ...collections.map((c) => ({ slug: c.slug, name: c.name }))],
    [collections]
  );
  const [active, setActive] = useState("all");

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("c");
    if (c && TABS.some((t) => t.slug === c)) setActive(c);
  }, [TABS]);

  const list = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.category === active)),
    [active, products]
  );

  return (
    <div className="pt-24 lg:pt-28">
      {/* 헤더 */}
      <section className="container-x py-8 text-center lg:py-10">
        <p className="eyebrow">SHOP</p>
        <h1 className="display mt-2 text-4xl lg:text-6xl">전체 상품</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone">
          플로리스트가 매일 새롭게 디자인하는 드디어 플라워의 꽃을 만나보세요.
        </p>
      </section>

      {/* 카테고리 탭 */}
      <div className="sticky top-[96px] z-30 border-y border-line bg-cream/90 backdrop-blur lg:top-[112px]">
        <div className="container-x no-scrollbar flex items-center justify-start gap-2 overflow-x-auto py-3 sm:justify-center">
          {TABS.map((t) => (
            <button
              key={t.slug}
              onClick={() => setActive(t.slug)}
              aria-pressed={active === t.slug}
              className={`shrink-0 rounded-full px-5 py-2 text-sm transition-colors ${
                active === t.slug
                  ? "bg-sage-dark text-ivory"
                  : "text-stone hover:bg-ivory hover:text-ink"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* 상품 그리드 */}
      <section className="container-x py-10 lg:py-14">
        <p className="mb-6 text-sm text-stone">총 {list.length}개의 상품</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-y-10">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 50}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        {list.length === 0 && (
          <p className="py-20 text-center text-stone">해당 카테고리의 상품이 곧 입고됩니다.</p>
        )}
      </section>
    </div>
  );
}
