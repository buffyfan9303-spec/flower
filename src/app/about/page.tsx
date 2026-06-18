import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";

export const metadata: Metadata = {
  title: "브랜드 스토리",
  description: "드디어 플라워의 시작과 약속, 그리고 꽃을 다루는 마음.",
};

const values = [
  {
    t: "Freshness",
    k: "신선함",
    d: "매일 새벽 시장에서 가장 좋은 상태의 꽃만 골라옵니다. 어제의 꽃은 두지 않습니다.",
  },
  {
    t: "Craft",
    k: "정성",
    d: "10년 경력 플로리스트가 한 송이씩 직접 다듬고 디자인합니다. 같은 꽃다발은 없습니다.",
  },
  {
    t: "Care",
    k: "배려",
    d: "받는 분의 공간과 마음까지 생각합니다. 꽃이 다치지 않도록 끝까지 살핍니다.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 lg:pt-28">
      {/* 인트로 */}
      <section className="container-x py-10 text-center lg:py-14">
        <Reveal>
          <p className="eyebrow">ABOUT US</p>
          <h1 className="display mx-auto mt-4 max-w-3xl text-4xl leading-tight lg:text-6xl">
            “드디어, 당신에게
            <br />
            어울리는 꽃을 만났습니다”
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance leading-relaxed text-stone">
            드디어 플라워는 ‘꽃을 고르는 일이 더는 어렵지 않기를’ 바라는 마음에서
            시작했습니다. 당신의 오늘과 가장 잘 어울리는 한 다발을, 우리가 대신
            골라드립니다.
          </p>
        </Reveal>
      </section>

      {/* 대표 이미지 */}
      <Reveal className="container-x">
        <SmartImage
          src="https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1900&q=80"
          alt="드디어 플라워 작업실"
          palette={["#C99B92", "#6F7A63"]}
          ratio="aspect-[21/9]"
          className="rounded-[6px]"
        />
      </Reveal>

      {/* 스토리 1 */}
      <section className="container-x py-14 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">OUR STORY</p>
            <h2 className="display mt-3 text-3xl leading-tight lg:text-4xl">
              작은 꽃집에서
              <br />
              시작된 이야기
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-stone">
              <p>
                2026년, 성수동의 작은 작업실에서 드디어 플라워가 문을 열었습니다.
                좋은 꽃을 합리적인 가격에, 그리고 무엇보다 ‘정성스럽게’ 전하고
                싶다는 단순한 마음이 전부였습니다.
              </p>
              <p>
                지금도 그 마음은 변하지 않았습니다. 매일 새벽 직접 꽃을 고르고,
                한 다발 한 다발 손으로 묶습니다. 우리에게 꽃은 상품이 아니라,
                누군가에게 건네는 마음이니까요.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            <SmartImage
              src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=700&q=80"
              alt="꽃 작업"
              palette={["#E3C2BB", "#C99B92"]}
              ratio="aspect-[3/4]"
              className="rounded-[4px]"
            />
            <SmartImage
              src="https://images.unsplash.com/photo-1469259943454-aa100abba749?auto=format&fit=crop&w=700&q=80"
              alt="장미"
              palette={["#9AA48C", "#6F7A63"]}
              ratio="aspect-[3/4]"
              className="mt-10 rounded-[4px]"
            />
          </Reveal>
        </div>
      </section>

      {/* 가치 */}
      <section className="bg-ivory py-14 lg:py-20">
        <div className="container-x">
          <Reveal className="mb-14 text-center">
            <p className="eyebrow">OUR VALUES</p>
            <h2 className="display mt-3 text-4xl lg:text-5xl">
              우리가 지키는 세 가지
            </h2>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 100} className="text-center">
                <p className="font-serif text-2xl italic text-blush-dark">
                  {v.t}
                </p>
                <h3 className="mt-2 text-xl font-medium text-ink">{v.k}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-stone">
                  {v.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 숫자 */}
      <section className="container-x py-14 lg:py-20">
        <div className="grid grid-cols-2 gap-y-10 text-center md:grid-cols-4">
          {[
            ["12,000+", "전해드린 꽃다발"],
            ["4.9 / 5", "고객 만족도"],
            ["98%", "재구매·추천율"],
            ["당일", "서울 배송 완료"],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 80}>
              <p className="font-serif text-4xl text-sage-dark lg:text-5xl">
                {n}
              </p>
              <p className="mt-2 text-sm text-stone">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sage-dark text-ivory">
        <div className="container-x py-20 text-center lg:py-24">
          <Reveal>
            <h2 className="display text-4xl text-ivory lg:text-5xl">
              오늘, 누군가에게 꽃을 건네보세요
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-ivory/80">
              드디어 플라워가 당신의 마음을 가장 아름답게 전해드릴게요.
            </p>
            <Link href="/shop" className="btn mt-8 bg-ivory text-ink hover:bg-blush">
              꽃 둘러보기
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
