-- ============================================================
-- mili-packaging · inquiries 表升级：全渠道统一模型 v2
-- 在 Supabase Dashboard → SQL Editor 中整段执行（幂等，可重复运行）
-- 目标：纳入 WhatsApp / 邮件 / 在线聊天 / 电话 等多渠道询盘，
--       与网站表单统一维度（渠道/状态/优先级/跟进/金额/客户画像）
-- ============================================================

-- 1) 新增列（幂等）
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS channel     TEXT DEFAULT 'website';   -- website/whatsapp/email/chat/phone
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS status      TEXT DEFAULT 'new';       -- new/contacted/quoted/negotiating/won/lost/deleted
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS priority    TEXT DEFAULT 'normal';    -- normal/high
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS owner       TEXT DEFAULT '';          -- 跟进人
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS follow_up_at TIMESTAMPTZ;             -- 下次跟进时间
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS value_usd   NUMERIC;                  -- 预估金额 USD
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS source_page TEXT DEFAULT '';          -- 来源页面
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS phone       TEXT DEFAULT '';          -- WhatsApp / 电话
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS company     TEXT DEFAULT '';          -- 公司
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS updated_at  TIMESTAMPTZ DEFAULT now();

-- 2) 历史数据回填（旧记录视为网站表单 / 新询盘）
UPDATE inquiries SET channel = 'website' WHERE channel IS NULL OR channel = '';
UPDATE inquiries SET status  = 'new'     WHERE status  IS NULL OR status  = '';
UPDATE inquiries SET updated_at = now()  WHERE updated_at IS NULL;

-- 3) RLS 策略：匿名（anon key）可 读 / 增 / 改，不允许删（删除走软删 status='deleted'）
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS inquiry_anon_select ON inquiries;
CREATE POLICY inquiry_anon_select ON inquiries
  FOR SELECT USING (true);

DROP POLICY IF EXISTS inquiry_anon_insert ON inquiries;
CREATE POLICY inquiry_anon_insert ON inquiries
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS inquiry_anon_update ON inquiries;
CREATE POLICY inquiry_anon_update ON inquiries
  FOR UPDATE USING (true);

-- 4) 保留原有触发器（询盘邮件通知）不受影响 —— 如不存在则跳过
--    SELECT trigger_name FROM information_schema.triggers WHERE event_object_table='inquiries';

-- 说明：
--   · 删除询盘 = 软删（status='deleted'），报表与列表默认过滤 archived 记录
--   · 手动录入 WhatsApp/邮件询盘在工作台「询盘中心 → + 新增询盘」完成，channel 选择对应渠道
