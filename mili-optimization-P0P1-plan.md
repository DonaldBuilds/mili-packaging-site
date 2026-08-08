# Mili 独立站优化 — P0/P1 改动清单初稿（待用户确认）

> 依据：《mili-独立站优化执行包.md》《mili-packaging-market-research-2026.md》
> 状态：**初稿，未落地**。确认后再按 P0 → P1 → P2 批量执行。
> 前提：Hero 首屏结构与 CTA 已定稿，**不做任何调整**（执行包 3.1 中与 Hero 冲突的 CTA 改动一律跳过）。

---

## 一、执行包 vs 官网现状核对（冲突与已达成项）

| # | 执行包说法 | 官网现状（本次会话已核对） | 处理 |
|---|---|---|---|
| 1 | "9 个品类页 title 全站重复" | 上次会话已改为唯一 title（`{品类名} \| MOQ {n} pcs \| Mili Packaging`） | 已部分达成 → 本次升级为执行包 3.2 的关键词优化版 |
| 2 | SPA hash 路由 `#/products/...` 收录困难 | 属实（HashRouter + Worker 301 跳 hash） | **P0-② 重点改造** |
| 3 | H1 泛化 | 详情页 H1 = 品类名（如 "Rigid Gift Boxes"） | P0-③ 改为"核心词 + 卖点"结构 |
| 4 | 首页主/次 CTA 改文案 | Hero 已定稿（GET MY FREE QUOTE / SEE OUR WORK） | **跳过**（用户已定稿） |
| 5 | 免费样品入口 | Sample & Starter Kits 详情页已有（Order Sample Kit – $29） | 已达成 → P2 升级为独立落地页（待确认） |
| 6 | 价格透明（From $0.30…+阶梯价） | 卡片 From $X + 详情页阶梯价表（100/1000/5000 pcs）已上线 | **已达成** |
| 7 | 信任徽章贴 CTA | FSC/ISO9001:2018/SGS 徽章 + AQL 2.5 + 48h 卡已上线 | **已达成** |
| 8 | 定位句（Slogan） | 未上线 | P1 新增（建议位置：Trusted By 区 / About 页，不动 Hero） |
| 9 | 5 行业页 vs 执行包 6 行业页 | 现有 5 页：fashion-apparel / food-beverage / beauty-skincare / electronics-tech / subscription-dtc | **决策点①**（见 P2） |
| 10 | 博客基础设施 | Blog 分类页 + 1 篇（Buyer's Guide 2026）已上线 | 新增执行包 6 篇 → 共 7 篇 |

---

## 二、P0 改动清单（SEO 技术修复）

### P0-① 9 品类页 title / meta 定稿表（title ≤60 字符，meta ≤155 字符）

| 品类 | Title（≤60） | Meta Description（≤155，含核心词+卖点） |
|---|---|---|
| Rigid Gift Boxes | Custom Rigid Boxes & Luxury Magnetic Gift Boxes \| Mili | Custom rigid gift boxes: magnetic, book-style, drawer & lid-base. MOQ 100 pcs, free 3D mockup in 48h, FSC-certified, factory-direct. |
| Cosmetic Boxes | Custom Cosmetic Boxes — Low MOQ Packaging \| Mili Packaging | Custom cosmetic boxes with EVA inserts, bottle holders, foil & soft-touch. MOQ 100 pcs, FSC paper, 15-day lead time, factory-direct. |
| Jewelry Boxes | Custom Jewelry Boxes & Velvet-Lined Gift Boxes \| Mili | Velvet-lined custom jewelry boxes with gold foil & debossed logos. MOQ 100 pcs, free 3D mockup, anti-tarnish lining, factory-direct. |
| Watch Boxes | Custom Watch Box Manufacturer — Luxury Watch Boxes, MOQ 50 | Custom watch boxes: PU leather, cushion pillow holder. Lowest MOQ on site — 50 pcs. Free 3D mockup in 48h, factory-direct. |
| Mailer Boxes | Custom Mailer Boxes — Self-Seal Tape-Free Mailers \| Mili | Self-seal tape-free custom mailer boxes with full-color interior print. MOQ 100 pcs, tear strip, 10–12 day lead time, factory-direct. |
| Folding Cartons | Custom Folding Cartons & Printed Cartons \| Mili Packaging | Custom folding cartons from $0.30. Food-safe grades, window patching, full CMYK print. MOQ 100 pcs, 10–12 days, factory-direct. |
| Paper Bags | Custom Paper Bags & Kraft Paper Bags Wholesale \| Mili | Custom kraft & art paper bags with rope, ribbon or die-cut handles, foil stamping. MOQ 100 pcs, factory-direct pricing. |
| Corrugated & Shipping | Custom Corrugated & Shipping Boxes Wholesale \| Mili | Heavy-duty custom corrugated shipping boxes from $0.30. 5-layer double wall, ECT tested. MOQ 100 pcs, 10 days, factory-direct. |
| Sample & Starter Kits | Packaging Sample Kit — Test 12 Box Styles for $29 \| Mili | Order the sample kit: 12 material & finish boxes branded with your logo. $29 incl. shipping, credited to your first bulk order. |

