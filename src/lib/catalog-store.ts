// 콘텐츠 저장소. 우선순위: Supabase(site_content 테이블) → 로컬 파일(content/*.json) → data.ts 시드.
// ⚠️ 서버 전용 (fs + service_role 사용). 클라이언트 컴포넌트에서 import 금지.
import { promises as fs } from "fs";
import path from "path";
import { getSupabase } from "./supabase";
import {
  products as seedProducts,
  collections as seedCollections,
  events as seedEvents,
  defaultSettings,
  type Product,
  type Collection,
  type EventItem,
  type SiteSettings,
} from "./data";

const DATA_DIR =
  process.env.DEUDIEO_DATA_DIR || path.join(process.cwd(), "content");
const CATALOG_FILE = path.join(DATA_DIR, "catalog.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

export type Catalog = {
  products: Product[];
  collections: Collection[];
  events: EventItem[];
};

function seedCatalog(): Catalog {
  return JSON.parse(
    JSON.stringify({
      products: seedProducts,
      collections: seedCollections,
      events: seedEvents,
    })
  );
}

function normalizeCatalog(cat: Partial<Catalog>): Catalog {
  return {
    products: Array.isArray(cat.products) ? cat.products : [],
    collections: Array.isArray(cat.collections) ? cat.collections : [],
    events: Array.isArray(cat.events) ? cat.events : [],
  };
}

function mergeSettings(s: Partial<SiteSettings>): SiteSettings {
  return {
    ...defaultSettings,
    ...s,
    hero: { ...defaultSettings.hero, ...(s.hero ?? {}) },
    contact: { ...defaultSettings.contact, ...(s.contact ?? {}) },
    social: { ...defaultSettings.social, ...(s.social ?? {}) },
    announcements:
      Array.isArray(s.announcements) && s.announcements.length
        ? s.announcements
        : defaultSettings.announcements,
  };
}

// ── 파일 폴백 ──
async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf-8")) as T;
  } catch {
    return fallback;
  }
}
async function writeJson(file: string, data: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

// ── Supabase 헬퍼 ──
async function sbRead(key: string): Promise<any | null> {
  const sb = getSupabase();
  if (!sb) return undefined; // 미설정 신호
  const { data, error } = await sb
    .from("site_content")
    .select("data")
    .eq("key", key)
    .maybeSingle();
  if (error) throw new Error(`Supabase read(${key}): ${error.message}`);
  return data?.data ?? null; // null = 행 없음
}
async function sbWrite(key: string, data: unknown) {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb
    .from("site_content")
    .upsert({ key, data, updated_at: new Date().toISOString() });
  if (error) throw new Error(`Supabase write(${key}): ${error.message}`);
  return true;
}

// ── 카탈로그 ──
export async function getCatalog(): Promise<Catalog> {
  const sbVal = await sbRead("catalog");
  if (sbVal !== undefined) return sbVal ? normalizeCatalog(sbVal) : seedCatalog();
  return normalizeCatalog(await readJson<Catalog>(CATALOG_FILE, seedCatalog()));
}
export async function saveCatalog(cat: Catalog) {
  if (await sbWrite("catalog", cat)) return;
  await writeJson(CATALOG_FILE, cat);
}

// ── 설정 ──
export async function getSettings(): Promise<SiteSettings> {
  const sbVal = await sbRead("settings");
  if (sbVal !== undefined) return mergeSettings(sbVal ?? {});
  return mergeSettings(await readJson<Partial<SiteSettings>>(SETTINGS_FILE, {}));
}
export async function saveSettings(s: SiteSettings) {
  if (await sbWrite("settings", s)) return;
  await writeJson(SETTINGS_FILE, s);
}

// ── 공개 사이트용 헬퍼 ──
export async function getVisibleProducts(): Promise<Product[]> {
  const { products } = await getCatalog();
  return products.filter((p) => !p.hidden);
}
export async function getProductById(id: string): Promise<Product | undefined> {
  const { products } = await getCatalog();
  return products.find((p) => p.id === id);
}
export async function getRelated(p: Product, n = 4): Promise<Product[]> {
  const { products } = await getCatalog();
  const visible = products.filter((x) => !x.hidden && x.id !== p.id);
  const same = visible.filter((x) => x.category === p.category);
  const pool = same.length >= n ? same : [...same, ...visible.filter((x) => !same.includes(x))];
  return pool.slice(0, n);
}
