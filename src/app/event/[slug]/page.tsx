import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Countdown from "@/components/Countdown";
import SmartImage from "@/components/SmartImage";
import { getCatalog } from "@/lib/catalog-store";
import type { Product } from "@/lib/data";

export async function generateStaticParams() {
  const { events } = await getCatalog();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { events } = await getCatalog();
  const ev = events.find((e) => e.slug === params.slug);
  if (!ev) return { title: "기획전을 찾을 수 없습니다" };
  return { title: `${ev.name}`, description: ev.desc };
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const { events, products } = await getCatalog();
  const ev = events.find((e) => e.slug === params.slug);
  if (!ev) notFound();
  const list = ev.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p) && !p!.hidden);

  return (
    <div className="pt-24 lg:pt-28">
      {/* 히어로 */}
      <section className="relative h-[44svh] min-h-[320px] w-full">
        <div className="absolute inset-0">
          <SmartImage
            src={`https://images.unsplash.com/photo-${
              { graduation: "1508610048659-a06b669e3321", parents: "1455659817273-f96807779a8a", opening: "1416879595882-3373a0480b5b" }[ev.slug] ?? "1490750967868-88aa4486c946"
            }?auto=format&fit=crop&w=1900&q=80`}
            alt={ev.name}
            palette={ev.palette}
            ratio=""
            className="h-full w-full"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-ink/40" />
        <div className="container-x relative z-10 flex h-full flex-col items-center justify-center text-center text-ivory">
          <p className="eyebrow text-ivory/80">{ev.en}</p>
          <h1 className="display mt-3 text-4xl lg:text-6xl">{ev.name}</h1>
          <p className="mt-3 max-w-md text-sm text-ivory/85">{ev.desc}</p>
        </div>
      </section>

      <section className="container-x py-6">
        <Countdown />
      </section>

      <section className="container-x pb-16 lg:pb-20">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-y-10">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
