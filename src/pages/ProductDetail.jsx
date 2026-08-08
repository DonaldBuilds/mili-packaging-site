import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productGroups, boundaryTexts, getGroup, getDetail, getSkus, priceDisclaimer, productCatalog } from '../data/products';
import { industries } from './Industries';

const industryName = (slug) => {
  const ind = industries.find(i => i.slug === slug);
  return ind ? ind.name : slug;
};

const WA_LINK = (text) => `https://wa.me/8618296876285?text=${encodeURIComponent(text)}`;

export default function ProductDetail() {
  const { slug } = useParams();
  const group = getGroup(slug);
  const detail = getDetail(slug);
  const [activeTab, setActiveTab] = useState('magnetic');
  const [view, setView] = useState('scene');

  useEffect(() => {
    if (!group) return;
    const isSample = detail && detail.pricing && detail.pricing.fixed;
    const low = isSample ? detail.pricing.price : group.priceFrom;
    const high = isSample ? detail.pricing.price : group.priceTo;
    const faq = (detail && detail.faq) || group.faq || [];
    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: group.name,
        description: `${group.tagline}. ${group.sellingPoints.map(s => s[1]).join(' ')}`,
        image: `https://mili-packaging.com${group.heroImg}`,
        brand: { '@type': 'Brand', name: 'Mili Packaging' },
        manufacturer: { '@type': 'Organization', name: 'Jiangxi Mili Packaging Materials Co., Ltd.' },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: low,
          highPrice: high,
          offerCount: '1',
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
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      ...(getSkus(group.slug).length > 0 ? [{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${group.name} — Standard Configurations`,
        itemListElement: getSkus(group.slug).map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.name,
          description: s.spec,
          url: `https://mili-packaging.com/#/products/${group.slug}`,
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
  }, [group, detail]);

  if (!group) {
    return (
      <div className="page-scaffold" style={{ paddingTop: 140, textAlign: 'center' }}>
        <div className="container">
          <h1>Product Not Found</h1>
          <Link to="/products" className="btn-gold" style={{ marginTop: 24, textDecoration: 'none' }}>Back to Products</Link>
        </div>
      </div>
    );
  }

  const isSample = !!(detail && detail.pricing && detail.pricing.fixed);
  const skus = getSkus(slug);
  const skuMoq = group.slug === 'watch-boxes' ? 'MOQ 50 pcs' : 'MOQ 100 pcs';
  const pricing = (detail && detail.pricing) || { tiers: ['100 pcs', '1,000 pcs', '5,000 pcs'], prices: ['0.00', '0.00', '0.00'] };
  const specs = (detail && detail.specs) || [];
  const copy = (detail && detail.copy) || [];
  const industryLinks = (detail && detail.industryLinks) || [];
  const related = (detail && detail.related) || [];
  const faq = (detail && detail.faq) || group.faq || [];

  const tab = group.isParent ? (group.tabs.find(t => t.id === activeTab) || group.tabs[0]) : null;
  const boundary = group.boundary ? boundaryTexts[group.boundary] : null;
  const baseImg = tab ? tab.img : group.heroImg;
  const gallery = [
    { id: 'scene', label: 'Scene', img: baseImg },
    { id: 'white', label: 'White', img: group.whiteImg },
    { id: 'craft', label: 'Details', img: (group.craftImg && group.craftImg[0]) || baseImg },
  ];
  const mainImg = (gallery.find(g => g.id === view) || gallery[0]).img;
  const moqLabel = isSample ? 'Fixed $29 Kit' : `MOQ ${group.moq} pcs`;
  const waText = `Hi, I'm interested in ${group.name}${isSample ? ' (Sample Kit)' : ''}`;
  const ctaLabel = isSample ? 'Order Sample Kit – $29' : 'Get Free Quote';

  const stepData = [
    ['01', 'Inquiry & Quote', 'Send your brief - structure, size, material, finishing and quantity. We reply with a tailored quote and free 3D mockup within 24 hours.'],
    ['02', 'Free Sampling', '2 rounds of free structural samples in 3-5 days. Review, refine and approve before bulk production.'],
    ['03', 'Bulk Production', 'In-house manufacturing with AQL 2.5 QC at every workstation. Standard bulk lead time 12-15 days.'],
    ['04', 'Global Delivery', 'FOB, CIF or DDP door-to-door across 50+ countries, with export-grade packing and tracking.'],
  ];

  return (
    <div className="page-scaffold" style={{ paddingTop: 120 }}>
      <div className="container">
        {/* ① Breadcrumb + H1 */}
        <nav style={{ marginBottom: 28, fontSize: 13, color: 'var(--gray-3)' }}>
          <Link to="/" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Home</Link> <span style={{ margin: '0 8px' }}>/</span>
          <Link to="/products" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Products</Link> <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--gold)' }}>{group.name}</span>
        </nav>

        {/* ② First screen: gallery (left) + inquiry box (right) */}
        <section className="detail-hero">
          <div>
            <div style={{ position: 'relative', background: 'var(--black-2)', border: '1px solid var(--border-dim)' }}>
              {group.isNew && (
                <span style={{ position: 'absolute', top: 16, right: 16, zIndex: 2, background: 'var(--gold)', color: 'var(--black)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', padding: '5px 12px', textTransform: 'uppercase' }}>New</span>
              )}
              <img src={mainImg} alt={`${group.name} custom packaging`} style={{ width: '100%', display: 'block', aspectRatio: '1/1', objectFit: 'cover' }} loading={view === 'scene' ? 'eager' : 'lazy'} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 12 }}>
              {gallery.map(g => (
                <button key={g.id} onClick={() => setView(g.id)}
                  style={{
                    padding: 0, cursor: 'pointer', border: view === g.id ? '2px solid var(--gold)' : '1px solid var(--border-dim)',
                    background: 'var(--black-3)', overflow: 'hidden', aspectRatio: '1/1',
                  }}>
                  <img src={g.img} alt={`${group.name} ${g.label}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--black-2)', border: '1px solid var(--gold)', padding: '32px 28px' }}>
            <div className="gold-line" />
            <span className="eyebrow">{group.tagline}</span>
            <h1 style={{ fontSize: 'clamp(26px, 2.6vw, 38px)', margin: '10px 0 16px', fontFamily: 'var(--font-display)' }}>{group.name}</h1>

            {/* MOQ badge */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <span style={{ display: 'inline-block', background: 'rgba(201,162,39,0.14)', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '6px 14px' }}>{moqLabel}</span>
              {isSample && <span style={{ display: 'inline-block', border: '1px solid var(--border)', color: 'var(--gray-2)', fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '6px 14px' }}>Credited to Bulk Order</span>}
            </div>

            {/* Tiered reference price table */}
            {isSample ? (
              <div style={{ border: '1px solid var(--border-dim)', marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--black-3)' }}>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--gray-2)', marginBottom: 4 }}>Sample &amp; Starter Kit</div>
                    <div style={{ fontSize: 15 }}>12 material &amp; finish sample boxes</div>
                  </div>
                  <div style={{ fontSize: 26, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>${pricing.price}</div>
                </div>
                <div style={{ padding: '10px 16px', fontSize: 12, color: 'var(--gray-3)', lineHeight: 1.6 }}>Including worldwide shipping. The full fee is credited to your first bulk order.</div>
              </div>
            ) : (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--gray-2)', marginBottom: 8 }}>Reference Pricing (USD, EXW)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border-dim)', border: '1px solid var(--border-dim)' }}>
                  {pricing.tiers.map((tier, i) => (
                    <div key={tier} style={{ background: 'var(--black-3)', padding: '12px 8px', textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: 'var(--gray-2)', marginBottom: 6 }}>{tier}</div>
                      <div style={{ fontSize: 22, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>${pricing.prices[i]}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-3)', marginTop: 8, lineHeight: 1.6 }}>{priceDisclaimer}</div>
              </div>
            )}

            {/* Trust badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, margin: '16px 0 22px' }}>
              {[
                ['FSC', 'Certified Material'],
                ['AQL 2.5', 'Quality Inspected'],
                ['7-15 Days', 'Bulk Lead Time'],
              ].map(([n, l]) => (
                <div key={n} style={{ border: '1px solid var(--border-dim)', padding: '10px 6px', textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold)' }}>{n}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-3)', marginTop: 3, lineHeight: 1.4 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* CTA + WhatsApp */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none', flex: 1, textAlign: 'center', fontSize: 14 }}>
                {ctaLabel}
              </Link>
              <a href={WA_LINK(waText)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
                style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.4)', borderRadius: '50%', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
            {isSample && <p style={{ fontSize: 11.5, color: 'var(--gray-3)', marginTop: 12, lineHeight: 1.6 }}>Need bulk quantities instead? <Link to="/contact#quote-form" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Request a bulk quote &rarr;</Link></p>}
          </div>
        </section>

        {/* Rigid parent: 4 structure tabs (phase 1) */}
        {group.isParent && (
          <section style={{ marginBottom: 72 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
              {group.tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  style={{
                    padding: '10px 20px', fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer', minHeight: 44,
                    background: activeTab === t.id ? 'var(--gold)' : 'transparent',
                    color: activeTab === t.id ? 'var(--black)' : 'var(--gray-3)',
                    border: '1px solid ' + (activeTab === t.id ? 'var(--gold)' : 'var(--border)'),
                  }}>
                  {t.label}
                </button>
              ))}
            </div>
            {tab && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'center', marginTop: 20 }}>
                <div style={{ background: 'var(--black-2)', border: '1px solid var(--border-dim)' }}>
                  <img src={tab.img} alt={tab.label} style={{ width: '100%', display: 'block' }} />
                </div>
                <div>
                  <h3 style={{ marginBottom: 8 }}>{tab.label}</h3>
                  <p style={{ color: 'var(--gray-3)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>{tab.desc}</p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Boundary text (phase 1) */}
        {boundary && (
          <section style={{ marginBottom: 72, padding: '20px 24px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.3)', fontSize: 13.5, color: 'var(--gray-2)', lineHeight: 1.8 }}>
            {boundary.text}
            {boundary.link && boundary.to && (
              <Link to={boundary.to} style={{ color: 'var(--gold)', textDecoration: 'none', whiteSpace: 'nowrap' }}> {boundary.link}</Link>
            )}
          </section>
        )}

        {/* ③ Three-part copy + selling points */}
        {copy.length > 0 && (
          <section style={{ marginBottom: 72 }}>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <div className="gold-line gold-line-center" />
              <span className="eyebrow">About This Range</span>
              <h2>{group.name}, Explained</h2>
            </div>
            <div style={{ display: 'grid', gap: 2, background: 'var(--border-dim)', border: '1px solid var(--border-dim)' }}>
              {[
                ['What It Is', copy[0]],
                ['Who It Is For', copy[1]],
                ['Why Choose Mili', copy[2]],
              ].map(([t, c], i) => (
                <div key={t} className="detail-copyrow" style={{ background: 'var(--black-2)', padding: '28px 28px' }}>
                  <div style={{ fontSize: 30, color: 'var(--gold)', fontFamily: 'var(--font-display)', opacity: 0.9 }}>0{i + 1}</div>
                  <div>
                    <h3 style={{ fontSize: 15, marginBottom: 8, color: 'var(--gold)', letterSpacing: '0.03em' }}>{t}</h3>
                    <p style={{ color: 'var(--gray-3)', fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>{c}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="detail-strip3" style={{ marginTop: 2 }}>
              {group.sellingPoints.map(([t, d]) => (
                <div key={t} style={{ background: 'var(--black-3)', padding: '20px 22px' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }} aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                    <h4 style={{ fontSize: 13, margin: 0 }}>{t}</h4>
                  </div>
                  <p style={{ color: 'var(--gray-3)', fontSize: 12, lineHeight: 1.7, margin: '10px 0 0' }}>{d}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ④ Full spec table (10 rows) */}
        {specs.length > 0 && (
          <section style={{ marginBottom: 72 }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="gold-line gold-line-center" />
              <span className="eyebrow">Specifications</span>
              <h2>Full Specification Sheet</h2>
            </div>
            <div style={{ border: '1px solid var(--border-dim)' }}>
              {specs.map(([k, v], i) => (
                <div key={k} className="detail-specrow" style={{ background: i % 2 ? 'var(--black-3)' : 'var(--black-2)', borderBottom: i < specs.length - 1 ? '1px solid var(--border-dim)' : 'none' }}>
                  <div style={{ fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>{k}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--gray-2)', lineHeight: 1.7 }}>{v}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ④b Product Line — 6 standard SKU configurations */}
        {skus.length > 0 && (
          <section style={{ marginBottom: 72 }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="gold-line gold-line-center" />
              <span className="eyebrow">Product Line</span>
              <h2>6 Standard Configurations</h2>
              <p style={{ color: 'var(--gray-3)', fontSize: 13, marginTop: 10, maxWidth: 620, margin: '10px auto 0' }}>
                Reference prices in USD (EXW) based on standard sizes. Every configuration is fully customizable — the final quote is confirmed by our sales team.
              </p>
            </div>
            <div className="detail-related">
              {skus.map(s => {
                const prod = (productCatalog[slug] || []).find(p => p.name === s.name);
                const href = prod ? `/products/${slug}/${prod.slug}` : '/contact#quote-form';
                return (
                  <div key={s.name} id={`sku-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} style={{ border: '1px solid var(--border-dim)', background: 'var(--black-2)', display: 'flex', flexDirection: 'column' }}>
                    <Link to={href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                      <div style={{ background: 'var(--black-3)' }}>
                        <img src={s.img} alt={s.name} loading="lazy" style={{ width: '100%', display: 'block', aspectRatio: '1/1', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <h4 style={{ fontSize: 13.5, marginBottom: 6 }}>{s.name}</h4>
                        <p style={{ fontSize: 12, color: 'var(--gray-3)', lineHeight: 1.7, margin: '0 0 12px', flex: 1 }}>{s.spec}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                          <div>
                            <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)' }}>From ${s.price}</span>
                            {!isSample && <span style={{ display: 'block', fontSize: 9.5, color: 'var(--gray-3)', marginTop: 2 }}>ref. @1,000 pcs (EXW)</span>}
                          </div>
                          <span style={{ border: '1px solid rgba(201,162,39,0.45)', color: 'var(--gold-light)', fontSize: 9.5, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '3px 8px', fontWeight: 700 }}>
                            {isSample ? 'Credited to Bulk' : skuMoq}
                          </span>
                        </div>
                        <span style={{ color: 'var(--gold)', fontSize: 12.5, letterSpacing: '0.04em' }}>View Details &rarr;</span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ⑤ Customization chips */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">Customization</span>
            <h2>Finishing &amp; Decoration Options</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, maxWidth: 860, margin: '0 auto' }}>
            {[...new Set([...group.options.finishing, ...(group.options.structure || [])])].slice(0, 12).map(ch => (
              <span key={ch} style={{ border: '1px solid rgba(201,162,39,0.5)', background: 'rgba(201,162,39,0.06)', color: 'var(--gray-2)', fontSize: 12.5, letterSpacing: '0.02em', padding: '9px 18px' }}>{ch}</span>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-3)', marginTop: 22 }}>Every option can be combined. Free design consultation and 3D mockup included for all custom orders.</p>
        </section>

        {/* ⑥ 4-step process */}
        <section style={{ marginBottom: 72, background: 'var(--black-2)', border: '1px solid var(--border-dim)', padding: '52px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">Working With Us</span>
            <h2>4 Steps From Brief to Delivery</h2>
          </div>
          <div className="detail-steps">
            {stepData.map(([n, t, d]) => (
              <div key={n} style={{ background: 'var(--black-3)', padding: '26px 22px' }}>
                <div style={{ fontSize: 28, color: 'var(--gold)', fontFamily: 'var(--font-display)', marginBottom: 12 }}>{n}</div>
                <h4 style={{ fontSize: 13.5, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t}</h4>
                <p style={{ color: 'var(--gray-3)', fontSize: 12.5, lineHeight: 1.75, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ⑦ Application industries (internal links) */}
        {industryLinks.length > 0 && (
          <section style={{ marginBottom: 72 }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div className="gold-line gold-line-center" />
              <span className="eyebrow">Applications</span>
              <h2>Industries We Serve With {group.name}</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
              {industryLinks.map(slug => (
                <Link key={slug} to={`/industries/${slug}`} style={{ textDecoration: 'none', border: '1px solid var(--border)', background: 'var(--black-2)', padding: '14px 26px', color: 'var(--gray-2)', fontSize: 13.5, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  {industryName(slug)}
                  <span style={{ color: 'var(--gold)' }}>&rarr;</span>
                </Link>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-3)', marginTop: 18 }}>See dedicated packaging solutions for your sector.</p>
          </section>
        )}

        {/* ⑧ FAQ */}
        <section style={{ maxWidth: 760, margin: '0 auto 72px' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">FAQ</span>
            <h2>Common Questions</h2>
          </div>
          {faq.map(([q, a]) => (
            <details key={q} style={{ border: '1px solid var(--border-dim)', background: 'var(--black-2)', marginBottom: 10 }}>
              <summary style={{ padding: '16px 20px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{q}</summary>
              <p style={{ padding: '0 20px 16px', margin: 0, fontSize: 13.5, color: 'var(--gray-3)', lineHeight: 1.8 }}>{a}</p>
            </details>
          ))}
        </section>

        {/* ⑨ Related products */}
        {related.length > 0 && (
          <section style={{ marginBottom: 72 }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div className="gold-line gold-line-center" />
              <span className="eyebrow">Explore More</span>
              <h2>Related Box Styles</h2>
            </div>
            <div className="detail-related">
              {related.map(slug => {
                const g = getGroup(slug);
                if (!g) return null;
                return (
                  <Link key={slug} to={`/products/${slug}`} style={{ textDecoration: 'none', border: '1px solid var(--border-dim)', background: 'var(--black-2)', display: 'block', overflow: 'hidden' }}>
                    <div style={{ background: 'var(--black-3)' }}>
                      <img src={g.heroImg} alt={g.name} style={{ width: '100%', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }} loading="lazy" />
                    </div>
                    <div style={{ padding: '16px 18px 18px' }}>
                      <h4 style={{ fontSize: 14, marginBottom: 6 }}>{g.name}</h4>
                      <p style={{ fontSize: 12, color: 'var(--gray-3)', margin: '0 0 12px', lineHeight: 1.6 }}>{g.tagline}</p>
                      <span style={{ color: 'var(--gold)', fontSize: 12.5, letterSpacing: '0.04em' }}>View {g.name} &rarr;</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ⑩ Bottom CTA banner */}
        <section style={{ marginBottom: 72, padding: '48px 40px', background: 'var(--black-2)', border: '1px solid var(--gold)', textAlign: 'center' }}>
          <div style={{ fontSize: 24, color: 'var(--gold)', fontFamily: 'var(--font-display)', marginBottom: 10 }}>
            {isSample ? 'Try Before You Commit' : `Ready to Source ${group.name}?`}
          </div>
          <p style={{ fontSize: 14, color: 'var(--gray-3)', marginBottom: 28, maxWidth: 560, margin: '0 auto 28px' }}>
            {isSample
              ? 'Order the sample kit and compare 12 structures side by side - $29 including shipping, credited to your first bulk order.'
              : 'Factory-direct pricing, free design and 3D mockup within 48 hours. Tell us your brief and get a tailored quote within 24 hours.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none', fontSize: 15, padding: '15px 38px' }}>
              {isSample ? 'Order Sample Kit – $29' : 'Get Free Quote'}
            </Link>
            <a href={WA_LINK(waText)} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none', fontSize: 15, padding: '15px 38px' }}>WhatsApp Us</a>
          </div>
        </section>
      </div>
    </div>
  );
}
