import { Link, useParams } from 'react-router-dom';
import { productGroups } from '../data/products';

export const industries = [
  {
    slug: 'fashion-apparel',
    name: 'Fashion & Apparel',
    img: '/assets/images/mig-custom-mailer-box-1.webp',
    cardImg: '/assets/images/mig-custom-mailer-box-2.webp',
    hero: 'E-commerce-first packaging for apparel brands',
    intro: 'From tape-free mailers to boutique paper bags, apparel brands get packaging that arrives beautifully and ships affordably.',
    painPoints: [
      'Return rates squeeze margins when packaging costs are out of control',
      'Generic brown boxes kill the unboxing moment customers share on social',
      'Multi-SKU sizing drives warehouse chaos without a standardized carton system',
    ],
    points: ['Tape-free, brand-printed mailers', 'Tissue, stickers & bag inserts', 'Retail & boutique paper bags', 'Seasonal collection packaging'],
    products: ['mailer-boxes', 'paper-bags', 'corrugated-shipping'],
    featuredProducts: ['custom-logo-mailer-box', 'hard-handle-kraft-bag'],
    capabilities: ['Tape-free mailers', 'Retail paper bags'],
    stats: [['MOQ', '100 pcs'], ['Production', '10–12 days'], ['Sample', '48 h'], ['Volume pricing', '3,000+ pcs']],
    why: [
      ['Flat-pack, ship flat', 'Mailers and cartons ship flat to cut freight and warehouse space — up to 60% volume savings vs rigid alternatives.'],
      ['One Pantone identity', 'Mailers, bags, tissue and inserts print in the same Pantone colors and foil finishes for a consistent retail + e-commerce brand.'],
      ['Seasonal agility', 'Tooling and artwork stay on file — seasonal collections reorder in as little as 10 days production.'],
    ],
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
    img: '/assets/images/mig-marbled-foldable-box-1.webp',
    cardImg: '/assets/images/mig-cookie-rigid-box-2.webp',
    hero: 'Food-safe folding cartons & gift presentation',
    intro: 'Folding cartons, rigid gift boxes and kraft shippers engineered for confectionery, tea, gourmet food and beverage brands.',
    painPoints: [
      'Food-safety certification requirements are non-negotiable for retail buyers',
      'Shelf appeal decides trial - plain cartons lose to designed competitors',
      'Gift sets need rigid structures that protect fragile contents in transit',
    ],
    points: ['Food-safe FSC-certified stock', 'Folding cartons with windows', 'Rigid gift sets for gifting', 'Bulk kraft shippers'],
    products: ['folding-cartons', 'rigid-gift-boxes', 'corrugated-shipping'],
    featuredProducts: ['luxury-cookie-rigid-box', 'marbled-foldable-gift-box'],
    capabilities: ['Food-safe inks', 'Window cartons'],
    stats: [['MOQ', '100 pcs'], ['Production', '12–15 days'], ['Food-safe', 'Yes'], ['FSC stock', 'Available']],
    why: [
      ['Food-safe by default', 'Food-safe inks, water-based adhesives and FSC-certified board — with direct food-contact and window-patching options.'],
      ['Shelf-ready design', 'Window cartons, rigid gift sets and foil finishing engineered to win trial on retail shelves.'],
      ['Export-tested transit', 'Kraft shippers and rigid structures tested for courier and export shipping of fragile contents.'],
    ],
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
    img: '/assets/images/mig-valentine-magnetic-box-1.webp',
    cardImg: '/assets/images/mig-valentine-magnetic-box-2.webp',
    hero: 'Complete sets: outer box + inserts + finishing',
    intro: 'Skincare, fragrance and cosmetics brands get complete packaging sets — outer box, EVA/foam inserts, bottle holders and premium finishing.',
    painPoints: [
      'Glass bottles arrive damaged without precision-fit inserts',
      'Multi-SKU lines look fragmented without a consistent box system',
      'Premium positioning collapses when packaging feels cheap',
    ],
    points: ['Complete set solutions', 'EVA & foam bottle cradles', 'Foil stamping & soft-touch', 'Magnetic & drawer structures'],
    products: ['cosmetic-boxes', 'rigid-gift-boxes', 'paper-bags'],
    featuredProducts: ['valentine-magnetic-folding-box', 'black-magnetic-gift-box'],
    capabilities: ['FSC board', 'EVA bottle cradles'],
    stats: [['MOQ', '100 pcs'], ['Production', '12–15 days'], ['Set assembly', 'In-house'], ['Finishing', 'Full range']],
    why: [
      ['One supplier, one standard', 'Box, insert, holder and finishing coordinated in-house — consistent quality and one less vendor to manage.'],
      ['Precision bottle cradles', 'EVA and foam die-cut to your exact bottle dimensions, tested for courier and export transit.'],
      ['Luxury finishing stack', 'Soft-touch, foil stamping, embossing and magnetic structures that photograph like a campaign.'],
    ],
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
    img: '/assets/images/mig-eco-printed-shipping-box-1.webp',
    cardImg: '/assets/images/mig-black-magnetic-box-2.webp',
    hero: 'Precision inserts & heavy-duty protection',
    intro: 'Protective packaging for electronics — precision foam and EVA inserts, rigid presentation boxes and corrugated shippers for global transit.',
    painPoints: [
      'Fragile devices need anti-static, precision-fit protection',
      'Damaged-in-transit claims eat into already-thin margins',
      'Premium hardware deserves a premium unboxing stage',
    ],
    points: ['Anti-static foam options', 'Precision die-cut inserts', 'Rigid unboxing presentation', 'Double-wall export shippers'],
    products: ['rigid-gift-boxes', 'corrugated-shipping', 'mailer-boxes'],
    featuredProducts: ['black-magnetic-gift-box', 'eco-printed-shipping-box'],
    capabilities: ['Anti-static foam', 'Precision die-cut inserts'],
    stats: [['MOQ', '100 pcs'], ['Production', '12–15 days'], ['Anti-static', 'Available'], ['Drop rating', 'Export-tested']],
    why: [
      ['Anti-static protection', 'Anti-static EVA and foam inserts for sensitive components, PCBs and precision hardware.'],
      ['Zero-damage transit', 'Double-wall corrugated with corner protection and precision-fit inserts, rated for international courier transit.'],
      ['Premium unboxing stage', 'Rigid magnetic and drawer boxes with foam cradles turn unboxing into a brand moment reviewers mention.'],
    ],
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
    img: '/assets/images/mig-kraft-mailer-box-1.webp',
    cardImg: '/assets/images/mig-kraft-mailer-box-2.webp',
    hero: 'Scalable unboxing for subscription brands',
    intro: 'Subscription and DTC brands scale fast with tape-free mailers, multi-SKU cartons and starter kits that test structures before you commit.',
    painPoints: [
      'Subscription churn rises when the unboxing feels generic',
      'Monthly launches need fast, reliable reordering',
      'Testing new structures is expensive without a sample kit',
    ],
    points: ['Tape-free mailer programs', 'Multi-SKU carton systems', 'Sample & starter kits', 'Volume pricing from 3,000 pcs'],
    products: ['mailer-boxes', 'sample-starter-kits', 'corrugated-shipping'],
    featuredProducts: ['custom-logo-mailer-box', 'ecommerce-mailer-sample-kit'],
    capabilities: ['Tape-free programs', 'Volume pricing 3,000+'],
    stats: [['MOQ', '100 pcs'], ['Production', '10–12 days'], ['Reorder lead time', '10–12 days'], ['Volume steps', '3k / 10k']],
    why: [
      ['Built for monthly reorders', 'Tooling and artwork stay on file — consistent pricing and 10-12 day production on every reorder.'],
      ['Test before you commit', 'Starter kits let you compare 4-6 structures in a week before scaling volume.'],
      ['Scales to volume', 'Volume pricing steps at 3,000 and 10,000 units with dedicated production slots.'],
    ],
    testimonial: { quote: 'The starter kit let us compare five structures in a week. We picked the mailer, scaled to 20k units a month, and churn dropped after the redesign.', name: 'CEO', role: 'Subscription box brand, 40k subscribers' },
    faq: [
      ['Can you handle monthly subscription reorders?', 'Yes - we keep your tooling and artwork on file for fast reordering with consistent pricing and 10-12 day production.'],
      ['What is in the starter kit?', '4-6 box structures (magnetic, lid & base, drawer, book-style, folding, bag) plus material and finish samples, all branded with your logo.'],
      ['What are the MOQ options?', 'Mailers 100 pcs, starter kits 100 pcs. Volume pricing steps at 3,000 and 10,000 units.'],
    ],
    title: 'Subscription & DTC Packaging | Mailer Boxes | Mili Packaging',
    description: 'Custom subscription packaging: self-seal mailer boxes, starter kits and scalable cartons for DTC and subscription box brands.',
  },
  {
    slug: 'wine-spirits',
    name: 'Wine & Spirits',
    img: '/assets/images/mig-luxury-magnetic-box-1.webp',
    cardImg: '/assets/images/mig-luxury-magnetic-box-3.webp',
    hero: 'Rigid gift sets for premium spirits',
    intro: 'Luxury rigid gift boxes, magnetic presentation sets and bottle cradles for wine, whisky and premium spirits — built for gifting programs, duty-free retail and festive seasons.',
    painPoints: [
      'Premium bottles arrive damaged without precision-fit cradles',
      'Festive gifting peaks demand fast, reliable reordering at scale',
      'Duty-free and retail shelves reward premium, light-catching design',
    ],
    points: ['Magnetic rigid gift sets', 'Custom foam & velvet cradles', 'Gold foil & deboss finishing', 'Seasonal gifting programs'],
    products: ['rigid-gift-boxes', 'paper-bags', 'folding-cartons'],
    featuredProducts: ['bottle-product-rigid-set', 'luxury-magnetic-folding-gift-box'],
    capabilities: ['Rigid gift sets', 'Custom bottle cradles'],
    stats: [['MOQ', '100 pcs'], ['Production', '12–15 days'], ['Tooling on file', 'Yes'], ['Volume pricing', '3,000+ pcs']],
    why: [
      ['Bottle-perfect cradles', 'Precision-cut foam and velvet cradles die-cut to your exact bottle dimensions, export-tested.'],
      ['Festive-ready reordering', 'Tooling stays on file — holiday programs reorder in 12-15 days production.'],
      ['Shelf-light design', 'Gold foil, deboss and magnetic structures engineered for duty-free and retail presentation.'],
    ],
    testimonial: { quote: 'The magnetic gift sets with velvet cradles turned our holiday gifting into a brand moment — and the tooling stays on file so reorders ship in under two weeks.', name: 'Marketing Director', role: 'Premium spirits brand, USA' },
    faq: [
      ['Can you protect bottles in transit?', 'Yes - precision-cut foam and velvet cradles are die-cut to your exact bottle dimensions and tested for export shipping.'],
      ['Do you support seasonal gifting programs?', 'Yes - we keep tooling and artwork on file for fast reordering, with production 12-15 days and volume pricing from 3,000 units.'],
      ['What MOQ applies to wine and spirits boxes?', 'Rigid gift sets start at 100 pcs; magnetic folding boxes at 100 pcs.'],
    ],
    title: 'Wine & Spirits Packaging | Custom Gift Boxes | Mili Packaging',
    description: 'Custom wine and spirits packaging: magnetic rigid gift sets, bottle cradles and luxury finishing for gifting programs and duty-free retail.',
  },
  {
    slug: 'jewelry-watches',
    name: 'Jewelry & Watches',
    img: '/assets/images/mig-drawer-sliding-box-1.webp',
    cardImg: '/assets/images/mig-drawer-sliding-box-2.webp',
    hero: 'Velvet-lined cases for fine jewelry & timepieces',
    intro: 'From single ring boxes to multi-drawer collections and watch presentation sets — velvet-lined, embossed and built to protect what matters most.',
    painPoints: [
      'Fine jewelry demands scratch-free, tarnish-safe interiors',
      'Watch packaging must present the product and survive transit',
      'Boutique-level presentation is hard to scale on a production budget',
    ],
    points: ['Velvet & leatherette interiors', 'Embossed logo finishing', 'Multi-drawer collection boxes', 'Watch cradles & pillow sets'],
    products: ['jewelry-boxes', 'watch-boxes', 'rigid-gift-boxes'],
    featuredProducts: ['drawer-sliding-jewelry-box', 'modern-luxury-single-watch-box'],
    capabilities: ['Velvet-lined interiors', 'Embossed logos'],
    stats: [['MOQ', '100 pcs'], ['Production', '14–18 days'], ['Interiors', 'Tarnish-safe'], ['Embossing', 'Available']],
    why: [
      ['Tarnish-safe interiors', 'Anti-tarnish velvet and leatherette linings with precision-fit cushions protect silver, gold and fine pieces.'],
      ['Boutique presentation at scale', 'Embossed logos, drawer structures and watch cradles engineered for production budgets.'],
      ['Transit-safe by design', 'Foam cradles and cushioned pillows keep timepieces secure through export shipping.'],
    ],
    testimonial: { quote: 'The velvet-lined drawer boxes photograph like a boutique counter. Our customers now ask for the box before they ask for the price.', name: 'Founder', role: 'Fine jewelry label, UK' },
    faq: [
      ['Are your interiors safe for silver and gold?', 'Yes - we use tarnish-safe, anti-tarnish velvet and leatherette linings with precision-fit cushions.'],
      ['Can you make watch display boxes?', 'Yes - single and multi-watch rigid boxes with cushioned pillows and foam cradles, embossed with your logo.'],
      ['What MOQ applies?', 'Ring boxes and watch boxes start at 100 pcs; multi-drawer collection boxes at 100 pcs.'],
    ],
    title: 'Jewelry & Watch Packaging | Custom Boxes | Mili Packaging',
    description: 'Custom jewelry and watch packaging: velvet-lined ring boxes, drawer collections and watch presentation boxes with embossed branding.',
  },
];

