import { Link, useParams } from 'react-router-dom';
import { productGroups } from '../data/products';

export const industries = [
  {
    slug: 'fashion-apparel',
    name: 'Fashion & Apparel',
    img: '/assets/images/product-mailer-v3.jpg',
    hero: 'E-commerce-first packaging for apparel brands',
    intro: 'From tape-free mailers to boutique paper bags, apparel brands get packaging that arrives beautifully and ships affordably.',
    points: ['Tape-free, brand-printed mailers', 'Tissue, stickers & bag inserts', 'Retail & boutique paper bags', 'Seasonal collection packaging'],
    products: ['mailer-boxes', 'paper-bags', 'corrugated-shipping'],
    title: 'Fashion & Apparel Packaging Solutions | Mili Packaging',
    description: 'Custom apparel packaging: branded mailer boxes, boutique paper bags and shipping cartons for fashion e-commerce and retail.',
  },
  {
    slug: 'food-beverage',
    name: 'Food & Beverage',
    img: '/assets/images/product-folding-v6.png',
    hero: 'Food-safe folding cartons & gift presentation',
    intro: 'Folding cartons, rigid gift boxes and kraft shippers engineered for confectionery, tea, gourmet food and beverage brands.',
    points: ['Food-safe FSC-certified stock', 'Folding cartons with windows', 'Rigid gift sets for gifting', 'Bulk kraft shippers'],
    products: ['folding-cartons', 'rigid-gift-boxes', 'corrugated-shipping'],
    title: 'Food & Beverage Packaging | Custom Food Boxes | Mili Packaging',
    description: 'Custom food packaging: folding cartons, rigid gift boxes and kraft shipping boxes for confectionery, tea and gourmet food brands.',
  },
  {
    slug: 'beauty-skincare',
    name: 'Beauty & Skincare',
    img: '/assets/images/case-cosmetics-v4.jpg',
    hero: 'Complete sets: outer box + inserts + finishing',
    intro: 'Skincare, fragrance and cosmetics brands get complete packaging sets — outer box, EVA/foam inserts, bottle holders and premium finishing.',
    points: ['Complete set solutions', 'EVA & foam bottle cradles', 'Foil stamping & soft-touch', 'Magnetic & drawer structures'],
    products: ['cosmetic-boxes', 'rigid-gift-boxes', 'paper-bags'],
    title: 'Beauty & Skincare Packaging | Cosmetic Boxes | Mili Packaging',
    description: 'Custom beauty packaging: cosmetic boxes with EVA inserts, rigid gift sets and branded paper bags for skincare and fragrance brands.',
  },
  {
    slug: 'electronics-tech',
    name: 'Electronics & Tech',
    img: '/assets/images/shipping-box-kraft-v4.jpg',
    hero: 'Precision inserts & heavy-duty protection',
    intro: 'Protective packaging for electronics — precision foam and EVA inserts, rigid presentation boxes and corrugated shippers for global transit.',
    points: ['Anti-static foam options', 'Precision die-cut inserts', 'Rigid unboxing presentation', 'Double-wall export shippers'],
    products: ['rigid-gift-boxes', 'corrugated-shipping', 'mailer-boxes'],
    title: 'Electronics & Tech Packaging | Protective Boxes | Mili Packaging',
    description: 'Custom electronics packaging: rigid gift boxes with foam inserts, mailers and heavy-duty corrugated shipping boxes.',
  },
  {
    slug: 'subscription-dtc',
    name: 'Subscription & DTC',
    img: '/assets/images/product-sample-v6.png',
    hero: 'Scalable unboxing for subscription brands',
    intro: 'Subscription and DTC brands scale fast with tape-free mailers, multi-SKU cartons and starter kits that test structures before you commit.',
    points: ['Tape-free mailer programs', 'Multi-SKU carton systems', 'Sample & starter kits', 'Volume pricing from 3,000 pcs'],
    products: ['mailer-boxes', 'sample-starter-kits', 'corrugated-shipping'],
    title: 'Subscription & DTC Packaging | Mailer Boxes | Mili Packaging',
    description: 'Custom subscription packaging: self-seal mailer boxes, starter kits and scalable cartons for DTC and subscription box brands.',
  },
];

const getIndustry = (slug) => industries.find(i => i.slug === slug);

export default function Industries() {
  const { slug } = useParams();
  const ind = slug ? getIndustry(slug) : null;

  // Detail page
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

          <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', marginBottom: 72 }}>
            <div style={{ background: 'var(--black-2)', border: '1px solid var(--border-dim)' }}>
              <img src={ind.img} alt={ind.name} style={{ width: '100%', display: 'block' }} />
            </div>
            <div>
              <div className="gold-line" />
              <span className="eyebrow">Industry Solutions</span>
              <h1 style={{ fontSize: 'clamp(26px, 3vw, 42px)', margin: '10px 0 16px', fontFamily: 'var(--font-display)' }}>{ind.name} Packaging</h1>
              <p style={{ color: 'var(--gray-2)', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>{ind.intro}</p>
              <ul style={{ listStyle: 'none', margin: '0 0 28px' }}>
                {ind.points.map(p => (
                  <li key={p} style={{ fontSize: 13.5, color: 'var(--gray-3)', padding: '7px 0', paddingLeft: 22, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>✓</span>{p}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: 12 }}>
                <Link to="/contact" className="btn-gold" style={{ textDecoration: 'none' }}>Get a Quote</Link>
                <a href={`https://wa.me/8618296876285?text=Hi, I need packaging for ${encodeURIComponent(ind.name)}`} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none' }}>WhatsApp Us</a>
              </div>
            </div>
          </section>

          <section>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div className="gold-line gold-line-center" />
              <span className="eyebrow">Recommended Packaging</span>
              <h2>Box Types for {ind.name}</h2>
            </div>
            <div className="product-grid">
              {groups.map(g => (
                <Link to={`/products/${g.slug}`} className="product-card" key={g.slug} style={{ textDecoration: 'none' }}>
                  <div className="product-card-img-wrap">
                    <img src={g.heroImg} alt={g.name} className="product-card-img" />
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
                <img src={ind.img} alt={ind.name} className="product-card-img" />
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
