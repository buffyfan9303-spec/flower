"use client";

import { useEffect, useState } from "react";
import { ai, Labeled, SaveBar, IconBtn } from "./ui";
import type { Product, Collection, EventItem } from "@/lib/data";

type Catalog = { products: Product[]; collections: Collection[]; events: EventItem[] };

export default function CollectionsManager() {
  const [cat, setCat] = useState<Catalog | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/catalog").then((r) => r.json()).then((j) => j.ok && setCat(j.catalog)).catch(() => setMsg("불러오기 실패"));
  }, []);

  if (!cat) return <p className="text-sm text-stone">불러오는 중…</p>;

  const set = (next: Partial<Catalog>) => { setCat({ ...cat, ...next }); setDirty(true); setMsg(""); };

  // ── 컬렉션 ──
  const cols = cat.collections;
  const patchCol = (i: number, p: Partial<Collection>) => set({ collections: cols.map((x, k) => k === i ? { ...x, ...p } : x) });
  const moveCol = (i: number, d: -1 | 1) => { const j = i + d; if (j < 0 || j >= cols.length) return; const n = [...cols]; [n[i], n[j]] = [n[j], n[i]]; set({ collections: n }); };
  const addCol = () => set({ collections: [...cols, { slug: "cat-" + Date.now().toString(36), name: "새 카테고리", en: "New", desc: "", image: "", palette: ["#E3C2BB", "#C99B92"] }] });
  const delCol = (i: number) => { if (confirm("이 카테고리를 삭제할까요? (해당 카테고리 상품은 숨겨질 수 있습니다)")) set({ collections: cols.filter((_, k) => k !== i) }); };

  // ── 기획전 ──
  const evs = cat.events;
  const patchEv = (i: number, p: Partial<EventItem>) => set({ events: evs.map((x, k) => k === i ? { ...x, ...p } : x) });
  const addEv = () => set({ events: [...evs, { slug: "event-" + Date.now().toString(36), name: "새 기획전", en: "New Event", desc: "", productIds: [], palette: ["#E8D5A8", "#C2A567"] }] });
  const delEv = (i: number) => { if (confirm("이 기획전을 삭제할까요?")) set({ events: evs.filter((_, k) => k !== i) }); };
  const toggleEvProduct = (i: number, id: string) => {
    const ev = evs[i];
    const has = ev.productIds.includes(id);
    patchEv(i, { productIds: has ? ev.productIds.filter((x) => x !== id) : [...ev.productIds, id] });
  };

  async function save() {
    setSaving(true); setMsg("");
    try {
      const res = await fetch("/api/admin/catalog", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ catalog: cat }) });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) { setDirty(false); setMsg("저장되었습니다 ✓"); } else setMsg(j.error || "저장 실패");
    } catch { setMsg("네트워크 오류"); } finally { setSaving(false); }
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">컬렉션 · 기획전</h1>
      <p className="mt-1 text-sm text-stone">상품 카테고리와 시즌 기획전을 관리합니다.</p>

      {/* 컬렉션 */}
      <div className="mt-6 flex items-center justify-between">
        <h2 className="font-serif text-xl text-ink">카테고리(컬렉션)</h2>
        <button onClick={addCol} className="btn-outline">+ 추가</button>
      </div>
      <div className="mt-3 space-y-3">
        {cols.map((c, i) => (
          <div key={i} className="rounded-[6px] border border-line bg-ivory p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-stone">진열 순서 {i + 1}</span>
              <div className="flex gap-1">
                <IconBtn onClick={() => moveCol(i, -1)} title="위로" disabled={i === 0}>▲</IconBtn>
                <IconBtn onClick={() => moveCol(i, 1)} title="아래로" disabled={i === cols.length - 1}>▼</IconBtn>
                <IconBtn onClick={() => delCol(i)} title="삭제">✕</IconBtn>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Labeled label="이름"><input className={ai} value={c.name} onChange={(e) => patchCol(i, { name: e.target.value })} /></Labeled>
              <Labeled label="영문명"><input className={ai} value={c.en} onChange={(e) => patchCol(i, { en: e.target.value })} /></Labeled>
              <Labeled label="slug (URL, 상품 카테고리와 일치)"><input className={ai} value={c.slug} onChange={(e) => patchCol(i, { slug: e.target.value.trim() })} /></Labeled>
              <Labeled label="이미지 URL"><input className={ai} value={c.image} onChange={(e) => patchCol(i, { image: e.target.value })} /></Labeled>
              <Labeled label="설명" className="sm:col-span-2"><input className={ai} value={c.desc} onChange={(e) => patchCol(i, { desc: e.target.value })} /></Labeled>
            </div>
          </div>
        ))}
      </div>

      {/* 기획전 */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-serif text-xl text-ink">시즌 기획전</h2>
        <button onClick={addEv} className="btn-outline">+ 추가</button>
      </div>
      <div className="mt-3 space-y-3">
        {evs.map((ev, i) => (
          <div key={i} className="rounded-[6px] border border-line bg-ivory p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-stone">/event/{ev.slug}</span>
              <IconBtn onClick={() => delEv(i)} title="삭제">✕</IconBtn>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Labeled label="이름"><input className={ai} value={ev.name} onChange={(e) => patchEv(i, { name: e.target.value })} /></Labeled>
              <Labeled label="영문명"><input className={ai} value={ev.en} onChange={(e) => patchEv(i, { en: e.target.value })} /></Labeled>
              <Labeled label="slug (URL)"><input className={ai} value={ev.slug} onChange={(e) => patchEv(i, { slug: e.target.value.trim() })} /></Labeled>
              <Labeled label="설명"><input className={ai} value={ev.desc} onChange={(e) => patchEv(i, { desc: e.target.value })} /></Labeled>
            </div>
            <div className="mt-3">
              <p className="mb-1.5 text-[11px] font-medium text-stone">포함 상품 선택</p>
              <div className="flex flex-wrap gap-2">
                {cat.products.map((p) => {
                  const on = ev.productIds.includes(p.id);
                  return (
                    <button key={p.id} onClick={() => toggleEvProduct(i, p.id)} className={`rounded-full border px-3 py-1.5 text-xs transition ${on ? "border-sage-dark bg-sage-dark text-ivory" : "border-line text-stone hover:border-ink hover:text-ink"}`}>
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SaveBar dirty={dirty} saving={saving} onSave={save} message={msg} />
    </div>
  );
}
