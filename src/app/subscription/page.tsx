import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { formatKRW } from "@/lib/data";

export const metadata: Metadata = {
  title: "정기구독",
  description: "매주 또는 격주, 플로리스트가 큐레이션한 제철 꽃을 정기적으로.",
};

const plans = [
  {
    name: "데일리",
    en: "Daily",
    price: 29000,
    per: "회",
    desc: "혼자만의 공간을 위한 작은 꽃다발",
    features: ["5~7종 제철 꽃", "1인 가구 추천", "콤팩트 사이즈"],
    highlight: false,
  },
  {
    name: "시그니처",
    en: "Signature",
    price: 49000,
    per: "회",
    desc: "거실과 식탁을 채우는 풍성한 구성",
    features: ["8~10종 제철 꽃", "가장 인기있는 구성", "전용 화병 증정(첫 회)"],
    highlight: true,
  },
  {
    name: "프리미엄",
    en: "Premium",
    price: 79000,
    per: "회",
    desc: "공간을 압도하는 럭셔리 어레인지먼트",
    features: ["12종 이상 프리미엄 꽃", "대형 사이즈", "플로리스트 노트 동봉"],
    highlight: false,
  },
];

const faqs = [
  ["배송 주기는 어떻게 선택하나요?", "매주 / 격주 / 월 1회 중에서 자유롭게 선택할 수 있어요. 마이페이지에서 언제든 변경 가능합니다."],
  ["언제든 해지할 수 있나요?", "네, 약정 기간 없이 다음 결제일 전까지 일시정지 또는 해지하실 수 있습니다."],
  ["어떤 꽃이 오나요?", "그 주 가장 신선하고 아름다운 제철 꽃을 플로리스트가 직접 큐레이션합니다. 매번 다른 꽃을 만나보세요."],
  ["배송은 어떻게 되나요?", "서울은 당일·새벽배송, 그 외 지역은 새벽배송으로 신선하게 받아보실 수 있습니다."],
];

export default function SubscriptionPage() {
  return (
    <div className="pt-24 lg:pt-28">
      {/* 히어로 */}
      <section className="container-x py-10 lg:py-14">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">SUBSCRIPTION</p>
            <h1 className="display mt-4 text-4xl leading-tight lg:text-6xl">
              일상이 꽃으로
              <br />
              물드는 순간
            </h1>
            <p className="mt-6 max-w-md leading-relaxed text-stone">
              매주, 혹은 격주마다 플로리스트가 고른 제철 꽃이 문 앞으로
              찾아옵니다. 꽃을 고르는 수고는 우리에게 맡기고, 당신은 누리기만
              하세요.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/subscription/apply" className="btn-primary">
                구독 시작하기
              </Link>
              <Link href="#plans" className="btn-outline">
                요금제 보기
              </Link>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-sage-dark">
              {["약정 없음", "언제든 일시정지·해지", "첫 달 10% 할인"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <span>✦</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <SmartImage
              src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=80"
              alt="정기구독 꽃"
              palette={["#9AA48C", "#515B47"]}
              ratio="aspect-[4/5] lg:aspect-[4/3]"
              className="rounded-[6px]"
            />
          </Reveal>
        </div>
      </section>

      {/* 요금제 */}
      <section id="plans" className="bg-ivory py-14 lg:py-20">
        <div className="container-x">
          <Reveal className="mb-10 text-center">
            <p className="eyebrow">PLANS</p>
            <h2 className="display mt-3 text-4xl lg:text-5xl">
              취향에 맞는 구독을
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-stone">
              모든 요금제는 배송비 포함, 첫 달 10% 할인이 적용됩니다.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal
                as="article"
                key={p.name}
                delay={i * 100}
                className={`flex flex-col rounded-[6px] border p-8 ${
                  p.highlight
                    ? "border-sage-dark bg-sage-dark text-ivory shadow-xl"
                    : "border-line bg-cream"
                }`}
              >
                {p.highlight && (
                  <span className="mb-4 w-fit rounded-full bg-blush px-3 py-1 text-[10px] font-semibold tracking-wider text-ink">
                    가장 인기
                  </span>
                )}
                <p
                  className={`font-serif text-sm italic ${
                    p.highlight ? "text-blush" : "text-stone"
                  }`}
                >
                  {p.en}
                </p>
                <h3 className="mt-1 text-2xl font-medium">{p.name}</h3>
                <p
                  className={`mt-2 text-sm ${
                    p.highlight ? "text-ivory/80" : "text-stone"
                  }`}
                >
                  {p.desc}
                </p>
                <div className="mt-6 flex items-end gap-1">
                  <span className="font-serif text-4xl">
                    {formatKRW(p.price)}
                  </span>
                  <span
                    className={`mb-1 text-sm ${
                      p.highlight ? "text-ivory/70" : "text-stone"
                    }`}
                  >
                    / {p.per}
                  </span>
                </div>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className={p.highlight ? "text-blush" : "text-sage"}>
                        ✦
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/subscription/apply"
                  className={`btn mt-8 ${
                    p.highlight
                      ? "bg-ivory text-ink hover:bg-blush"
                      : "bg-sage-dark text-ivory hover:bg-ink"
                  }`}
                >
                  구독 시작하기
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 진행 방식 */}
      <section className="container-x py-14 lg:py-20">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2 className="display mt-3 text-4xl lg:text-5xl">구독은 이렇게</h2>
        </Reveal>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "요금제 선택", "데일리·시그니처·프리미엄 중 선택"],
            ["02", "주기 설정", "매주·격주·월 1회 자유롭게"],
            ["03", "큐레이션", "플로리스트가 제철 꽃 구성"],
            ["04", "정기 배송", "신선하게 문 앞까지 배송"],
          ].map(([no, t, d], i) => (
            <Reveal key={no} delay={i * 90} className="text-center">
              <span className="font-serif text-5xl text-blush-dark">{no}</span>
              <h3 className="mt-4 text-lg font-medium text-ink">{t}</h3>
              <p className="mx-auto mt-2 max-w-[14rem] text-sm leading-relaxed text-stone">
                {d}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 bg-ivory py-14 lg:py-20">
        <div className="container-x max-w-3xl">
          <Reveal className="mb-12 text-center">
            <p className="eyebrow">FAQ</p>
            <h2 className="display mt-3 text-4xl lg:text-5xl">자주 묻는 질문</h2>
          </Reveal>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map(([q, a], i) => (
              <Reveal as="div" key={q} delay={i * 70}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-left text-base font-medium text-ink">
                    {q}
                    <span className="ml-4 text-stone transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
