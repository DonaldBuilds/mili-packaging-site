import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productGroups, productCatalog } from '../data/products';

const WA_PHONE = '8618296876285';
const GROUP_ORDER = ['rigid-gift-boxes','cosmetic-boxes','jewelry-boxes','watch-boxes','mailer-boxes','folding-cartons','paper-bags','corrugated-shipping','sample-starter-kits'];

const fi = (p) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p}</svg>
);
const FILTER_ICONS = {
  all: fi(<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>),
  'rigid-gift-boxes': fi(<><path d="M20 12v10H4V12" /><rect x="2" y="7" width="20" height="5" /><path d="M12 22V7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></>),
  'cosmetic-boxes': fi(<path d="M12 2.7l5.7 5.6a8 8 0 1 1-11.4 0z" />),
  'jewelry-boxes': fi(<><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M11 3L8 9l4 12 4-12-3-6" /><path d="M2 9h20" /></>),
  'watch-boxes': fi(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  'mailer-boxes': fi(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M21 7l-9 6-9-6" /></>),
  'folding-cartons': fi(<><path d="M12 2 3 7l9 5 9-5-9-5z" /><path d="M3 12l9 5 9-5" /><path d="M3 17l9 5 9-5" /></>),
  'paper-bags': fi(<><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></>),
  'corrugated-shipping': fi(<><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.3 7l8.7 5 8.7-5" /><path d="M12 22V12" /></>),
  'sample-starter-kits': fi(<><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>),
};

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('magnetic');

  // Groups in display order (with products)
  const groups = GROUP_ORDER
    .map(slug => productGroups.find(g => g.slug === slug))
    .filter(Boolean)
    .map(g => ({ ...g, products: productCatalog[g.slug] || [] }));

  // True category filtering (luxopack-style): selected category shows only its products
  const visibleGroups = activeFilter === 'all' ? groups : groups.filter(g => g.slug === activeFilter);
  const rigid = groups[0];
  const tab = rigid && (rigid.tabs.find(t => t.id === activeTab) || rigid.tabs[0]);

  const waIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  );

  const productCard = (group, p) => (
    <div className="product-card" key={p.slug} style={{ position: 'relative' }}>
      <Link to={`/products/${group.slug}/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className="product-card-img-wrap">
          <img src={p.img} alt={p.name} className="product-card-img" loading="lazy" />
        </div>
        <div className="product-card-body">
          <h4 style={{ fontSize: 14.5, lineHeight: 1.35 }}>{p.name}</h4>
          <p style={{ minHeight: 40 }}>{p.tagline}</p>
          <div className="product-spec-strip">
            <div className="product-spec-cell"><div className="product-spec-label">MOQ</div><div className="product-spec-value">{p.moq}</div></div>
            <div className="product-spec-cell"><div className="product-spec-label">Lead Time</div><div className="product-spec-value">{group.leadTime}</div></div>
            <div className="product-spec-cell"><div className="product-spec-label">{group.keySpec.label}</div><div className="product-spec-value">{group.keySpec.value}</div></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)' }}>
              {group.slug === 'sample-starter-kits' ? 'Kit $29' : `From $${p.price}`}
            </span>
            <span style={{ color: 'var(--gold)', fontSize: 12.5, letterSpacing: '0.04em' }}>View &rarr;</span>
          </div>
        </div>
      </Link>
      <a href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}`)}`}
        target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        style={{ position: 'absolute', right: 14, bottom: 14, zIndex: 2, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(37,211,102,0.12)', borderRadius: '50%' }}>
        {waIcon}
      </a>
    </div>
  );

  return (
    <div className="page-scaffold" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="section-header">
          <div className="gold-line" />
          <span className="eyebrow">Product Gallery</span>
          <h1>Premium Packaging Collection</h1>
          <p style={{ color: 'var(--gray-3)', maxWidth: 680, marginTop: 12 }}>
            9 packaging categories, 54 factory-direct products. Free design, structural samples, and global delivery — MOQ from 50 pcs.
          </p>
        </div>

        {/* Category filter pills — luxopack-style, true filtering */}
        <div className="product-filters" role="tablist" aria-label="Product categories">
          <button
            role="tab"
            aria-selected={activeFilter === 'all'}
            className={`product-filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            {FILTER_ICONS.all}
            All Products
          </button>
          {groups.map(g => (
            <button
              key={g.slug}
              role="tab"
              aria-selected={activeFilter === g.slug}
              className={`product-filter-pill ${activeFilter === g.slug ? 'active' : ''}`}
              onClick={() => setActiveFilter(g.slug)}
            >
              {FILTER_ICONS[g.slug]}
              {g.name}
            </button>
          ))}
        </div>

        {/* Filtered result meta */}
        <div style={{ marginBottom: 20, fontSize: 13, color: 'var(--gray-2)' }}>
          {activeFilter === 'all'
            ? `${groups.length} categories · ${groups.reduce((s, g) => s + g.products.length, 0)} products`
            : `${groups.find(g => g.slug === activeFilter)?.name} · ${groups.find(g => g.slug === activeFilter)?.products.length} products`}
        </div>

        {/* Category sections — vertical stacked, filtered by active pill */}
        {visibleGroups.map((g, idx) => {
          const isRigid = g.slug === 'rigid-gift-boxes';
          return (
            <section key={g.slug} style={{ marginBottom: 64, borderTop: '1px solid var(--border-dim)', paddingTop: 40 }}>
              {/* Group header — vertical layout */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1, color: 'transparent',
                    WebkitTextStroke: '1px rgba(201,162,39,0.55)', fontWeight: 700,
                  }}>{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <h2 style={{ margin: 0, fontSize: 'clamp(22px, 2.2vw, 30px)', fontFamily: 'var(--font-display)' }}>{g.name}</h2>
                      {g.badge && (
                        <span className="product-badge" style={{ position: 'static', display: 'inline-flex' }}>
                          <span className="product-badge-emoji">{g.badge.icon}</span>{g.badge.label}
                        </span>
                      )}
                      {g.isNew && <span className="badge-new">New</span>}
                    </div>
                    <p style={{ color: 'var(--gray-3)', fontSize: 13, margin: '8px 0 0', maxWidth: 560, lineHeight: 1.7 }}>{g.tagline}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link to={`/products/${g.slug}`} className="btn-outline-gold" style={{ textDecoration: 'none', fontSize: 12, padding: '10px 20px' }}>Category Details &rarr;</Link>
                </div>
              </div>

              {/* Rigid flagship: 4 structure tabs above the product grid */}
              {isRigid && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                  {g.tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)}
                      style={{
                        padding: '9px 18px', fontSize: 11.5, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
                        background: activeTab === t.id ? 'var(--gold)' : 'transparent',
                        color: activeTab === t.id ? 'var(--black)' : 'var(--gray-3)',
                        border: '1px solid ' + (activeTab === t.id ? 'var(--gold)' : 'var(--border)'),
                        minHeight: 40,
                      }}>
                      {t.label}
                    </button>
                  ))}
                </div>
              )}

              {/* 6 independent products — each links to its own detail page */}
              {g.products.length > 0 ? (
                <div className="product-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                  {g.products.map(p => productCard(g, p))}
                </div>
              ) : (
                <p style={{ color: 'var(--gray-3)', fontSize: 13 }}>Products in this category are coming soon.</p>
              )}
            </section>
          );
        })}

        {/* Factory-direct consultation CTA — luxopack style */}
        <section style={{ margin: '64px 0 8px', background: 'var(--black-2)', border: '1px solid var(--gold)', padding: '44px 40px', textAlign: 'center' }}>
          <div className="gold-line gold-line-center" />
          <span className="eyebrow">Factory Direct</span>
          <h2 style={{ margin: '10px 0 12px' }}>Custom Design &amp; Expert Support</h2>
          <p style={{ color: 'var(--gray-3)', fontSize: 14, maxWidth: 620, margin: '0 auto 26px', lineHeight: 1.7 }}>
            Not sure which box fits your product? Our structural engineers and designers are available for a 1-on-1 consultation to help you choose the right materials, size, and finishes.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent("Hi, I'd like a packaging consultation")}`}
              target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none', fontSize: 14, padding: '14px 32px' }}>Chat with Factory Direct</a>
            <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none', fontSize: 14, padding: '14px 32px' }}>Get a Free Quote</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
