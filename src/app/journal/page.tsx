import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";

export const metadata: Metadata = {
  title: "저널",
  description: "꽃과 함께하는 삶의 이야기, 드디어 플라워 저널.",
};

const posts = [
  {
    cat: "FLOWER GUIDE",
    title: "오래 보는 꽃, 이렇게 관리하세요",
    excerpt: "물 갈이부터 줄기 손질까지, 꽃을 오래 즐기는 다섯 가지 팁.",
    date: "2026.06.10",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
    palette: ["#E3C2BB", "#C99B92"] as [string, string],
  },
  {
    cat: "SEASON",
    title: "6월의 제철 꽃, 작약 이야기",
    excerpt: "초여름 가장 화려하게 피어나는 작약의 매력과 어울리는 공간.",
    date: "2026.06.03",
    image:
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?auto=format&fit=crop&w=900&q=80",
    palette: ["#E9C8C2", "#D49C94"] as [string, string],
  },
  {
    cat: "GIFT",
    title: "마음을 전하는 꽃 선물 고르기",
    excerpt: "상황별, 관계별로 어울리는 꽃과 컬러를 골라드립니다.",
    date: "2026.05.27",
    image:
      "https://images.unsplash.com/photo-1469259943454-aa100abba749?auto=format&fit=crop&w=900&q=80",
    palette: ["#9AA48C", "#6F7A63"] as [string, string],
  },
  {
    cat: "INTERIOR",
    title: "작은 화병으로 공간 분위기 바꾸기",
    excerpt: "한 송이의 꽃이 만드는 공간의 변화, 스타일링 가이드.",
    date: "2026.05.20",
    image:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=900&q=80",
    palette: ["#EDE7DD", "#C9C0B2"] as [string, string],
  },
];

export default function JournalPage() {
  const [lead, ...rest] = posts;
  return (
    <div className="pt-24 lg:pt-28">
      <section className="container-x py-8 text-center lg:py-10">
        <p className="eyebrow">JOURNAL</p>
        <h1 className="display mt-3 text-4xl lg:text-6xl">드디어 저널</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-stone">
          꽃과 함께하는 삶을 더 풍요롭게 하는 이야기들.
        </p>
      </section>

      {/* 대표 글 */}
      <section className="container-x pb-12">
        <Reveal>
          <Link
            href="#"
            className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
          >
            <div className="overflow-hidden rounded-[6px]">
              <SmartImage
                src={lead.image}
                alt={lead.title}
                palette={lead.palette}
                ratio="aspect-[4/3]"
                className="transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div>
              <p className="eyebrow">{lead.cat}</p>
              <h2 className="display mt-3 text-3xl leading-tight lg:text-4xl">
                {lead.title}
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-stone">
                {lead.excerpt}
              </p>
              <p className="mt-6 text-xs tracking-wide text-stone">
                {lead.date}
              </p>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* 글 목록 */}
      <section className="container-x py-12 lg:py-20">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal as="article" key={p.title} delay={i * 90}>
              <Link href="#" className="group block">
                <div className="overflow-hidden rounded-[4px]">
                  <SmartImage
                    src={p.image}
                    alt={p.title}
                    palette={p.palette}
                    ratio="aspect-[4/3]"
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow mt-5">{p.cat}</p>
                <h3 className="mt-2 text-lg font-medium leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {p.excerpt}
                </p>
                <p className="mt-4 text-xs tracking-wide text-stone">{p.date}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
