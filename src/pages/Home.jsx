import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { productGroups, getProduct, productCatalog } from '../data/products';
import { industries } from './Industries';
import { cases } from './Portfolio';
// v20260809-update: Best-Selling shows 8 featured products from the newest (competitor-benchmarked)
// listings — one per group, 4×2 grid, sample & starter kits excluded.
const featuredProducts = [
  { group: 'rigid-gift-boxes', slug: 'black-magnetic-gift-box' },
  { group: 'cosmetic-boxes', slug: 'valentine-magnetic-folding-box' },
  { group: 'jewelry-boxes', slug: 'drawer-sliding-jewelry-box' },
  { group: 'watch-boxes', slug: 'modern-luxury-single-watch-box' },
  { group: 'mailer-boxes', slug: 'custom-logo-mailer-box' },
  { group: 'folding-cartons', slug: 'marbled-foldable-gift-box' },
  { group: 'paper-bags', slug: 'hard-handle-kraft-bag' },
  { group: 'corrugated-shipping', slug: 'eco-printed-shipping-box' },
];

// 行业数据统一从 Industries.jsx 导入（单一数据源）；按 slug 全局查找代表产品
const findProduct = (slug) => {
  for (const g of Object.keys(productCatalog)) {
    const p = (productCatalog[g] || []).find(x => x.slug === slug);
    if (p) return { ...p, group: g };
  }
  return null;
};
const WA_PHONE = '8618296876285';

// ── 卖点消息流 — 全部为真实可支撑的工厂能力/服务承诺，垂直无缝滚动（模拟实时消息），不伪造任何买家行为 ─
const TRUST_STRIP = [
  'Factory-direct since 2018',
  'Free 3D mockup within 48h',
  'MOQ from 100 pcs · watch from 50',
  'FSC-certified materials',
  'AQL 2.5 QC on every order',
  'Free structural samples in 3–5 days',
  'Quote reply within 24 hours',
  'ISO 9001 certified quality system',
  'SGS audited production',
  '500+ brands served across 50+ countries',
];

function SocialProofTicker() {
  // 无缝循环：渲染两份相同列表，轨道位移 50% 即回到起点
  const items = [...TRUST_STRIP, ...TRUST_STRIP];
  return (
    <div className="social-ticker" aria-label="Why choose Mili Packaging">
      <div className="social-ticker-track" aria-hidden="true">
        {items.map((t, i) => (
          <span className="social-ticker-item" key={i}>
            <span className="social-ticker-dot" />
            {t}
          </span>
        ))}
      </div>
      <span style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0 0 0 0)', whiteSpace:'nowrap' }}>
        {TRUST_STRIP.join(' · ')}
      </span>
    </div>
  );
}

