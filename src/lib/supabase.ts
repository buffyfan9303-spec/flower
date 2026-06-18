// 서버 전용 Supabase 클라이언트 (service_role 키 사용 — RLS 우회, 절대 클라이언트 번들에 노출 금지).
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 미설정 시 null 반환 → 호출부에서 파일/시드로 폴백.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  if (!client) {
    client = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

export const isSupabaseConfigured = () => Boolean(url && serviceKey);
