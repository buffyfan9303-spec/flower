import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/form-schemas";
import { notifyInquiry } from "@/lib/notify";
import { saveInquiry } from "@/lib/orders-store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { _: "잘못된 요청입니다." } }, { status: 400 });
  }
  if (body.type !== "corporate" && body.type !== "general") body.type = "general";
  const errors = validateInquiry(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }
  const id = `INQ-${Date.now().toString(36).toUpperCase()}`;
  // TODO: 담당자 배정
  await Promise.all([notifyInquiry(id, body), saveInquiry(id, body)]);
  return NextResponse.json({ ok: true, id }, { status: 201 });
}
