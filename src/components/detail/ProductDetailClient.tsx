"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SmartImage from "@/components/SmartImage";
import TrustBadges from "@/components/TrustBadges";
import Countdown from "@/components/Countdown";
import { useCart } from "@/store/cart";
import { buildCartItem } from "@/lib/cart-helpers";
import {
  formatKRW,
  discountRate,
  WRAP_OPTIONS,
  type Product,
} from "@/lib/data";

const tagStyle: Record<string, string> = {
  BEST: "bg-sage-dark text-ivory",
  NEW: "bg-blush text-ink",
  한정: "bg-gold text-ivory",
};

function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);

  const [variant, setVariant] = useState(product.variants[0]);
  const [wrap, setWrap] = useState(product.addWrap ? WRAP_OPTIONS[0] : undefined);
  const [swatch, setSwatch] = useState(product.swatch?.options[0]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [showRibbon, setShowRibbon] = useState(false);
  const [ribbon, setRibbon] = useState({ to: "", from: "", body: "" });
  const [deliveryDate, setDeliveryDate] = useState("");
  const [tab, setTab] = useState<"detail" | "ship" | "care">("detail");

  const unitPrice = useMemo(
    () => product.price + variant.delta + (wrap?.delta ?? 0),
    [product.price, variant, wrap]
  );
  const rate = discountRate(product.price, product.compareAt);
  const soldOut = product.stock <= 0;

  const makeItem = () =>
    buildCartItem(product, {
      variant,
      wrap,
      swatchValue: swatch,
      qty,
      ribbon,
      deliveryDate: deliveryDate || undefined,
    });

  const handleAdd = () => {
    addItem(makeItem());
    openCart();
  };
  const handleBuyNow = () => {
    addItem(makeItem());
    router.push("/order");
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      {/* 갤러리 */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-[6px]">
          <SmartImage
            src={product.gallery[activeImg] ?? product.image}
            alt={product.name}
            palette={product.palette}
            ratio="aspect-square sm:aspect-[4/5]"
            priority
          />
        </div>
        {product.gallery.length > 1 && (
          <div className="mt-3 flex gap-3">
            {product.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                aria-label={`이미지 ${i + 1}`}
                aria-pressed={activeImg === i}
                className={`w-20 overflow-hidden rounded-[4px] ring-2 transition ${
                  activeImg === i ? "ring-sage-dark" : "ring-transparent"
                }`}
              >
                <SmartImage src={g} alt="" palette={product.palette} ratio="aspect-square" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 정보/옵션 */}
      <div>
        {product.tag && (
          <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider ${tagStyle[product.tag]}`}>
            {product.tag}
          </span>
        )}
        <p className="mt-3 font-serif text-sm italic text-stone">{product.en}</p>
        <h1 className="display mt-1 text-3xl lg:text-4xl">{product.name}</h1>

        <div className="mt-3 flex items-center gap-2 text-sm text-stone">
          <span className="text-gold">★★★★★</span>
          <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
          <span>· 후기 {product.reviewCount}건</span>
        </div>

        <p className="mt-4 leading-relaxed text-stone">{product.desc}</p>

        {/* 가격 */}
        <div className="mt-5 flex items-end gap-3">
          {rate > 0 && <span className="font-serif text-2xl text-blush-dark">{rate}%</span>}
          <span className="font-serif text-3xl text-ink">{formatKRW(unitPrice)}</span>
          {product.compareAt > product.price && (
            <span className="mb-1 text-base text-stone line-through">{formatKRW(product.compareAt)}</span>
          )}
        </div>

        {/* 당일배송 카운트다운 */}
        <div className="mt-5">
          <Countdown />
        </div>

        {/* 옵션: 사이즈/타입 */}
        <div className="mt-7">
          <p className="mb-2 text-xs font-medium tracking-wide text-stone">옵션 선택</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariant(v)}
                aria-pressed={variant.id === v.id}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  variant.id === v.id
                    ? "border-sage-dark bg-sage-dark text-ivory"
                    : "border-line text-ink hover:border-ink"
                }`}
              >
                {v.label}
                {v.delta !== 0 && (
                  <span className="ml-1 text-xs opacity-70">
                    {v.delta > 0 ? `+${formatKRW(v.delta)}` : formatKRW(v.delta)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 포장 */}
        {product.addWrap && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-medium tracking-wide text-stone">포장</p>
            <div className="flex flex-wrap gap-2">
              {WRAP_OPTIONS.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWrap(w)}
                  aria-pressed={wrap?.id === w.id}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    wrap?.id === w.id
                      ? "border-sage-dark bg-sage-dark text-ivory"
                      : "border-line text-ink hover:border-ink"
                  }`}
                >
                  {w.label}
                  {w.delta > 0 && <span className="ml-1 text-xs opacity-70">+{formatKRW(w.delta)}</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 컬러/향 등 */}
        {product.swatch && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-medium tracking-wide text-stone">{product.swatch.name}</p>
            <div className="flex flex-wrap gap-2">
              {product.swatch.options.map((o) => (
                <button
                  key={o}
                  onClick={() => setSwatch(o)}
                  aria-pressed={swatch === o}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    swatch === o
                      ? "border-sage-dark bg-sage-dark text-ivory"
                      : "border-line text-ink hover:border-ink"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 수령 희망일 */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-medium tracking-wide text-stone">수령 희망일 (선택)</p>
          <input
            type="date"
            min={tomorrowISO()}
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full rounded-[4px] border border-line bg-ivory px-4 py-2.5 text-sm text-ink focus:border-sage-dark focus:outline-none"
          />
        </div>

        {/* 리본/메시지 카드 */}
        <div className="mt-5">
          <button
            onClick={() => setShowRibbon((v) => !v)}
            className="flex w-full items-center justify-between rounded-[4px] border border-line bg-ivory px-4 py-3 text-sm text-ink"
          >
            <span>🎀 무료 메시지 카드 추가</span>
            <span className={`transition-transform ${showRibbon ? "rotate-45" : ""}`}>+</span>
          </button>
          {showRibbon && (
            <div className="mt-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="받는 분"
                  value={ribbon.to}
                  onChange={(e) => setRibbon({ ...ribbon, to: e.target.value })}
                  className="rounded-[4px] border border-line bg-ivory px-3 py-2 text-sm focus:border-sage-dark focus:outline-none"
                />
                <input
                  placeholder="보내는 분"
                  value={ribbon.from}
                  onChange={(e) => setRibbon({ ...ribbon, from: e.target.value })}
                  className="rounded-[4px] border border-line bg-ivory px-3 py-2 text-sm focus:border-sage-dark focus:outline-none"
                />
              </div>
              <textarea
                placeholder="메시지를 입력해 주세요 (최대 80자)"
                maxLength={80}
                rows={3}
                value={ribbon.body}
                onChange={(e) => setRibbon({ ...ribbon, body: e.target.value })}
                className="w-full resize-none rounded-[4px] border border-line bg-ivory px-3 py-2 text-sm focus:border-sage-dark focus:outline-none"
              />
              <p className="text-right text-[11px] text-stone">{ribbon.body.length}/80</p>
            </div>
          )}
        </div>

        {/* 수량 + 합계 */}
        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <div className="flex items-center rounded-full border border-line">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center text-stone transition hover:text-ink"
              aria-label="수량 감소"
            >
              −
            </button>
            <span className="w-8 text-center text-sm">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="flex h-10 w-10 items-center justify-center text-stone transition hover:text-ink"
              aria-label="수량 증가"
            >
              +
            </button>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone">총 상품금액</p>
            <p className="font-serif text-2xl text-ink">{formatKRW(unitPrice * qty)}</p>
          </div>
        </div>

        {/* 액션 */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={handleAdd}
            disabled={soldOut}
            className="btn-outline disabled:cursor-not-allowed disabled:opacity-40"
          >
            장바구니 담기
          </button>
          <button
            onClick={handleBuyNow}
            disabled={soldOut}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {soldOut ? "품절" : "바로 구매"}
          </button>
        </div>

        <TrustBadges className="mt-5" />

        {/* 탭 */}
        <div className="mt-8">
          <div className="flex gap-6 border-b border-line text-sm">
            {[
              ["detail", "상세 설명"],
              ["ship", "배송·교환/환불"],
              ["care", "꽃 관리법"],
            ].map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k as typeof tab)}
                aria-pressed={tab === k}
                className={`-mb-px border-b-2 pb-3 transition ${
                  tab === k ? "border-sage-dark font-medium text-ink" : "border-transparent text-stone"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="py-5 text-sm leading-relaxed text-stone">
            {tab === "detail" && (
              <div className="space-y-4">
                <p>{product.detail}</p>
                <div>
                  <p className="mb-1 font-medium text-ink">주요 꽃·소재</p>
                  <p>{product.flowers.join(" · ")}</p>
                </div>
              </div>
            )}
            {tab === "ship" && (
              <ul className="space-y-2">
                <li>· 서울 당일배송: 오후 2시 이전 주문 시 당일 출발</li>
                <li>· 전국 새벽배송: 익일 오전 도착</li>
                <li>· 5만원 이상 무료배송 (이하 배송비 3,500원)</li>
                <li>· 단순 변심 시 수령 전 취소 가능, 신선도 문제는 7일 내 100% 교환·환불</li>
              </ul>
            )}
            {tab === "care" && <p>{product.care}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
