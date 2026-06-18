import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSettings, saveSettings } from "@/lib/catalog-store";
import type { SiteSettings } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ ok: true, settings });
}

export async function PUT(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }
  const settings = body?.settings as SiteSettings | undefined;
  if (!settings || typeof settings !== "object") {
    return NextResponse.json({ ok: false, error: "invalid settings" }, { status: 422 });
  }
  try {
    await saveSettings(settings);
  } catch {
    return NextResponse.json(
      { ok: false, error: "이 환경에서는 저장할 수 없습니다 (서버리스 읽기전용 파일시스템). 운영 저장에는 DB(Supabase) 연동이 필요합니다." },
      { status: 503 }
    );
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
