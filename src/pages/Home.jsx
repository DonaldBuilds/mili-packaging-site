import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { productGroups } from '../data/products';
// v20260808-update: 9 product groups, fixed business-value order (Module 1)
const products = productGroups.map(g => ({
  id: g.slug,
  title: g.name,
  desc: g.tagline,
  img: g.heroImg,
  tag: g.slug === 'sample-starter-kits' ? 'Fixed $29 Kit | 12 sample boxes' : `MOQ ${g.moq} pcs | From $${g.priceFrom}`,
  isNew: !!g.isNew,
}));

// 5 industry cards mapped to industry pages with recommended box types (mapping table)
const industries = [
  { name: 'Beauty & Skincare',  desc: 'Cosmetic boxes, rigid gift sets & branded paper bags', img: '/assets/images/product-cosmetic.webp', to: '/industries/beauty-skincare' },
  { name: 'Electronics & Tech', desc: 'Rigid boxes with foam inserts & corrugated shippers', img: '/assets/images/product-rigid.webp', to: '/industries/electronics-tech' },
  { name: 'Fashion & Apparel',  desc: 'Branded mailers, boutique paper bags & tissue', img: '/assets/images/product-bag.webp', to: '/industries/fashion-apparel' },
  { name: 'Food & Beverage',    desc: 'Food-grade folding cartons & rigid gift boxes', img: '/assets/images/product-folding.webp', to: '/industries/food-beverage' },
  { name: 'Subscription & DTC', desc: 'Self-seal mailers & sample starter kits', img: '/assets/images/product-mailer.webp', to: '/industries/subscription-dtc' },
];

// ── Social proof ticker (20 items, 3.5s interval) ───────────────────────────
const SOCIAL_PROOF = [
  'Sarah from Lyon, France just requested a quote for cosmetic gift sets — 2 min ago',
  'James from Melbourne, AU approved a structural sample for magnetic boxes — 14 min ago',
  'A jewelry brand from New York placed a reorder of 5,000 units — 31 min ago',
  'Elena from Milan, IT requested 3D mockups for a fragrance packaging line — 1 hr ago',
  'David from Toronto just downloaded the sample kit guide — 8 min ago',
  'A DTC skincare brand from Seoul, KR completed sample approval — 45 min ago',
  'Marcus from London requested a bulk quote for 10,000 rigid gift boxes — 22 min ago',
  'Sofia from Madrid approved final artwork — production starts this week — 2 hr ago',
  'A corporate gifting company from Dubai ordered 2,000 watch boxes — 3 hr ago',
  'Lena from Amsterdam just submitted a Quote Form for mailer boxes — 5 min ago',
  'An apparel brand from Los Angeles requested eco-kraft mailer samples — 38 min ago',
  'Kevin from Singapore received his sample kit — placed a 3,000-unit order — 1 hr ago',
  'A fragrance brand from Paris requested soft-touch rigid box samples — 17 min ago',
  'A UK gifting company approved production run of 8,000 pcs — 4 hr ago',
  'Priya from Mumbai requested a quote for 500 jewelry boxes — 26 min ago',
  'A beauty subscription brand from Berlin confirmed DDP shipment — 6 hr ago',
  'Lucas from São Paulo requested custom FSC-certified paper bags — 52 min ago',
  'A watch brand from Geneva placed an order for 50-unit sample run — 3 hr ago',
  'Ava from Stockholm viewed the Rigid Gift Box spec page — just now',
  'A US e-commerce brand reordered 20,000 mailer boxes — quarterly program — 5 hr ago',
];

function SocialProofTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % SOCIAL_PROOF.length);
        setVisible(true);
      }, 280);
    }, 3500);
    return () => clearInterval(t);
  }, []);
  return (
    /* 问题1修复：去掉边框和背景色，改为极细分隔线+透明背景，不遮背景图 */
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '6px 0', marginBottom: 18,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
        background: '#25D366', boxShadow: '0 0 6px rgba(37,211,102,0.8)',
        animation: 'spPulse 2s ease-in-out infinite',
      }} />
      <span style={{
        fontSize: 12, color: 'rgba(210,210,210,0.72)',
        transition: 'opacity 0.25s ease',
        opacity: visible ? 1 : 0,
        lineHeight: 1.4, letterSpacing: '0.01em',
      }}>
        {SOCIAL_PROOF[idx]}
      </span>
    </div>
  );
}

