import { Link } from 'react-router-dom';
import { useState } from 'react';

export const cases = [
  { id:1, client:'Skincare Brand (USA)', industry:'Cosmetics', type:'Magnetic Gift Box', finish:'Gold Foil + Matte Lamination', qty:'2,000 units', leadTime:'12 days', img:'/assets/images/product-hero-v5.webp', desc:'Premium skincare gift set with custom magnetic boxes, gold foil brand embossing, and foam inserts protecting serum bottles. Full unboxing experience designed for social media.', result:'+40% social growth from unboxing' },
  { id:2, client:'Jewelry Startup (UK)', industry:'Jewelry', type:'Rigid Jewelry Box Set', finish:'Embossing + Velvet Interior', qty:'5,000 units', leadTime:'18 days', img:'/assets/images/case-jewelry-v4.webp', desc:'Matching ring, necklace, and bracelet box collection in matte black with embossed gold logo and cream velvet lining. Boutique-level presentation on a production budget.', result:'18-day door-to-door delivery' },
  { id:3, client:'EU Apparel Brand', industry:'Fashion', type:'Shipping Mailer Box', finish:'Full-Color Print + Kraft', qty:'10,000 units', leadTime:'10 days', img:'/assets/images/shipping-box-kraft-v4.webp', desc:'Custom branded mailer boxes for e-commerce with eco-friendly kraft exterior and full-color interior print. Flat-packed for efficient warehousing and logistics.', result:'2.1× repeat order rate' },
  { id:4, client:'US Beauty Label', industry:'Beauty', type:'Cosmetic Box Series', finish:'UV Spot + Soft Touch', qty:'3,500 units', leadTime:'12 days', img:'/assets/images/case-cosmetics-v4.webp', desc:'Multi-SKU cosmetic box series with precision foam cutouts, soft-touch lamination, and UV spot highlights on logo. Consistent brand identity across 6 product variants.', result:'6 SKUs, 1 consistent brand system' },
  { id:5, client:'Boutique Retailer (CA)', industry:'Retail', type:'Paper Gift Bags', finish:'Foil Stamping + Ribbon Handle', qty:'8,000 units', leadTime:'12 days', img:'/assets/images/gift-bag-black-v3.webp', desc:'Luxury retail paper bags in matte black with gold foil brand name and black ribbon handles. Seasonal variants for summer and holiday collections.', result:'Seasonal line delivered in 12 days' },
  { id:6, client:'Lifestyle Brand (AU)', industry:'Lifestyle', type:'Gift Box + Mailer', finish:'Emboss + Eco Kraft', qty:'4,200 units', leadTime:'10 days', img:'/assets/images/hero-black-gold-v2.webp', desc:'Home fragrance gift packaging combining a rigid outer gift box with kraft mailer for DTC shipping — dual-layer unboxing experience for subscription boxes.', result:'23% trial-to-paid conversion' },
  { id:7, client:'Watch Brand (CH)', industry:'Watches', type:'Rigid Watch Box Set', finish:'Foam Cradle + Emboss', qty:'3,000 units', leadTime:'14 days', img:'/assets/images/mig-modern-watch-box-2.webp', desc:'Single-watch presentation boxes with cushioned pillows and precision foam cradles, embossed logo, delivered in protective double-wall shippers for export.', result:'0% transit damage in 3k units' },
  { id:8, client:'Wine & Spirits (USA)', industry:'Wine & Spirits', type:'Magnetic Rigid Gift Set', finish:'Gold Foil + Velvet Cradle', qty:'2,500 units', leadTime:'15 days', img:'/assets/images/mig-luxury-magnetic-box-3.webp', desc:'Magnetic rigid gift sets with velvet bottle cradles and gold foil branding — designed for holiday gifting programs and duty-free retail placement.', result:'15-day door-to-door delivery' },
];

const filters = ['All', 'Cosmetics', 'Jewelry', 'Watches', 'Fashion', 'Beauty', 'Retail', 'Lifestyle', 'Wine & Spirits'];

const portfolioStats = [
  ['500+', 'Brands Served'],
  ['50+', 'Export Countries'],
  ['98%', 'On-Time Rate'],
  ['48 h', 'Free 3D Mockup'],
];

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
          <p>Real packaging solutions for real brands — from single-SKU launches to multi-market gift programs. Every project tailored to the client's identity, product, and audience.</p>
        </div>
      </div>

      <section style={{ padding: '0 0 40px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border-dim)', border: '1px solid var(--border-dim)' }}>
            {portfolioStats.map(([n, l]) => (
              <div key={l} style={{ background: 'var(--black-2)', padding: '26px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>{n}</div>
                <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-3)', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
          <span style={{ marginLeft:'auto', fontSize:12, color:'var(--gray-3)', alignSelf:'center' }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} shown
          </span>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 2 }}>
            {filtered.map(c => (
              <div key={c.id} style={{ background:'var(--black-2)', border:'1px solid var(--border-dim)', overflow:'hidden', display:'flex', flexDirection:'column' }}>
                <div style={{ overflow:'hidden', aspectRatio:'16/9' }}>
                  <img src={c.img} alt={c.client} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease' }}
                    onMouseEnter={e => e.target.style.transform='scale(1.04)'}
                    onMouseLeave={e => e.target.style.transform='scale(1)'} />
                </div>
                <div style={{ padding:'32px 28px', flex:1, display:'flex', flexDirection:'column' }}>
                  <div style={{ display:'flex', gap: 8, flexWrap:'wrap', marginBottom: 16 }}>
                    {[c.industry, c.type].map(t => (
                      <span key={t} style={{ fontSize:10, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--gold)', border:'1px solid var(--border)', padding:'3px 10px' }}>{t}</span>
                    ))}
                    <span style={{ fontSize:10, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--gray-3)', border:'1px dashed var(--border)', padding:'3px 10px' }}>{c.finish}</span>
                  </div>
                  <h3 style={{ marginBottom: 8, fontSize: 20 }}>{c.client}</h3>
                  <p style={{ color:'var(--gray-3)', fontSize:13, lineHeight:1.7, marginBottom: 20, flex:1 }}>{c.desc}</p>
                  <div style={{ borderLeft:'3px solid var(--gold)', background:'rgba(201,162,39,.06)', padding:'12px 16px', marginBottom: 16 }}>
                    <div style={{ fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--gray-3)', marginBottom:4 }}>Result</div>
                    <div style={{ color:'var(--gold)', fontSize:16, fontWeight:700, fontFamily:'var(--font-display)', letterSpacing:'0.02em' }}>{c.result}</div>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap: 16, fontSize:12, color:'var(--gray-2)', flexWrap:'wrap', borderTop:'1px solid var(--border-dim)', paddingTop:16 }}>
                    <span>Qty: <strong style={{ color:'var(--gray-3)' }}>{c.qty}</strong></span>
                    <span>Lead time: <strong style={{ color:'var(--gray-3)' }}>{c.leadTime}</strong></span>
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
        <p>Tell us what you need. Our team will design something just as impressive for your brand — free 3D mockup within 48 hours.</p>
        <div className="cta-band-actions">
          <Link to="/contact" className="btn-gold">Start a Project</Link>
          <Link to="/products" className="btn-outline-gold">Browse Products</Link>
        </div>
      </section>
    </div>
  );
}
