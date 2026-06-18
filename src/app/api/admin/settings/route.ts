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
  } catch (e) {
    const msg = e instanceof Error ? e.message : "알 수 없는 오류";
    return NextResponse.json(
      { ok: false, error: `저장 실패: ${msg} (Supabase 미설정 시 서버리스에서는 파일 저장이 불가합니다. 스키마(site_content) 생성 여부도 확인하세요.)` },
      { status: 503 }
    );
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
