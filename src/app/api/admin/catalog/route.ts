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
  } catch {
    return NextResponse.json(
      { ok: false, error: "이 환경에서는 저장할 수 없습니다 (서버리스 읽기전용 파일시스템). 운영 저장에는 DB(Supabase) 연동이 필요합니다." },
      { status: 503 }
    );
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