const testimonials = [
  { text: '"The quality exceeded our expectations. Our unboxing content went viral — we directly attribute 40% of our social growth to the packaging."', author: 'Sarah L.', role: 'Brand Manager, US Cosmetics Brand' },
  { text: '"Finally found a packaging partner who understands luxury. The gold foil stamping across 10,000 units was absolutely flawless."', author: 'David C.', role: 'CEO, UK Jewelry Brand' },
  { text: '"Sample approval to delivery in 18 days. Mili handled design, production, customs. Genuinely zero headache experience."', author: 'Maria K.', role: 'Operations Director, EU Apparel Brand' },
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
          {/* P1: H1大写无衬线 — 主标题 + MOQ差异化行（问题3：字体风格对标luxopack） */}
          <h1>
            <span className="h1-desktop">
              CUSTOM LUXURY GIFT BOX<br />MANUFACTURER IN CHINA
            </span>
            <span className="h1-mobile">
              CUSTOM LUXURY<br />GIFT BOX MANUFACTURER<br />IN CHINA
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
              { label: 'ISO 9001:2018', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg> },
              { label: 'SGS Audited', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg> },
            ].map(({ label, icon }) => (
              <span className="hero-badge" key={label}>{icon}{label}</span>
            ))}
          </div>
          {/* P4: 社会证明滚动条 — CTA按钮上方 */}
          <SocialProofTicker />
          {/* P7: CTA文案微调 */}
          <div className="hero-actions">
            <a href="/contact" className="btn-gold">Get My Free Quote</a>
            <a href="/portfolio" className="btn-outline-white">See Our Work →</a>
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

        {/* P3: 6宫格数据卡 1+2+3 视觉分层 */}
        <div className="hero-badge-row hero-badge-row--tiered">
          {/* TIER 1 — 48h 主卡（全宽，金色高亮，视觉焦点） */}
          <div className="hb-tier1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 8v4l3 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
            <div>
              <div className="hb-t1-num">48h</div>
              <div className="hb-t1-label">Quote &amp; 3D Mockup</div>
              <div className="hb-t1-compare">⏱ Industry standard: 3–5 business days</div>
            </div>
          </div>
          {/* TIER 2 — 7 Days + AQL 2.5（双列次级卡） */}
          {[
            { d: 'M3 8h18v12H3V8zM3 12h18M8 4v4M16 4v4', c: '#4FA8C9', n: '7 Days', l: 'Sample Ready', sub: 'Free structural × 2 rounds' },
            { d: 'M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3zM9 12l2 2 4-4', c: '#5FB878', n: 'AQL 2.5', l: 'QC Standard', sub: 'At every production stage' },
          ].map(({ d, c, n, l, sub }) => (
            <div className="hb-tier2" key={n}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
              <div className="hb-t2-num" style={{ color: c }}>{n}</div>
              <div className="hb-t2-label">{l}</div>
              <div className="hb-t2-sub">{sub}</div>
            </div>
          ))}
          {/* TIER 3 — 4个支撑数据小卡（全宽行） */}
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
      </section>

      {/* ── Trusted By ── */}
      <section className="section-sm">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ margin: '0 auto 28px', display: 'block' }}>Trusted By Leading Brands Worldwide</span>
          <div className="logo-wall" style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'36px 48px', opacity:0.55 }}>
            {['aurora', 'lumina', 'vere', 'nocturne'].map(b => (
              <img src={`/assets/images/logo-${b}.svg`} alt={b} key={b} style={{ height:28, filter:'grayscale(1) brightness(2)' }} />
            ))}
          </div>
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
        <div className="product-grid">
          {products.map(p => (
            <Link to={`/products/${p.id}`} className="product-card" key={p.title} style={{ position: 'relative', textDecoration: 'none' }}>
              {p.isNew && (
                <span style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, background: 'var(--gold)', color: 'var(--black)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', padding: '4px 10px', textTransform: 'uppercase' }}>New</span>
              )}
              <div className="product-card-img-wrap">
                <img src={p.img} alt={p.title} className="product-card-img" loading="lazy" />
              </div>
              <div className="product-card-body">
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
                <span className="product-card-tag">{p.tag}</span>
              </div>
              <a href="https://wa.me/8618296876285" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
                onClick={e => e.stopPropagation()}
                style={{ position:'absolute', right:14, bottom:14, zIndex:2, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(37,211,102,0.12)', borderRadius:'50%' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </Link>
          ))}
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

      {/* ── Industries ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ marginBottom: 48 }}>
          <div className="gold-line" />
          <span className="eyebrow">Industry Solutions</span>
          <h2>Built for Your Industry</h2>
        </div>
        <div className="industry-grid">
          {industries.map((ind) => (
            <Link to={ind.to} className="industry-card" key={ind.name}>
              <img src={ind.img} alt={ind.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.45 }} />
              <div className="industry-card-overlay">
                <h4>{ind.name}</h4>
                <p>{ind.desc}</p>
                <span className="industry-card-link">Explore &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Portfolio Preview ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ marginBottom: 48, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <div className="gold-line" />
            <span className="eyebrow">Our Work</span>
            <h2>Selected Projects</h2>
          </div>
          <Link to="/portfolio" style={{ color:'var(--gold)', textDecoration:'none', fontSize:13, letterSpacing:'0.05em' }}>All Projects &rarr;</Link>
        </div>
        <div className="portfolio-grid">
          <Link to="/products/rigid-gift-boxes" className="portfolio-card">
            <img src="/assets/images/case-cosmetics-v3.jpg" alt="Cosmetics case study" className="portfolio-card-img" />
            <div className="portfolio-card-overlay">
              <div className="portfolio-card-tags">
                <span className="portfolio-tag">Cosmetic Boxes</span>
                <span className="portfolio-tag">Rigid Gift Boxes</span>
                <span className="portfolio-tag">Gold Foil</span>
              </div>
              <span style={{ display:'inline-block', marginTop:12, background:'rgba(201,162,39,0.16)', border:'1px solid var(--gold)', color:'var(--gold)', fontSize:10, fontWeight:700, letterSpacing:'0.07em', padding:'4px 10px', textTransform:'uppercase' }}>MOQ 100 pcs</span>
              <h4 style={{ marginTop: 14 }}>Skincare Brand (USA) — Magnetic Gift Box Series</h4>
              <p>Luxury cosmetics packaging with gold foil logo and custom magnetic closure. FSC-certified materials used.</p>
              <span className="industry-card-link" style={{ marginTop: 12, display: 'inline-block' }}>View Box Style &rarr;</span>
            </div>
          </Link>
          <Link to="/products/jewelry-boxes" className="portfolio-card">
            <img src="/assets/images/case-jewelry-v3.jpg" alt="Jewelry case study" className="portfolio-card-img" />
            <div className="portfolio-card-overlay">
              <div className="portfolio-card-tags">
                <span className="portfolio-tag">Jewelry Boxes</span>
                <span className="portfolio-tag">Rigid Gift Boxes</span>
                <span className="portfolio-tag">Embossing</span>
              </div>
              <span style={{ display:'inline-block', marginTop:12, background:'rgba(201,162,39,0.16)', border:'1px solid var(--gold)', color:'var(--gold)', fontSize:10, fontWeight:700, letterSpacing:'0.07em', padding:'4px 10px', textTransform:'uppercase' }}>MOQ 100 pcs</span>
              <h4 style={{ marginTop: 14 }}>Jewelry Startup (UK) — Drawer Box Series</h4>
              <p>Velvet-lined drawer box with ribbon pull. Custom embossed logo and satin interior. Delivered in 2 weeks.</p>
              <span className="industry-card-link" style={{ marginTop: 12, display: 'inline-block' }}>View Box Style &rarr;</span>
            </div>
          </Link>
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

      {/* Floating CTA — P7: 60-Sec Quote */}
      <a href="/contact" className="sticky-quote">⚡ 60-Sec Quote</a>
      <a href="https://wa.me/8618296876285" target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="Chat on WhatsApp — usually replies in 2h" title="Chat on WhatsApp · Usually replies in 2h">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </>
  );
}
