import { Link, useParams } from 'react-router-dom';
import { productGroups } from '../data/products';

export const industries = [
  {
    slug: 'fashion-apparel',
    name: 'Fashion & Apparel',
    img: '/assets/images/product-mailer.webp',
    hero: 'E-commerce-first packaging for apparel brands',
    intro: 'From tape-free mailers to boutique paper bags, apparel brands get packaging that arrives beautifully and ships affordably.',
    painPoints: [
      'Return rates squeeze margins when packaging costs are out of control',
      'Generic brown boxes kill the unboxing moment customers share on social',
      'Multi-SKU sizing drives warehouse chaos without a standardized carton system',
    ],
    points: ['Tape-free, brand-printed mailers', 'Tissue, stickers & bag inserts', 'Retail & boutique paper bags', 'Seasonal collection packaging'],
    products: ['mailer-boxes', 'paper-bags', 'corrugated-shipping'],
    testimonial: { quote: 'Our branded mailers cut shipping prep time by 40% and the unboxing photos customers post doubled our organic reach.', name: 'Head of E-commerce', role: 'EU apparel brand, 10,000 units/quarter' },
    faq: [
      ['What is the best box for shipping clothing?', 'Mailer boxes are ideal - they ship flat, self-seal without tape, and print fully in your brand colors. For heavier outerwear use corrugated shipping boxes.'],
      ['Can bags match my mailer branding?', 'Yes - paper bags and mailers are printed in the same Pantone colors and foil finishes for a consistent retail + e-commerce identity.'],
      ['What MOQ applies?', 'Mailer boxes, paper bags and shipping cartons all start at 100 pcs.'],
    ],
    title: 'Fashion & Apparel Packaging Solutions | Mili Packaging',
    description: 'Custom apparel packaging: branded mailer boxes, boutique paper bags and shipping cartons for fashion e-commerce and retail.',
  },
  {
    slug: 'food-beverage',
    name: 'Food & Beverage',
    img: '/assets/images/product-folding.webp',
    hero: 'Food-safe folding cartons & gift presentation',
    intro: 'Folding cartons, rigid gift boxes and kraft shippers engineered for confectionery, tea, gourmet food and beverage brands.',
    painPoints: [
      'Food-safety certification requirements are non-negotiable for retail buyers',
      'Shelf appeal decides trial - plain cartons lose to designed competitors',
      'Gift sets need rigid structures that protect fragile contents in transit',
    ],
    points: ['Food-safe FSC-certified stock', 'Folding cartons with windows', 'Rigid gift sets for gifting', 'Bulk kraft shippers'],
    products: ['folding-cartons', 'rigid-gift-boxes', 'corrugated-shipping'],
    testimonial: { quote: 'The window cartons doubled our retail sell-through - customers can see the product. FSC certification opened two major grocery accounts.', name: 'Founder', role: 'Specialty chocolate brand, UK' },
    faq: [
      ['Are your cartons food-safe?', 'Yes - we use food-safe inks and FSC-certified board, with options for direct food contact and window patching.'],
      ['Do you make gift boxes for tea and chocolate?', 'Yes - rigid gift boxes with custom inserts for tea tins, chocolate truffles and gourmet sets, foil-stamped with your brand.'],
      ['What is the minimum order for cartons?', 'Folding cartons start at 100 pcs, rigid gift boxes at 100 pcs.'],
    ],
    title: 'Food & Beverage Packaging | Custom Food Boxes | Mili Packaging',
    description: 'Custom food packaging: folding cartons, rigid gift boxes and kraft shipping boxes for confectionery, tea and gourmet food brands.',
  },
  {
    slug: 'beauty-skincare',
    name: 'Beauty & Skincare',
    img: '/assets/images/product-cosmetic.webp',
    hero: 'Complete sets: outer box + inserts + finishing',
    intro: 'Skincare, fragrance and cosmetics brands get complete packaging sets — outer box, EVA/foam inserts, bottle holders and premium finishing.',
    painPoints: [
      'Glass bottles arrive damaged without precision-fit inserts',
      'Multi-SKU lines look fragmented without a consistent box system',
      'Premium positioning collapses when packaging feels cheap',
    ],
    points: ['Complete set solutions', 'EVA & foam bottle cradles', 'Foil stamping & soft-touch', 'Magnetic & drawer structures'],
    products: ['cosmetic-boxes', 'rigid-gift-boxes', 'paper-bags'],
    testimonial: { quote: 'One supplier for box, insert and finishing cut our lead time from 8 weeks to 4. The magnetic sets photograph like a luxury campaign.', name: 'Brand Manager', role: 'Skincare label, USA, 3 SKU gift line' },
    faq: [
      ['What is a complete cosmetic set?', 'Outer box (folding or rigid) + EVA/paper insert + bottle holder + foil stamping or soft-touch finish - everything coordinated by one supplier.'],
      ['Can you protect glass bottles in transit?', 'Yes - EVA and foam cradles are die-cut to your exact bottle dimensions, tested for courier and export shipping.'],
      ['What are the MOQ and lead time?', 'MOQ 100 pcs, production 12-15 days after sample approval.'],
    ],
    title: 'Beauty & Skincare Packaging | Cosmetic Boxes | Mili Packaging',
    description: 'Custom beauty packaging: cosmetic boxes with EVA inserts, rigid gift sets and branded paper bags for skincare and fragrance brands.',
  },
  {
    slug: 'electronics-tech',
    name: 'Electronics & Tech',
    img: '/assets/images/product-corrugated.webp',
    hero: 'Precision inserts & heavy-duty protection',
    intro: 'Protective packaging for electronics — precision foam and EVA inserts, rigid presentation boxes and corrugated shippers for global transit.',
    painPoints: [
      'Fragile devices need anti-static, precision-fit protection',
      'Damaged-in-transit claims eat into already-thin margins',
      'Premium hardware deserves a premium unboxing stage',
    ],
    points: ['Anti-static foam options', 'Precision die-cut inserts', 'Rigid unboxing presentation', 'Double-wall export shippers'],
    products: ['rigid-gift-boxes', 'corrugated-shipping', 'mailer-boxes'],
    testimonial: { quote: 'The rigid presentation boxes with foam cradles reduced our transit damage to zero and turned unboxing into a brand moment reviewers mention.', name: 'COO', role: 'Consumer electronics startup, DTC' },
    faq: [
      ['Do you offer anti-static packaging?', 'Yes - anti-static EVA and foam inserts are available for sensitive components and PCBs.'],
      ['Can the shipping box protect against drops?', 'Double-wall corrugated with corner protection and precision-fit inserts is rated for international courier transit.'],
      ['What MOQ applies to electronics packaging?', 'Rigid presentation boxes 100 pcs, corrugated shipping 100 pcs.'],
    ],
    title: 'Electronics & Tech Packaging | Protective Boxes | Mili Packaging',
    description: 'Custom electronics packaging: rigid gift boxes with foam inserts, mailers and heavy-duty corrugated shipping boxes.',
  },
  {
    slug: 'subscription-dtc',
    name: 'Subscription & DTC',
    img: '/assets/images/product-sample.webp',
    hero: 'Scalable unboxing for subscription brands',
    intro: 'Subscription and DTC brands scale fast with tape-free mailers, multi-SKU cartons and starter kits that test structures before you commit.',
    painPoints: [
      'Subscription churn rises when the unboxing feels generic',
      'Monthly launches need fast, reliable reordering',
      'Testing new structures is expensive without a sample kit',
    ],
    points: ['Tape-free mailer programs', 'Multi-SKU carton systems', 'Sample & starter kits', 'Volume pricing from 3,000 pcs'],
    products: ['mailer-boxes', 'sample-starter-kits', 'corrugated-shipping'],
    testimonial: { quote: 'The starter kit let us compare five structures in a week. We picked the mailer, scaled to 20k units a month, and churn dropped after the redesign.', name: 'CEO', role: 'Subscription box brand, 40k subscribers' },
    faq: [
      ['Can you handle monthly subscription reorders?', 'Yes - we keep your tooling and artwork on file for fast reordering with consistent pricing and 10-12 day production.'],
      ['What is in the starter kit?', '4-6 box structures (magnetic, lid & base, drawer, book-style, folding, bag) plus material and finish samples, all branded with your logo.'],
      ['What are the MOQ options?', 'Mailers 100 pcs, starter kits 100 pcs. Volume pricing steps at 3,000 and 10,000 units.'],
    ],
    title: 'Subscription & DTC Packaging | Mailer Boxes | Mili Packaging',
    description: 'Custom subscription packaging: self-seal mailer boxes, starter kits and scalable cartons for DTC and subscription box brands.',
  },
];