const getIndustry = (slug) => industries.find(i => i.slug === slug);

export default function Industries() {
  const { slug } = useParams();
  const ind = slug ? getIndustry(slug) : null;

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
          <section style={{ position: 'relative', overflow: 'hidden', marginBottom: 72, border: '1px solid var(--border-dim)' }}>
            <img src={ind.img} alt={`${ind.name} custom packaging`} style={{ width: '100%', height: 520, objectFit: 'cover', display: 'block' }} loading="lazy" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.45) 55%, rgba(0,0,0,.1) 100%)' }} />
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100%', display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: '0 48px', maxWidth: 640 }}>
                <div className="gold-line" />
                <span className="eyebrow">Industry Solutions</span>
                <h1 style={{ fontSize: 'clamp(28px, 3.2vw, 46px)', margin: '10px 0 14px', fontFamily: 'var(--font-display)', color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,.4)' }}>{ind.name} Packaging</h1>
                <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>{ind.intro}</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none' }}>Get a Quote</Link>
                  <a href={`https://wa.me/8618296876285?text=Hi, I need packaging for ${encodeURIComponent(ind.name)}`} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none' }}>WhatsApp Us</a>
                </div>
              </div>
            </div>
          </section>
          <section style={{ marginBottom: 72 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border-dim)', border: '1px solid var(--border-dim)' }}>
              {ind.stats.map(([k, v]) => (
                <div key={k} style={{ background: 'var(--black-2)', padding: '22px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>{v}</div>
                  <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-3)' }}>{k}</div>
                </div>
              ))}
            </div>
          </section>
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
          <section style={{ marginBottom: 72 }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div className="gold-line gold-line-center" />
              <span className="eyebrow">Why Mili for {ind.name}</span>
              <h2>Built for Your Industry</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {ind.why.map(([t, d]) => (
                <div key={t} style={{ background: 'var(--black-2)', border: '1px solid var(--border-dim)', padding: '28px 24px' }}>
                  <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: 10 }}>{t}</div>
                  <p style={{ fontSize: 13.5, color: 'var(--gray-3)', lineHeight: 1.7, margin: 0 }}>{d}</p>
                </div>
              ))}
            </div>
          </section>
          <section style={{ marginBottom: 72, maxWidth: 760, margin: '0 auto 72px', textAlign: 'center' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--gold)" style={{ marginBottom: 16, opacity: 0.85 }} aria-hidden="true"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            <p style={{ fontSize: 17, lineHeight: 1.9, color: 'var(--gray-2)', fontStyle: 'italic', marginBottom: 16 }}>&ldquo;{ind.testimonial.quote}&rdquo;</p>
            <div style={{ fontSize: 13, letterSpacing: '0.05em', color: 'var(--gold)' }}>{ind.testimonial.name}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-3)' }}>{ind.testimonial.role}</div>
          </section>
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
          <section style={{ padding: '44px 40px', background: 'var(--black-2)', border: '1px solid var(--gold)', textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 20, color: 'var(--gold)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>Ready to solve {ind.name} packaging?</div>
            <p style={{ fontSize: 13.5, color: 'var(--gray-3)', marginBottom: 24 }}>Free design &amp; 3D mockup within 48 hours. MOQ from 100 pcs.</p>
            <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none' }}>Get Your Factory-Direct Quote Now &rarr;</Link>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="page-scaffold" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: 48 }}>
          <div className="gold-line" />
          <span className="eyebrow">By Sector</span>
          <h1>Packaging Solutions for Every Industry</h1>
          <p style={{ color: 'var(--gray-3)', maxWidth: 620, marginTop: 12 }}>Seven sector playbooks with recommended box types, materials and finishing — matched to how your customers unbox.</p>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border-dim)', border: '1px solid var(--border-dim)', marginTop: 56 }}>
          {[['7', 'Industry Playbooks'], ['50+', 'Export Countries'], ['100+', 'Box Structures'], ['48 h', 'Free 3D Mockup']].map(([n, l]) => (
            <div key={l} style={{ background: 'var(--black-2)', padding: '26px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>{n}</div>
              <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-3)', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
