import type { Product, Variant } from "./data";
import { WRAP_OPTIONS } from "./data";
import type { CartItem, RibbonMessage } from "./cart-types";

type BuildArgs = {
  variant: Variant;
  wrap?: Variant;
  swatchValue?: string;
  qty?: number;
  ribbon?: RibbonMessage;
  deliveryDate?: string;
};

export function buildCartItem(
  p: Product,
  { variant, wrap, swatchValue, qty = 1, ribbon, deliveryDate }: BuildArgs
): Omit<CartItem, "key"> {
  const unitPrice = p.price + variant.delta + (wrap?.delta ?? 0);
  const labelParts = [variant.label];
  if (wrap) labelParts.push(wrap.label);
  if (swatchValue) labelParts.push(swatchValue);
  // '|'는 어떤 옵션 id/스와치 값에도 등장하지 않는 안전한 구분자 (하이픈 포함 id 충돌 방지)
  const optionId = [variant.id, wrap?.id, swatchValue].filter(Boolean).join("|");
  return {
    productId: p.id,
    name: p.name,
    en: p.en,
    image: p.image,
    palette: p.palette,
    optionId,
    optionLabel: labelParts.join(" / "),
    unitPrice,
    qty,
    ribbon: ribbon && (ribbon.to || ribbon.from || ribbon.body) ? ribbon : undefined,
    deliveryDate,
  };
}

/** 기본 옵션으로 담기 (카드 호버 즉시담기용) */
export function defaultCartItem(p: Product): Omit<CartItem, "key"> {
  return buildCartItem(p, {
    variant: p.variants[0],
    wrap: p.addWrap ? WRAP_OPTIONS[0] : undefined,
    swatchValue: p.swatch?.options[0],
    qty: 1,
  });
}
