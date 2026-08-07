import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productGroups } from '../data/products';

export default function Products() {
  const [activeTab, setActiveTab] = useState('magnetic');
  const rigid = productGroups[0];
  const tab = rigid.tabs.find(t => t.id === activeTab) || rigid.tabs[0];

  return (
    <div className="page-scaffold" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="section-header">
          <div className="gold-line" />
          <span className="eyebrow">Product Gallery</span>
          <h1>Premium Packaging Collection</h1>
          <p style={{ color: 'var(--gray-3)', maxWidth: 640, marginTop: 12 }}>Nine packaging categories, factory-direct. Free design, structural samples, and global delivery — MOQ from 50 pcs.</p>
        </div>

        {/* Rigid Gift Boxes — flagship parent group */}
        <section style={{ margin: '40px 0 56px', background: 'var(--black-2)', border: '1px solid var(--border-dim)', padding: '40px 36px' }}>
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
            <div style={{ background: 'var(--black-3)', border: '1px solid var(--border-dim)' }}>
              <img src={tab.img} alt={tab.label} style={{ width: '100%', display: 'block' }} />
            </div>
            <div>
              <h3 style={{ marginBottom: 10 }}>{tab.label}</h3>
              <p style={{ color: 'var(--gray-3)', fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>{tab.desc}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-gold" style={{ textDecoration: 'none' }}>Get a Quote</Link>
                <a href={`https://wa.me/8618296876285?text=Hi, I'm interested in Rigid Gift Boxes - ${tab.label}`}
                  target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none' }}>WhatsApp</a>
              </div>
            </div>
          </div>
        </section>

        {/* Remaining 8 groups */}
        <div style={{ marginBottom: 16, fontSize: 13, color: 'var(--gray-2)' }}>
          {productGroups.length} product categories
        </div>
        <div className="product-grid">
          {productGroups.slice(1).map(g => (
            <Link to={`/products/${g.slug}`} className="product-card" key={g.slug} style={{ textDecoration: 'none', position: 'relative' }}>
              {g.isNew && (
                <span style={{
                  position: 'absolute', top: 12, right: 12, zIndex: 2,
                  background: 'var(--gold)', color: 'var(--black)', fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.08em', padding: '4px 10px', textTransform: 'uppercase',
                }}>New</span>
              )}
              <div className="product-card-img-wrap">
                <img src={g.heroImg} alt={g.name} className="product-card-img" loading="lazy" />
              </div>
              <div className="product-card-body">
                <h4>{g.name}</h4>
                <p>{g.tagline}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                  <span className="product-card-tag">MOQ: {g.moq} pcs</span>
                  <span className="product-card-tag">From ${g.priceFrom}</span>
                </div>
              </div>
              <a href={`https://wa.me/8618296876285?text=Hi, I'm interested in ${encodeURIComponent(g.name)}`}
                target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
                onClick={e => e.stopPropagation()}
                style={{ position: 'absolute', right: 14, bottom: 14, zIndex: 2, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(37,211,102,0.12)', borderRadius: '50%' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
