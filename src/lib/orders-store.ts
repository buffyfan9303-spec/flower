// 주문/문의/구독을 Supabase에 저장 (best-effort: 미설정·실패해도 throw하지 않음 → 주문 흐름 보호).
import { getSupabase } from "./supabase";

async function insert(table: string, row: Record<string, unknown>) {
  const sb = getSupabase();
  if (!sb) return;
  try {
    const { error } = await sb.from(table).insert(row);
    if (error) console.error(`[db:${table}]`, error.message);
  } catch (e) {
    console.error(`[db:${table}]`, e);
  }
}

export async function saveOrder(id: string, data: any) {
  const items = Array.isArray(data?.items) ? data.items : [];
  const total = items.reduce(
    (n: number, i: any) => n + (Number(i?.unitPrice) || 0) * (Number(i?.qty) || 0),
    0
  );
  await insert("orders", {
    id,
    orderer_name: data?.ordererName ?? null,
    orderer_phone: data?.ordererPhone ?? null,
    total,
    payload: data,
  });
}

export async function saveInquiry(id: string, data: any) {
  await insert("inquiries", {
    id,
    type: data?.type ?? "general",
    name: data?.name ?? null,
    phone: data?.phone ?? null,
    payload: data,
  });
}

export async function saveSubscription(id: string, data: any) {
  await insert("subscriptions", {
    id,
    name: data?.name ?? null,
    phone: data?.phone ?? null,
    plan: data?.plan ?? null,
    payload: data,
  });
}
