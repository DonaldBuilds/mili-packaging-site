import { Link } from 'react-router-dom';
import { posts } from '../data/posts';

export default function Blog() {
  return (
    <div className="page-scaffold" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: 48 }}>
          <div className="gold-line" />
          <span className="eyebrow">Journal</span>
          <h1>Packaging Knowledge & Buyers Guides</h1>
          <p style={{ color: 'var(--gray-3)', maxWidth: 620, marginTop: 12 }}>
            Practical guides on custom packaging: structures, materials, MOQ strategy, lead times and cost control — written for brand owners and procurement teams.
          </p>
        </div>
        <div className="product-grid">
          {posts.map(p => (
            <Link to={`/blog/${p.slug}`} key={p.slug} className="product-card" style={{ textDecoration: 'none' }}>
              <div className="product-card-body">
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  <span style={{ color: 'var(--gold)' }}>{p.category}</span>
                  <span style={{ color: 'var(--gray-3)' }}>·</span>
                  <span style={{ color: 'var(--gray-3)' }}>{p.date}</span>
                  <span style={{ color: 'var(--gray-3)' }}>·</span>
                  <span style={{ color: 'var(--gray-3)' }}>{p.readTime}</span>
                </div>
                <h4 style={{ fontSize: 17, lineHeight: 1.45, marginBottom: 10 }}>{p.title}</h4>
                <p style={{ color: 'var(--gray-3)', fontSize: 13, lineHeight: 1.75 }}>{p.excerpt}</p>
                <span className="product-card-tag" style={{ marginTop: 14, display: 'inline-block' }}>Read Article &rarr;</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 56, padding: '36px 28px', background: 'var(--black-2)', border: '1px solid var(--gold)', textAlign: 'center' }}>
          <div style={{ fontSize: 17, color: 'var(--gold)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>Planning a packaging project?</div>
          <p style={{ fontSize: 13.5, color: 'var(--gray-3)', marginBottom: 20 }}>Get a free design consultation and 3D mockup within 48 hours. MOQ from 100 pcs.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none' }}>Get Your Factory-Direct Quote Now &rarr;</Link>
            <a href={`https://wa.me/8618296876285?text=${encodeURIComponent("Hi, I'd like a quote for custom packaging")}`} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none' }}>Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}
