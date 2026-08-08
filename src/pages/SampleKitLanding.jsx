import { Link } from 'react-router-dom';

const structures = [
  ['Magnetic Box', 'Magnetic flip-top rigid box with gold foil logo', '/assets/images/product-magnetic.webp'],
  ['Lid & Base', 'Lift-off lid rigid box with soft-touch wrap', '/assets/images/product-lidbase.webp'],
  ['Drawer & Slide', 'Sliding drawer box with ribbon pull', '/assets/images/product-drawer.webp'],
  ['Book-Style', 'Hinged book-style box that opens like a case', '/assets/images/product-book.webp'],
  ['Folding Carton', 'Lightweight folding carton, full CMYK print', '/assets/images/product-folding.webp'],
  ['Paper Bag', 'Kraft bag with rope handle and foil logo', '/assets/images/product-bag.webp'],
];

const finishDemos = [
  'Gold & silver foil stamping', 'Embossing / debossing', 'Spot UV gloss',
  'Matte lamination', 'Soft-touch coating', 'Velvet / suede / PU linings',
];

const steps = [
  ['01', 'Tell Us Your Product', 'Send your product category (or photo) and your logo. Our designers pick the 12 most relevant structures for your industry.'],
  ['02', 'We Brand the Samples', 'Every sample box is printed with your logo in our standard gold placement — same finish quality as bulk production.'],
  ['03', 'Shipped in 5–7 Days', 'The kit ships worldwide in 5–7 days. The $29 fee is fully credited to your first bulk order — it is a deposit, not a cost.'],
];

const faq = [
  ['What is included in the kit?', '12 sample boxes covering magnetic, lid & base, drawer, book-style, folding and bag structures, plus material and finish comparison samples — all branded with your logo.'],
  ['How fast do kits ship?', 'Sample kits ship within 5–7 days worldwide.'],
  ['Can I request specific structures in the kit?', 'Yes — tell us your product category and we will tailor the kit to the most relevant structures and finishes.'],
  ['Is the kit cost refundable?', 'Yes — the full $29 fee is deducted from your first bulk order.'],
  ['Do I get design help with the kit?', 'Yes — our design team reviews the samples with you and recommends the best structure for your product, free of charge.'],
];

