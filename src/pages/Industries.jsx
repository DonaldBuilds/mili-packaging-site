import { Link } from 'react-router-dom';

const industries = [
  {
    id: 'cosmetics',
    name: 'Cosmetics & Beauty',
    hero: 'Packaging that sells before the lid opens.',
    intro: 'In the beauty industry, packaging is product. Consumers judge brands before the first use — your box must communicate luxury, trust, and experience from the moment it arrives.',
    img: '/assets/images/case-cosmetics-v4.jpg',
    painPoints: ['Fragile bottles need precision-fit inserts', 'Brand consistency across 10+ SKUs', 'Premium feel at scalable price points', 'Sustainable packaging preference growing'],
    solutions: ['Custom foam/EVA die-cut inserts for bottles & jars', 'Magnetic flip-top boxes with soft-touch lamination', 'UV spot & holographic finishes for shelf standout', 'FSC-certified board with soy-ink printing'],
    recommended: ['Magnetic Gift Box', 'Rigid Paper Box', 'Cosmetic Gift Set Box'],
    caseStudy: { client: 'Skincare Brand (USA)', result: '2,000-unit skincare gift set. Gold foil magnetic box with precision foam inserts. Launched with 180% target sell-through in 3 weeks.' },
  },
  {
    id: 'jewelry',
    name: 'Jewelry & Watches',
    hero: 'The box is part of the proposal.',
    intro: 'Fine jewelry packaging carries emotional weight. Whether it is an engagement ring or a gifted bracelet, the box creates anticipation and amplifies the moment of reveal.',
    img: '/assets/images/case-jewelry-v4.jpg',
    painPoints: ['Velvet lining must grip the piece securely', 'Multiple SKUs — ring, necklace, bracelet, watch', 'Anti-tarnish materials required', 'Packaging as keepsake, not just delivery'],
    solutions: ['Premium velvet & satin-lined rigid boxes', 'Matching ring, necklace & bracelet sets', 'Gold/silver embossed logos on matte or gloss covers', 'Drawer-style, hinged, and book-box formats'],
    recommended: ['Jewelry Box', 'Magnetic Gift Box', 'Drawer-style Rigid Box'],
    caseStudy: { client: 'Jewelry Startup (UK)', result: 'Matching 3-piece box set (ring/necklace/bracelet) in black with cream velvet and embossed gold logo. 5,000 units. Rated top packaging by retail buyers.' },
  },
  {
    id: 'apparel',
    name: 'Apparel & Fashion',
    hero: 'Make the delivery as exciting as the outfit.',
    intro: 'Fashion brands know that the unboxing is the new fitting room. E-commerce shipping packaging that creates a wow moment drives reviews, repurchase, and social sharing.',
    img: '/assets/images/gift-bag-black-v3.jpg',
    painPoints: ['Shipping boxes often crushed in transit', 'Branded packaging increases return rate satisfaction', 'Tissue paper and accessories add cost complexity', 'Seasonal design updates needed'],
    solutions: ['Custom printed corrugated mailer boxes', 'Interior tissue paper with logo sticker seal', 'Rigid apparel boxes for premium retail', 'Paper gift bags with ribbon handles for boutiques'],
    recommended: ['Shipping Mailer Box', 'Paper Gift Bag', 'Rigid Apparel Box'],
    caseStudy: { client: 'EU Apparel Brand', result: 'Eco-kraft mailer boxes with full-color interior brand print. 10,000 units. Reduced return shipping damages by 60% vs. previous plain box.' },
  },
  {
    id: 'food',
    name: 'Food & Beverage',
    hero: 'Taste with your eyes first.',
    intro: 'Food and beverage packaging must work harder than any other category — communicating freshness, quality, and brand story while meeting strict food-safety requirements.',
    img: '/assets/images/shipping-box-kraft-v4.jpg',
    painPoints: ['Food-safe materials mandatory', 'Moisture & grease resistance needed', 'Window cutouts to show product', 'Seasonal gifting sets require flexible design'],
    solutions: ['Food-grade coated kraft and paperboard', 'Grease-resistant lamination for chocolates & pastries', 'Die-cut window options for product visibility', 'Custom hamper boxes for tea, wine & gourmet sets'],
    recommended: ['Paper Box', 'Gift Box', 'Kraft Shipping Box'],
    caseStudy: { client: 'Tea Brand (JP)', result: 'Premium tea gift set boxes in kraft with foil stamping. 3,000 units for holiday season. Sold as premium gift product at 3x markup vs. standard packaging.' },
  },
  {
    id: 'electronics',
    name: 'Electronics',
    hero: 'Precision engineering starts at the box.',
    intro: 'Electronics packaging must protect high-value products during shipping while creating the premium unboxing experience that premium tech brands require.',
    img: '/assets/images/product-mailer-v3.jpg',
    painPoints: ['Anti-static materials for sensitive components', 'Precise foam inserts for device protection', 'Premium feel demanded by tech audiences', 'Accessories need organized compartments'],
    solutions: ['Anti-static foam inserts and liners', 'Rigid magnetic boxes with precision cutouts', 'Matte black with metallic logo — premium tech aesthetic', 'Multi-compartment inserts for cables & accessories'],
    recommended: ['Magnetic Gift Box', 'Rigid Paper Box', 'Custom Foam Insert'],
    caseStudy: { client: 'Audio Tech Brand (DE)', result: 'Matte black magnetic box with gold foil logo and custom foam insert for wireless earbuds. 8,000 units. Customer unboxing videos organically reached 2M+ views.' },
  },
  {
    id: 'corporate',
    name: 'Corporate Gifts',
    hero: 'Make every business relationship feel personal.',
    intro: 'Corporate gifting is relationship marketing at scale. The packaging must reflect the sender\'s brand while making the recipient feel valued — regardless of order volume.',
    img: '/assets/images/jewelry-mili-v4.jpg',
    painPoints: ['Consistent quality at 1,000+ unit scales', 'Custom branding for sender company, not product brand', 'Tight delivery deadlines around events & holidays', 'Mix of SKUs in single gift set'],
    solutions: ['Custom branded magnetic boxes with company logo', 'Curated gift set box with branded interior print', 'Bulk order discounts from 1,000+ units', 'DDP delivery direct to recipient or event venue'],
    recommended: ['Magnetic Gift Box', 'Gift Box Set', 'Paper Gift Bag'],
    caseStudy: { client: 'Finance Firm (SG)', result: 'Annual client gift set — rigid box with custom branded interior and 3 curated gift items. 1,200 units delivered to 6 countries in 3 weeks. 100% on-time.' },
  },
];

