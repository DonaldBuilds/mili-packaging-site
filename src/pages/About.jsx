import { Link } from 'react-router-dom';

const stats = [['Since 2018','Established'],['500+','Brands Served'],['50+','Countries Shipped'],['98%','On-Time Rate']];
const factory = [['20,000 m²','Production Area'],['2M+ pcs/mo','Capacity'],['200+','Workers'],['ISO 9001','Certified']];
const milestones = [
  ['2018', 'Founded in Jiangxi', 'Launched as a local workshop focused on rigid gift boxes, serving regional export traders.'],
  ['2020', 'Full In-House Production', 'Added die-cutting, foil stamping, insert cutting and hand-assembly under one roof — 20,000 m² facility.'],
  ['2022', 'FSC & ISO 9001 Certified', 'Achieved FSC chain-of-custody and ISO 9001 quality management; expanded to 500+ brands across 50+ countries.'],
  ['2024', 'Global Partner Platform', 'Full-service design, sampling and door-to-door logistics — serving e-commerce, retail and gifting programs worldwide.'],
];
const certifications = [
  ['ISO 9001', 'Quality Management System'],
  ['FSC Certified', 'Sustainable Forestry'],
  ['AQL 2.5', 'Inspection Standard'],
  ['SGS Tested', 'Material Safety'],
];
const values = [
  ['Precision','Every box meets AQL 2.5 inspection standards. We do not ship until it is right.'],
  ['Sustainability','FSC-certified board, soy-based inks, water-based adhesives. Biodegradable options available.'],
  ['Partnership','Not a supplier — a partner. Dedicated account manager. Direct factory communication.'],
  ['Innovation','Continuous investment in equipment, technique, and materials. Always one step ahead.'],
];
const services = [
  ['Structural Design','Custom box engineering for your product dimensions, protection, and unboxing experience. Free for all new clients.'],
  ['Graphic Design','Full-color print layout, logo placement, and surface finish consultation. 3D mockups within 48 hours.'],
  ['Free Sampling','2 rounds of free structural samples. Pre-production samples available — cost deducted from bulk order.'],
  ['Global Logistics','FOB, CIF, DDP, door-to-door. We handle customs documentation for 50+ countries.'],
  ['Quality Control','AQL 2.5 throughout production: material incoming inspection, in-process QC, final random sampling.'],
];

