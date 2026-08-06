import { useParams, Link } from 'react-router-dom';

const productData = {
  '1': { name: 'Premium Magnetic Gift Box', category: 'Magnetic Boxes', img: '/assets/images/mag-box-black-gold.jpg', moq: '500 pcs', leadTime: '15 Days', material: 'Rigid greyboard + 157g art paper wrap', size: 'Custom — any dimension', finishes: ['Gold / Silver Foil Stamping','Matte Lamination','Spot UV','Embossing','Magnetic Closure','Ribbon Pull'] },
  '2': { name: 'Velvet Jewelry Display Case', category: 'Jewelry Boxes', img: '/assets/images/jewelry-box-black.jpg', moq: '100 pcs', leadTime: '12 Days', material: 'Rigid board + black velvet lining', size: 'Custom — any dimension', finishes: ['Gold Foil Logo','Debossing','Soft-Touch Finish','Satin Ribbon','Magnetic Flap','Custom Foam Insert'] },
  '3': { name: 'Luxury Skincare Gift Set Box', category: 'Cosmetic Boxes', img: '/assets/images/cosmetic-box-black.jpg', moq: '300 pcs', leadTime: '15 Days', material: 'Rigid board + specialty art paper', size: 'Custom — any dimension', finishes: ['Hot Foil Stamping','Spot UV Gloss','Matt Lamination','Magnetic Flip-Top','Custom EVA Insert','Window Cut-Out'] },
  '4': { name: 'Rigid Drawer Slide Box', category: 'Rigid Boxes', img: '/assets/images/magnetic-box-detail.jpg', moq: '500 pcs', leadTime: '15 Days', material: '2mm greyboard + coated paper', size: 'Custom — any dimension', finishes: ['Gold Foil','Matt Lamination','Ribbon Pull','Custom Insert','Magnetic Closure'] },
  '5': { name: 'Premium Perfume Packaging Box', category: 'Cosmetic Boxes', img: '/assets/images/case-cosmetics-v2.jpg', moq: '500 pcs', leadTime: '15 Days', material: 'Rigid board + satin interior', size: 'Custom — any dimension', finishes: ['Hot Stamping','Satin Lining','Spot UV','Custom Die-Cut','Metallic Foil'] },
  '6': { name: 'Watch Display Gift Box', category: 'Jewelry Boxes', img: '/assets/images/case-jewelry-v2.jpg', moq: '200 pcs', leadTime: '12 Days', material: 'PU leather + velvet cushion', size: 'Custom — any dimension', finishes: ['Gold / Silver Embossing','Suede Interior','Magnetic Snap','Custom Watch Holder','Debossed Logo'] },
  '7': { name: 'Eco Kraft Shipping Mailer', category: 'Shipping Boxes', img: '/assets/images/shipping-box-kraft-v2.jpg', moq: '1000 pcs', leadTime: '10 Days', material: 'FSC-certified kraft corrugated', size: 'Custom — any dimension', finishes: ['Flexo Printing','Die-Cut Window','Tear Strip','Custom Tape','Biodegradable'] },
  '8': { name: 'Branded Retail Paper Bag', category: 'Paper Bags', img: '/assets/images/gift-bag-black-v2.jpg', moq: '500 pcs', leadTime: '12 Days', material: '180g coated art paper', size: 'Custom — any dimension', finishes: ['Foil Stamping','Matt Lamination','Cotton Rope Handle','Spot UV','Embossing'] },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = productData[id];

  if (!product) {
    return (
      <div className="page-scaffold" style={{ paddingTop: 140, textAlign: 'center' }}>
        <div className="container">
          <h1>Product Not Found</h1>
          <Link to="/products" className="btn-gold" style={{ marginTop: 24, textDecoration: 'none' }}>Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-scaffold" style={{ paddingTop: 120 }}>
      <div className="container">
        <nav style={{ marginBottom: 40, fontSize: 13, color: 'var(--gray-3)' }}>
          <Link to="/" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Home</Link> <span style={{ margin: '0 8px' }}>/</span>
          <Link to="/products" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Products</Link> <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--gold)' }}>{product.name}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: 64, marginBottom: 80 }}>
          <div style={{ position: 'relative', background: 'var(--black-2)', border: '1px solid var(--border-dim)' }}>
            <img src={product.img} alt={product.name} style={{ width: '100%', display: 'block' }} />
          </div>
          <div>
            <div className="hero-badges" style={{ marginBottom: 16 }}>
              <span className="hero-badge">MOQ: {product.moq}</span>
              <span className="hero-badge">Lead Time: {product.leadTime}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px, 3vw, 42px)', marginBottom: 12, fontFamily: 'var(--font-display)' }}>{product.name}</h1>
            <p style={{ color: 'var(--gray-3)', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
              Factory-direct custom packaging manufactured to your exact specifications. Free design consultation, 3D mockups, and structural samples included. AQL 2.5 QC throughout production.
            </p>

            <div style={{ marginBottom: 32 }}>
              <div className="gold-line" style={{ marginBottom: 12 }} />
              <h4 style={{ marginBottom: 16, fontSize: 15 }}>Specifications</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
                {[
                  ['Material', product.material],
                  ['Size', product.size],
                  ['MOQ', product.moq],
                  ['Lead Time', product.leadTime],
                  ['Category', product.category],
                  ['Design', 'Free — 3D mockup within 48h'],
                ].map(([k, v]) => (
                  <div key={k} style={{ borderBottom: '1px solid var(--border-dim)', paddingBottom: 10 }}>
                    <span style={{ fontSize: 11, color: 'var(--gray-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k}</span>
                    <span style={{ display: 'block', fontSize: 14, color: 'var(--white)', marginTop: 4 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <h4 style={{ marginBottom: 12, fontSize: 15 }}>Available Finishes</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {product.finishes.map(f => (
                  <span key={f} style={{ fontSize: 12, color: 'var(--gold)', border: '1px solid var(--border)', padding: '5px 12px' }}>{f}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-gold" style={{ textDecoration: 'none' }}>Enquire Now</a>
              <a href={`https://wa.me/8618296876285?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none' }}>💬 WhatsApp</a>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 60 }}>
          <div className="gold-line" />
          <span className="eyebrow" style={{ marginBottom: 32 }}>Related Products</span>
          <div className="product-grid">
            {Object.entries(productData).filter(([pid]) => pid !== id).slice(0, 4).map(([pid, p]) => (
              <Link to={`/products/${pid}`} className="product-card" key={pid} style={{ textDecoration: 'none' }}>
                <div className="product-card-img-wrap">
                  <img src={p.img} alt={p.name} className="product-card-img" />
                </div>
                <div className="product-card-body">
                  <h4>{p.name}</h4>
                  <p>{p.category}</p>
                  <span className="product-card-tag">MOQ: {p.moq}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
