"use client";

import { useEffect, useState } from "react";
import SmartImage from "@/components/SmartImage";
import { ai, Labeled, SaveBar, IconBtn } from "./ui";
import { formatKRW, type Product, type Collection, type EventItem } from "@/lib/data";

type Catalog = { products: Product[]; collections: Collection[]; events: EventItem[] };

const TAGS = ["", "BEST", "NEW", "한정"] as const;

function blankProduct(cat: Catalog): Product {
  return {
    id: "new-" + Date.now().toString(36),
    name: "새 상품",
    en: "New Product",
    price: 50000,
    compareAt: 0,
    category: cat.collections[0]?.slug ?? "bouquet",
    tag: "",
    desc: "",
    detail: "",
    flowers: [],
    care: "",
    rating: 5,
    reviewCount: 0,
    stock: 10,
    image: "",
    gallery: [],
    palette: ["#E3C2BB", "#C99B92"],
    variants: [{ id: "basic", label: "기본", delta: 0 }],
    addWrap: false,
    hidden: false,
  };
}

export default function ProductsManager() {
  const [cat, setCat] = useState<Catalog | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [msg, setMsg] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/catalog")
      .then((r) => r.json())
      .then((j) => j.ok && setCat(j.catalog))
      .catch(() => setMsg("불러오기 실패"));
  }, []);

  if (!cat) return <p className="text-sm text-stone">불러오는 중…</p>;

  const products = cat.products;
  const touch = (next: Product[]) => {
    setCat({ ...cat, products: next });
    setDirty(true);
    setMsg("");
  };
  const patch = (i: number, p: Partial<Product>) =>
    touch(products.map((x, idx) => (idx === i ? { ...x, ...p } : x)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= products.length) return;
    const next = [...products];
    [next[i], next[j]] = [next[j], next[i]];
    touch(next);
  };
  const remove = (i: number) => {
    if (!confirm(`"${products[i].name}" 상품을 삭제할까요?`)) return;
    touch(products.filter((_, idx) => idx !== i));
  };
  const addNew = () => {
    const p = blankProduct(cat);
    touch([...products, p]);
    setOpenId(p.id);
  };

  async function save() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/catalog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ catalog: cat }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) {
        setDirty(false);
        setMsg("저장되었습니다 ✓");
      } else setMsg(j.error || "저장 실패");
    } catch {
      setMsg("네트워크 오류");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl text-ink">상품 관리</h1>
          <p className="mt-1 text-sm text-stone">금액·이미지·재고·노출·순서를 관리하세요. 위/아래 화살표로 진열 순서를 바꿉니다.</p>
        </div>
        <button onClick={addNew} className="btn-outline shrink-0">+ 상품 추가</button>
      </div>

      <div className="mt-6 space-y-3">
        {products.map((p, i) => (
          <div key={p.id} className="rounded-[6px] border border-line bg-ivory">
            {/* 요약 행 */}
            <div className="flex items-center gap-3 p-3">
              <div className="flex flex-col gap-1">
                <IconBtn onClick={() => move(i, -1)} title="위로" disabled={i === 0}>▲</IconBtn>
                <IconBtn onClick={() => move(i, 1)} title="아래로" disabled={i === products.length - 1}>▼</IconBtn>
              </div>
              <div className="h-14 w-14 shrink-0">
                <SmartImage src={p.image} alt={p.name} palette={p.palette} ratio="aspect-square" className="rounded-[4px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">
                  {p.name} {p.hidden && <span className="text-[10px] text-stone">(숨김)</span>}
                </p>
                <p className="text-xs text-stone">
                  {formatKRW(p.price)} · 재고 {p.stock} · {p.category}{p.tag ? ` · ${p.tag}` : ""}
                </p>
              </div>
              <label className="flex items-center gap-1 text-[11px] text-stone">
                <input type="checkbox" checked={!p.hidden} onChange={(e) => patch(i, { hidden: !e.target.checked })} className="accent-sage-dark" />
                노출
              </label>
              <button onClick={() => setOpenId(openId === p.id ? null : p.id)} className="rounded-[4px] border border-line px-3 py-1.5 text-xs text-ink hover:border-ink">
                {openId === p.id ? "닫기" : "편집"}
              </button>
              <IconBtn onClick={() => remove(i)} title="삭제">✕</IconBtn>
            </div>

            {/* 편집 패널 */}
            {openId === p.id && (
              <div className="space-y-4 border-t border-line p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Labeled label="상품명"><input className={ai} value={p.name} onChange={(e) => patch(i, { name: e.target.value })} /></Labeled>
                  <Labeled label="영문명"><input className={ai} value={p.en} onChange={(e) => patch(i, { en: e.target.value })} /></Labeled>
                  <Labeled label="판매가(원)"><input type="number" className={ai} value={p.price} onChange={(e) => patch(i, { price: Number(e.target.value) })} /></Labeled>
                  <Labeled label="정가(원, 0이면 미표시)"><input type="number" className={ai} value={p.compareAt} onChange={(e) => patch(i, { compareAt: Number(e.target.value) })} /></Labeled>
                  <Labeled label="카테고리">
                    <select className={ai} value={p.category} onChange={(e) => patch(i, { category: e.target.value })}>
                      {cat.collections.map((c) => <option key={c.slug} value={c.slug}>{c.name} ({c.slug})</option>)}
                    </select>
                  </Labeled>
                  <Labeled label="태그">
                    <select className={ai} value={p.tag ?? ""} onChange={(e) => patch(i, { tag: e.target.value as Product["tag"] })}>
                      {TAGS.map((t) => <option key={t} value={t}>{t || "없음"}</option>)}
                    </select>
                  </Labeled>
                  <Labeled label="재고"><input type="number" className={ai} value={p.stock} onChange={(e) => patch(i, { stock: Number(e.target.value) })} /></Labeled>
                  <div className="grid grid-cols-2 gap-3">
                    <Labeled label="평점(0~5)"><input type="number" step="0.1" className={ai} value={p.rating} onChange={(e) => patch(i, { rating: Number(e.target.value) })} /></Labeled>
                    <Labeled label="후기 수"><input type="number" className={ai} value={p.reviewCount} onChange={(e) => patch(i, { reviewCount: Number(e.target.value) })} /></Labeled>
                  </div>
                </div>

                <Labeled label="대표 이미지 URL"><input className={ai} value={p.image} onChange={(e) => patch(i, { image: e.target.value })} placeholder="https:// 또는 /products/foo.jpg" /></Labeled>
                <Labeled label="갤러리 이미지 URL (한 줄에 하나)">
                  <textarea rows={3} className={ai} value={p.gallery.join("\n")} onChange={(e) => patch(i, { gallery: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })} />
                </Labeled>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Labeled label="한 줄 설명"><input className={ai} value={p.desc} onChange={(e) => patch(i, { desc: e.target.value })} /></Labeled>
                  <Labeled label="주요 꽃 (쉼표로 구분)"><input className={ai} value={p.flowers.join(", ")} onChange={(e) => patch(i, { flowers: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></Labeled>
                </div>
                <Labeled label="상세 설명"><textarea rows={3} className={ai} value={p.detail} onChange={(e) => patch(i, { detail: e.target.value })} /></Labeled>
                <Labeled label="관리법"><input className={ai} value={p.care} onChange={(e) => patch(i, { care: e.target.value })} /></Labeled>

                {/* 옵션(가격) */}
                <div>
                  <p className="mb-1 text-[11px] font-medium text-stone">옵션 (사이즈/타입) · 첫 항목이 기본값, 증감액은 판매가 기준</p>
                  <div className="space-y-2">
                    {p.variants.map((v, vi) => (
                      <div key={vi} className="flex items-center gap-2">
                        <input className={ai + " flex-1"} placeholder="라벨(예: 미디움)" value={v.label} onChange={(e) => patch(i, { variants: p.variants.map((x, k) => k === vi ? { ...x, label: e.target.value, id: x.id || e.target.value } : x) })} />
                        <input type="number" className={ai + " w-28"} placeholder="증감액" value={v.delta} onChange={(e) => patch(i, { variants: p.variants.map((x, k) => k === vi ? { ...x, delta: Number(e.target.value) } : x) })} />
                        <IconBtn onClick={() => patch(i, { variants: p.variants.filter((_, k) => k !== vi) })} title="옵션 삭제">✕</IconBtn>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => patch(i, { variants: [...p.variants, { id: "opt" + (p.variants.length + 1), label: "옵션", delta: 0 }] })} className="mt-2 text-xs text-sage-dark hover:underline">+ 옵션 추가</button>
                </div>

                {/* 컬러/향 */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <Labeled label="선택 그룹명 (예: 컬러/향, 비우면 미표시)">
                    <input className={ai} value={p.swatch?.name ?? ""} onChange={(e) => patch(i, { swatch: e.target.value ? { name: e.target.value, options: p.swatch?.options ?? [] } : undefined })} />
                  </Labeled>
                  <Labeled label="선택지 (쉼표로 구분)">
                    <input className={ai} value={p.swatch?.options.join(", ") ?? ""} disabled={!p.swatch} onChange={(e) => patch(i, { swatch: { name: p.swatch?.name ?? "옵션", options: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } })} />
                  </Labeled>
                </div>

                <div className="flex flex-wrap items-center gap-5">
                  <label className="flex items-center gap-2 text-sm text-ink">
                    <input type="checkbox" checked={p.addWrap} onChange={(e) => patch(i, { addWrap: e.target.checked })} className="accent-sage-dark" /> 포장 옵션 노출
                  </label>
                  <Labeled label="그라데이션 색(폴백) 2개" className="flex-1">
                    <div className="flex gap-2">
                      <input className={ai} value={p.palette[0]} onChange={(e) => patch(i, { palette: [e.target.value, p.palette[1]] })} />
                      <input className={ai} value={p.palette[1]} onChange={(e) => patch(i, { palette: [p.palette[0], e.target.value] })} />
                    </div>
                  </Labeled>
                </div>

                <Labeled label="상품 ID (URL, 변경 시 기존 링크 깨짐 주의)">
                  <input className={ai} value={p.id} onChange={(e) => patch(i, { id: e.target.value.trim() })} />
                </Labeled>
              </div>
            )}
          </div>
        ))}
      </div>

      <SaveBar dirty={dirty} saving={saving} onSave={save} message={msg} />
    </div>
  );
}
