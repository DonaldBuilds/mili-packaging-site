import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { productGroups } from '../data/products';

const links = [
  { to: '/products', label: 'Products', dropdown: true },
  { to: '/industries', label: 'Industries' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/blog', label: 'Blog', external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { pathname } = useLocation();

  const groupLinkStyle = (to) => ({
    color: pathname === to ? 'var(--gold)' : 'var(--gray-3)',
    textDecoration: 'none', fontSize: 14,
  });

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <img src="/assets/images/logo-horizontal-clear.png" alt="Mili Packaging" style={{ height: 30, width: 'auto', display: 'block', objectFit: 'contain' }} />
        </Link>
        <ul className="navbar-links">
          <li key="/" style={{ position: 'relative' }}>
            <Link to="/" style={{ color: pathname === '/' ? 'var(--gold)' : '' }}>Home</Link>
          </li>
          {links.map(({ to, label, external, dropdown }) => (
            <li key={to} style={{ position: 'relative' }}
              onMouseEnter={dropdown ? () => setDrop(true) : undefined}
              onMouseLeave={dropdown ? () => setDrop(false) : undefined}>
              {external ? (
                <a href="/blog/" style={{ color: pathname === '/blog' ? 'var(--gold)' : '' }}>{label}</a>
              ) : dropdown ? (
                <Link to={to} style={{ color: pathname.startsWith('/products') ? 'var(--gold)' : '' }}>
                  {label} <span style={{ fontSize: 9, marginLeft: 2 }}>▾</span>
                </Link>
              ) : (
                <Link to={to} style={{ color: pathname === to ? 'var(--gold)' : '' }}>
                  {label}
                </Link>
              )}
              {dropdown && drop && (
                <div className="navbar-dropdown">
                  {productGroups.map(g => (
                    <Link to={`/products/${g.slug}`} key={g.slug} onClick={() => setDrop(false)}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {g.name}
                        {g.isNew && <span className="badge-new">New</span>}
                      </span>
                      <span style={{ color: 'var(--gold)', opacity: 0.5, fontSize: 13 }}>›</span>
                    </Link>
                  ))}
                  <Link to="/products" onClick={() => setDrop(false)} className="navbar-dropdown-all">
                    <span>All Products</span>
                    <span style={{ color: 'var(--gold)', fontSize: 13 }}>›</span>
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
        <a href="/contact" className="navbar-cta">GET FREE QUOTE</a>
        <button className="navbar-hamburger" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div style={{ background: 'var(--black-2)', padding: '20px', borderTop: '1px solid var(--border-dim)' }}>
          <Link to="/" onClick={() => setOpen(false)} style={{ ...groupLinkStyle('/'), display: 'flex', alignItems: 'center', minHeight: 44, padding: '10px 0', borderBottom: '1px solid var(--border-dim)' }}>Home</Link>
          <button onClick={() => setProductsOpen(!productsOpen)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', minHeight: 44, padding: '10px 0',
            background: 'none', border: 'none', borderBottom: '1px solid var(--border-dim)',
            color: pathname.startsWith('/products') ? 'var(--gold)' : 'var(--gray-3)',
            textDecoration: 'none', fontSize: 14, cursor: 'pointer', textAlign: 'left',
          }}>
            Products <span style={{ fontSize: 10 }}>{productsOpen ? '▲' : '▼'}</span>
          </button>
          {productsOpen && (
            <div style={{ paddingLeft: 16, marginBottom: 4 }}>
              {productGroups.map(g => (
                <Link key={g.slug} to={`/products/${g.slug}`} onClick={() => setOpen(false)}
                  style={{ ...groupLinkStyle(`/products/${g.slug}`), display: 'flex', alignItems: 'center', gap: 8, minHeight: 40, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
                  {g.name}
                  {g.isNew && <span className="badge-new">New</span>}
                </Link>
              ))}
            </div>
          )}
          {links.filter(l => !l.dropdown).map(({ to, label, external }) => (
            external ? (
              <a key={to} href="/blog/" onClick={() => setOpen(false)} style={{
                display: 'flex', alignItems: 'center', minHeight: 44, padding: '10px 0',
                color: 'var(--gray-3)', textDecoration: 'none', fontSize: 14,
                borderBottom: '1px solid var(--border-dim)',
              }}>{label}</a>
            ) : (
              <Link key={to} to={to} onClick={() => setOpen(false)} style={{
                display: 'flex', alignItems: 'center', minHeight: 44, padding: '10px 0',
                color: pathname === to ? 'var(--gold)' : 'var(--gray-3)',
                textDecoration: 'none', fontSize: 14,
                borderBottom: '1px solid var(--border-dim)',
              }}>{label}</Link>
            )
          ))}
          <a href="/contact" onClick={() => setOpen(false)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 16, minHeight: 44,
            background: 'var(--gold)', color: 'var(--black)',
            padding: '12px 20px', textAlign: 'center',
            textDecoration: 'none', fontSize: 13, letterSpacing: '0.06em',
          }}>GET FREE QUOTE</a>
        </div>
      )}
    </nav>
  );
}
