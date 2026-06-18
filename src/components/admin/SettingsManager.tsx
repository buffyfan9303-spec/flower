"use client";

import { useEffect, useState } from "react";
import { ai, Labeled, SaveBar, IconBtn } from "./ui";
import type { SiteSettings } from "@/lib/data";

export default function SettingsManager() {
  const [s, setS] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then((j) => j.ok && setS(j.settings)).catch(() => setMsg("불러오기 실패"));
  }, []);

  if (!s) return <p className="text-sm text-stone">불러오는 중…</p>;

  const set = (patch: Partial<SiteSettings>) => { setS({ ...s, ...patch }); setDirty(true); setMsg(""); };

  async function save() {
    setSaving(true); setMsg("");
    try {
      const res = await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ settings: s }) });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) { setDirty(false); setMsg("저장되었습니다 ✓"); } else setMsg(j.error || "저장 실패");
    } catch { setMsg("네트워크 오류"); } finally { setSaving(false); }
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">사이트 설정</h1>
      <p className="mt-1 text-sm text-stone">상단 공지·메인 히어로·연락처·배송 정책을 관리합니다.</p>

      {/* 공지 */}
      <section className="mt-6 rounded-[6px] border border-line bg-ivory p-5">
        <h2 className="font-serif text-lg text-ink">상단 공지 (마퀴)</h2>
        <div className="mt-3 space-y-2">
          {s.announcements.map((a, i) => (
            <div key={i} className="flex items-center gap-2">
              <input className={ai} value={a} onChange={(e) => set({ announcements: s.announcements.map((x, k) => k === i ? e.target.value : x) })} />
              <IconBtn onClick={() => set({ announcements: s.announcements.filter((_, k) => k !== i) })} title="삭제">✕</IconBtn>
            </div>
          ))}
        </div>
        <button onClick={() => set({ announcements: [...s.announcements, "새 공지"] })} className="mt-2 text-xs text-sage-dark hover:underline">+ 공지 추가</button>
      </section>

      {/* 히어로 */}
      <section className="mt-5 rounded-[6px] border border-line bg-ivory p-5">
        <h2 className="font-serif text-lg text-ink">메인 히어로</h2>
        <div className="mt-3 space-y-3">
          <Labeled label="상단 작은 문구(eyebrow)"><input className={ai} value={s.hero.eyebrow} onChange={(e) => set({ hero: { ...s.hero, eyebrow: e.target.value } })} /></Labeled>
          <Labeled label="제목 (줄바꿈 = Enter)"><textarea rows={2} className={ai} value={s.hero.title} onChange={(e) => set({ hero: { ...s.hero, title: e.target.value } })} /></Labeled>
          <Labeled label="부제 (줄바꿈 = Enter)"><textarea rows={2} className={ai} value={s.hero.subtitle} onChange={(e) => set({ hero: { ...s.hero, subtitle: e.target.value } })} /></Labeled>
          <Labeled label="배경 이미지 URL"><input className={ai} value={s.hero.image} onChange={(e) => set({ hero: { ...s.hero, image: e.target.value } })} /></Labeled>
        </div>
      </section>

      {/* 연락처/사업자 */}
      <section className="mt-5 rounded-[6px] border border-line bg-ivory p-5">
        <h2 className="font-serif text-lg text-ink">연락처 · 사업자 정보 (푸터)</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Labeled label="브랜드 소개" className="sm:col-span-2"><textarea rows={2} className={ai} value={s.contact.brandDesc} onChange={(e) => set({ contact: { ...s.contact, brandDesc: e.target.value } })} /></Labeled>
          <Labeled label="대표 전화"><input className={ai} value={s.contact.phone} onChange={(e) => set({ contact: { ...s.contact, phone: e.target.value } })} /></Labeled>
          <Labeled label="이메일"><input className={ai} value={s.contact.email} onChange={(e) => set({ contact: { ...s.contact, email: e.target.value } })} /></Labeled>
          <Labeled label="주소"><input className={ai} value={s.contact.address} onChange={(e) => set({ contact: { ...s.contact, address: e.target.value } })} /></Labeled>
          <Labeled label="운영 시간"><input className={ai} value={s.contact.hours} onChange={(e) => set({ contact: { ...s.contact, hours: e.target.value } })} /></Labeled>
          <Labeled label="사업자등록번호"><input className={ai} value={s.contact.businessNo} onChange={(e) => set({ contact: { ...s.contact, businessNo: e.target.value } })} /></Labeled>
          <Labeled label="통신판매업 신고번호"><input className={ai} value={s.contact.mailOrderNo} onChange={(e) => set({ contact: { ...s.contact, mailOrderNo: e.target.value } })} /></Labeled>
          <Labeled label="인스타그램 핸들"><input className={ai} value={s.social.instagram} onChange={(e) => set({ social: { ...s.social, instagram: e.target.value } })} /></Labeled>
        </div>
      </section>

      {/* 배송 정책 */}
      <section className="mt-5 rounded-[6px] border border-line bg-ivory p-5">
        <h2 className="font-serif text-lg text-ink">배송 정책</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Labeled label="무료배송 기준 금액(원)"><input type="number" className={ai} value={s.freeShipThreshold} onChange={(e) => set({ freeShipThreshold: Number(e.target.value) })} /></Labeled>
          <Labeled label="기본 배송비(원)"><input type="number" className={ai} value={s.shippingFee} onChange={(e) => set({ shippingFee: Number(e.target.value) })} /></Labeled>
        </div>
        <p className="mt-2 text-[11px] text-stone">※ 장바구니/주문의 배송비 계산은 코드 상수와도 연동됩니다. 큰 폭의 정책 변경 시 개발자 확인을 권장합니다.</p>
      </section>

      <SaveBar dirty={dirty} saving={saving} onSave={save} message={msg} />
    </div>
  );
}
