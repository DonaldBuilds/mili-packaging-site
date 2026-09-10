-- ============================================================
-- mili-packaging · V24 工作台记录表（FC-02 / FC-03 服务端持久化）
-- 用途：内部任务历史工单、AI 可见性问题清单等，从 localStorage 迁移到服务端
-- 特点：记录操作人（actor）与时间，换设备/清缓存不丢，多人可见同一份
-- 幂等：可重复执行
-- ============================================================

BEGIN;

create table if not exists public.workbench_records (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  title text,
  payload jsonb,
  actor text,
  created_at timestamptz not null default now()
);

create index if not exists idx_wb_records_type on public.workbench_records (type, created_at desc);

alter table public.workbench_records enable row level security;

drop policy if exists wb_records_anon_all on public.workbench_records;
create policy wb_records_anon_all on public.workbench_records for all using (true) with check (true);

COMMIT;
