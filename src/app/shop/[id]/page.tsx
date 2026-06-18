import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/detail/ProductDetailClient";
import ProductCard from "@/components/ProductCard";
import SmartImage from "@/components/SmartImage";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { addons, formatKRW } from "@/lib/data";
import { getCatalog, getProductById, getRelated } from "@/lib/catalog-store";

export async function generateStaticParams() {
  const { products } = await getCatalog();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = await getProductById(params.id);
  if (!p) return { title: "상품을 찾을 수 없습니다" };
  return {
    title: p.name,
    description: `${p.desc} · ${formatKRW(p.price)} · 드디어 플라워`,
    openGraph: { title: p.name, description: p.desc },
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) notFound();
  const related = await getRelated(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.detail,
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "KRW",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="pt-24 lg:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 브레드크럼 */}
      <div className="container-x py-4 text-xs text-stone">
        <Link href="/" className="hover:text-ink">홈</Link>
        <span className="mx-1.5">/</span>
        <Link href="/shop" className="hover:text-ink">SHOP</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink">{product.name}</span>
      </div>

      <section className="container-x pb-16 lg:pb-20">
        <ProductDetailClient product={product} />
      </section>

      {/* 함께하면 좋아요 (크로스셀) */}
      <section className="bg-ivory py-14 lg:py-20">
        <div className="container-x">
          <h2 className="display mb-6 text-2xl lg:text-3xl">함께하면 좋아요</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {addons.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-[4px] border border-line bg-cream p-3">
                <div className="w-16 shrink-0">
                  <SmartImage src={a.image} alt={a.name} palette={a.palette} ratio="aspect-square" className="rounded-[3px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink">{a.name}</p>
                  <p className="text-xs text-stone">{formatKRW(a.price)}</p>
                  <AddToCartButton
                    item={{
                      productId: a.id,
                      name: a.name,
                      en: a.name,
                      image: a.image,
                      palette: a.palette,
                      optionId: "default",
                      optionLabel: "기본",
                      unitPrice: a.price,
                      qty: 1,
                    }}
                    className="mt-1 text-xs text-sage-dark underline-offset-2 hover:underline"
                  >
                    + 담기
                  </AddToCartButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연관 상품 */}
      <section className="container-x py-14 lg:py-20">
        <h2 className="display mb-6 text-2xl lg:text-3xl">이런 상품은 어떠세요</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-y-10">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
