import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCatalog, saveCatalog, type Catalog } from "@/lib/catalog-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const catalog = await getCatalog();
  return NextResponse.json({ ok: true, catalog });
}

export async function PUT(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }
  const catalog = body?.catalog as Catalog | undefined;
  if (
    !catalog ||
    !Array.isArray(catalog.products) ||
    !Array.isArray(catalog.collections) ||
    !Array.isArray(catalog.events)
  ) {
    return NextResponse.json({ ok: false, error: "invalid catalog" }, { status: 422 });
  }
  try {
    await saveCatalog(catalog);
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
