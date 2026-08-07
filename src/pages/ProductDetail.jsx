import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productGroups, boundaryTexts, getGroup } from '../data/products';

export default function ProductDetail() {
  const { slug } = useParams();
  const group = getGroup(slug);
  const [activeTab, setActiveTab] = useState('magnetic');

  useEffect(() => {
    if (!group) return;
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
          lowPrice: group.priceFrom,
          highPrice: group.priceTo,
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
        mainEntity: (group.faq || []).map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
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
  }, [group]);

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

  const tab = group.isParent ? (group.tabs.find(t => t.id === activeTab) || group.tabs[0]) : null;
  const boundary = group.boundary ? boundaryTexts[group.boundary] : null;
  const img = tab ? tab.img : group.heroImg;
  const faq = group.faq || [];

  return (
    <div className="page-scaffold" style={{ paddingTop: 120 }}>
      <div className="container">
        <nav style={{ marginBottom: 32, fontSize: 13, color: 'var(--gray-3)' }}>
          <Link to="/" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Home</Link> <span style={{ margin: '0 8px' }}>/</span>
          <Link to="/products" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Products</Link> <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--gold)' }}>{group.name}</span>
        </nav>

        {/* 1. Hero image + 3 selling points */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', marginBottom: 72 }}>
          <div style={{ position: 'relative', background: 'var(--black-2)', border: '1px solid var(--border-dim)' }}>
            {group.isNew && (
              <span style={{ position: 'absolute', top: 16, right: 16, zIndex: 2, background: 'var(--gold)', color: 'var(--black)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', padding: '5px 12px', textTransform: 'uppercase' }}>New</span>
            )}
            <img src={img} alt={group.name} style={{ width: '100%', display: 'block' }} />
          </div>
          <div>
            <div className="gold-line" />
            <span className="eyebrow">{group.tagline}</span>
            <h1 style={{ fontSize: 'clamp(26px, 3vw, 44px)', margin: '10px 0 20px', fontFamily: 'var(--font-display)' }}>{group.name}</h1>
            <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
              {group.sellingPoints.map(([t, d]) => (
                <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }} aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                  <div>
                    <h4 style={{ fontSize: 15, marginBottom: 4 }}>{t}</h4>
                    <p style={{ color: 'var(--gray-3)', fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-gold" style={{ textDecoration: 'none' }}>Get a Quote</Link>
              <a href={`https://wa.me/8618296876285?text=Hi, I'm interested in ${encodeURIComponent(group.name)}`} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none' }}>WhatsApp Us</a>
            </div>
          </div>
        </section>

        {/* Rigid parent: 4 structure tabs */}
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

        {/* Boundary text (Module 3) */}
        {boundary && (
          <section style={{ marginBottom: 72, padding: '20px 24px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.3)', fontSize: 13.5, color: 'var(--gray-2)', lineHeight: 1.8 }}>
            {boundary.text}
            {boundary.link && boundary.to && (
              <Link to={boundary.to} style={{ color: 'var(--gold)', textDecoration: 'none', whiteSpace: 'nowrap' }}> {boundary.link}</Link>
            )}
          </section>
        )}

        {/* 2. Structure / material / finishing options table */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">Options</span>
            <h2>Structures, Materials & Finishing</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: 'var(--border-dim)', border: '1px solid var(--border-dim)' }}>
            {[['Structure', group.options.structure], ['Material', group.options.material], ['Finishing', group.options.finishing]].map(([title, items]) => (
              <div key={title} style={{ background: 'var(--black-2)', padding: '28px 24px' }}>
                <h4 style={{ fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>{title}</h4>
                <ul style={{ listStyle: 'none', margin: 0 }}>
                  {items.map(it => (
                    <li key={it} style={{ fontSize: 13, color: 'var(--gray-3)', padding: '6px 0', borderBottom: '1px solid var(--border-dim)', paddingLeft: 16, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>✓</span>{it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Applications (industry use) */}
        <section style={{ marginBottom: 72, background: 'var(--black-2)', border: '1px solid var(--border-dim)', padding: '48px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="gold-line" />
              <span className="eyebrow">Applications</span>
              <h2 style={{ margin: '10px 0 20px' }}>Where It Shines</h2>
              <ul style={{ listStyle: 'none', margin: 0 }}>
                {group.applications.map(a => (
                  <li key={a} style={{ fontSize: 14, color: 'var(--gray-3)', padding: '9px 0', borderBottom: '1px solid var(--border-dim)', paddingLeft: 22, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>→</span>{a}
                  </li>
                ))}
              </ul>
              <Link to="/industries" style={{ display: 'inline-block', marginTop: 24, color: 'var(--gold)', textDecoration: 'none', fontSize: 13, letterSpacing: '0.05em' }}>Explore Industry Solutions &rarr;</Link>
            </div>
            <div style={{ background: 'var(--black-3)', border: '1px solid var(--border-dim)' }}>
              <img src={group.heroImg} alt={group.name + ' applications'} style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* 4. Size range */}
        <section style={{ marginBottom: 72, textAlign: 'center', maxWidth: 720, margin: '0 auto 72px' }}>
          <div className="gold-line gold-line-center" />
          <span className="eyebrow">Sizes</span>
          <h2 style={{ marginBottom: 16 }}>Dimension Range</h2>
          <p style={{ color: 'var(--gray-3)', fontSize: 15, lineHeight: 1.9 }}>{group.sizeRange}</p>
        </section>

        {/* 5. MOQ / lead time / quote CTA */}
        <section style={{ marginBottom: 72, padding: '44px 40px', background: 'var(--black-2)', border: '1px solid var(--gold)', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', marginBottom: 28 }}>
            {[['MOQ', group.moq + ' pcs'], ['Lead Time', '12-15 Days'], ['Design', 'Free + 3D Mockup']].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-2)', marginBottom: 6 }}>{k}</div>
                <div style={{ fontSize: 24, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 20, color: 'var(--gold)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
            From ${group.priceFrom} - ${group.priceTo}
          </div>
          <div style={{ fontSize: 12, color: 'var(--gray-3)', marginBottom: 28 }}>Per unit (EXW), depends on size, material &amp; quantity. Volume discounts from 3,000 pcs.</div>
          <Link to="/contact" className="btn-gold" style={{ textDecoration: 'none' }}>Request a Quote for {group.name}</Link>
        </section>

        {/* 6. FAQ */}
        <section style={{ maxWidth: 760, margin: '0 auto 40px' }}>
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
      </div>
    </div>
  );
}
