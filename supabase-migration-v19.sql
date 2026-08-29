-- ============================================================
-- mili-packaging · V19 运营工作台升级迁移
-- 新增：accounts（账号权限）/ page_views（埋点）/ customer_events（行为追踪）
--       customer_segments（客户分组）/ campaigns（营销活动）+ customers.tags 列
-- 安全：accounts 表不开放 anon 直读（无策略=拒绝），Worker 通过 SB_SERVICE_KEY 操作
-- 幂等：可重复执行（if not exists / drop policy if exists）
-- ============================================================

BEGIN;

-- ── 1. accounts 账号表（RBAC） ──
create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  display_name text,
  avatar_url text,
  role text not null default 'operator'
    check (role in ('owner', 'admin', 'operator', 'viewer')),
  password_hash text not null,        -- pbkdf2_sha256$iterations$salt_b64$hash_b64
  status text not null default 'active'
    check (status in ('active', 'disabled')),
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- 不开放 anon 直读/直写：不创建任何 anon policy（默认拒绝）

-- ── 2. page_views 埋点表 ──
create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  page text not null,
  ref text,
  source text,
  country text,
  device text,
  keyword text,
  session text,
  ts timestamptz not null default now()
);
create index if not exists idx_pv_ts on public.page_views(ts);
create index if not exists idx_pv_source on public.page_views(source);
create index if not exists idx_pv_country on public.page_views(country);
create index if not exists idx_pv_device on public.page_views(device);
create index if not exists idx_pv_page on public.page_views(page);
alter table public.page_views enable row level security;
drop policy if exists "pv anon select" on public.page_views;
create policy "pv anon select" on public.page_views for select using (true);
drop policy if exists "pv anon write" on public.page_views;
create policy "pv anon write" on public.page_views for all using (true) with check (true);

-- ── 3. customer_events 客户行为时间线 ──
create table if not exists public.customer_events (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete cascade,
  type text not null
    check (type in ('visit', 'inquiry', 'email', 'whatsapp', 'quote', 'order', 'campaign')),
  payload jsonb,
  created_at timestamptz not null default now()
);
create index if not exists idx_ce_customer on public.customer_events(customer_id, created_at desc);
alter table public.customer_events enable row level security;
drop policy if exists "ce anon select" on public.customer_events;
create policy "ce anon select" on public.customer_events for select using (true);
drop policy if exists "ce anon write" on public.customer_events;
create policy "ce anon write" on public.customer_events for all using (true) with check (true);

-- ── 4. customer_segments 客户分组 ──
create table if not exists public.customer_segments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null default 'manual'
    check (type in ('manual', 'dynamic')),
  rule jsonb,
  member_ids jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.customer_segments enable row level security;
drop policy if exists "cs anon select" on public.customer_segments;
create policy "cs anon select" on public.customer_segments for select using (true);
drop policy if exists "cs anon write" on public.customer_segments;
create policy "cs anon write" on public.customer_segments for all using (true) with check (true);

-- ── 5. campaigns 营销活动 ──
create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  channel text not null default 'email'
    check (channel in ('email', 'whatsapp')),
  audience text,
  template text,
  sent_count integer not null default 0,
  success_count integer not null default 0,
  fail_count integer not null default 0,
  created_by text,
  status text not null default 'draft'
    check (status in ('draft', 'sent', 'partial', 'failed')),
  created_at timestamptz not null default now()
);
alter table public.campaigns enable row level security;
drop policy if exists "cmp anon select" on public.campaigns;
create policy "cmp anon select" on public.campaigns for select using (true);
drop policy if exists "cmp anon write" on public.campaigns;
create policy "cmp anon write" on public.campaigns for all using (true) with check (true);

-- ── 6. customers.tags 标签列 ──
alter table public.customers add column if not exists tags text[] default '{}';

-- ── 7. Realtime 授权（秒级推送）：订阅表加入 supabase_realtime publication（幂等） ──
do $$
declare t text;
begin
  foreach t in array array['inquiries', 'orders', 'customers', 'product_stock', 'customer_events', 'campaigns'] loop
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t
    ) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;

COMMIT;
