import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGroup, getProduct, productCatalog, priceDisclaimer } from '../data/products';

const WA_LINK = (text) => `https://wa.me/8618296876285?text=${encodeURIComponent(text)}`;

export default function ProductItem() {
  const { slug, productSlug } = useParams();
  const group = getGroup(slug);
  const product = getProduct(slug, productSlug);
  const [view, setView] = useState('scene');

  useEffect(() => {
    if (!group || !product) return;
    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: `${product.tagline}. ${product.spec}.`,
        image: `https://mili-packaging.com${product.img}`,
        brand: { '@type': 'Brand', name: 'Mili Packaging' },
        manufacturer: { '@type': 'Organization', name: 'Jiangxi Mili Packaging Materials Co., Ltd.' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: product.price,
          availability: 'https://schema.org/InStock',
          areaServed: 'Worldwide',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mili-packaging.com/#/' },
          { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://mili-packaging.com/#/products' },
          { '@type': 'ListItem', position: 3, name: group.name, item: `https://mili-packaging.com/#/products/${group.slug}` },
          { '@type': 'ListItem', position: 4, name: product.name, item: `https://mili-packaging.com/#/products/${group.slug}/${product.slug}` },
        ],
      },
    ];
    const scripts = schemas.map(schema => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.text = JSON.stringify(schema);
      document.head.appendChild(s);
      return s;
    });
    return () => { scripts.forEach(s => document.head.removeChild(s)); };
  }, [group, product]);

  if (!group || !product) {
    return (
      <div className="page-scaffold" style={{ paddingTop: 140, textAlign: 'center' }}>
        <div className="container">
          <h1>Product Not Found</h1>
          <Link to="/products" className="btn-gold" style={{ marginTop: 24, textDecoration: 'none' }}>Back to Products</Link>
        </div>
      </div>
    );
  }

  const groupSkus = productCatalog[group.slug] || [];
  const siblings = groupSkus.filter(p => p.slug !== product.slug).slice(0, 3);
  const sellingPoints = [
    ['Custom to Your Brand', 'Your logo, brand colors, size and finish — every product is made to order with free design support and a 3D mockup within 48h.'],
    ['Factory-Direct Pricing', 'No middleman markups. Reference price from $' + product.price + ' per unit (EXW), with volume discounts available from 3,000 pcs.'],
    ['Consistent Quality', 'AQL 2.5 QC at every workstation, FSC-certified materials and SGS-audited production — quality you can rely on at scale.'],
  ];

  const gallery = [
    { id: 'scene', label: 'Scene', img: product.img },
    { id: 'white', label: 'White', img: group.whiteImg },
    { id: 'craft', label: 'Details', img: (group.craftImg && group.craftImg[0]) || product.img },
  ];
  const mainImg = (gallery.find(g => g.id === view) || gallery[0]).img;
  const isKit = group.slug === 'sample-starter-kits';
  const ctaLabel = isKit ? 'Order Sample Kit – $29' : 'Get Free Quote';

  return (
    <div className="page-scaffold" style={{ paddingTop: 120 }}>
      <div className="container">
        {/* ① Breadcrumb */}
        <nav style={{ marginBottom: 28, fontSize: 13, color: 'var(--gray-3)' }}>
          <Link to="/" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Home</Link> <span style={{ margin: '0 8px' }}>/</span>
          <Link to="/products" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Products</Link> <span style={{ margin: '0 8px' }}>/</span>
          <Link to={`/products/${group.slug}`} style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>{group.name}</Link> <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--gold)' }}>{product.name}</span>
        </nav>

        {/* ② First screen: gallery (left) + inquiry box (right) */}
        <section className="detail-hero">
          <div>
            <div style={{ position: 'relative', background: 'var(--black-2)', border: '1px solid var(--border-dim)' }}>
              {group.isNew && (
                <span style={{ position: 'absolute', top: 16, right: 16, zIndex: 2, background: 'var(--gold)', color: 'var(--black)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', padding: '5px 12px', textTransform: 'uppercase' }}>New</span>
              )}
              <img src={mainImg} alt={`${product.name} custom packaging`} style={{ width: '100%', display: 'block' }} loading={view === 'scene' ? 'eager' : 'lazy'} />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              {gallery.map(g => (
                <button key={g.id} onClick={() => setView(g.id)}
                  style={{
                    flex: 1, padding: 0, cursor: 'pointer', border: view === g.id ? '2px solid var(--gold)' : '1px solid var(--border-dim)',
                    background: 'var(--black-3)', overflow: 'hidden', minHeight: 64,
                  }}>
                  <img src={g.img} alt={`${product.name} ${g.label}`} style={{ width: '100%', height: 64, objectFit: 'cover', display: 'block' }} loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--black-2)', border: '1px solid var(--gold)', padding: '32px 28px' }}>
            <div className="gold-line" />
            <span className="eyebrow">{group.name}</span>
            <h1 style={{ fontSize: 'clamp(26px, 2.6vw, 38px)', margin: '10px 0 16px', fontFamily: 'var(--font-display)' }}>{product.name}</h1>
            <p style={{ color: 'var(--gray-3)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{product.tagline} — {product.spec}.</p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-block', background: 'rgba(201,162,39,0.14)', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '6px 14px' }}>{product.moq}</span>
              <span style={{ display: 'inline-block', border: '1px solid var(--border)', color: 'var(--gray-2)', fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '6px 14px' }}>{group.leadTime} Lead Time</span>
            </div>

            {isKit ? (
              <div style={{ border: '1px solid var(--border-dim)', marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--black-3)' }}>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--gray-2)', marginBottom: 4 }}>Sample &amp; Starter Kit</div>
                    <div style={{ fontSize: 15 }}>{product.spec}</div>
                  </div>
                  <div style={{ fontSize: 26, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>${product.price}</div>
                </div>
                <div style={{ padding: '10px 16px', fontSize: 12, color: 'var(--gray-3)', lineHeight: 1.6 }}>Including worldwide shipping. The full fee is credited to your first bulk order.</div>
              </div>
            ) : (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--gray-2)', marginBottom: 8 }}>Reference Price (USD, EXW)</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, border: '1px solid var(--border-dim)', background: 'var(--black-3)', padding: '14px 18px' }}>
                  <div style={{ fontSize: 30, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>${product.price}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-3)', lineHeight: 1.6 }}>per unit from<br />1,000 pcs (EXW)</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-3)', marginTop: 8, lineHeight: 1.6 }}>{priceDisclaimer}</div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, margin: '16px 0 22px' }}>
              {[
                ['FSC', 'Certified Material'],
                ['AQL 2.5', 'Quality Inspected'],
                [group.leadTime, 'Bulk Lead Time'],
              ].map(([n, l]) => (
                <div key={n} style={{ border: '1px solid var(--border-dim)', padding: '10px 6px', textAlign: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>{n}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-3)', marginTop: 3, lineHeight: 1.4 }}>{l}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none', flex: 1, textAlign: 'center', fontSize: 14 }}>
                {ctaLabel}
              </Link>
              <a href={WA_LINK(`Hi, I'm interested in ${product.name}`)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
                style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.4)', borderRadius: '50%', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* ③ Spec table */}
        <section style={{ margin: '64px 0' }}>
          <div className="section-header" style={{ textAlign: 'left', alignItems: 'flex-start', marginBottom: 28 }}>
            <div>
              <div className="gold-line" />
              <span className="eyebrow">Specifications</span>
              <h2 style={{ margin: 0 }}>Product Details</h2>
            </div>
          </div>
          <div style={{ border: '1px solid var(--border-dim)' }}>
            {product.specs.map(([k, v], i) => (
              <div key={k} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16, padding: '14px 20px', borderBottom: i < product.specs.length - 1 ? '1px solid var(--border-dim)' : 'none', background: i % 2 === 0 ? 'var(--black-2)' : 'transparent' }}>
                <div style={{ fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--gray-2)', paddingTop: 2 }}>{k}</div>
                <div style={{ fontSize: 13.5, color: 'var(--gray-1)', lineHeight: 1.6 }}>{v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ④ Why choose this product */}
        <section style={{ margin: '0 0 64px' }}>
          <div className="section-header" style={{ textAlign: 'left', alignItems: 'flex-start', marginBottom: 28 }}>
            <div>
              <div className="gold-line" />
              <span className="eyebrow">Why Mili</span>
              <h2 style={{ margin: 0 }}>Built for Your Brand</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {sellingPoints.map(([t, d]) => (
              <div key={t} style={{ background: 'var(--black-2)', border: '1px solid var(--border-dim)', padding: '30px 26px' }}>
                <div style={{ width: 34, height: 34, background: 'rgba(201,162,39,0.14)', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, fontSize: 15, color: 'var(--gold)' }}>✦</div>
                <h4 style={{ fontSize: 15, marginBottom: 8 }}>{t}</h4>
                <p style={{ color: 'var(--gray-3)', fontSize: 12.5, lineHeight: 1.7, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ⑤ Related products in same group */}
        {siblings.length > 0 && (
          <section style={{ margin: '0 0 72px' }}>
            <div className="section-header" style={{ textAlign: 'left', alignItems: 'flex-start', marginBottom: 28 }}>
              <div>
                <div className="gold-line" />
                <span className="eyebrow">More from {group.name}</span>
                <h2 style={{ margin: 0 }}>Related Products</h2>
              </div>
            </div>
            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {siblings.map(s => (
                <Link to={`/products/${group.slug}/${s.slug}`} key={s.slug} className="product-card" style={{ textDecoration: 'none' }}>
                  <div className="product-card-img-wrap">
                    <img src={s.img} alt={s.name} className="product-card-img" loading="lazy" />
                  </div>
                  <div className="product-card-body">
                    <h4>{s.name}</h4>
                    <p>{s.tagline}</p>
                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                      <span className="product-card-tag">{s.moq}</span>
                      <span className="product-card-tag">From ${s.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Link to={`/products/${group.slug}`} className="btn-outline-gold" style={{ textDecoration: 'none' }}>View All {group.name} &rarr;</Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