const testimonials = [
  { text: '"The quality exceeded our expectations. Our unboxing content went viral — we directly attribute 40% of our social growth to the packaging."', author: 'US Cosmetics Brand', role: 'Brand Manager · Client since 2023' },
  { text: '"Finally found a packaging partner who understands luxury. The gold foil stamping across 10,000 units was absolutely flawless."', author: 'UK Jewelry Brand', role: 'CEO · Client since 2022' },
  { text: '"Sample approval to delivery in 18 days. Mili handled design, production, customs. Genuinely zero headache experience."', author: 'EU Apparel Brand', role: 'Operations Director · Client since 2021' },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg">
          <img src="/assets/images/hero-collection.webp" alt="Mili Packaging custom luxury gift boxes, jewelry cases, magnetic gift boxes, cosmetic boxes and paper bags" />
        </div>
        {/* P1c: 左侧渐变遮罩提升文字可读性(WCAG AA) */}
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-inner">
          <div className="hero-left">
          {/* P1: H1大写无衬线 — 主标题 + MOQ差异化行（问题3：字体风格对标luxopack） */}
          <h1>
            <span className="h1-desktop">
              CUSTOM LUXURY GIFT BOX<br />MANUFACTURER IN CHINA
            </span>
            <span className="h1-mobile">
              CUSTOM LUXURY GIFT BOX<br />MANUFACTURER IN CHINA
            </span>
          </h1>
          {/* MOQ差异化副行 — 金色，字号缩小，不做uppercase */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16, marginTop:-8 }}>
            <span style={{ color:'var(--gold)', fontSize:15, fontWeight:600, letterSpacing:'0.04em' }}>
              MOQ 100 pcs
            </span>
            <span style={{ color:'rgba(201,168,76,0.4)', fontSize:13 }}>·</span>
            <span style={{ color:'var(--gold)', fontSize:15, fontWeight:600, letterSpacing:'0.04em' }}>
              Factory-Direct
            </span>
            <span style={{ color:'rgba(201,168,76,0.4)', fontSize:13 }}>·</span>
            <span style={{ color:'rgba(201,168,76,0.75)', fontSize:15, fontWeight:500, letterSpacing:'0.04em' }}>
              China
            </span>
          </div>
          {/* P2: 副标题三行结构化排版（问题5） */}
          <p style={{ marginBottom:18 }}>
            Trusted by 500+ brands across 50+ countries.<br />
            Free design &amp; samples in 7 days · Factory-direct pricing.<br />
            <span style={{ color:'rgba(180,180,180,0.55)', fontStyle:'italic', fontSize:'0.9em' }}>No agents. No markups.</span>
          </p>
          {/* 信任标签 — ISO更新为2018（问题4） */}
          <div className="hero-badges">
            {[
              { label: 'FSC Certified', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg> },
              { label: 'ISO 9001', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg> },
              { label: 'SGS Audited', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg> },
            ].map(({ label, icon }) => (
              <span className="hero-badge" key={label}>{icon}{label}</span>
            ))}
          </div>
          {/* P4: 社会证明滚动条 — CTA按钮上方 */}
          <SocialProofTicker />
          {/* P7: CTA按钮组 + 下方短金线（宽度对齐按钮，问题2） */}
          <div className="hero-actions-wrap">
            <div className="hero-actions">
              <a href="/contact" className="btn-gold">Get My Free Quote</a>
              <a href="/portfolio" className="btn-outline-white">See Our Work →</a>
            </div>
            <div className="hero-accent" aria-hidden="true" />
          </div>
          {/* P6: 底部参数条加对比锚点 */}
          <div className="hero-stats-row">
            {[
              { l: 'MOQ', v: '100 pcs', c: 'vs 500+ at most factories' },
              { l: 'Lead Time', v: '15 Days', c: 'vs 25–40 via agents' },
              { l: 'Design', v: 'Free', c: 'vs $200+ setup elsewhere' },
              { l: 'Shipping', v: '50+ Countries', c: 'FOB · CIF · DDP available' },
            ].map(({ l, v, c }) => (
              <div className="hero-stat" key={l}>
                <span className="hero-stat-label">{l}</span>
                <span className="hero-stat-value">{v}</span>
                <span className="hero-stat-compare">{c}</span>
              </div>
            ))}
          </div>
          </div>

          {/* 右侧卖点卡 — 4 个支撑数据（1×4 竖排，顶部对齐标题，不遮挡背景盒子） */}
          <div className="hero-badge-row hero-badge-row--tiered">
          <div className="hb-tier3-row">
            {[
              { d: 'M20 6L9 17l-5-5', c: '#C9A227', n: '100%', l: 'On-Time' },
              { d: 'M4 20c0-9 7-16 16-16-1 9-7 16-16 16zM4 20c4-4 7-8 8-13', c: '#7CB342', n: 'FSC', l: 'Certified' },
              { d: 'M12 2l10 5-10 5L2 7l10-5zM2 17l10 5 10-5M2 12l10 5 10-5', c: '#7E8AC8', n: '500+', l: 'Brands' },
              { d: 'M3 11l19-9-9 19-2-8-8-2z', c: '#A0A0B0', n: '50+', l: 'Countries' },
            ].map(({ d, c, n, l }) => (
              <div className="hb-tier3" key={n}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
                <div className="hb-t3-num">{n}</div>
                <div className="hb-t3-label">{l}</div>
              </div>
            ))}
          </div>
          </div>
          </div>
        </div>
      </section>

      {/* ── Trusted By — real certifications & verified strengths ── */}
      <section className="section-sm">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ margin: '0 auto 28px', display: 'block' }}>Trusted By 500+ Brands Worldwide</span>
          <div className="trust-badges">
            {[
              ['FSC Certified', 'Materials'],
              ['ISO 9001', 'Quality System'],
              ['SGS Audited', 'Production'],
              ['AQL 2.5', 'QC Standard'],
              ['Since 2018', '8+ Years'],
              ['500+', 'Brands Served'],
              ['50+', 'Countries Shipped'],
            ].map(([v, l]) => (
              <div className="trust-badge" key={v}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.03em' }}>{v}</div>
                <div style={{ fontSize: 10, color: 'var(--gray-3)', marginTop: 3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Promise Bar（承诺条，位于 Trusted By 下方，不进 Hero） ── */}
      <section style={{ borderTop:'1px solid var(--border-dim)', borderBottom:'1px solid var(--border-dim)', background:'var(--black-2)' }}>
        <div className="container" style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center', gap:'12px 40px', padding:'18px 0' }}>
          {[
            { n: '24h', l: 'Quote' },
            { n: '48h', l: 'Free 3D Mockup' },
            { n: '3–5 Days', l: 'Free Structural Samples' },
            { n: '15 Days', l: 'Bulk Lead Time' },
            { n: 'MOQ 100', l: 'Watch from 50' },
          ].map(({ n, l }, i) => (
            <div key={l} style={{ display:'flex', alignItems:'center', gap:12 }}>
              {i > 0 && <span aria-hidden="true" style={{ width:1, height:22, background:'rgba(201,168,76,0.25)' }} />}
              <span style={{ color:'var(--gold)', fontWeight:700, fontSize:15, fontFamily:'var(--font-display)' }}>{n}</span>
              <span style={{ color:'var(--gray-3)', fontSize:11, letterSpacing:'0.07em', textTransform:'uppercase', fontWeight:600 }}>{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dual Path ── */}
      <div className="dual-path">
        <Link to="/products" className="dual-card">
          <span className="eyebrow">Standard Collection</span>
          <h3>Browse Our Catalog</h3>
          <p>Proven box designs across 9 categories. Select a style, customize for your brand — fast turnaround, low MOQ.</p>
          <div className="dual-card-arrow">&rarr;</div>
        </Link>
        <Link to="/contact" className="dual-card">
          <span className="eyebrow">Bespoke Solutions</span>
          <h3>Request Custom Design</h3>
          <p>From sketch to delivery, every detail engineered for your brand. Free 3D mockups within 48 hours.</p>
          <div className="dual-card-arrow">&rarr;</div>
        </Link>
      </div>

      {/* ── Products ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ marginBottom: 48 }}>
          <div className="section-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
            <div>
              <div className="gold-line" />
              <span className="eyebrow">Our Products</span>
              <h2>Best-Selling Products</h2>
            </div>
            <Link to="/products" style={{ color:'var(--gold)', textDecoration:'none', fontSize:13, letterSpacing:'0.05em' }}>View All &rarr;</Link>
          </div>
        </div>
        <div className="best-grid">
          {featuredProducts.map(({ group, slug }) => {
            const p = getProduct(group, slug);
            const g = productGroups.find(x => x.slug === group);
            if (!p || !g || p.status === 'hidden') return null;
            return (
              <Link to={`/products/${group}/${p.slug}`} className="product-card" key={p.slug} style={{ position: 'relative', textDecoration: 'none' }}>
                <span style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, background: 'var(--gold)', color: 'var(--black)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', padding: '4px 10px', textTransform: 'uppercase' }}>New</span>
                <div className="product-card-img-wrap">
                  <img src={p.img} alt={p.name} className="product-card-img" loading="lazy" />
                </div>
                <div className="product-card-body">
                  <h4>{p.name}</h4>
                  <p>{p.tagline}</p>
                  <span className="product-card-tag">{g.name} · From ${p.price}</span>
                </div>
                <a href={`https://wa.me/8618296876285?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
                  onClick={e => e.stopPropagation()}
                  style={{ position:'absolute', right:14, bottom:14, zIndex:2, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(37,211,102,0.12)', borderRadius:'50%' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Factory-Direct vs Platforms ── */}
      <section className="section" style={{ background:'var(--black-2)', borderTop:'1px solid var(--border-dim)', borderBottom:'1px solid var(--border-dim)' }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div style={{ textAlign:'center', marginBottom: 56 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">Why Choose Mili Packaging</span>
            <h2>Factory-Direct vs Online Platforms</h2>
          </div>
          <div className="compare-table">
            <div className="compare-header">
              <div /><div className="compare-col-gold">Mili Packaging</div><div>Online Platforms</div>
            </div>
            {[
              ['Price', 'Factory-direct pricing', '30–50% middleman markup'],
              ['Quality', 'AQL 2.5 inspection at source', 'No quality control guarantee'],
              ['Customization', 'Free design & 3D mockups', 'Limited or paid add-on'],
              ['Lead Time', '7–15 days direct production', 'Unpredictable — 3rd party delays'],
              ['Samples', '2 rounds free samples', 'Paid samples, long wait'],
              ['Support', 'Dedicated account manager', 'Automated / no personal contact'],
            ].map(([label, mili, other]) => (
              <div className="compare-row" key={label}>
                <div className="compare-label">{label}</div>
                <div className="compare-cell compare-cell-good">{mili}</div>
                <div className="compare-cell compare-cell-bad">{other}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop: 48 }}>
            <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration:'none', fontSize: 15, padding: '16px 40px' }}>
              Get Your Factory-Direct Quote Now &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom: 64 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">How It Works</span>
            <h2>From Brief to Delivery in 3 Steps</h2>
          </div>
          <div className="process-grid">
            {[
              ['01','Consult & Design','Share your vision, product specs, and budget. Our team recommends the optimal structure, material, and finish — with free 3D mockups within 48 hours.'],
              ['02','Sample & Approve','We produce free structural samples in 3–5 days. Review, refine, and approve. Pre-production samples with full printing available before bulk run.'],
              ['03','Produce & Ship','In-house manufacturing with AQL 2.5 QC throughout. We handle global logistics — FOB, DDP, door-to-door across 50+ countries.'],
            ].map(([n,t,d]) => (
              <div className="process-step" key={n}>
                <div className="process-num">{n}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="pillars-grid">
          {[
            { icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20c0-9 7-16 16-16-1 9-7 16-16 16z" /><path d="M4 20c4-4 7-8 8-13" /></svg>, h: 'Eco-Friendly', p: 'FSC-certified paper, soy inks, biodegradable options for every product line.' },
            { icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" /><path d="M3 8l9 5 9-5" /><path d="M12 13v8" /></svg>, h: 'Low MOQ 100 pcs', p: 'Start small, scale fast. Designed for growing brands at every stage.' },
            { icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.6 7.6" /></svg>, h: 'Free Design', p: 'Professional structural design & graphic layout included at no extra charge.' },
            { icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 20h20" /><path d="M4 20V9l5 4V9l5 4V4h6v16" /></svg>, h: 'Factory Direct', p: 'Own factory + own QC = premium quality without the middleman markup.' },
          ].map(({ icon, h, p }) => (
            <div className="pillar" key={h}>
              <div className="pillar-icon">{icon}</div>
              <h4>{h}</h4>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Industries（8 卡 4×2：7 行业 + 询盘引导卡） ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ marginBottom: 48 }}>
          <div className="gold-line" />
          <span className="eyebrow">Industry Solutions</span>
          <h2>Built for Your Industry</h2>
        </div>
        <div className="industry-grid">
          {industries.map((ind) => (
            <Link to={`/industries/${ind.slug}`} className="industry-card" key={ind.slug}>
              <img src={ind.cardImg} alt={ind.name} className="industry-card-bg" loading="lazy" />
              <div className="industry-card-overlay">
                <h4>{ind.name}</h4>
                <p className="industry-card-pos">{ind.hero}</p>
                <div className="industry-prods">
                  {(ind.featuredProducts || []).map(slug => {
                    const p = findProduct(slug);
                    return p ? (
                      <span className="industry-prod" key={slug}>{p.name} · From ${p.price}</span>
                    ) : null;
                  })}
                </div>
                <div className="industry-caps">
                  {(ind.capabilities || []).map(c => (
                    <span className="industry-cap" key={c}>{c}</span>
                  ))}
                </div>
                <span className="industry-card-link">View Solutions &rarr;</span>
              </div>
            </Link>
          ))}
          <Link to="/contact#quote-form" className="industry-card industry-card--cta">
            <div className="industry-card-cta-inner">
              <span className="industry-card-cta-icon" aria-hidden="true">?</span>
              <h4>Your Industry?</h4>
              <p>Not on the list? Tell us your product — we'll recommend the right structure, material and finish.</p>
              <span className="industry-card-link">Talk to Us &rarr;</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Production & Projects：生产能力带 + 8 案例 ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ marginBottom: 48, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <div className="gold-line" />
            <span className="eyebrow">Production &amp; Projects</span>
            <h2>Selected Projects</h2>
          </div>
          <Link to="/portfolio" style={{ color:'var(--gold)', textDecoration:'none', fontSize:13, letterSpacing:'0.05em' }}>All Projects &rarr;</Link>
        </div>

        {/* Production at Mili — 3 张实拍横卡 */}
        <div className="production-strip">
          {[
            { img: '/assets/images/factory-foil.webp', t: 'In-house printing', s: 'Foil stamping · soft-touch · lamination' },
            { img: '/assets/images/factory-diecut.webp', t: 'Precision die-cutting', s: 'Structural & insert tooling in-house' },
            { img: '/assets/images/factory-qc.webp', t: 'AQL 2.5 final QC', s: 'Checked at every workstation' },
          ].map(x => (
            <Link to="/about" className="production-card" key={x.t}>
              <img src={x.img} alt={x.t} loading="lazy" />
              <div className="production-card-text">
                <span className="production-card-title">{x.t}</span>
                <span className="production-card-sub">{x.s}</span>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign:'center', margin:'14px 0 40px' }}>
          <Link to="/about" style={{ color:'var(--gold)', textDecoration:'none', fontSize:12, letterSpacing:'0.06em' }}>About the Factory &rarr;</Link>
        </div>

        {/* Selected Projects — 8 案例，左图右文横卡 2×4 */}
        <div className="case-grid">
          {cases.map(c => (
            <div className="case-card" key={c.id}>
              <div className="case-img">
                <img src={c.img} alt={c.client} loading="lazy" />
              </div>
              <div className="case-body">
                <span className="case-eyebrow">{c.client} · {c.industry}</span>
                <h4>{c.type}</h4>
                <p>{c.finish}</p>
                <div className="case-facts">
                  <span>Qty <b>{c.qty}</b></span>
                  <span>Lead <b>{c.leadTime}</b></span>
                  <span className="case-result">{c.result}</span>
                </div>
                <a className="case-cta" href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(`Hi Mili team! I'd like a project like ${c.type} for ${c.industry}. Please send a quote.`)}`} target="_blank" rel="noopener noreferrer">Start a Similar Project &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Packaging Insights (Blog internal links) ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ marginBottom: 48 }}>
          <div className="gold-line" />
          <span className="eyebrow">Packaging Insights</span>
          <h2>Guides for Smart Buyers</h2>
        </div>
        <div className="container">
          <div className="insights-grid">
            {[
              ['/blog/1/', 'Buyer Guides', 'How to Choose the Right Packaging Box for Your Skincare Brand (2026 Guide)'],
              ['/blog/6/', 'Luxury Structure', 'Magnetic Closure Box: The Ultimate Guide for Luxury Brands'],
              ['/blog/3/', 'Finishing', 'Gold Foil vs Hot Stamping vs Embossing: A Complete Finishing Guide'],
            ].map(([to, tag, title]) => (
              <Link key={to} to={to} style={{ background:'var(--black-2)', padding:'26px 24px', textDecoration:'none', display:'block' }}>
                <div style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--gold)', marginBottom:10 }}>{tag}</div>
                <h4 style={{ fontSize:15, lineHeight:1.5, color:'var(--white)', margin:0 }}>{title}</h4>
                <div style={{ marginTop:14, color:'var(--gold)', fontSize:12, letterSpacing:'0.06em' }}>Read Guide &rarr;</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section" style={{ background:'var(--black-2)', borderTop:'1px solid var(--border-dim)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom: 64 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">Client Words</span>
            <h2>What Our Partners Say</h2>
          </div>
          <div className="testi-grid">
            {testimonials.map(t => (
              <div className="testi-card" key={t.author}>
                <div className="testi-text">{t.text}</div>
                <div className="testi-author">{t.author}</div>
                <div className="testi-role">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="cta-band">
        <div className="gold-line gold-line-center" />
        <span className="eyebrow">Ready to Start?</span>
        <h2>Elevate Your Packaging Today</h2>
        <p>Tell us your brief. Get a tailored quote within 24 hours. Free design, free samples, zero obligation.</p>
        <div className="cta-band-actions">
          <a href="/contact" className="btn-gold">Start Your Project</a>
          <a href="/products" className="btn-outline-gold">Browse Products</a>
        </div>
      </section>
    </>
  );
}
