import { Link } from 'react-router-dom';
import { productGroups } from '../data/products';
// v20260808-update: 9 product groups, fixed business-value order (Module 1)
const products = productGroups.map(g => ({
  id: g.slug,
  title: g.name,
  desc: g.tagline,
  img: g.heroImg,
  tag: `MOQ ${g.moq} pcs | From $${g.priceFrom}`,
  isNew: !!g.isNew,
}));

const industries = [
  { name: 'Cosmetics & Beauty',  desc: 'Luxury magnetic boxes & custom inserts', img: '/assets/images/case-cosmetics-v4.jpg' },
  { name: 'Jewelry & Watches',   desc: 'Velvet-lined, gold foil, drawer-style', img: '/assets/images/case-jewelry-v4.jpg' },
  { name: 'Apparel & Fashion',   desc: 'Branded mailers & tissue packaging', img: '/assets/images/gift-bag-black-v3.jpg' },
  { name: 'Food & Beverage',     desc: 'Food-grade kraft & window cutout', img: '/assets/images/shipping-box-kraft-v4.jpg' },
  { name: 'Electronics',         desc: 'Precision foam inserts & anti-static', img: '/assets/images/product-mailer-v3.jpg' },
  { name: 'Corporate Gifts',     desc: 'Bespoke gifting with brand identity', img: '/assets/images/jewelry-mili-v5.jpg' },
];

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
          <img src="/assets/images/hero-collection-v2.jpg" alt="Mili Packaging custom luxury boxes, jewelry cases, magnetic gift boxes, cosmetic boxes and paper bags" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>
            <span className="h1-desktop">Custom Luxury Gift Box<br />Manufacturer in China</span>
            <span className="h1-mobile">Custom Packaging<br />Luxury Gift Box<br />Manufacturer in China</span>
          </h1>
          <p>Custom Boxes with Your Logo - Free Design | MOQ 100 pcs | 50+ Countries.</p>
          <div className="hero-badges">
            {['FSC Certified', 'ISO 9001', 'SGS Audited'].map(b => (
              <span className="hero-badge" key={b}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                {b}
              </span>
            ))}
          </div>
          <div className="hero-actions">
            <a href="/contact" className="btn-gold">Get a Free Quote</a>
            <a href="/products" className="btn-outline-white">Browse Products</a>
          </div>
          <div className="hero-stats-row">
            {[['MOQ','100 pcs'],['Lead Time','15 Days'],['Design','Free'],['Shipping','50+ Countries']].map(([l,v]) => (
              <div className="hero-stat" key={l}>
                <span className="hero-stat-label">{l}</span>
                <span className="hero-stat-value">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-badge-row">
          {[
            { d: 'M12 8v4l3 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', c: '#E0A83C', n: '48h', l: 'Quote & 3D Mockup' },
            { d: 'M3 8h18v12H3V8zM3 12h18M8 4v4M16 4v4', c: '#4FA8C9', n: '7 Days', l: 'Pre-Production Sample' },
            { d: 'M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3zM9 12l2 2 4-4', c: '#5FB878', n: 'AQL 2.5', l: 'Quality Inspected' },
            { d: 'M20 6L9 17l-5-5', c: '#C9A227', n: '100%', l: 'On-Time Delivery' },
            { d: 'M4 20c0-9 7-16 16-16-1 9-7 16-16 16zM4 20c4-4 7-8 8-13', c: '#7CB342', n: 'FSC', l: 'Certified Material' },
            { d: 'M12 2l10 5-10 5L2 7l10-5zM2 17l10 5 10-5M2 12l10 5 10-5', c: '#7E8AC8', n: '500+', l: 'Brands Served' },
          ].map(({ d, c, n, l }) => (
            <div className="hero-badge-item" key={l}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="hero-badge-icon" aria-hidden="true"><path d={d} /></svg>
              <div className="hero-badge-num">{n}</div>
              <div className="hero-badge-label">{l}</div>
            </div>
          ))}
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
                <img src={p.img} alt={p.title} className="product-card-img" />
              </div>
              <div className="product-card-body">
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
                <span className="product-card-tag">{p.tag}</span>
                <a href="https://wa.me/8618296876285" target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:12, fontSize:12, color:'var(--gold)', textDecoration:'none', border:'1px solid var(--border)', padding:'6px 12px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Quote
                </a>
              </div>
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
            <Link to="/industries" className="industry-card" key={ind.name}>
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
          <Link to="/portfolio" className="portfolio-card">
            <img src="/assets/images/case-cosmetics-v3.jpg" alt="Cosmetics case study" className="portfolio-card-img" />
            <div className="portfolio-card-overlay">
              <div className="portfolio-card-tags">
                <span className="portfolio-tag">Cosmetics</span>
                <span className="portfolio-tag">Magnetic Box</span>
                <span className="portfolio-tag">Gold Foil</span>
              </div>
              <h4>Skincare Brand (USA) — Magnetic Gift Box Series</h4>
              <p>Luxury cosmetics packaging with gold foil logo and custom magnetic closure. FSC-certified materials used.</p>
            </div>
          </Link>
          <Link to="/portfolio" className="portfolio-card">
            <img src="/assets/images/case-jewelry-v3.jpg" alt="Jewelry case study" className="portfolio-card-img" />
            <div className="portfolio-card-overlay">
              <div className="portfolio-card-tags">
                <span className="portfolio-tag">Jewelry</span>
                <span className="portfolio-tag">Rigid Box</span>
                <span className="portfolio-tag">Embossing</span>
              </div>
              <h4>Jewelry Startup (UK) — Drawer Box Series</h4>
              <p>Velvet-lined drawer box with ribbon pull. Custom embossed logo and satin interior. Delivered in 2 weeks.</p>
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

      {/* Floating CTA */}
      <a href="/contact" className="sticky-quote">Quick Quote</a>
      <a href="https://wa.me/8618296876285" target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="Chat on WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </>
  );
}
