"use client";

import { useState } from "react";
import Link from "next/link";
import { Field, inputCls } from "@/components/forms/Field";
import { validateSubscription, type Errors } from "@/lib/form-schemas";

const PLANS = ["데일리 (29,000원)", "시그니처 (49,000원)", "프리미엄 (79,000원)"];
const DURATIONS = ["1개월", "3개월 (5% 할인)", "6개월 (10% 할인)"];
const CYCLES = ["주 1회", "격주", "월 1회"];

export default function SubscriptionApplyPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [doneId, setDoneId] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(fd.entries()), agree: fd.get("agree") === "on" };
    const errs = validateSubscription(data as any);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscription", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) setDoneId(json.id);
      else setErrors(json.errors ?? { _: "신청 처리 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요." });
    } catch {
      setErrors({ _: "전송 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요." });
    } finally {
      setSubmitting(false);
    }
  }

  if (doneId) {
    return (
      <div className="flex min-h-[70svh] flex-col items-center justify-center px-6 pt-28 text-center">
        <p className="eyebrow">WELCOME</p>
        <h1 className="display mt-4 text-4xl">구독 신청이 완료되었습니다</h1>
        <p className="mt-4 text-sm text-stone">신청번호 <b className="text-ink">{doneId}</b><br />첫 배송 일정은 카카오 알림톡으로 안내드릴게요.</p>
        <Link href="/" className="btn-primary mt-8">홈으로</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28">
      <section className="container-x py-10 text-center lg:py-14">
        <p className="eyebrow">SUBSCRIPTION</p>
        <h1 className="display mt-3 text-4xl lg:text-5xl">정기구독 신청</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-stone">
          약정 없이 언제든 일시정지·해지할 수 있어요. 첫 달은 10% 할인됩니다.
        </p>
      </section>

      <section className="container-x max-w-2xl pb-20">
        <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-[6px] border border-line bg-ivory p-6 lg:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="이름" required error={errors.name}>
              <input name="name" className={inputCls(errors.name)} placeholder="홍길동" />
            </Field>
            <Field label="연락처" required error={errors.phone} hint="010-1234-5678">
              <input name="phone" inputMode="tel" className={inputCls(errors.phone)} placeholder="010-1234-5678" />
            </Field>
            <Field label="이메일" error={errors.email}>
              <input name="email" type="email" className={inputCls(errors.email)} placeholder="name@email.com" />
            </Field>
            <Field label="배송 주기" error={errors.cycle}>
              <select name="cycle" className={inputCls()} defaultValue={CYCLES[0]}>
                {CYCLES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="플랜" required error={errors.plan}>
              <select name="plan" className={inputCls(errors.plan)} defaultValue="">
                <option value="" disabled>선택</option>
                {PLANS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="구독 기간" required error={errors.duration}>
              <select name="duration" className={inputCls(errors.duration)} defaultValue="">
                <option value="" disabled>선택</option>
                {DURATIONS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="구독 시작일" error={errors.startDate}>
              <input name="startDate" type="date" className={inputCls()} />
            </Field>
          </div>
          <Field label="배송지 주소" required error={errors.address}>
            <input name="address" className={inputCls(errors.address)} placeholder="도로명 주소 + 상세주소" />
          </Field>
          <label className="flex items-start gap-2 text-sm text-ink">
            <input type="checkbox" name="agree" className="mt-0.5 accent-sage-dark" />
            <span>구독 약관 및 개인정보 수집·이용에 동의합니다.</span>
          </label>
          {errors.agree && <p className="text-[11px] text-blush-dark">{errors.agree}</p>}
          {errors._ && <p className="rounded-[4px] bg-blush/20 px-3 py-2 text-[12px] text-blush-dark">{errors._}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
            {submitting ? "신청 중…" : "구독 시작하기"}
          </button>
        </form>
      </section>
    </div>
  );
}
