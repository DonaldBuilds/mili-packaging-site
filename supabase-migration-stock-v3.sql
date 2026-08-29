-- ============================================================
-- mili-packaging · product_stock 表（v14 库存管理）
-- 在 Supabase Dashboard → SQL Editor 中整段执行（幂等，可重复运行）
-- 目标：为商品管理提供库存状态（不侵入 products.json 数据层）
-- 用法：/api/stock/list 读取、/api/stock/patch 更新（Worker 会话代理）
-- ============================================================

create table if not exists public.product_stock (
  slug text primary key,
  status text not null default 'in-stock'
    check (status in ('in-stock', 'limited', 'out', 'pre-order')),
  note text,
  updated_at timestamptz not null default now()
);

alter table public.product_stock enable row level security;

-- 允许 anon 读写（与 inquiries 表策略一致；写入经 Worker 会话代理，页面不直连）
drop policy if exists "stock anon select" on public.product_stock;
create policy "stock anon select" on public.product_stock
  for select using (true);
drop policy if exists "stock anon write" on public.product_stock;
create policy "stock anon write" on public.product_stock
  for all using (true) with check (true);

-- 查询示例：SELECT * FROM product_stock ORDER BY updated_at DESC;
-- 注意：需先在 Supabase Dashboard 执行本迁移，商品管理页才会显示库存徽章与编辑项
