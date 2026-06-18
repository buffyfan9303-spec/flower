"use client";

import { useState } from "react";
import Link from "next/link";
import { Field, inputCls } from "@/components/forms/Field";
import { useCart } from "@/store/cart";
import {
  selectSubtotal,
  selectShippingFee,
  selectTotal,
} from "@/store/cart-selectors";
import { validateOrder, type Errors } from "@/lib/form-schemas";
import { formatKRW } from "@/lib/data";

const SLOTS = ["오전 (09–13시)", "오후 (13–18시)", "새벽 배송", "시간 무관"];
const PAYMENTS = ["무통장입금", "신용/체크카드", "카카오페이", "네이버페이"];

export default function OrderPage() {
  const items = useCart((s) => s.items);
  const hydrated = useCart((s) => s.hydrated);
  const subtotal = useCart(selectSubtotal);
  const shipping = useCart(selectShippingFee);
  const total = useCart(selectTotal);
  const clear = useCart((s) => s.clear);

  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [doneId, setDoneId] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) {
      setErrors({ _: "장바구니가 비어 있습니다. 상품을 먼저 담아주세요." });
      return;
    }
    const fd = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(fd.entries()),
      agree: fd.get("agree") === "on",
      items: items.map((i) => ({ name: `${i.name} (${i.optionLabel})`, qty: i.qty, unitPrice: i.unitPrice })),
    };
    const errs = validateOrder(data as any);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        clear();
        setDoneId(json.id);
      } else {
        setErrors(json.errors ?? { _: "주문 처리 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요." });
      }
    } catch {
      setErrors({ _: "전송 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요." });
    } finally {
      setSubmitting(false);
    }
  }

  if (doneId) {
    return (
      <div className="flex min-h-[70svh] flex-col items-center justify-center px-6 pt-28 text-center">
        <p className="eyebrow">ORDER COMPLETE</p>
        <h1 className="display mt-4 text-4xl">주문이 접수되었습니다</h1>
        <p className="mt-4 text-sm text-stone">
          주문번호 <b className="text-ink">{doneId}</b>
          <br />
          확인 후 카카오 알림톡으로 안내드릴게요.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="btn-outline">홈으로</Link>
          <Link href="/shop" className="btn-primary">계속 쇼핑하기</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28">
      <section className="container-x py-8 lg:py-10">
        <p className="eyebrow">ORDER</p>
        <h1 className="display mt-2 text-3xl lg:text-4xl">주문하기</h1>
      </section>

      <section className="container-x grid gap-10 pb-20 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        {/* 폼 */}
        <form id="order-form" onSubmit={onSubmit} noValidate className="space-y-8">
          <fieldset className="space-y-4">
            <legend className="mb-2 font-serif text-xl text-ink">주문자 정보</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="주문자 이름" required error={errors.ordererName}>
                <input name="ordererName" className={inputCls(errors.ordererName)} placeholder="홍길동" />
              </Field>
              <Field label="연락처" required error={errors.ordererPhone} hint="010-1234-5678">
                <input name="ordererPhone" inputMode="tel" className={inputCls(errors.ordererPhone)} placeholder="010-1234-5678" />
              </Field>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-2 font-serif text-xl text-ink">받는 분 / 배송</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="받는 분 이름" required error={errors.receiverName}>
                <input name="receiverName" className={inputCls(errors.receiverName)} placeholder="받는 분" />
              </Field>
              <Field label="받는 분 연락처" required error={errors.receiverPhone}>
                <input name="receiverPhone" inputMode="tel" className={inputCls(errors.receiverPhone)} placeholder="010-0000-0000" />
              </Field>
            </div>
            <Field label="배송지 주소" required error={errors.address}>
              <input name="address" className={inputCls(errors.address)} placeholder="도로명 주소" />
            </Field>
            <Field label="상세 주소" error={errors.addressDetail}>
              <input name="addressDetail" className={inputCls()} placeholder="동·호수 등" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="수령 희망일" error={errors.deliveryDate}>
                <input type="date" name="deliveryDate" className={inputCls()} />
              </Field>
              <Field label="배송 시간대" error={errors.deliverySlot}>
                <select name="deliverySlot" className={inputCls()} defaultValue="">
                  <option value="" disabled>선택해 주세요</option>
                  {SLOTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
            </div>
            <Field label="요청사항" error={errors.request}>
              <textarea name="request" rows={3} className={inputCls() + " resize-none"} placeholder="배송 시 요청사항이 있다면 적어주세요" />
            </Field>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-2 font-serif text-xl text-ink">결제 수단</legend>
            <Field label="결제 수단" required error={errors.payment}>
              <select name="payment" className={inputCls(errors.payment)} defaultValue="">
                <option value="" disabled>선택해 주세요</option>
                {PAYMENTS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <label className="flex items-start gap-2 text-sm text-ink">
              <input type="checkbox" name="agree" className="mt-0.5 accent-sage-dark" />
              <span>주문 내용을 확인했으며 개인정보 수집·이용 및 결제에 동의합니다.</span>
            </label>
            {errors.agree && <p className="text-[11px] text-blush-dark">{errors.agree}</p>}
          </fieldset>

          {errors._ && (
            <p className="rounded-[4px] bg-blush/20 px-3 py-2 text-[12px] text-blush-dark">{errors._}</p>
          )}
          {errors.items && (
            <p className="text-[12px] text-blush-dark">{errors.items}</p>
          )}
          <p className="text-[11px] text-stone">* 실제 결제(PG) 연동 전 데모입니다. 주문 정보는 운영자에게 알림으로 전달됩니다.</p>
        </form>

        {/* 주문 요약 */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[6px] border border-line bg-ivory p-6">
            <h2 className="font-serif text-xl text-ink">주문 요약</h2>
            {!hydrated ? (
              <div className="py-8 text-center text-sm text-stone">불러오는 중…</div>
            ) : items.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-stone">장바구니가 비어 있어요.</p>
                <Link href="/shop" className="btn-primary mt-4">꽃 둘러보기</Link>
              </div>
            ) : (
              <>
                <ul className="mt-4 divide-y divide-line">
                  {items.map((i) => (
                    <li key={i.key} className="flex justify-between gap-3 py-3 text-sm">
                      <span className="min-w-0">
                        <span className="block truncate text-ink">{i.name}</span>
                        <span className="block truncate text-xs text-stone">{i.optionLabel} · {i.qty}개</span>
                      </span>
                      <span className="shrink-0 text-ink">{formatKRW(i.unitPrice * i.qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
                  <div className="flex justify-between text-stone"><span>상품 합계</span><span>{formatKRW(subtotal)}</span></div>
                  <div className="flex justify-between text-stone"><span>배송비</span><span>{shipping === 0 ? "무료" : formatKRW(shipping)}</span></div>
                  <div className="flex justify-between pt-1.5 text-base font-semibold text-ink"><span>합계</span><span>{formatKRW(total)}</span></div>
                </div>
                <button form="order-form" type="submit" disabled={submitting} className="btn-primary mt-5 w-full disabled:opacity-50">
                  {submitting ? "처리 중…" : `${formatKRW(total)} 결제하기`}
                </button>
              </>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
