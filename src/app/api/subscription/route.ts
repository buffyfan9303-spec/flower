import { NextResponse } from "next/server";
import { validateSubscription } from "@/lib/form-schemas";
import { notifySubscription } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { _: "잘못된 요청입니다." } }, { status: 400 });
  }
  const errors = validateSubscription(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }
  const id = `SUB-${Date.now().toString(36).toUpperCase()}`;
  // TODO: DB 저장 + 정기결제 연동
  await notifySubscription(id, body);
  return NextResponse.json({ ok: true, id }, { status: 201 });
}
