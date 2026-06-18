"use client";

import { useState } from "react";
import Link from "next/link";
import { Field, inputCls } from "@/components/forms/Field";
import { validateInquiry, type Errors } from "@/lib/form-schemas";

const USES = ["개업·축하 화환", "행사·연출", "정기 납품", "기념일·답례", "기타"];

export default function CorporatePage() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [doneId, setDoneId] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(fd.entries()), type: "corporate", agree: fd.get("agree") === "on" };
    const errs = validateInquiry(data as any);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) setDoneId(json.id);
      else setErrors(json.errors ?? { _: "전송 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요." });
    } catch {
      setErrors({ _: "전송 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요." });
    } finally {
      setSubmitting(false);
    }
  }

  if (doneId) {
    return (
      <div className="flex min-h-[70svh] flex-col items-center justify-center px-6 pt-28 text-center">
        <p className="eyebrow">RECEIVED</p>
        <h1 className="display mt-4 text-4xl">견적 문의가 접수되었습니다</h1>
        <p className="mt-4 text-sm text-stone">접수번호 <b className="text-ink">{doneId}</b><br />담당자가 1영업일 내 연락드리겠습니다.</p>
        <Link href="/" className="btn-primary mt-8">홈으로</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28">
      <section className="container-x py-10 text-center lg:py-14">
        <p className="eyebrow">BUSINESS</p>
        <h1 className="display mt-3 text-4xl lg:text-5xl">기업·단체 주문</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-stone">
          개업화환·행사 연출·정기 납품까지, 규모에 맞춘 견적을 제안해 드립니다.
          세금계산서 발행과 정기 계약이 가능합니다.
        </p>
      </section>

      <section className="container-x max-w-2xl pb-20">
        <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-[6px] border border-line bg-ivory p-6 lg:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="회사/단체명" required error={errors.company}>
              <input name="company" className={inputCls(errors.company)} placeholder="(주)드디어" />
            </Field>
            <Field label="담당자명" required error={errors.name}>
              <input name="name" className={inputCls(errors.name)} placeholder="담당자" />
            </Field>
            <Field label="연락처" required error={errors.phone} hint="010-1234-5678">
              <input name="phone" inputMode="tel" className={inputCls(errors.phone)} placeholder="010-1234-5678" />
            </Field>
            <Field label="이메일" error={errors.email}>
              <input name="email" type="email" className={inputCls(errors.email)} placeholder="name@company.com" />
            </Field>
            <Field label="용도" error={errors.usage}>
              <select name="usage" className={inputCls()} defaultValue="">
                <option value="" disabled>선택</option>
                {USES.map((u) => <option key={u}>{u}</option>)}
              </select>
            </Field>
            <Field label="예상 수량/예산" error={errors.budget}>
              <input name="budget" className={inputCls()} placeholder="예: 화환 10개 / 100만원" />
            </Field>
            <Field label="납품 희망일" error={errors.dueDate}>
              <input name="dueDate" type="date" className={inputCls()} />
            </Field>
          </div>
          <Field label="요청 내용" required error={errors.message}>
            <textarea name="message" rows={4} className={inputCls(errors.message) + " resize-none"} placeholder="필요하신 내용을 자유롭게 적어주세요." />
          </Field>
          <label className="flex items-start gap-2 text-sm text-ink">
            <input type="checkbox" name="agree" className="mt-0.5 accent-sage-dark" />
            <span>개인정보 수집·이용에 동의합니다.</span>
          </label>
          {errors.agree && <p className="text-[11px] text-blush-dark">{errors.agree}</p>}
          {errors._ && <p className="rounded-[4px] bg-blush/20 px-3 py-2 text-[12px] text-blush-dark">{errors._}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
            {submitting ? "전송 중…" : "견적 문의하기"}
          </button>
        </form>
      </section>
    </div>
  );
}
