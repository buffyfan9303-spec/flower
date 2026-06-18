// 서버 전용 콘텐츠 저장소. content/*.json 파일을 읽고 쓰며, 파일이 없으면 data.ts 시드로 폴백.
// ⚠️ 클라이언트 컴포넌트에서 import 금지 (fs 사용).
// 로컬/Node 런타임에서 동작. Vercel 서버리스(읽기전용 fs)에서는 영속 저장이 안 되므로
// 운영 배포 시에는 Supabase 등 DB로 교체 권장.
import { promises as fs } from "fs";
import path from "path";
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

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

export async function getCatalog(): Promise<Catalog> {
  const cat = await readJson<Catalog>(CATALOG_FILE, seedCatalog());
  // 방어적 보정
  return {
    products: Array.isArray(cat.products) ? cat.products : [],
    collections: Array.isArray(cat.collections) ? cat.collections : [],
    events: Array.isArray(cat.events) ? cat.events : [],
  };
}

export async function saveCatalog(cat: Catalog) {
  await writeJson(CATALOG_FILE, cat);
}

export async function getSettings(): Promise<SiteSettings> {
  const s = await readJson<Partial<SiteSettings>>(SETTINGS_FILE, {});
  // 기본값과 병합(누락 필드 보강)
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

export async function saveSettings(s: SiteSettings) {
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
