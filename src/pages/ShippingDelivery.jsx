import { Link } from 'react-router-dom';

const shipping = [
  {
    title: 'Express Courier',
    carrier: 'DHL / UPS / FedEx',
    desc: 'Best for samples and urgent small orders. Door-to-door delivery in 3-7 business days to most countries.',
    time: '3-7 Days',
    use: 'Samples, urgent orders',
  },
  {
    title: 'Air Freight',
    carrier: 'By air (CIF / FOB)',
    desc: 'Cost-effective for medium volumes that need speed. 5-10 business days to major airports worldwide.',
    time: '5-10 Days',
    use: 'Medium orders, restocks',
  },
  {
    title: 'Sea Freight',
    carrier: 'FCL / LCL container',
    desc: 'The most economical option for bulk orders. 20-35 days depending on destination port. Flat-packed cartons maximize container utilization.',
    time: '20-35 Days',
    use: 'Bulk production orders',
  },
];

const terms = [
  ['EXW', 'Ex Works — buyer arranges pickup and freight from our factory.'],
  ['FOB', 'Free On Board — we deliver to the departure port and cover local export formalities.'],
  ['CIF', 'Cost, Insurance & Freight — we cover freight and insurance to the destination port.'],
  ['DDP', 'Delivered Duty Paid — we handle freight, insurance, import duties and delivery to your door.'],
];

export default function ShippingDelivery() {
  return (
    <div className="page-scaffold">
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="gold-line" />
          <span className="eyebrow">Logistics</span>
          <h1>Shipping &<br />Delivery</h1>
          <p>Three shipping options, clear timelines and flexible trade terms — so you always know how and when your packaging arrives.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="section-header" style={{ marginBottom: 40 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">Options</span>
            <h2>Shipping Methods & Timelines</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: 'var(--border-dim)', border: '1px solid var(--border-dim)' }}>
            {shipping.map(s => (
              <div key={s.title} style={{ background: 'var(--black-2)', padding: '28px 24px' }}>
                <h4 style={{ fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>{s.title}</h4>
                <div style={{ fontSize: 12, color: 'var(--gray-3)', marginBottom: 12 }}>{s.carrier}</div>
                <p style={{ fontSize: 13, color: 'var(--gray-3)', lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                <div style={{ marginTop: 16, fontSize: 12 }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{s.time}</span>
                  <span style={{ color: 'var(--gray-3)' }}> · {s.use}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--black-2)' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="section-header" style={{ marginBottom: 40 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">Trade Terms</span>
            <h2>Incoterms We Support</h2>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {terms.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', border: '1px solid var(--border-dim)', padding: '18px 22px', background: 'var(--black-3)' }}>
                <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 15, minWidth: 52 }}>{k}</span>
                <span style={{ fontSize: 14, color: 'var(--gray-3)', lineHeight: 1.7 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="section-header" style={{ marginBottom: 40 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">Timeline</span>
            <h2>Production & Delivery Timeline</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, background: 'var(--border-dim)', border: '1px solid var(--border-dim)' }}>
            {[['Design & 3D Mockup', '2-3 Days', 'Free, delivered after your brief'], ['Structural Samples', '3-5 Days', '2 rounds of free white samples'], ['Bulk Production', '7-15 Days', 'After pre-production sample approval'], ['Delivery', '3-35 Days', 'Express / air / sea per your choice']].map(([t, d, s]) => (
              <div key={t} style={{ background: 'var(--black-2)', padding: '24px 20px' }}>
                <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-2)', marginBottom: 8 }}>{t}</div>
                <div style={{ fontSize: 20, color: 'var(--gold)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>{d}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-3)', lineHeight: 1.6 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ padding: '32px 30px', background: 'var(--black-2)', border: '1px solid var(--border-dim)' }}>
            <h4 style={{ color: 'var(--gold)', marginBottom: 14 }}>Good to Know</h4>
            <ul style={{ listStyle: 'none', margin: 0 }}>
              {[
                'All boxes ship flat-packed in export-grade corrugated master cartons with moisture-proof wrapping for ocean freight.',
                'We can ship directly to Amazon FBA warehouses (US, UK, EU) with correct labeling.',
                'Import duties and local taxes are the buyer\u2019s responsibility unless DDP is agreed.',
                'Freight is quoted separately from product pricing — we provide landed-cost estimates before you confirm.',
              ].map(t => (
                <li key={t} style={{ fontSize: 13.5, color: 'var(--gray-3)', padding: '9px 0', borderBottom: '1px solid var(--border-dim)', paddingLeft: 22, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none' }}>Get a Shipping Quote Now &rarr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