- 落地位置：`src/main.jsx` TitleManager（title + meta description 注入），现有唯一 title 逻辑替换为上述定稿。

### P0-② SPA hash 路由 → 可索引静态 URL（改动最大，需评估）

**目标**：`mili-packaging.com/#/products/rigid-gift-boxes` → `mili-packaging.com/products/rigid-gift-boxes`

| 文件 | 改前 | 改后 |
|---|---|---|
| `src/main.jsx` | `HashRouter` | `BrowserRouter`；入口加一次旧 hash 链接兼容跳转（`location.hash` 以 `#/` 开头时 `replace` 为真实路径） |
| `deploy.cjs`（Worker） | SPA 路由 `301` 重定向到 `/#/...` | 删除 301 跳转，`/products/*` `/industries/*` 等直接回退到 `index.html`（SPA fallback 已存在，微调即可） |
| `public/sitemap.xml` | 26 条全部 `#/...` hash URL | 全部改为无 hash 真实路径（`/products/rigid-gift-boxes` 等 26 条） |
| JSON-LD canonical | `https://mili-packaging.com/#/products/...` | 改为无 hash URL（ProductDetail / BreadcrumbList schema） |
| 全站内部 Link | `to="/products/..."`（HashRouter 下渲染为 hash） | BrowserRouter 下天然为真实路径，无需改代码；检查 `<a href="/blog/">` 等外部跳转 |

**风险控制**：Worker 需同步部署（Text 内嵌，随 deploy.cjs 重发）；上线后验证 5 个代表路由返回真实 HTML 而非 301；旧 hash 链接自动跳转保兼容。此改动与"不破坏现有转化路径"兼容（WhatsApp/询盘表单不受影响）。

### P0-③ 9 品类页 H1 对齐买家搜索语言（核心词 + 卖点）

| 品类 | H1（改前：品类名） | H1（改后） |
|---|---|---|
| Rigid Gift Boxes | Rigid Gift Boxes | Custom Rigid Boxes — MOQ 100 pcs, Free 3D Mockup in 48h |
| Cosmetic Boxes | Cosmetic Boxes | Custom Cosmetic Boxes — MOQ 100 pcs with Custom Inserts |
| Jewelry Boxes | Jewelry Boxes | Custom Jewelry Boxes — Velvet-Lined, MOQ 100 pcs |
| Watch Boxes | Watch Boxes | Custom Watch Boxes — Lowest MOQ: 50 pcs |
| Mailer Boxes | Mailer Boxes | Custom Mailer Boxes — Self-Seal, MOQ 100 pcs |
| Folding Cartons | Folding Cartons | Custom Folding Cartons — From $0.30, MOQ 100 pcs |
| Paper Bags | Paper Bags | Custom Paper Bags — Kraft & Foil, MOQ 100 pcs |
| Corrugated & Shipping | Corrugated & Shipping Boxes | Custom Shipping Boxes — From $0.30, MOQ 100 pcs |
| Sample & Starter Kits | Sample & Starter Kits | Packaging Sample Kit — Test 12 Styles, $29 Credited |

