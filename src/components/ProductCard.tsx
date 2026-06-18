import Link from "next/link";
import SmartImage from "./SmartImage";
import AddToCartButton from "./cart/AddToCartButton";
import { formatKRW, discountRate, type Product } from "@/lib/data";
import { defaultCartItem } from "@/lib/cart-helpers";

const tagStyle: Record<string, string> = {
  BEST: "bg-sage-dark text-ivory",
  NEW: "bg-blush text-ink",
  한정: "bg-gold text-ivory",
};

export default function ProductCard({ product }: { product: Product }) {
  const rate = discountRate(product.price, product.compareAt);
  const soldOut = product.stock <= 0;
  const low = product.stock > 0 && product.stock <= 5;

  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-[4px]">
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-col items-start gap-1">
          {product.tag && (
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider ${tagStyle[product.tag]}`}>
              {product.tag}
            </span>
          )}
          {rate > 0 && (
            <span className="rounded-full bg-blush-dark px-2.5 py-1 text-[10px] font-semibold text-ivory">
              {rate}%
            </span>
          )}
        </div>

        {soldOut && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-ink/45">
            <span className="rounded-full bg-ivory/90 px-4 py-1.5 text-xs font-medium text-ink">
              품절
            </span>
          </div>
        )}

        <SmartImage
          src={product.image}
          alt={product.name}
          palette={product.palette}
          label={product.name}
          ratio="aspect-square sm:aspect-[4/5]"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* 호버 즉시 담기 (품절 제외) */}
        {!soldOut && (
          <div className="absolute inset-x-2.5 bottom-2.5 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-sm:hidden">
            <AddToCartButton
              item={defaultCartItem(product)}
              className="block w-full rounded-full bg-ivory/95 py-2.5 text-center text-xs font-medium tracking-wide text-ink backdrop-blur transition hover:bg-sage-dark hover:text-ivory"
            >
              바로 담기
            </AddToCartButton>
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex items-center gap-1.5 text-[11px] text-stone">
          <span className="text-gold">★</span>
          <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
          <span>({product.reviewCount})</span>
          {low && <span className="ml-auto text-blush-dark">{product.stock}개 남음</span>}
        </div>
        <h3 className="text-[15px] font-medium leading-snug text-ink">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-ink">{formatKRW(product.price)}</span>
          {product.compareAt > product.price && (
            <span className="text-xs text-stone line-through">{formatKRW(product.compareAt)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
