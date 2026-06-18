import Link from "next/link";
import type { SiteSettings } from "@/lib/data";

const COLS = [
  {
    title: "SHOP",
    links: [
      ["꽃다발", "/shop?c=bouquet"],
      ["꽃바구니·박스", "/shop?c=basket"],
      ["프리저브드", "/shop?c=preserved"],
      ["화병꽃·구독", "/shop?c=vase"],
    ],
  },
  {
    title: "SERVICE",
    links: [
      ["정기구독", "/subscription"],
      ["기업/단체 주문", "/order/corporate"],
      ["문의하기", "/contact"],
      ["자주 묻는 질문", "/subscription#faq"],
    ],
  },
  {
    title: "ABOUT",
    links: [
      ["브랜드 스토리", "/about"],
      ["저널", "/journal"],
      ["매장 안내", "/about"],
      ["채용", "/about"],
    ],
  },
];

export default function Footer({
  contact,
  social,
}: {
  contact: SiteSettings["contact"];
  social: SiteSettings["social"];
}) {
  return (
    <footer className="bg-ink text-ivory">
      {/* 뉴스레터 */}
      <div className="border-b border-white/10">
        <div className="container-x grid gap-8 py-14 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow text-blush">NEWSLETTER</p>
            <h3 className="display mt-3 text-3xl text-ivory md:text-4xl">
              가장 먼저 받아보는
              <br />
              계절의 꽃 소식
            </h3>
          </div>
          <form className="flex w-full items-center gap-3 md:justify-end">
            <input
              type="email"
              required
              placeholder="이메일 주소를 입력해 주세요"
              className="w-full max-w-sm rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-blush focus:outline-none"
            />
            <button type="submit" className="btn shrink-0 bg-blush text-ink hover:bg-ivory">
              구독
            </button>
          </form>
        </div>
      </div>

      {/* 링크 */}
      <div className="container-x grid gap-10 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Link href="/" className="font-serif text-2xl">
            드디어 플라워
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
            {contact.brandDesc}
          </p>
          <div className="mt-6 flex gap-3">
            {["Instagram", "Kakao", "Blog"].map((s) => (
              <Link
                key={s}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[10px] tracking-wide transition hover:border-blush hover:text-blush"
                aria-label={s}
              >
                {s[0]}
              </Link>
            ))}
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-medium tracking-widest text-ivory/50">{col.title}</p>
            <ul className="mt-4 space-y-3 text-sm text-ivory/80">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="link-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 사업자 정보 */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-7 text-[11px] leading-relaxed text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>
            드디어 플라워 · 대표 김드디 · {contact.address} · 사업자등록번호{" "}
            {contact.businessNo} · 통신판매업 {contact.mailOrderNo}
            <br />
            고객센터 {contact.phone} ({contact.hours}) · {contact.email}
          </p>
          <p className="shrink-0">© 2026 DEUDIEO FLOWER · {social.instagram}</p>
        </div>
      </div>
    </footer>
  );
}