- 落地位置：`src/data/products.js`（每组新增 `h1` 字段）+ `src/pages/ProductDetail.jsx`（H1 渲染取 `group.h1`，eyebrow tagline 保留）。

---

## 三、P1 改动清单（首页与品类页）

### P1-① 询盘表单精简（执行包 3.3）

| 字段 | 改前 | 改后 | 说明 |
|---|---|---|---|
| 产品类型 | select（9 组+其他） | 保留 | 现有 `productType` 复用 |
| 数量 | text | 保留 | 现有 `quantity` 复用 |
| 目标价 | — | **新增** select（<$0.5 / $0.5–1 / $1–2 / $2+ / 待定） | 新字段 `target_price` |
| 目标市场 | — | **新增** select（美/英/德/法/加/澳/其他） | 新字段 `target_market`，同步收集六国合规线索 |
| 截止日期 | — | **新增** text（如 Q4 前/具体日期） | 新字段 `deadline` |
| 姓名/邮箱 | 必填 | **保留必填** | 无联系字段则询盘无法触达，执行包 5 字段未含联系信息，建议 7 字段 |
| 公司/电话/行业/留言/附件 | 现有 | 可移除或留言改可选 | **决策点②**：移除会改变询盘数据粒度，需确认 |

**连带改动**：Supabase `inquiries` 表加 3 列（`target_price` / `target_market` / `deadline`）；Edge Function `notify-inquiry` 邮件模板同步；`src/pages/Contact.jsx` 表单与提交逻辑；首页/详情页 CTA 链接不变（仍指向 `#quote-form`）。

### P1-② 定位句上线（执行包 7.2 ③）

- 位置：Trusted By 区块 eyebrow 或 About 页首屏（**不动 Hero**）
- 文案：`Big-Factory Certifications. Boutique-Factory Speed.` + 副句 `FSC / ISO 9001 / SGS certified · MOQ 100 pcs (Watch 50) · 48h free 3D mockup · 3–5 day free samples · AQL 2.5 · 15-day lead time`

### P1-③ 服务承诺条（执行包 3.1）

- **决策点③**：Hero 已定稿，承诺条不放首屏；建议放 Trusted By 下方或对比区上方（24h 报价 ｜ 48h 免费 3D ｜ 3–5 天免费结构样 ｜ 15 天交期 ｜ MOQ 100）。确认位置后落地。

### 已达成（无需改动）

- 主/次 CTA（Hero 定稿）、免费样品入口、价格透明（卡片+阶梯价）、信任徽章（FSC/ISO/SGS + AQL 2.5）——均在现网验证存在。

---

## 四、P2 新页面结构草案（确认后出全文案）

