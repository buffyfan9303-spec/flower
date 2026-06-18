import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";
import { getCatalog } from "@/lib/catalog-store";

export const metadata: Metadata = {
  title: "전체 상품",
  description: "플로리스트가 매일 새롭게 디자인하는 드디어 플라워의 꽃다발·꽃바구니·프리저브드.",
};

export default async function ShopPage() {
  const { products, collections } = await getCatalog();
  const visible = products.filter((p) => !p.hidden);
  return <ShopClient products={visible} collections={collections} />;
}
