import { NextResponse } from "next/server";
import { validateOrder } from "@/lib/form-schemas";
import { notifyOrder } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { _: "잘못된 요청입니다." } }, { status: 400 });
  }
  const errors = validateOrder(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }
  const id = `ORD-${Date.now().toString(36).toUpperCase()}`;
  // TODO: DB 저장 + 결제(PG) 연동
  await notifyOrder(id, body);
  return NextResponse.json({ ok: true, id }, { status: 201 });
}