| 页面 | 路由 | 结构草案 | 依赖资料 |
|---|---|---|---|
| FSC 证书与质量页 | `/certifications` | Hero → FSC CoC 证书区（编号+扫描件）→ ISO 9001 → SGS → AQL 2.5 流程 4 步图文 → 抽样报告样例 → CTA | **FSC 证书编号/扫描件、ISO 编号、SGS 报告（待提供）** |
| Sample & Starter Kits 落地页 | 升级 `/products/sample-starter-kits` 或新建 `/sample-kits` | Hero（$29 固定价）→ 12 结构展示 → 3 步免费样品流程 → 竞品收费对比表 → 反馈 → FAQ → CTA | 无需（现有素材足够）——**决策点④：新建页 vs 升级现有详情页** |
| EPR 合规速查页 | `/epr-compliance` | 六国总表（德 LUCID / 法 CITEO+Triman / 英 PPT+pEPR / 美州级 EPR / 加 / 澳 APCO）→ 分国要点 → PDF 下载（占位）→ "合规数据包"服务说明 | PDF 版式可先做占位；法规引用以官方链接为准（执行包已附） |
| 行业落地页 | `/industries/*` | **决策点①**：现有 5 页（beauty-skincare / food-beverage / electronics-tech / fashion-apparel / subscription-dtc）→ 执行包 6 页（Cosmetics & Beauty / Jewelry & Watches / Apparel / Food & Beverage / Electronics / Corporate Gifts）。建议：保留 5 页 slug 不变仅改名对齐 + 新增 Jewelry & Watches、Corporate Gifts 2 页（共 7 页，订阅并入 DTC 场景）；或严格 6 页合并 | 无需 |
| 博客 6 篇 | `/blog/*` | How to Choose Mailer Box Size；What Is a Rigid Box；Folding Carton vs Rigid Box；Jewelry Box Material & Design Guide；How to Test Packaging Before Bulk Orders；2027 Packaging Design Trends（每篇 1200–1500 词，FAQPage Schema，CTA 收口） | 无需 |
| 地区落地页 ×5 | `/custom-packaging-{usa,uk,eu,canada,australia}` | 排入 Q4 | 无需 |

---

## 五、执行排期（确认后按序落地）

| 阶段 | 内容 | 预计工作量 | 依赖 |
|---|---|---|---|
| **P0**（本周） | title/meta 9 页 + H1 9 页 + 路由改造 + sitemap/Worker/JSON-LD | 中（路由改造为主） | 无（代码侧即可完成 + 部署） |
| **P1**（下周） | 表单 7 字段 + 定位句 + 承诺条 | 中 | 决策点②③确认；Supabase 加列 |
| **P2**（2–4 周） | 证书页 / 样品落地页 / EPR 页 / 行业页 / 博客 6 篇 | 大 | **FSC/ISO/SGS 证书资料**；决策点①④ |
| **P3**（持续） | 内容日历 3 个月 / Pinterest 9 Board / ASMR 脚本 4 支 | 内容产出 | 工厂实拍素材；YouTube 视频 URL |

---

## 六、未决事项清单（需 Mili 提供，未提供前一律占位标注"待 Mili 提供"，不虚构）

1. **FSC CoC 证书**：编号 + 扫描件 + 授权机构名称（证书页核心素材）
2. **ISO 9001 证书**：编号 + 年份（现网文案为 ISO 9001:2018，需真实证书核对）
3. **SGS 审核报告**：编号 + 摘要（如有）
4. **AQL 2.5 抽样报告样例**：脱敏版（质检流程图文配图）
5. **工厂实拍素材**：车间/产线/QC 照片或 1–2 分钟视频（信任页与 P3 内容用）
6. **客户案例**：可公开品牌名 + 量化数据（订单量/交期/复购），用于行业页与案例卡
7. **六国 EPR 注册号**：如 Mili 已注册德国 LUCID 等（无则页面定位为"买家申报速查+合规数据包服务"，不冒充注册方）
8. **BSCI / SEDEX 审核报告**（如有，欧美买家准入加分项）
9. **YouTube 视频 URL**：工厂游/开机/生产流程 3 类（P3 视频位，不虚构）

---

## 七、红线自查（执行前再次确认）

- 不虚构证书编号/客户案例/市场数据 —— 未提供一律占位
- 不破坏现有转化路径（WhatsApp 直连、询盘表单、Supabase 链路）
- 站内英文为主，中文仅内部注释
- 法国出口盒预留 Triman/Info-tri 位置；塑料内衬标注再生料含量（≥30% 豁免英国 PPT）；环保宣称避免绝对化（对齐 FTC Green Guides）
- 改动清单如与执行包冲突，以"不破坏转化路径"为原则局部替换并记录

---

**下一步**：请确认 ① P0 三项是否按清单执行；② 决策点①（行业页 6 vs 7）；③ 决策点②（表单字段去留）；④ 决策点③（承诺条位置）；⑤ 决策点④（样品落地页新建 vs 升级）。确认后我先落地 P0，再进入 P1。
