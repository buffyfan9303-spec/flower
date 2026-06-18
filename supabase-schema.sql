-- 드디어 플라워 — Supabase 스키마
-- 실행: Supabase 대시보드 → SQL Editor → New query → 아래 전체 붙여넣기 → Run
-- 앱은 service_role 키로 "서버에서만" 접근하므로 RLS는 켜되 정책은 두지 않습니다(공개 차단).

-- 1) 사이트 콘텐츠 (카탈로그/설정을 JSON으로 보관)
create table if not exists public.site_content (
  key         text primary key,            -- 'catalog' | 'settings'
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- 2) 주문
create table if not exists public.orders (
  id            text primary key,          -- ORD-xxxx
  created_at    timestamptz not null default now(),
  orderer_name  text,
  orderer_phone text,
  total         integer,
  status        text not null default 'received',
  payload       jsonb not null
);

-- 3) 문의 (일반 / 기업·단체)
create table if not exists public.inquiries (
  id          text primary key,            -- INQ-xxxx
  created_at  timestamptz not null default now(),
  type        text,                        -- 'general' | 'corporate'
  name        text,
  phone       text,
  status      text not null default 'new',
  payload     jsonb not null
);

-- 4) 정기구독 신청
create table if not exists public.subscriptions (
  id          text primary key,            -- SUB-xxxx
  created_at  timestamptz not null default now(),
  name        text,
  phone       text,
  plan        text,
  status      text not null default 'active',
  payload     jsonb not null
);

-- RLS 활성화 (정책 없음 = anon/public 접근 불가, service_role만 우회 접근)
alter table public.site_content   enable row level security;
alter table public.orders         enable row level security;
alter table public.inquiries      enable row level security;
alter table public.subscriptions  enable row level security;
