import Link from "next/link";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import ProductCard from "@/components/ProductCard";
import Countdown from "@/components/Countdown";
import { testimonials, steps, instagram } from "@/lib/data";
import { getCatalog, getSettings } from "@/lib/catalog-store";

export default async function Home() {
  const [{ collections, events, products }, settings] = await Promise.all([
    getCatalog(),
    getSettings(),
  ]);
  const visible = products.filter((p) => !p.hidden);
  const best = visible.slice(0, 8);
  const hero = settings.hero;

  return (
    <>
      {/* ───────────────── HERO ───────────────── */}
      <section className="relative h-[80svh] min-h-[540px] w-full lg:h-[86svh]">
        <div className="absolute inset-0">
          <SmartImage
            src={hero.image}
            alt="드디어 플라워 시그니처 부케"
            palette={["#C99B92", "#6F7A63"]}
            ratio=""
            className="h-full w-full animate-kenburns"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/15 to-ink/55" />

        <div className="container-x relative z-10 flex h-full flex-col items-center justify-center text-center text-ivory">
          <p className="eyebrow animate-fade-in text-ivory/80">{hero.eyebrow}</p>
          <h1 className="display mt-4 animate-fade-up text-4xl sm:text-5xl lg:text-7xl">
            {hero.title.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p
            className="mt-5 max-w-md animate-fade-up text-balance text-sm leading-relaxed text-ivory/85 sm:text-base"
            style={{ animationDelay: "120ms" }}
          >
            {hero.subtitle.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
          <div
            className="mt-7 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Link href="/shop" className="btn bg-ivory text-ink hover:bg-blush">
              꽃 둘러보기
            </Link>
            <Link
              href="/subscription"
              className="btn border border-ivory/50 text-ivory hover:bg-ivory hover:text-ink"
            >
              정기구독 시작하기
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-ivory/70">
          <span className="flex flex-col items-center gap-2 text-[10px] tracking-widest2">
            SCROLL
            <span className="h-8 w-px animate-pulse bg-ivory/50" />
          </span>
        </div>
      </section>

      {/* ───────────────── 당일배송 카운트다운 ───────────────── */}
      <section className="border-b border-line bg-blush/15">
        <div className="container-x flex items-center justify-center py-3">
          <Countdown compact />
        </div>
      </section>

      {/* ───────────────── 신뢰 바 ───────────────── */}
      <section className="border-b border-line bg-ivory">
        <div className="container-x grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {[
            ["당일 입고", "매일 새벽 시장 직거래"],
            ["서울 당일배송", "오후 2시 이전 주문 시"],
            ["전국 새벽배송", "내일 아침 문 앞으로"],
            ["신선도 책임 보장", "100% 교환·환불"],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 70} className="px-2 py-5 text-center md:py-6">
              <p className="text-sm font-medium text-ink">{t}</p>
              <p className="mt-1 text-xs text-stone">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────── 컬렉션 ───────────────── */}
      <section className="container-x py-14 lg:py-20">
        <Reveal className="mb-8 flex items-end justify-between lg:mb-12">
          <div>
            <p className="eyebrow">COLLECTIONS</p>
            <h2 className="display mt-2 text-3xl lg:text-5xl">계절을 담은 컬렉션</h2>
          </div>
          <Link href="/shop" className="hidden text-sm text-stone link-underline sm:block">
            전체 보기
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-10">
          {collections.map((c, i) => (
            <Reveal as="article" key={c.slug} delay={i * 70}>
              <Link href={`/shop?c=${c.slug}`} className="group block">
                <div className="overflow-hidden rounded-[4px]">
                  <SmartImage
                    src={c.image}
                    alt={c.name}
                    palette={c.palette}
                    label={c.name}
                    ratio="aspect-[4/5] sm:aspect-square"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-3">
                  <p className="font-serif text-xs italic tracking-wide text-stone">{c.en}</p>
                  <h3 className="mt-0.5 text-base font-medium text-ink">{c.name}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────── 베스트셀러 ───────────────── */}
      <section className="bg-ivory py-14 lg:py-20">
        <div className="container-x">
          <Reveal className="mb-8 flex items-end justify-between lg:mb-12">
            <div>
              <p className="eyebrow">BEST SELLERS</p>
              <h2 className="display mt-2 text-3xl lg:text-5xl">지금 가장 사랑받는 꽃</h2>
            </div>
            <Link href="/shop" className="hidden text-sm text-stone link-underline sm:block">
              전체 보기
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-y-10">
            {best.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── 시즌 기획전 ───────────────── */}
      <section className="container-x py-14 lg:py-20">
        <Reveal className="mb-8 text-center lg:mb-10">
          <p className="eyebrow">SEASONAL</p>
          <h2 className="display mt-2 text-3xl lg:text-4xl">지금의 기획전</h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {events.map((ev, i) => (
            <Reveal as="article" key={ev.slug} delay={i * 80}>
              <Link href={`/event/${ev.slug}`} className="group relative block overflow-hidden rounded-[6px]">
                <SmartImage
                  src={`https://images.unsplash.com/photo-${
                    ["1490750967868-88aa4486c946", "1455659817273-f96807779a8a", "1416879595882-3373a0480b5b"][i]
                  }?auto=format&fit=crop&w=900&q=80`}
                  alt={ev.name}
                  palette={ev.palette}
                  ratio="aspect-[16/10]"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/65 to-transparent p-5 text-ivory">
                  <p className="font-serif text-xs italic text-ivory/80">{ev.en}</p>
                  <h3 className="mt-0.5 text-xl font-medium">{ev.name}</h3>
                  <p className="mt-1 text-xs text-ivory/80">{ev.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────── 브랜드 스토리 ───────────────── */}
      <section className="bg-ivory py-14 lg:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3">
              <SmartImage
                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=80"
                alt="플로리스트의 작업"
                palette={["#E3C2BB", "#C99B92"]}
                ratio="aspect-[4/5]"
                className="rounded-[4px]"
              />
              <SmartImage
                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=700&q=80"
                alt="작업실의 꽃"
                palette={["#9AA48C", "#6F7A63"]}
                ratio="aspect-[4/5]"
                className="mt-8 rounded-[4px]"
              />
            </div>
          </Reveal>

          <Reveal delay={100} className="order-1 lg:order-2">
            <p className="eyebrow">OUR PROMISE</p>
            <h2 className="display mt-2 text-3xl leading-tight lg:text-5xl">
              꽃을 고르는 마음까지
              <br />
              함께 전합니다
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-stone">
              드디어 플라워는 남대문 꽃시장에서 매일 새벽 가장 좋은 상태의 꽃만
              선별합니다. 10년 경력의 플로리스트가 한 송이씩 직접 다듬고
              디자인해, 받는 분의 하루가 조금 더 환해지길 바랍니다.
            </p>
            <ul className="mt-6 space-y-3">
              {["당일 입고된 가장 신선한 꽃", "플로리스트 1:1 핸드메이드 디자인", "꽃이 다치지 않는 전용 패키지"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-ink">
                  <span className="text-sage">✦</span>
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn-outline mt-7">브랜드 스토리 보기</Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── 정기구독 배너 ───────────────── */}
      <section className="relative overflow-hidden bg-sage-dark text-ivory">
        <div className="container-x grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <Reveal>
            <p className="eyebrow text-blush">SUBSCRIPTION</p>
            <h2 className="display mt-2 text-3xl text-ivory lg:text-5xl">
              매주, 당신의 공간에
              <br />
              계절을 배달합니다
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-ivory/80">
              매주 또는 격주, 플로리스트가 큐레이션한 제철 꽃을 정기적으로
              받아보세요. 약정 없이 언제든 일시정지·해지가 가능하고, 첫 달은 10%
              할인됩니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/subscription/apply" className="btn bg-ivory text-ink hover:bg-blush">
                구독 시작하기
              </Link>
              <Link href="/subscription" className="btn border border-ivory/40 text-ivory hover:bg-ivory hover:text-ink">
                요금제 살펴보기
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SmartImage
              src="https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1000&q=80"
              alt="정기구독 꽃"
              palette={["#9AA48C", "#515B47"]}
              ratio="aspect-[5/4] lg:aspect-[4/3]"
              className="rounded-[4px]"
            />
          </Reveal>
        </div>
      </section>

      {/* ───────────────── 제작 과정 ───────────────── */}
      <section className="container-x py-14 lg:py-20">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2 className="display mt-2 text-3xl lg:text-5xl">이렇게 준비됩니다</h2>
        </Reveal>
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.no} delay={i * 80} className="text-center">
              <span className="font-serif text-4xl text-blush-dark lg:text-5xl">{s.no}</span>
              <h3 className="mt-3 text-lg font-medium text-ink">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-stone">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────── 후기 ───────────────── */}
      <section className="bg-ivory py-14 lg:py-20">
        <div className="container-x">
          <Reveal className="mb-10 text-center">
            <p className="eyebrow">REVIEWS</p>
            <h2 className="display mt-2 text-3xl lg:text-5xl">받은 분들의 이야기</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <Reveal
                as="article"
                key={t.name}
                delay={i * 70}
                className="flex h-full flex-col rounded-[4px] border border-line bg-cream p-6"
              >
                <div className="text-gold">★★★★★</div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink">“{t.body}”</p>
                <div className="mt-5 text-xs text-stone">
                  <span className="font-medium text-ink">{t.name}</span> · {t.meta}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── 인스타그램 ───────────────── */}
      <section className="container-x py-14 lg:py-20">
        <Reveal className="mb-8 text-center">
          <p className="eyebrow">INSTAGRAM</p>
          <h2 className="display mt-2 text-3xl lg:text-4xl">@deudieo.flower</h2>
        </Reveal>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {instagram.map((g, i) => (
            <Reveal key={i} delay={(i % 6) * 50}>
              <Link href="#" className="group block overflow-hidden rounded-[4px]">
                <SmartImage
                  src={g.image}
                  alt={`인스타그램 게시물 ${i + 1}`}
                  palette={g.palette}
                  ratio="aspect-square"
                  className="transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