const getIndustry = (slug) => industries.find(i => i.slug === slug);

export default function Industries() {
  const { slug } = useParams();
  const ind = slug ? getIndustry(slug) : null;

  // Detail page — pain points → recommended boxes → scene → testimonial → FAQ → CTA
  if (ind) {
    const groups = ind.products.map(s => productGroups.find(g => g.slug === s)).filter(Boolean);
    return (
      <div className="page-scaffold" style={{ paddingTop: 120 }}>
        <div className="container">
          <nav style={{ marginBottom: 32, fontSize: 13, color: 'var(--gray-3)' }}>
            <Link to="/" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Home</Link> <span style={{ margin: '0 8px' }}>/</span>
            <Link to="/industries" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Industries</Link> <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: 'var(--gold)' }}>{ind.name}</span>
          </nav>

          {/* Hero + scene image */}
          <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', marginBottom: 72 }}>
            <div style={{ background: 'var(--black-2)', border: '1px solid var(--border-dim)' }}>
              <img src={ind.img} alt={`${ind.name} custom packaging`} style={{ width: '100%', display: 'block' }} loading="lazy" />
            </div>
            <div>
              <div className="gold-line" />
              <span className="eyebrow">Industry Solutions</span>
              <h1 style={{ fontSize: 'clamp(26px, 3vw, 42px)', margin: '10px 0 16px', fontFamily: 'var(--font-display)' }}>{ind.name} Packaging</h1>
              <p style={{ color: 'var(--gray-2)', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>{ind.intro}</p>
              <div style={{ display: 'flex', gap: 12 }}>
                <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none' }}>Get a Quote</Link>
                <a href={`https://wa.me/8618296876285?text=Hi, I need packaging for ${encodeURIComponent(ind.name)}`} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none' }}>WhatsApp Us</a>
              </div>
            </div>
          </section>

          {/* Pain points */}
          <section style={{ marginBottom: 72, maxWidth: 780, margin: '0 auto 72px' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div className="gold-line gold-line-center" />
              <span className="eyebrow">The Problem</span>
              <h2>Pain Points We Solve for {ind.name}</h2>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              {ind.painPoints.map(p => (
                <div key={p} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--black-2)', border: '1px solid var(--border-dim)', padding: '18px 22px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" style={{ marginTop: 2, flexShrink: 0 }} aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                  <span style={{ fontSize: 14, color: 'var(--gray-2)', lineHeight: 1.7 }}>{p}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended box types (inner links) */}
          <section style={{ marginBottom: 72 }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div className="gold-line gold-line-center" />
              <span className="eyebrow">Recommended Packaging</span>
              <h2>Box Types for {ind.name}</h2>
            </div>
            <div className="product-grid">
              {groups.map(g => (
                <Link to={`/products/${g.slug}`} className="product-card" key={g.slug} style={{ textDecoration: 'none' }}>
                  <div className="product-card-img-wrap">
                    <img src={g.heroImg} alt={g.name} className="product-card-img" loading="lazy" />
                  </div>
                  <div className="product-card-body">
                    <h4>{g.name}</h4>
                    <p>{g.tagline}</p>
                    <span className="product-card-tag">MOQ: {g.moq} pcs</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Testimonial */}
          <section style={{ marginBottom: 72, maxWidth: 760, margin: '0 auto 72px', textAlign: 'center' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--gold)" style={{ marginBottom: 16, opacity: 0.85 }} aria-hidden="true"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            <p style={{ fontSize: 17, lineHeight: 1.9, color: 'var(--gray-2)', fontStyle: 'italic', marginBottom: 16 }}>&ldquo;{ind.testimonial.quote}&rdquo;</p>
            <div style={{ fontSize: 13, letterSpacing: '0.05em', color: 'var(--gold)' }}>{ind.testimonial.name}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-3)' }}>{ind.testimonial.role}</div>
          </section>

          {/* FAQ */}
          <section style={{ maxWidth: 760, margin: '0 auto 72px' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div className="gold-line gold-line-center" />
              <span className="eyebrow">FAQ</span>
              <h2>Common Questions</h2>
            </div>
            {ind.faq.map(([q, a]) => (
              <details key={q} style={{ border: '1px solid var(--border-dim)', background: 'var(--black-2)', marginBottom: 10 }}>
                <summary style={{ padding: '16px 20px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{q}</summary>
                <p style={{ padding: '0 20px 16px', margin: 0, fontSize: 13.5, color: 'var(--gray-3)', lineHeight: 1.8 }}>{a}</p>
              </details>
            ))}
          </section>

          {/* CTA */}
          <section style={{ padding: '44px 40px', background: 'var(--black-2)', border: '1px solid var(--gold)', textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 20, color: 'var(--gold)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>Ready to solve {ind.name} packaging?</div>
            <p style={{ fontSize: 13.5, color: 'var(--gray-3)', marginBottom: 24 }}>Free design &amp; 3D mockup within 48 hours. MOQ from 100 pcs.</p>
            <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none' }}>Get Your Factory-Direct Quote Now &rarr;</Link>
          </section>
        </div>
      </div>
    );
  }

  // Index page — 5 industry cards
  return (
    <div className="page-scaffold" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: 48 }}>
          <div className="gold-line" />
          <span className="eyebrow">By Sector</span>
          <h1>Packaging Solutions for Every Industry</h1>
          <p style={{ color: 'var(--gray-3)', maxWidth: 620, marginTop: 12 }}>Five sector playbooks with recommended box types, materials and finishing — matched to how your customers unbox.</p>
        </div>
        <div className="product-grid">
          {industries.map(ind => (
            <Link to={`/industries/${ind.slug}`} className="product-card" key={ind.slug} style={{ textDecoration: 'none' }}>
              <div className="product-card-img-wrap">
                <img src={ind.img} alt={ind.name} className="product-card-img" loading="lazy" />
              </div>
              <div className="product-card-body">
                <h4>{ind.name}</h4>
                <p>{ind.hero}</p>
                <span className="product-card-tag">View Solutions &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
