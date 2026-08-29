-- ============================================================
-- mili-packaging · orders + customers 表（v14 订单履约与客户中心）
-- 在 Supabase Dashboard → SQL Editor 中整段执行（幂等，可重复运行）
-- 目标：询盘 → 订单 → 履约（quote→confirmed→sampling→production→qc→shipped→delivered）全链路留痕
-- ============================================================

-- ── 客户主数据 ──
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  company text,
  country text,
  source text,
  grade text not null default 'C'
    check (grade in ('S', 'A', 'B', 'C', 'D')),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.customers enable row level security;
drop policy if exists "customers anon select" on public.customers;
create policy "customers anon select" on public.customers for select using (true);
drop policy if exists "customers anon write" on public.customers;
create policy "customers anon write" on public.customers for all using (true) with check (true);

-- ── 订单（B2B 制造履约模型） ──
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_no text unique,
  customer_id uuid references public.customers(id) on delete set null,
  customer_name text,
  customer_email text,
  customer_phone text,
  customer_country text,
  inquiry_id text,
  title text,
  amount numeric,
  currency text not null default 'USD',
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid', 'deposit', 'balance', 'paid')),
  status text not null default 'quote'
    check (status in ('quote', 'confirmed', 'sampling', 'production', 'qc', 'shipped', 'delivered', 'cancelled', 'onhold', 'dispute')),
  eta text,
  carrier text,
  tracking_no text,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;
drop policy if exists "orders anon select" on public.orders;
create policy "orders anon select" on public.orders for select using (true);
drop policy if exists "orders anon write" on public.orders;
create policy "orders anon write" on public.orders for all using (true) with check (true);

-- 订单号自动生成辅助（无 sequence 时前端生成 ML-YYYY-XXXX；也可用此函数）
create or replace function public.next_order_no()
returns text language sql as $$
  select 'ML-' || to_char(now(), 'YYYY') || '-' || lpad((random() * 9999)::int::text, 4, '0');
$$;

-- 索引
create index if not exists idx_orders_customer on public.orders(customer_id);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created on public.orders(created_at desc);
create index if not exists idx_customers_email on public.customers(email);
create index if not exists idx_customers_phone on public.customers(phone);

-- 查询示例：
-- 订单：SELECT * FROM orders ORDER BY created_at DESC;
-- 客户：SELECT * FROM customers ORDER BY updated_at DESC;
-- 注意：需先在 Supabase Dashboard 执行本迁移，订单履约与客户中心才会显示数据；
--      询盘中心「客户聚合」视图为轻量过渡（纯前端归并），不依赖本迁移。
