import Link from "next/link";
import { getCatalog } from "@/lib/catalog-store";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { products, collections, events } = await getCatalog();
  const visible = products.filter((p) => !p.hidden).length;
  const hidden = products.length - visible;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const soldOut = products.filter((p) => p.stock <= 0).length;

  const stats = [
    { label: "전체 상품", value: products.length, sub: `노출 ${visible} · 숨김 ${hidden}` },
    { label: "재고 임박", value: lowStock, sub: "5개 이하" },
    { label: "품절", value: soldOut, sub: "재고 0" },
    { label: "컬렉션 / 기획전", value: `${collections.length} / ${events.length}`, sub: "" },
  ];

  const links = [
    { href: "/admin/products", title: "상품 관리", desc: "금액·이미지·재고·순서·노출 설정" },
    { href: "/admin/collections", title: "컬렉션·기획전", desc: "카테고리와 시즌 기획전 관리" },
    { href: "/admin/settings", title: "사이트 설정", desc: "공지·히어로·연락처·배송 정책" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">대시보드</h1>
      <p className="mt-1 text-sm text-stone">드디어 플라워 콘텐츠를 한 곳에서 관리하세요.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-[6px] border border-line bg-ivory p-5">
            <p className="text-xs text-stone">{s.label}</p>
            <p className="mt-1 font-serif text-3xl text-ink">{s.value}</p>
            {s.sub && <p className="mt-1 text-[11px] text-stone">{s.sub}</p>}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="group rounded-[6px] border border-line bg-ivory p-6 transition hover:border-sage-dark">
            <h2 className="font-serif text-lg text-ink">{l.title}</h2>
            <p className="mt-1 text-sm text-stone">{l.desc}</p>
            <span className="mt-3 inline-block text-sm text-sage-dark group-hover:underline">관리하기 →</span>
          </Link>
        ))}
      </div>

      <p className="mt-8 rounded-[6px] border border-line bg-ivory p-4 text-[12px] leading-relaxed text-stone">
        ⓘ 변경 사항은 저장 즉시 공개 사이트에 반영됩니다. 현재는 서버 파일(<code>content/*.json</code>)에
        저장되며, Vercel 등 서버리스 배포 시에는 데이터베이스(Supabase) 연동이 필요합니다.
      </p>
    </div>
  );
}
