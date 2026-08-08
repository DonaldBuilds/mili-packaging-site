import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productGroups } from '../data/products';

const WA_PHONE = '8618296876285';

export default function Products() {
  const [activeTab, setActiveTab] = useState('magnetic');
  const [activeFilter, setActiveFilter] = useState('all');
  const rigid = productGroups[0];
  const tab = rigid.tabs.find(t => t.id === activeTab) || rigid.tabs[0];

  // Non-parent groups (8 cards below flagship section)
  const groups = productGroups.slice(1);

  // True category filtering (luxopack-style): selected category shows only its products
  const isRigidVisible = activeFilter === 'all' || activeFilter === 'rigid-gift-boxes';
  const visibleGroups = activeFilter === 'all' ? groups : groups.filter(g => g.slug === activeFilter);

  const renderCard = (g) => (
    <Link to={`/products/${g.slug}`} className="product-card" key={g.slug} style={{ textDecoration: 'none', position: 'relative' }}>
      {g.badge && (
        <span className="product-badge"><span className="product-badge-emoji">{g.badge.icon}</span>{g.badge.label}</span>
      )}
      <div className="product-card-img-wrap">
        <img src={g.heroImg} alt={g.name} className="product-card-img" loading="lazy" />
      </div>
      <div className="product-card-body">
        <h4>{g.name}</h4>
        <p>{g.tagline}</p>
        <div className="product-spec-strip">
          <div className="product-spec-cell"><div className="product-spec-label">MOQ</div><div className="product-spec-value">{g.slug === 'sample-starter-kits' ? '1 Kit' : `${g.moq} pcs`}</div></div>
          <div className="product-spec-cell"><div className="product-spec-label">Lead Time</div><div className="product-spec-value">{g.leadTime}</div></div>
          <div className="product-spec-cell"><div className="product-spec-label">{g.keySpec.label}</div><div className="product-spec-value">{g.keySpec.value}</div></div>
        </div>
        <div className="product-feature-tags">
          {g.featureTags.map(tag => <span key={tag} className="product-feature-tag">{tag}</span>)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)' }}>
              {g.slug === 'sample-starter-kits' ? 'Kit $29' : `From $${g.priceFrom}`}
            </span>
            <span style={{ display: 'block', fontSize: 10, color: 'var(--gray-3)', marginTop: 2 }}>ref. @1,000 pcs (EXW)</span>
          </div>
          <span style={{ color: 'var(--gold)', fontSize: 12.5, letterSpacing: '0.04em' }}>View &rarr;</span>
        </div>
      </div>
      <a href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(`Hi, I'm interested in ${g.name}`)}`}
        target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        onClick={e => e.stopPropagation()}
        style={{ position: 'absolute', right: 14, bottom: 14, zIndex: 2, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(37,211,102,0.12)', borderRadius: '50%' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </Link>
  );

  return (
    <div className="page-scaffold" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="section-header">
          <div className="gold-line" />
          <span className="eyebrow">Product Gallery</span>
          <h1>Premium Packaging Collection</h1>
          <p style={{ color: 'var(--gray-3)', maxWidth: 680, marginTop: 12 }}>
            9 packaging categories, factory-direct. Free design, structural samples, and global delivery — MOQ from 50 pcs.
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
            All Products
          </button>
          {productGroups.map(g => (
            <button
              key={g.slug}
              role="tab"
              aria-selected={activeFilter === g.slug}
              className={`product-filter-pill ${activeFilter === g.slug ? 'active' : ''}`}
              onClick={() => setActiveFilter(g.slug)}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Filtered result meta */}
        <div style={{ marginBottom: 20, fontSize: 13, color: 'var(--gray-2)' }}>
          {activeFilter === 'all'
            ? `${productGroups.length} product categories`
            : productGroups.find(g => g.slug === activeFilter)?.name}
        </div>

        {/* Rigid Gift Boxes — flagship parent group (visible on All / Rigid filter) */}
        {isRigidVisible && (
          <section style={{ margin: '16px 0 56px', background: 'var(--black-2)', border: '1px solid var(--border-dim)', padding: '40px 36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
              <div>
                <span className="eyebrow" style={{ color: 'var(--gold)' }}>Flagship</span>
                <h2 style={{ margin: '6px 0 6px' }}>Rigid Gift Boxes</h2>
                <p style={{ color: 'var(--gray-3)', fontSize: 13 }}>{rigid.tagline}</p>
              </div>
              <Link to="/products/rigid-gift-boxes" className="btn-outline-gold" style={{ textDecoration: 'none', fontSize: 12, padding: '10px 22px' }}>View Details &rarr;</Link>
            </div>

            {/* 4 structure tabs */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {rigid.tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  style={{
                    padding: '10px 20px', fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
                    background: activeTab === t.id ? 'var(--gold)' : 'transparent',
                    color: activeTab === t.id ? 'var(--black)' : 'var(--gray-3)',
                    border: '1px solid ' + (activeTab === t.id ? 'var(--gold)' : 'var(--border)'),
                    minHeight: 44,
                  }}>
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'center' }}>
              <div style={{ background: 'var(--black-3)', border: '1px solid var(--border-dim)', position: 'relative' }}>
                <span className="product-badge"><span className="product-badge-emoji">{rigid.badge.icon}</span>{rigid.badge.label}</span>
                <img src={tab.img} alt={tab.label} style={{ width: '100%', display: 'block' }} />
              </div>
              <div>
                <h3 style={{ marginBottom: 10 }}>{tab.label}</h3>
                <p style={{ color: 'var(--gray-3)', fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>{tab.desc}</p>
                <div className="product-spec-strip" style={{ maxWidth: 420 }}>
                  <div className="product-spec-cell"><div className="product-spec-label">MOQ</div><div className="product-spec-value">{rigid.moq} pcs</div></div>
                  <div className="product-spec-cell"><div className="product-spec-label">Lead Time</div><div className="product-spec-value">{rigid.leadTime}</div></div>
                  <div className="product-spec-cell"><div className="product-spec-label">{rigid.keySpec.label}</div><div className="product-spec-value">{rigid.keySpec.value}</div></div>
                </div>
                <div className="product-feature-tags">
                  {rigid.featureTags.map(tag => <span key={tag} className="product-feature-tag">{tag}</span>)}
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Link to="/contact" className="btn-gold" style={{ textDecoration: 'none' }}>Get a Quote</Link>
                  <a href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(`Hi, I'm interested in Rigid Gift Boxes - ${tab.label}`)}`}
                    target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none' }}>WhatsApp</a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category cards — filtered by active pill */}
        {visibleGroups.length > 0 ? (
          <div className="product-grid">
            {visibleGroups.map(g => renderCard(g))}
          </div>
        ) : (
          <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--gray-3)', fontSize: 14 }}>
            No products in this category yet.
          </div>
        )}

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
