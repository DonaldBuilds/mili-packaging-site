-- ============================================================
-- mili-packaging · V24 登录失败记录表（SEC-04 登录限流持久化）
-- 用途：按 IP + 账号双维度统计失败次数，超阈值锁定（多实例/冷启动下仍有效）
-- 幂等：可重复执行
-- ============================================================

BEGIN;

create table if not exists public.login_attempts (
  id bigint generated always as identity primary key,
  ip text,
  username text,
  ok boolean not null default false,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_login_attempts_created on public.login_attempts (created_at desc);
create index if not exists idx_login_attempts_ip on public.login_attempts (ip, created_at desc);
create index if not exists idx_login_attempts_user on public.login_attempts (username, created_at desc);

alter table public.login_attempts enable row level security;

drop policy if exists login_attempts_anon_all on public.login_attempts;
create policy login_attempts_anon_all on public.login_attempts for all using (true) with check (true);

COMMIT;
