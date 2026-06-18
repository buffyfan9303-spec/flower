"use client";

import { useState } from "react";
import Link from "next/link";
import { Field, inputCls } from "@/components/forms/Field";
import { validateInquiry, type Errors } from "@/lib/form-schemas";

const TOPICS = ["상품 문의", "배송 문의", "교환·환불", "제휴·협업", "기타"];

export default function ContactPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [doneId, setDoneId] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(fd.entries()), type: "general", agree: fd.get("agree") === "on" };
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
        <h1 className="display mt-4 text-4xl">문의가 접수되었습니다</h1>
        <p className="mt-4 text-sm text-stone">접수번호 <b className="text-ink">{doneId}</b><br />빠르게 확인 후 답변드리겠습니다.</p>
        <Link href="/" className="btn-primary mt-8">홈으로</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28">
      <section className="container-x py-10 text-center lg:py-14">
        <p className="eyebrow">CONTACT</p>
        <h1 className="display mt-3 text-4xl lg:text-5xl">문의하기</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-stone">
          궁금한 점을 남겨주세요. 평일 10:00–18:00 · 02-1234-5678 · hello@deudieo.flower
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
            <Field label="문의 유형" error={errors.topic}>
              <select name="topic" className={inputCls()} defaultValue={TOPICS[0]}>
                {TOPICS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
          </div>
          <Field label="제목" error={errors.subject}>
            <input name="subject" className={inputCls()} placeholder="문의 제목" />
          </Field>
          <Field label="내용" required error={errors.message}>
            <textarea name="message" rows={5} className={inputCls(errors.message) + " resize-none"} placeholder="문의하실 내용을 적어주세요." />
          </Field>
          <label className="flex items-start gap-2 text-sm text-ink">
            <input type="checkbox" name="agree" className="mt-0.5 accent-sage-dark" />
            <span>개인정보 수집·이용에 동의합니다.</span>
          </label>
          {errors.agree && <p className="text-[11px] text-blush-dark">{errors.agree}</p>}
          {errors._ && <p className="rounded-[4px] bg-blush/20 px-3 py-2 text-[12px] text-blush-dark">{errors._}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
            {submitting ? "전송 중…" : "문의 보내기"}
          </button>
        </form>
      </section>
    </div>
  );
}
