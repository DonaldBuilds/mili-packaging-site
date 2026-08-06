import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <img src="/assets/images/logo.svg" alt="mili custom packaging" style={{ height: 28 }} />
          </div>
          <p style={{ fontSize:12, marginBottom:4, color:'var(--gold)' }}>Jiangxi Mili Packaging Materials Co., Ltd.</p>
          <p>Factory-direct custom packaging manufacturer serving global brands. Free design, low MOQ 100pcs, worldwide delivery.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
            {[
              { img: '/assets/images/cert-fsc.svg', label: 'FSC Certified' },
              { img: '/assets/images/cert-iso.svg', label: 'ISO 9001' },
              { img: '/assets/images/cert-sgs.svg', label: 'SGS Audited' },
              { img: '/assets/images/cert-aql.svg', label: 'AQL 2.5 QC' },
            ].map(cert => (
              <span key={cert.label} style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:10, letterSpacing:'0.06em', color:'var(--gold)', border:'1px solid var(--border)', padding:'4px 10px' }}>
                <img src={cert.img} alt={cert.label} style={{ height: 18 }} />{cert.label}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <a href="https://wa.me/8618296876285" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, letterSpacing: '0.06em', color: 'var(--gold)', textDecoration: 'none', textTransform: 'uppercase', border: '1px solid var(--border)', padding: '6px 14px' }}>
              WhatsApp
            </a>
            <a href="mailto:info@mili-packaging.com"
              style={{ fontSize: 11, letterSpacing: '0.06em', color: 'var(--gold)', textDecoration: 'none', textTransform: 'uppercase', border: '1px solid var(--border)', padding: '6px 14px' }}>
              Email Us
            </a>
          </div>
        </div>
        <div>
          <h5>Products</h5>
          <ul>
            <li><Link to="/products">Paper Boxes</Link></li>
            <li><Link to="/products">Gift Boxes</Link></li>
            <li><Link to="/products">Magnetic Gift Boxes</Link></li>
            <li><Link to="/products">Jewelry Boxes</Link></li>
            <li><Link to="/products">Cosmetic Boxes</Link></li>
            <li><Link to="/products">Shipping Boxes</Link></li>
            <li><Link to="/products">Paper Bags</Link></li>
          </ul>
        </div>
        <div>
          <h5>Industries</h5>
          <ul>
            <li><Link to="/industries">Cosmetics & Beauty</Link></li>
            <li><Link to="/industries">Jewelry & Watches</Link></li>
            <li><Link to="/industries">Apparel & Fashion</Link></li>
            <li><Link to="/industries">Food & Beverage</Link></li>
            <li><Link to="/industries">Electronics</Link></li>
            <li><Link to="/industries">Corporate Gifts</Link></li>
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><a href="/blog/" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</a></li>
            <li><Link to="/support">Support</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <div style={{ marginTop: 24 }}>
            <h5 style={{ marginBottom: 10 }}>Contact</h5>
            <p><a href="mailto:info@mili-packaging.com">info@mili-packaging.com</a></p>
            <p style={{ marginTop: 4 }}><a href="https://wa.me/8618296876285">+86 182 9687 6285</a></p>
            <p style={{ marginTop: 4, color: 'var(--gray-2)' }}>Jiangxi, China</p>
          </div>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom">
        <div style={{ display:'flex', gap: 20 }}>
          <Link to="/warranty" style={{ color:'var(--gray-2)', textDecoration:'none' }}>Warranty</Link>
          <Link to="/shipping-policy" style={{ color:'var(--gray-2)', textDecoration:'none' }}>Shipping Policy</Link>
          <Link to="/returns-policy" style={{ color:'var(--gray-2)', textDecoration:'none' }}>Returns Policy</Link>
          <Link to="/privacy-policy" style={{ color:'var(--gray-2)', textDecoration:'none' }}>Privacy Policy</Link>
          <Link to="/support" style={{ color:'var(--gray-2)', textDecoration:'none' }}>Support</Link>
        </div>
        <span>Jiangxi Mili Packaging Materials Co., Ltd.</span>
      </div>
    </footer>
  );
}
