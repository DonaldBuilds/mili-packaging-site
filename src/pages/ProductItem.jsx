import { useParams, Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getGroup, getProduct, productCatalog, productGroups, priceDisclaimer, detailData } from '../data/products';

const WA_LINK = (text) => `https://wa.me/8618296876285?text=${encodeURIComponent(text)}`;
const RECENT_KEY = 'mili_recent_products';

const readRecent = () => {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch { return []; }
};

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
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mili-packaging.com/' },
          { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://mili-packaging.com/products' },
          { '@type': 'ListItem', position: 3, name: group.name, item: `https://mili-packaging.com/products/${group.slug}` },
          { '@type': 'ListItem', position: 4, name: product.name, item: `https://mili-packaging.com/products/${group.slug}/${product.slug}` },
        ],
      },
      ...(product.faq && product.faq.length ? [{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: product.faq.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      }] : []),
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

  // Track recently viewed (drives the auto-updating recommended section)
  useEffect(() => {
    if (!group || !product) return;
    try {
      const list = readRecent().filter(x => !(x.group === group.slug && x.slug === product.slug));
      list.unshift({ group: group.slug, slug: product.slug, t: Date.now() });
      localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 12)));
    } catch { /* storage unavailable - ignore */ }
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
  // Recommended: recently viewed from other categories + same-category products (4-6 total)
  const recommended = useMemo(() => {
    const seen = new Set();
    const out = [];
    const push = (g, p) => {
      const k = `${g}/${p.slug}`;
      if (!p || seen.has(k)) return;
      seen.add(k);
      out.push({ group: g, product: p });
    };
    readRecent()
      .filter(r => r.group !== group.slug)
      .forEach(r => { if (out.length < 3) push(r.group, getProduct(r.group, r.slug)); });
    groupSkus.forEach(p => { if (out.length < 6 && p.slug !== product.slug) push(group.slug, p); });
    if (out.length < 6) {
      productGroups.forEach(g => {
        if (g.slug === group.slug) return;
        (productCatalog[g.slug] || []).forEach(p => { if (out.length < 6) push(g.slug, p); });
      });
    }
    return out;
  }, [group, groupSkus, product.slug]);
  const sellingPoints = [
    ['Custom to Your Brand', 'Your logo, brand colors, size and finish — every product is made to order with free design support and a 3D mockup within 48h.'],
    ['Factory-Direct Pricing', 'No middleman markups. Reference price from $' + product.price + ' per unit (EXW), with volume discounts available from 3,000 pcs.'],
    ['Consistent Quality', 'AQL 2.5 QC at every workstation, FSC-certified materials and SGS-audited production — quality you can rely on at scale.'],
  ];

  // Gallery: this product's own images first (main + extraImgs) — group white/craft/tab
  // images are NEVER mixed in. Products with fewer than 6 own images get factory generic
  // images in the fixed order 图2→图4→图3→图1 to complete a consistent 6-slot gallery.
  const ownImgs = [
    { id: 'scene', label: 'Scene', img: product.img },
    ...(product.extraImgs || []).filter((img, i, arr) => img && arr.indexOf(img) === i && img !== product.img).slice(0, 5).map((img, i) => ({ id: `extra-${i}`, label: `View ${i + 1}`, img })),
  ];
  const FACTORY_FILL = [
    { id: 'fac-2', label: 'Custom Options', img: '/assets/images/factory-options.webp' },
    { id: 'fac-4', label: 'Showroom', img: '/assets/images/factory-showroom-2.webp' },
    { id: 'fac-3', label: 'Our Factory', img: '/assets/images/factory-our-2.webp' },
    { id: 'fac-1', label: 'Production Process', img: '/assets/images/factory-process-2.webp' },
  ];
  const gallery = [...ownImgs, ...FACTORY_FILL.slice(0, Math.max(0, 6 - ownImgs.length))];
  const mainImg = (gallery.find(g => g.id === view) || gallery[0]).img;
  const stepView = (dir) => {
    const idx = gallery.findIndex(g => g.id === view);
    const next = gallery[(idx + dir + gallery.length) % gallery.length];
    if (next) setView(next.id);
  };
  const isKit = group.slug === 'sample-starter-kits';
  const ctaLabel = isKit ? 'Order Sample Kit – $29' : 'Get Free Quote';

  // Tiered pricing: explicit tierPrice wins; otherwise derive from the group's price ratios
  // (100/1,000/5,000) anchored on this product's reference price.
  const groupPricing = detailData[group.slug]?.pricing;
  const tierRows = product.tierPrice
    ? [
        { qty: '100 pcs', price: product.tierPrice[100] },
        { qty: '1,000 pcs', price: product.tierPrice[1000] },
        { qty: '5,000 pcs', price: product.tierPrice[5000] },
      ]
    : (groupPricing && !groupPricing.fixed
        ? groupPricing.tiers.map((t, i) => ({
            qty: t,
            price: i === 1 ? product.price : (+(parseFloat(product.price) * parseFloat(groupPricing.prices[i]) / parseFloat(groupPricing.prices[1]))).toFixed(2),
          }))
        : null);

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
          <div className="detail-gallery-sticky">
            <div className="detail-main-wrap">
              {group.isNew && (
                <span style={{ position: 'absolute', top: 14, left: 14, zIndex: 2, background: 'var(--gold)', color: 'var(--black)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', padding: '4px 12px', textTransform: 'uppercase' }}>New</span>
              )}
              <img src={mainImg} alt={`${product.name} custom packaging`} className="detail-main-img" loading={view === 'scene' ? 'eager' : 'lazy'} />
              <button type="button" className="gallery-arrow gallery-arrow-prev" onClick={() => stepView(-1)} aria-label="Previous image"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg></button>
              <button type="button" className="gallery-arrow gallery-arrow-next" onClick={() => stepView(1)} aria-label="Next image"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg></button>
            </div>
            <div className="detail-thumbs">
              {gallery.map(g => (
                <button
                  key={g.id}
                  className={`detail-thumb-btn${view === g.id ? ' active' : ''}`}
                  onMouseEnter={() => setView(g.id)}
                  onClick={() => setView(g.id)}
                  aria-label={g.label}
                >
                  <img src={g.img} alt={`${product.name} ${g.label}`} loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--black-2)', border: '1px solid var(--gold)', padding: '26px 24px' }}>
            <div className="gold-line" />
            <span className="eyebrow">{group.name}</span>
            <h1 style={{ fontSize: 'clamp(24px, 2.3vw, 33px)', margin: '8px 0 12px', fontFamily: 'var(--font-display)' }}>{product.name}</h1>
            <p style={{ color: 'var(--gray-3)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{product.tagline} — {product.spec}.</p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
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
                  <div style={{ fontSize: 22, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>${product.price}</div>
                </div>
                <div style={{ padding: '8px 16px', fontSize: 12, color: 'var(--gray-3)', lineHeight: 1.6 }}>Including worldwide shipping. The full fee is credited to your first bulk order.</div>
              </div>
            ) : (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--gray-2)', marginBottom: 8 }}>Reference Pricing (USD, EXW)</div>
                <div style={{ border: '1px solid var(--border-dim)', background: 'var(--black-3)' }}>
                  {tierRows.map((r, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < tierRows.length - 1 ? '1px solid var(--border-dim)' : 'none' }}>
                      <div style={{ fontSize: 12, color: 'var(--gray-2)', letterSpacing: '0.04em' }}>{r.qty}</div>
                      <div style={{ fontSize: 20, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>${r.price}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-3)', marginTop: 8, lineHeight: 1.6 }}>{priceDisclaimer}</div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, margin: '12px 0 16px' }}>
              {[
                ['FSC', 'Certified Material'],
                ['AQL 2.5', 'Quality Inspected'],
                [group.leadTime, 'Bulk Lead Time'],
              ].map(([n, l]) => (
                <div key={n} style={{ border: '1px solid var(--border-dim)', padding: '8px 6px', textAlign: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>{n}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-3)', marginTop: 3, lineHeight: 1.4 }}>{l}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none', flex: 1, textAlign: 'center', fontSize: 14 }}>
                {ctaLabel}
              </Link>
              <a href={WA_LINK(`Hi, I'm interested in ${product.name}`)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="wa-btn"
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

        {/* ③ Copy - What / Who / Why (rich products only) */}
        {product.copy && product.copy.length === 3 && (
          <section style={{ margin: '0 0 64px' }}>
            <div className="section-header" style={{ textAlign: 'left', alignItems: 'flex-start', marginBottom: 28 }}>
              <div>
                <div className="gold-line" />
                <span className="eyebrow">About This Product</span>
                <h2 style={{ margin: 0 }}>{product.name}, Explained</h2>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 2, background: 'var(--border-dim)', border: '1px solid var(--border-dim)' }}>
              {[
                ['What It Is', product.copy[0]],
                ['Who It Is For', product.copy[1]],
                ['Why Choose Mili', product.copy[2]],
              ].map(([t, c], i) => (
                <div key={t} style={{ background: 'var(--black-2)', padding: '26px 28px', display: 'grid', gridTemplateColumns: '60px 1fr', gap: 20 }}>
                  <div style={{ fontSize: 28, color: 'var(--gold)', fontFamily: 'var(--font-display)', opacity: 0.9 }}>0{i + 1}</div>
                  <div>
                    <h3 style={{ fontSize: 15, marginBottom: 8, color: 'var(--gold)', letterSpacing: '0.03em' }}>{t}</h3>
                    <p style={{ color: 'var(--gray-3)', fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>{c}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ③b Finish / option chips */}
        {product.chips && product.chips.length > 0 && (
          <section style={{ margin: '0 0 64px' }}>
            <div className="section-header" style={{ textAlign: 'left', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <div className="gold-line" />
                <span className="eyebrow">Finishing &amp; Options</span>
                <h2 style={{ margin: 0 }}>Customization Chips</h2>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {product.chips.map(c => (
                <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(201,162,39,0.4)', background: 'rgba(201,162,39,0.08)', color: 'var(--gold)', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '9px 18px' }}>
                  <span style={{ color: 'var(--gold)', fontSize: 11 }}>&#10022;</span>{c}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ③c Process steps */}
        {product.process && product.process.length === 4 && (
          <section style={{ margin: '0 0 64px' }}>
            <div className="section-header" style={{ textAlign: 'left', alignItems: 'flex-start', marginBottom: 28 }}>
              <div>
                <div className="gold-line" />
                <span className="eyebrow">How It Works</span>
                <h2 style={{ margin: 0 }}>From Brief to Delivery</h2>
              </div>
            </div>
            <div className="detail-steps">
              {product.process.map(([n, t, d]) => (
                <div key={n} style={{ background: 'var(--black-2)', padding: '24px 22px' }}>
                  <div style={{ fontSize: 26, color: 'var(--gold)', fontFamily: 'var(--font-display)', opacity: 0.9, marginBottom: 10 }}>{n}</div>
                  <h4 style={{ fontSize: 13, margin: '0 0 8px', color: 'var(--gold)' }}>{t}</h4>
                  <p style={{ color: 'var(--gray-3)', fontSize: 12, lineHeight: 1.7, margin: 0 }}>{d}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ③d Industry link */}
        {product.industry && (
          <section style={{ margin: '0 0 64px', padding: '22px 28px', background: 'var(--black-2)', border: '1px solid rgba(201,168,76,0.35)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--gray-2)', marginBottom: 6 }}>Built For Your Industry</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{product.industry.text}</div>
            </div>
            <Link to={product.industry.to} className="btn-outline-gold" style={{ textDecoration: 'none', fontSize: 12.5, padding: '12px 24px', whiteSpace: 'nowrap' }}>Explore Industry Solutions &rarr;</Link>
          </section>
        )}

        {/* ③e FAQ */}
        {product.faq && product.faq.length > 0 && (
          <section style={{ margin: '0 0 64px' }}>
            <div className="section-header" style={{ textAlign: 'left', alignItems: 'flex-start', marginBottom: 28 }}>
              <div>
                <div className="gold-line" />
                <span className="eyebrow">Questions</span>
                <h2 style={{ margin: 0 }}>Frequently Asked Questions</h2>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 2, background: 'var(--border-dim)', border: '1px solid var(--border-dim)' }}>
              {product.faq.map(([q, a]) => (
                <div key={q} style={{ background: 'var(--black-2)', padding: '22px 26px' }}>
                  <h4 style={{ fontSize: 14, margin: '0 0 8px', color: 'var(--gold)', fontWeight: 600 }}>{q}</h4>
                  <p style={{ color: 'var(--gray-3)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ⑤ Recommended products - same category + recently viewed, auto-updated */}
        {recommended.length > 0 && (
          <section style={{ margin: '0 0 72px' }}>
            <div className="section-header" style={{ textAlign: 'left', alignItems: 'flex-start', marginBottom: 28 }}>
              <div>
                <div className="gold-line" />
                <span className="eyebrow">Recommended For You</span>
                <h2 style={{ margin: 0 }}>Related Products</h2>
              </div>
            </div>
            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {recommended.map(({ group: g, product: p }) => (
                <div className="product-card" key={`${g}/${p.slug}`} style={{ position: 'relative' }}>
                  <Link to={`/products/${g}/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div className="product-card-img-wrap">
                      <img src={p.img} alt={p.name} className="product-card-img" loading="lazy" />
                    </div>
                    <div className="product-card-body">
                      <h4>{p.name}</h4>
                      <p>{p.tagline}</p>
                      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                        <span className="product-card-tag">{p.moq}</span>
                        <span className="product-card-tag">From ${p.price}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'right', marginTop: 20 }}>
              <Link to="/products" className="view-more-link">View More <span aria-hidden="true">&rarr;</span></Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
