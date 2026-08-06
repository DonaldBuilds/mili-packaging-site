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
  { id: 1, name: 'Premium Magnetic Gift Box', category: 'magnetic', img: '/assets/images/mag-box-black-gold.jpg', moq: '500 pcs', leadTime: '15 Days', material: 'Rigid greyboard + art paper' },
  { id: 2, name: 'Velvet Jewelry Display Case', category: 'jewelry', img: '/assets/images/jewelry-box-black.jpg', moq: '100 pcs', leadTime: '12 Days', material: 'Rigid board + velvet lining' },
  { id: 3, name: 'Luxury Skincare Gift Set Box', category: 'cosmetic', img: '/assets/images/cosmetic-box-black.jpg', moq: '300 pcs', leadTime: '15 Days', material: 'Rigid board + specialty paper' },
  { id: 4, name: 'Rigid Drawer Slide Box', category: 'rigid', img: '/assets/images/magnetic-box-detail.jpg', moq: '500 pcs', leadTime: '15 Days', material: '2mm greyboard + coated paper' },
  { id: 5, name: 'Premium Perfume Packaging Box', category: 'cosmetic', img: '/assets/images/case-cosmetics-v2.jpg', moq: '500 pcs', leadTime: '15 Days', material: 'Rigid board + satin interior' },
  { id: 6, name: 'Watch Display Gift Box', category: 'jewelry', img: '/assets/images/case-jewelry-v2.jpg', moq: '200 pcs', leadTime: '12 Days', material: 'PU leather + velvet cushion' },
  { id: 7, name: 'Eco Kraft Shipping Mailer', category: 'shipping', img: '/assets/images/shipping-box-kraft-v2.jpg', moq: '1000 pcs', leadTime: '10 Days', material: 'FSC-certified kraft corrugated' },
  { id: 8, name: 'Branded Retail Paper Bag', category: 'bags', img: '/assets/images/gift-bag-black-v2.jpg', moq: '500 pcs', leadTime: '12 Days', material: '180g coated art paper' },
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
                  💬 WhatsApp Quote
                </a>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}