export default function About() {
  return (
    <div className="page-scaffold">
      {/* Hero — 大图 + 渐变遮罩 */}
      <div style={{ position: 'relative', minHeight: 520, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img src="/assets/images/factory-gate-cropped.webp" alt="Mili Packaging factory" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,.86) 0%, rgba(0,0,0,.55) 60%, rgba(0,0,0,.2) 100%)' }} />
        <div className="container" style={{ position: 'relative', padding: '100px 0' }}>
          <div className="gold-line" />
          <span className="eyebrow">About Mili Packaging</span>
          <h1 style={{ fontSize: 'clamp(30px, 3.6vw, 52px)', margin: '12px 0 18px', fontFamily: 'var(--font-display)', color: '#fff', maxWidth: 720, textShadow: '0 2px 16px rgba(0,0,0,.5)' }}>Premium Packaging,<br />Engineered for Brands That Ship Global.</h1>
          <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 15, lineHeight: 1.8, maxWidth: 620, marginBottom: 28 }}>
            Jiangxi Mili Packaging Materials Co., Ltd. — a premium B2B custom packaging manufacturer founded in 2018, serving global brands with factory-direct quality.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none' }}>Get a Quote</Link>
            <Link to="/portfolio" className="btn-outline-gold" style={{ textDecoration: 'none' }}>View Our Work</Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stat-row">
            {stats.map(([n,l]) => (
              <div className="stat-box" key={l}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section" style={{ background:'var(--black-2)', borderTop:'1px solid var(--border-dim)' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 80, alignItems:'center' }}>
            <div>
              <div className="gold-line" />
              <span className="eyebrow">Our Story</span>
              <h2 style={{ marginBottom: 24 }}>Built on<br />Manufacturing Excellence</h2>
              <p style={{ color:'var(--gray-3)', fontSize:15, lineHeight:1.8, marginBottom:16 }}>
                Founded in Jiangxi — China's packaging manufacturing heartland — Mili Packaging was built on one belief: every product deserves packaging that elevates it.
              </p>
              <p style={{ color:'var(--gray-3)', fontSize:15, lineHeight:1.8, marginBottom:16 }}>
                Since 2018, we have grown from a local workshop into a full-service global packaging partner, serving 500+ brands across 50+ countries. Our in-house design, production, and QC teams operate as one integrated unit — delivering factory-direct quality at scale.
              </p>
              <p style={{ color:'var(--gray-3)', fontSize:15, lineHeight:1.8 }}>
                We are FSC-certified, committed to sustainable manufacturing, and genuinely invested in every client's brand story. When your packaging wins, we win.
              </p>
            </div>
            <div style={{ textAlign:'center' }}>
              <img src="/assets/images/logo-horizontal-clear.webp" alt="Mili Packaging" style={{ width: 280, opacity: 0.9, margin: '0 auto 24px', display: 'block' }} />
              <blockquote style={{ fontFamily:'Georgia, serif', fontStyle:'italic', fontSize:18, color:'var(--gold)', lineHeight:1.5 }}>
                "Crafting premium packaging<br />that speaks for your brand."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 发展历程时间线 */}
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ textAlign:'center', marginBottom: 56 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">Our Journey</span>
            <h2>From Workshop to Global Partner</h2>
          </div>
          <div style={{ position:'relative', paddingLeft: 28 }}>
            <div style={{ position:'absolute', left: 7, top: 4, bottom: 4, width: 1, background: 'var(--border-dim)' }} />
            {milestones.map(([year, title, desc]) => (
              <div key={year} style={{ position:'relative', marginBottom: 36 }}>
                <div style={{ position:'absolute', left: -28, top: 6, width: 15, height: 15, borderRadius: '50%', border: '2px solid var(--gold)', background: 'var(--black)', boxSizing: 'border-box' }} />
                <div style={{ fontSize: 12, letterSpacing: '0.1em', color: 'var(--gold)', fontWeight: 700, marginBottom: 4 }}>{year}</div>
                <h4 style={{ marginBottom: 6, fontSize: 16 }}>{title}</h4>
                <p style={{ color:'var(--gray-3)', fontSize: 13.5, lineHeight: 1.7, margin: 0, maxWidth: 640 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 证书墙 */}
      <section className="section-sm">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border-dim)', border: '1px solid var(--border-dim)' }}>
            {certifications.map(([n, l]) => (
              <div key={n} style={{ background: 'var(--black-2)', padding: '24px 20px', textAlign: 'center' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" style={{ margin: '0 auto 10px', display: 'block' }} aria-hidden="true"><path d="M9 12l2 2 4-4" /><path d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z" /></svg>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>{n}</div>
                <div style={{ fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--gray-3)', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom: 56 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">Factory Strength</span>
            <h2>Precision at Scale</h2>
          </div>
          <img src="/assets/images/factory-gate-cropped.webp" alt="Mili Packaging factory entrance, Jiangxi Mili Packaging Materials Co., Ltd." style={{ width:'100%', aspectRatio:'16/10', objectFit:'cover', marginBottom: 2 }} />
          <div className="stat-row" style={{ marginTop: 2 }}>
            {factory.map(([n,l]) => (
              <div className="stat-box" key={l}><div className="stat-num" style={{ fontSize:32 }}>{n}</div><div className="stat-label">{l}</div></div>
            ))}
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:12, margin:'72px 0 36px' }}>
            <div>
              <div className="gold-line" />
              <span className="eyebrow">Inside Our Factory</span>
              <h2 style={{ margin: 0 }}>Production Floor</h2>
            </div>
            <p style={{ color:'var(--gray-3)', fontSize:13, maxWidth:420, margin:0 }}>
              From raw greyboard to finished box — every craft step runs under one roof: die-cutting, foil stamping, insert cutting, hand assembly, QC and warehousing.
            </p>
          </div>
          <div className="factory-grid" style={{ marginBottom: 72 }}>
            {[
              ['Die-Cutting', '/assets/images/factory-diecut.webp'],
              ['Foil Stamping', '/assets/images/factory-foil.webp'],
              ['Insert Cutting', '/assets/images/factory-insert.webp'],
              ['Manual Assembly', '/assets/images/factory-assembly.webp'],
              ['Quality Control', '/assets/images/factory-qc.webp'],
              ['Finished Goods Warehouse', '/assets/images/factory-warehouse.webp'],
            ].map(([t, img]) => (
              <div className="factory-tile" key={t}>
                <img src={img} alt={`${t} at Mili Packaging`} loading="lazy" />
                <div className="factory-tile-label">
                  <span style={{ fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--gold)', fontWeight:700 }}>{t}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:12, marginBottom: 36 }}>
            <div>
              <div className="gold-line" />
              <span className="eyebrow">Sample Room</span>
              <h2 style={{ margin: 0 }}>1,000+ Samples on Display</h2>
            </div>
            <p style={{ color:'var(--gray-3)', fontSize:13, maxWidth:420, margin:0 }}>
              Our showroom is organized by category — rigid gift boxes, cosmetics, jewelry, mailers and corrugated — so you can compare structures, materials and finishes side by side.
            </p>
          </div>
          <div className="sample-room-grid">
            <div className="factory-tile" style={{ aspectRatio:'auto', minHeight: 420 }}>
              <img src="/assets/images/factory-sample-room.webp" alt="Mili Packaging sample room panorama" loading="lazy" style={{ height:'100%' }} />
            </div>
            <div className="sample-room-col">
              <div className="factory-tile">
                <img src="/assets/images/factory-showroom.webp" alt="Mili Packaging showroom with category displays" loading="lazy" />
              </div>
              <div className="factory-tile">
                <img src="/assets/images/factory-shelves.webp" alt="Mili Packaging sample shelves with branded boxes" loading="lazy" />
              </div>
            </div>
          </div>
          <div className="factory-grid" style={{ marginTop: 2 }}>
            {[
              ['Workshop Panorama', '/assets/images/factory-floor.webp'],
              ['Production Overview', '/assets/images/factory-overview.webp'],
              ['Industry Applications', '/assets/images/factory-industry-cases.webp'],
              ['Factory Capabilities', '/assets/images/factory-capability.webp'],
              ['Custom Design', '/assets/images/factory-showroom.webp'],
              ['Factory-Direct', '/assets/images/factory-gate.webp'],
            ].map(([t, img]) => (
              <div className="factory-tile" key={t}>
                <img src={img} alt={`${t} at Mili Packaging`} loading="lazy" />
                <div className="factory-tile-label">
                  <span style={{ fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--gold)', fontWeight:700 }}>{t}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom: 56 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">The People Behind Your Packaging</span>
            <h2>Dedicated Teams, One Account Manager</h2>
          </div>
          <div className="team-photos">
            <img src="/assets/images/team-collab.webp" alt="Mili packaging team collaborating on the production floor" loading="lazy" />
            <img src="/assets/images/team-qc.webp" alt="Mili QC team inspecting incoming materials" loading="lazy" />
          </div>
          <div className="values-grid">
            {[
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.6 7.6" /></svg>, title: 'Design Team', desc: 'Structural and graphic designers who turn your brief into production-ready artwork — free 3D mockups within 48 hours.' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 12l2 2 4-4" /><path d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z" /></svg>, title: 'QC Team', desc: 'AQL 2.5 inspectors at material incoming, in-process and final random sampling. Nothing ships without QC sign-off.' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" /><path d="M3 8l9 5 9-5" /><path d="M12 13v8" /></svg>, title: 'Production Team', desc: '200+ craftsmen running die-cutting, foil stamping, hand assembly and finishing across a 20,000㎡ facility.' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l5-1.5A10 10 0 1 0 12 2z" /><path d="M8.5 9.5c0 3 2.5 6 5.5 6l1.5-2-2-1-1 .6c-.8-.4-1.6-1.2-2-2l.6-1-1-2-1.6 1z" /></svg>, title: 'Account Managers', desc: 'Your single point of contact from sample to shipment — direct factory line, replies within 2 business hours.' },
            ].map(t => (
              <div className="value-card" key={t.title}>
                <div className="pillar-icon">{t.icon}</div>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <div className="gold-line" />
            <span className="eyebrow">What We Offer</span>
            <h2>Full Packaging Capability</h2>
          </div>
          <div className="cap-grid">
            <div className="cap-col">
              <div className="cap-col-title">Surface Finishes</div>
              <ul>
                {['Gold / Silver Foil Stamping','UV Spot Varnish','Embossing & Debossing','Matte / Gloss Lamination','Soft-Touch Film','Holographic & Metallic'].map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div className="cap-col">
              <div className="cap-col-title">Materials</div>
              <ul>
                {['Greyboard (1.0–3.0mm)','Art Paper / Coated Paper','Specialty & Textured Paper','Kraft Paper / Corrugated','EVA Foam / Velvet / Satin','FSC-Certified Sustainable'].map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div className="cap-col">
              <div className="cap-col-title">Box Structures</div>
              <ul>
                {['Magnetic Flip-Top','Lid & Base (Rigid)','Drawer / Sleeve','Hinged / Clamshell','Book-Box / Folder','Shipping / Mailer Box'].map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background:'var(--black-2)', borderTop:'1px solid var(--border-dim)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom: 56 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">What We Stand For</span>
            <h2>Our Values</h2>
          </div>
          <div className="values-grid">
            {values.map(([title, desc]) => (
              <div className="value-card" key={title}>
                <div className="gold-line" />
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ marginBottom: 48 }}>
            <div className="gold-line" />
            <span className="eyebrow">Included Services</span>
            <h2>More Than Just Manufacturing</h2>
          </div>
          {services.map(([title, desc]) => (
            <div key={title} style={{ borderLeft:'2px solid var(--gold)', paddingLeft: 24, marginBottom: 36 }}>
              <h4 style={{ marginBottom: 6, fontSize:16 }}>{title}</h4>
              <p style={{ color:'var(--gray-3)', fontSize:14, lineHeight:1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="gold-line gold-line-center" />
        <h2>Let's Build Something Great</h2>
        <p>Ready to partner with a manufacturer who treats your brand as seriously as you do?</p>
        <div className="cta-band-actions">
          <Link to="/contact" className="btn-gold">Contact Us</Link>
          <Link to="/portfolio" className="btn-outline-gold">View Our Work</Link>
        </div>
      </section>
    </div>
  );
}
