import { Link } from 'react-router-dom';

const stats = [['12+','Years Experience'],['500+','Brands Served'],['50+','Countries Shipped'],['98%','On-Time Rate']];
const factory = [['20,000 m²','Production Area'],['2M+ pcs/mo','Capacity'],['200+','Workers'],['ISO 9001','Certified']];
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
      {/* Hero */}
      <div className="page-hero" style={{ padding:'80px 0 80px' }}>
        <div className="page-hero-inner">
          <div className="gold-line" />
          <span className="eyebrow">About Mili Packaging</span>
          <h1>We Don't Just Make Boxes.<br />We Make Brands Memorable.</h1>
          <p>Jiangxi Mili Packaging Materials Co., Ltd. — a premium B2B custom packaging manufacturer founded in 2018, serving global brands.</p>
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
              <img src="/assets/images/logo-mili.png" alt="Mili Packaging" style={{ width:220, opacity:0.85, margin:'0 auto 24px', display:'block' }} />
              <blockquote style={{ fontFamily:'Georgia, serif', fontStyle:'italic', fontSize:18, color:'var(--gold)', lineHeight:1.5 }}>
                "Crafting premium packaging<br />that speaks for your brand."
              </blockquote>
            </div>
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
          <img src="/assets/images/factory-workshop.jpg" alt="Mili Packaging factory" style={{ width:'100%', aspectRatio:'16/8', objectFit:'cover', marginBottom: 2 }} />
          <div className="stat-row" style={{ marginTop: 2 }}>
            {factory.map(([n,l]) => (
              <div className="stat-box" key={l}><div className="stat-num" style={{ fontSize:32 }}>{n}</div><div className="stat-label">{l}</div></div>
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
