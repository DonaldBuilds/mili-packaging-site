import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'all', label: 'All Packaging' },
  { id: 'magnetic', label: 'Magnetic Boxes' },
  { id: 'jewelry', label: 'Jewelry Boxes' },
  { id: 'cosmetic', label: 'Cosmetic Boxes' },
  { id: 'rigid', label: 'Rigid Boxes' },
  { id: 'shipping', label: 'Shipping Boxes' },
  { id: 'bags', label: 'Paper Bags' },
];

const allProducts = [
  { id: 1, name: 'Premium Magnetic Gift Box', category: 'magnetic', img: '/assets/images/product-gift-v3.jpg', moq: '500 pcs', leadTime: '15 Days', material: 'Rigid greyboard + art paper' },
  { id: 2, name: 'Velvet Jewelry Display Case', category: 'jewelry', img: '/assets/images/jewelry-mili-v4.jpg', moq: '100 pcs', leadTime: '12 Days', material: 'Rigid board + velvet lining' },
  { id: 3, name: 'Luxury Skincare Gift Set Box', category: 'cosmetic', img: '/assets/images/product-hero-v4.jpg', moq: '300 pcs', leadTime: '15 Days', material: 'Rigid board + specialty paper' },
  { id: 4, name: 'Rigid Drawer Slide Box', category: 'rigid', img: '/assets/images/product-drawer-v3.jpg', moq: '500 pcs', leadTime: '15 Days', material: '2mm greyboard + coated paper' },
  { id: 5, name: 'Premium Perfume Packaging Box', category: 'cosmetic', img: '/assets/images/case-cosmetics-v4.jpg', moq: '500 pcs', leadTime: '15 Days', material: 'Rigid board + satin interior' },
  { id: 6, name: 'Watch Display Gift Box', category: 'jewelry', img: '/assets/images/case-jewelry-v4.jpg', moq: '200 pcs', leadTime: '12 Days', material: 'PU leather + velvet cushion' },
  { id: 7, name: 'Eco Kraft Shipping Mailer', category: 'shipping', img: '/assets/images/shipping-box-kraft-v4.jpg', moq: '1000 pcs', leadTime: '10 Days', material: 'FSC-certified kraft corrugated' },
  { id: 8, name: 'Branded Retail Paper Bag', category: 'bags', img: '/assets/images/gift-bag-black-v3.jpg', moq: '500 pcs', leadTime: '12 Days', material: '180g coated art paper' },
];

export default function Products() {
  const [activeCat, setTab] = useState('all');
  const filtered = useMemo(() => activeCat === 'all' ? allProducts : allProducts.filter(p => p.category === activeCat), [activeCat]);

  return (
    <div className="page-scaffold" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="section-header">
          <div className="gold-line" />
          <span className="eyebrow">Product Gallery</span>
          <h1>Premium Packaging Collection</h1>
          <p style={{ color: 'var(--gray-3)', maxWidth: 600, marginTop: 12 }}>Factory-direct custom boxes with free design, structural samples, and global delivery. MOQ from 100 pcs.</p>
        </div>

        <div style={{ display:'flex', gap:10, flexWrap:'wrap', margin:'40px 0 32px' }}>
          {categories.map(c => (
            <button key={c.id} onClick={() => setTab(c.id)}
              className={activeCat === c.id ? 'btn-gold' : 'btn-outline-gold'}
              style={{ fontSize:12, padding:'10px 20px', minHeight:44, display:'inline-flex', alignItems:'center' }}>
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 16, fontSize: 13, color: 'var(--gray-2)' }}>
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </div>

        <div className="product-grid">
          {filtered.map(p => (
            <Link to={`/products/${p.id}`} className="product-card" key={p.id} style={{ textDecoration: 'none' }}>
              <div className="product-card-img-wrap">
                <img src={p.img} alt={p.name} className="product-card-img" />
              </div>
              <div className="product-card-body">
                <h4>{p.name}</h4>
                <p>{p.material}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:8 }}>
                  <span className="product-card-tag">MOQ: {p.moq}</span>
                  <span className="product-card-tag">Lead: {p.leadTime}</span>
                </div>
                <a href={`https://wa.me/8618296876285?text=Hi, I'm interested in ${encodeURIComponent(p.name)}`}
                  target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:14, fontSize:12, color:'var(--gold)', textDecoration:'none', border:'1px solid var(--border)', padding:'6px 14px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Quote
                </a>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}