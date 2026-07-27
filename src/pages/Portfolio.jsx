import { Link } from 'react-router-dom';
import { useState } from 'react';

const cases = [
  { id:1, client:'Aurora Beauty', industry:'Cosmetics', type:'Magnetic Gift Box', finish:'Gold Foil + Matte Lamination', qty:'2,000 units', img:'/assets/images/case-cosmetics.jpg', desc:'Premium skincare gift set with custom magnetic boxes, gold foil brand embossing, and foam inserts protecting serum bottles. Full unboxing experience designed for social media.' },
  { id:2, client:'Lumina Jewels', industry:'Jewelry', type:'Rigid Jewelry Box Set', finish:'Embossing + Velvet Interior', qty:'5,000 units', img:'/assets/images/case-jewelry.jpg', desc:'Matching ring, necklace, and bracelet box collection in matte black with embossed gold logo and cream velvet lining. Boutique-level presentation on a production budget.' },
  { id:3, client:'Vere Apparel', industry:'Fashion', type:'Shipping Mailer Box', finish:'Full-Color Print + Kraft', qty:'10,000 units', img:'/assets/images/shipping-box-kraft.jpg', desc:'Custom branded mailer boxes for e-commerce with eco-friendly kraft exterior and full-color interior print. Flat-packed for efficient warehousing and logistics.' },
  { id:4, client:'Selene Cosmetics', industry:'Beauty', type:'Cosmetic Box Series', finish:'UV Spot + Soft Touch', qty:'3,500 units', img:'/assets/images/cosmetic-box-black.jpg', desc:'Multi-SKU cosmetic box series with precision foam cutouts, soft-touch lamination, and UV spot highlights on logo. Consistent brand identity across 6 product variants.' },
  { id:5, client:'Nocturne Boutique', industry:'Retail', type:'Paper Gift Bags', finish:'Foil Stamping + Ribbon Handle', qty:'8,000 units', img:'/assets/images/gift-bag-black.jpg', desc:'Luxury retail paper bags in matte black with gold foil brand name and black ribbon handles. Seasonal variants for summer and holiday collections.' },
  { id:6, client:'Meraki Home', industry:'Lifestyle', type:'Gift Box + Mailer', finish:'Emboss + Eco Kraft', qty:'4,200 units', img:'/assets/images/hero-black-gold.jpg', desc:'Home fragrance gift packaging combining a rigid outer gift box with kraft mailer for DTC shipping — dual-layer unboxing experience for subscription boxes.' },
];

const filters = ['All', 'Cosmetics', 'Jewelry', 'Fashion', 'Beauty', 'Retail', 'Lifestyle'];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? cases : cases.filter(c => c.industry === active);

  return (
    <div className="page-scaffold">
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="gold-line" />
          <span className="eyebrow">Our Work</span>
          <h1>Selected Projects</h1>
          <p>Real packaging solutions for real brands. Each project tailored to the client's identity, product, and audience.</p>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ borderBottom:'1px solid var(--border-dim)', padding:'20px 0' }}>
        <div className="container" style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)} style={{
              background: active===f ? 'var(--gold)' : 'transparent',
              border: '1px solid ' + (active===f ? 'var(--gold)' : 'var(--border-dim)'),
              color: active===f ? 'var(--black)' : 'var(--gray-3)',
              padding:'7px 18px', fontSize:11, letterSpacing:'0.05em', textTransform:'uppercase',
              cursor:'pointer', transition:'all 0.2s',
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 2 }}>
            {filtered.map(c => (
              <div key={c.id} style={{ background:'var(--black-2)', border:'1px solid var(--border-dim)', overflow:'hidden' }}>
                <div style={{ overflow:'hidden', aspectRatio:'16/9' }}>
                  <img src={c.img} alt={c.client} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease' }}
                    onMouseEnter={e => e.target.style.transform='scale(1.04)'}
                    onMouseLeave={e => e.target.style.transform='scale(1)'} />
                </div>
                <div style={{ padding:'32px 28px' }}>
                  <div style={{ display:'flex', gap: 8, flexWrap:'wrap', marginBottom: 16 }}>
                    {[c.industry, c.type, c.finish].map(t => (
                      <span key={t} style={{ fontSize:10, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--gold)', border:'1px solid var(--border)', padding:'3px 10px' }}>{t}</span>
                    ))}
                  </div>
                  <h3 style={{ marginBottom: 8, fontSize: 20 }}>{c.client}</h3>
                  <p style={{ color:'var(--gray-3)', fontSize:13, lineHeight:1.7, marginBottom: 16 }}>{c.desc}</p>
                  <div style={{ display:'flex', gap: 24, fontSize:12, color:'var(--gray-2)' }}>
                    <span>Qty: <strong style={{ color:'var(--gray-3)' }}>{c.qty}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="gold-line gold-line-center" />
        <h2>Ready to Create Your Project?</h2>
        <p>Tell us what you need. Our team will design something just as impressive for your brand.</p>
        <div className="cta-band-actions">
          <Link to="/contact" className="btn-gold">Start a Project</Link>
          <Link to="/products" className="btn-outline-gold">Browse Products</Link>
        </div>
      </section>
    </div>
  );
}