export default function Industries() {
  return (
    <div className="page-scaffold">
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="gold-line" />
          <span className="eyebrow">Industry Solutions</span>
          <h1>Built for Your Industry</h1>
          <p>Packaging is never one-size-fits-all. We engineer solutions specific to your product, brand, and customer experience requirements.</p>
        </div>
      </div>

      {/* Nav tabs */}
      <div style={{ background:'var(--black-2)', borderBottom:'1px solid var(--border-dim)', padding:'16px 0', overflowX:'auto' }}>
        <div className="container" style={{ display:'flex', gap: 4 }}>
          {industries.map(ind => (
            <a key={ind.id} href={`#${ind.id}`} style={{
              padding:'8px 20px', fontSize:11, letterSpacing:'0.05em', textTransform:'uppercase',
              color:'var(--gray-3)', textDecoration:'none', whiteSpace:'nowrap',
              border:'1px solid var(--border-dim)', transition:'all 0.2s',
            }}
              onMouseEnter={e => { e.target.style.color='var(--gold)'; e.target.style.borderColor='var(--border)'; }}
              onMouseLeave={e => { e.target.style.color='var(--gray-3)'; e.target.style.borderColor='var(--border-dim)'; }}>
              {ind.name}
            </a>
          ))}
        </div>
      </div>

      {industries.map((ind, i) => (
        <section key={ind.id} id={ind.id} className="section" style={{ borderBottom:'1px solid var(--border-dim)', background: i%2===0 ? 'var(--black)' : 'var(--black-2)' }}>
          <div className="container">
            <div style={{ display:'grid', gridTemplateColumns: i%2===0 ? '1fr 1fr' : '1fr 1fr', gap: 80, alignItems:'start' }}>
              <div style={{ order: i%2===0 ? 1 : 2 }}>
                <span className="eyebrow">{ind.name}</span>
                <h2 style={{ fontStyle:'italic', marginBottom: 16, opacity:0.7, fontSize:'clamp(18px,2.5vw,28px)' }}>{ind.hero}</h2>
                <div className="gold-line" style={{ marginBottom: 24 }} />
                <p style={{ color:'var(--gray-3)', fontSize:15, lineHeight:1.8, marginBottom: 32 }}>{ind.intro}</p>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 2, marginBottom: 32 }}>
                  <div style={{ background:'var(--black-3)', border:'1px solid var(--border-dim)', padding: 24 }}>
                    <div style={{ fontSize:11, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--gray-2)', marginBottom:12 }}>Pain Points</div>
                    <ul style={{ listStyle:'none' }}>
                      {ind.painPoints.map(p => (
                        <li key={p} style={{ fontSize:13, color:'var(--gray-3)', padding:'5px 0', borderBottom:'1px solid var(--border-dim)', paddingLeft:14, position:'relative' }}>
                          <span style={{ position:'absolute', left:0, color:'var(--gold)' }}>&mdash;</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ background:'var(--black-3)', border:'1px solid var(--gold)', padding: 24 }}>
                    <div style={{ fontSize:11, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--gold)', marginBottom:12 }}>Our Solutions</div>
                    <ul style={{ listStyle:'none' }}>
                      {ind.solutions.map(s => (
                        <li key={s} style={{ fontSize:13, color:'var(--gray-3)', padding:'5px 0', borderBottom:'1px solid var(--border-dim)', paddingLeft:14, position:'relative' }}>
                          <span style={{ position:'absolute', left:0, color:'var(--gold)' }}>✓</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize:11, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--gray-2)', marginBottom:10 }}>Recommended Products</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {ind.recommended.map(r => (
                      <span key={r} style={{ fontSize:11, letterSpacing:'0.04em', textTransform:'uppercase', padding:'5px 14px', border:'1px solid var(--border)', color:'var(--gold)' }}>{r}</span>
                    ))}
                  </div>
                </div>

                <div style={{ background:'var(--black-3)', border:'1px solid var(--border-dim)', padding: 24, marginBottom: 28 }}>
                  <div style={{ fontSize:11, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--gray-2)', marginBottom:8 }}>Case Study: {ind.caseStudy.client}</div>
                  <p style={{ color:'var(--gray-3)', fontSize:13, lineHeight:1.7, fontStyle:'italic' }}>{ind.caseStudy.result}</p>
                </div>

                <Link to="/contact" className="btn-gold">Request {ind.name} Quote</Link>
              </div>
              <div style={{ order: i%2===0 ? 2 : 1 }}>
                <img src={ind.img} alt={ind.name} style={{ width:'100%', aspectRatio:'3/4', objectFit:'cover' }} />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="cta-band">
        <div className="gold-line gold-line-center" />
        <h2>Don't See Your Industry?</h2>
        <p>We work across all product categories. Share your brief and we will recommend the perfect packaging solution.</p>
        <div className="cta-band-actions">
          <Link to="/contact" className="btn-gold">Talk to Our Team</Link>
        </div>
      </section>
    </div>
  );
}
