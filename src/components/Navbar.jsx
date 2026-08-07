import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/industries', label: 'Industries' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/blog', label: 'Blog', external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <img src="/assets/images/logo-full.png" alt="Mili Packaging" style={{ height: 36, width: 'auto', display: 'block', objectFit: 'contain' }} />
        </Link>
        <ul className="navbar-links">
          {links.map(({ to, label, external }) => (
            <li key={to}>
              {external ? (
                <a href="/blog/" style={{ color: pathname === '/blog' ? 'var(--gold)' : '' }}>{label}</a>
              ) : (
                <Link to={to} style={{ color: pathname === to ? 'var(--gold)' : '' }}>
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <a href="/contact" className="navbar-cta">Get a Quote</a>
        <button className="navbar-hamburger" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div style={{ background: 'var(--black-2)', padding: '20px', borderTop: '1px solid var(--border-dim)' }}>
          {links.map(({ to, label, external }) => (
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
          }}>Get a Quote</a>
        </div>
      )}
    </nav>
  );
}
