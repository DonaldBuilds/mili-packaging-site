import { Link } from 'react-router-dom';

const methods = [
  {
    title: 'T/T Bank Transfer',
    desc: 'The standard for custom manufacturing. 30% deposit to confirm the order, 70% balance before shipment against your commercial invoice.',
    tag: 'Standard',
  },
  {
    title: 'Letter of Credit (L/C)',
    desc: 'Available for orders over USD 30,000. Irrevocable L/C at sight, issued from your bank to ours.',
    tag: 'Large Orders',
  },
  {
    title: 'Alibaba Trade Assurance',
    desc: 'Recommended for first-time buyers. Funds are protected until you confirm order completion, with free trade assurance on qualifying orders.',
    tag: 'First Orders',
  },
  {
    title: 'PayPal / Credit Card',
    desc: 'Accepted for sample orders and small trial runs up to USD 3,000.',
    tag: 'Samples',
  },
];

const steps = [
  ['Quote', 'We send a formal quotation with unit price, MOQ, lead time and shipping estimate within 24 hours.'],
  ['Deposit & Artwork', '30% deposit + approved artwork. Design, 3D mockup and structural samples are free.'],
  ['Sample Approval', 'Pre-production sample with full print and finishing is shipped for approval.'],
  ['Production', 'Bulk production starts after sample sign-off — 7-15 business days with in-line QC.'],
  ['Balance & Shipment', '70% balance is paid against the commercial invoice, then goods ship via your chosen method.'],
];

export default function PaymentTerms() {
  return (
    <div className="page-scaffold">
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="gold-line" />
          <span className="eyebrow">Finance</span>
          <h1>Payment<br />Terms</h1>
          <p>Clear, bank-safe payment terms for first orders and long-term programs. No hidden fees — every charge itemized on your invoice.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="section-header" style={{ marginBottom: 40 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">Methods</span>
            <h2>Payment Methods We Accept</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, background: 'var(--border-dim)', border: '1px solid var(--border-dim)' }}>
            {methods.map(m => (
              <div key={m.title} style={{ background: 'var(--black-2)', padding: '28px 26px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <h4 style={{ fontSize: 15 }}>{m.title}</h4>
                  <span style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--gold)', fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '4px 9px' }}>{m.tag}</span>
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--gray-3)', lineHeight: 1.8, margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--black-2)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="section-header" style={{ marginBottom: 40 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">Process</span>
            <h2>How Payment Works</h2>
          </div>
          <div style={{ display: 'grid', gap: 0 }}>
            {steps.map(([t, d], i) => (
              <div key={t} style={{ display: 'flex', gap: 20, padding: '18px 0', borderBottom: '1px solid var(--border-dim)' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid var(--gold)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                <div>
                  <h4 style={{ fontSize: 14.5, marginBottom: 6 }}>{t}</h4>
                  <p style={{ fontSize: 13.5, color: 'var(--gray-3)', lineHeight: 1.8, margin: 0 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ padding: '32px 30px', background: 'var(--black-2)', border: '1px solid var(--border-dim)' }}>
            <h4 style={{ color: 'var(--gold)', marginBottom: 14 }}>Invoicing & Security</h4>
            <ul style={{ listStyle: 'none', margin: 0 }}>
              {[
                'You receive a Proforma Invoice (PI) at quote stage and a Commercial Invoice before shipment — unit price, quantity, Incoterm and shipping line by line.',
                'No hidden fees: product price, tooling, sample and freight are quoted separately and transparently.',
                'Pre-production sample fees are fully deducted from your first bulk order.',
                'Bank details are provided on official company letterhead only — verify before transferring. We never ask for payment through unverified channels.',
              ].map(t => (
                <li key={t} style={{ fontSize: 13.5, color: 'var(--gray-3)', padding: '9px 0', borderBottom: '1px solid var(--border-dim)', paddingLeft: 22, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none' }}>Request a Formal Quote &rarr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