export default function SampleKitLanding() {
  return (
    <div className="page-scaffold" style={{ paddingTop: 120 }}>
      <div className="container">
        {/* Hero */}
        <section style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 48, alignItems: 'center', marginBottom: 72 }} className="detail-hero">
          <div>
            <div className="gold-line" />
            <span className="eyebrow">Sample &amp; Starter Kit — $29</span>
            <h1 style={{ margin: '14px 0 16px' }}>Test 12 Box Styles Before You Commit</h1>
            <p style={{ color: 'var(--gray-3)', fontSize: 15.5, lineHeight: 1.8, marginBottom: 24 }}>
              Compare magnetic, lid &amp; base, drawer, book-style, folding and bag structures in one kit —
              each sample branded with <strong style={{ color: 'var(--gold)' }}>your logo</strong> in our standard gold placement.
            </p>
            <ul style={{ listStyle: 'none', margin: '0 0 28px' }}>
              {[
                '12 material & finish samples with your logo',
                'Ships worldwide in 5–7 days',
                '$29 incl. shipping — fully credited to your first bulk order',
                'Free design consultation with the kit',
              ].map(x => (
                <li key={x} style={{ fontSize: 13.5, color: 'var(--gray-2)', padding: '6px 0', paddingLeft: 22, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>✓</span>{x}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none', fontSize: 14 }}>Order Sample Kit – $29</Link>
              <a href="https://wa.me/8618296876285?text=Hi%2C%20I%20want%20to%20order%20the%20%2429%20Sample%20Kit" target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none', fontSize: 14 }}>WhatsApp Us</a>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
              {['FSC Certified', 'AQL 2.5 QC', '7–15 Day Lead Time'].map(b => (
                <span key={b} style={{ border: '1px solid rgba(201,162,39,0.45)', color: 'var(--gold-light)', fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 12px', fontWeight: 700 }}>{b}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {structures.slice(0, 4).map(s => (
              <div key={s[0]} style={{ background: 'var(--black-2)', border: '1px solid var(--border-dim)', overflow: 'hidden' }}>
                <img src={s[2]} alt={s[0]} style={{ width: '100%', display: 'block', aspectRatio: '1/1', objectFit: 'cover' }} loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* What's inside */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">What&apos;s Inside</span>
            <h2>6 Structures × Finish Demos — Your Logo on Every Box</h2>
          </div>
          <div className="detail-strip3">
            {structures.map(([name, desc, img]) => (
              <div key={name} style={{ background: 'var(--black-2)', border: '1px solid var(--border-dim)' }}>
                <img src={img} alt={name} style={{ width: '100%', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }} loading="lazy" />
                <div style={{ padding: '16px 18px' }}>
                  <h4 style={{ fontSize: 14, marginBottom: 6 }}>{name}</h4>
                  <p style={{ fontSize: 12.5, color: 'var(--gray-3)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 24 }}>
            {finishDemos.map(f => (
              <span key={f} style={{ border: '1px solid rgba(201,162,39,0.5)', background: 'rgba(201,162,39,0.06)', color: 'var(--gray-2)', fontSize: 12.5, padding: '9px 18px' }}>{f}</span>
            ))}
          </div>
        </section>

        {/* 3-step process */}
        <section style={{ marginBottom: 72, background: 'var(--black-2)', border: '1px solid var(--border-dim)', padding: '52px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">How It Works</span>
            <h2>From Brief to Your Door in 5–7 Days</h2>
          </div>
          <div className="detail-steps">
            {steps.map(([n, t, d]) => (
              <div key={n} style={{ background: 'var(--black-3)', padding: '26px 22px' }}>
                <div style={{ fontSize: 28, color: 'var(--gold)', fontFamily: 'var(--font-display)', marginBottom: 12 }}>{n}</div>
                <h4 style={{ fontSize: 13.5, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t}</h4>
                <p style={{ color: 'var(--gray-3)', fontSize: 12.5, lineHeight: 1.75, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">Why Sample Kits</span>
            <h2>Cheaper Than a Single Competitor Sample</h2>
          </div>
          <div style={{ border: '1px solid var(--border-dim)' }}>
            {[
              ['Typical supplier structural sample', '$25–60 paid, 7+ days, unprinted', false],
              ['Typical supplier pre-production sample', 'Full cost, deducted only sometimes', false],
              ['Mili Sample & Starter Kit', '$29 incl. shipping, 5–7 days, your logo, 12 structures — fully credited to your first bulk order', true],
            ].map(([what, detail, highlight]) => (
              <div key={what} style={{
                display: 'grid', gridTemplateColumns: '1.1fr 2fr', gap: 20, padding: '16px 24px',
                background: highlight ? 'rgba(201,162,39,0.08)' : (what === 'Typical supplier structural sample' ? 'var(--black-2)' : 'var(--black-3)'),
                borderBottom: '1px solid var(--border-dim)',
              }}>
                <div style={{ fontSize: 13.5, fontWeight: highlight ? 700 : 600, color: highlight ? 'var(--gold)' : 'var(--gray-2)' }}>
                  {highlight ? '★ ' : ''}{what}
                </div>
                <div style={{ fontSize: 13, color: 'var(--gray-3)', lineHeight: 1.7 }}>{detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 760, margin: '0 auto 72px' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="gold-line gold-line-center" />
            <span className="eyebrow">FAQ</span>
            <h2>Common Questions</h2>
          </div>
          {faq.map(([q, a]) => (
            <details key={q} style={{ border: '1px solid var(--border-dim)', background: 'var(--black-2)', marginBottom: 10 }}>
              <summary style={{ padding: '16px 20px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{q}</summary>
              <p style={{ padding: '0 20px 16px', margin: 0, fontSize: 13.5, color: 'var(--gray-3)', lineHeight: 1.8 }}>{a}</p>
            </details>
          ))}
        </section>

        {/* CTA */}
        <section style={{ marginBottom: 72, padding: '48px 40px', background: 'var(--black-2)', border: '1px solid var(--gold)', textAlign: 'center' }}>
          <div style={{ fontSize: 24, color: 'var(--gold)', fontFamily: 'var(--font-display)', marginBottom: 10 }}>Try Before You Commit</div>
          <p style={{ fontSize: 14, color: 'var(--gray-3)', maxWidth: 560, margin: '0 auto 28px', lineHeight: 1.8 }}>
            $29 including worldwide shipping. The full fee is credited to your first bulk order.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none', fontSize: 15, padding: '15px 38px' }}>Order Sample Kit – $29</Link>
            <Link to="/products/sample-starter-kits" className="btn-outline-gold" style={{ textDecoration: 'none', fontSize: 15, padding: '15px 38px' }}>View Detail Page</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
