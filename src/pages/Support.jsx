import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Design Support',
    icon: '✎',
    desc: 'We offer free professional structural design and graphic layout for all custom orders. Our design team creates 3D mockups within 48 hours of receiving your brief, and we revise until you are fully satisfied — at no extra cost.',
    items: [
      'Free structural design & 3D mockups',
      'Free graphic layout & print preparation',
      '2 rounds of free structural samples',
      'Pre-production samples with full print at cost (deducted from bulk order)',
      'AI, PSD, PDF, CDR, EPS file formats accepted',
      'Design revision support until you approve',
    ],
  },
  {
    title: 'Dedicated Account Manager',
    icon: '☎',
    desc: 'Every client is assigned a dedicated account manager who serves as your single point of contact from inquiry through delivery. No call-center routing, no ticket queues — direct communication with someone who knows your project.',
    items: [
      'Single point of contact throughout your project',
      'Real-time updates on design, sampling, and production status',
      'English-fluent team — no translation delays',
      'Available via email, WhatsApp, and phone during business hours',
      'Factory visits arranged and hosted personally by your manager',
      'Post-delivery follow-up and reorder support',
    ],
  },
  {
    title: 'Technical Consultation',
    icon: '⚙',
    desc: 'Not sure which material, finish, or structure is right for your product? Our packaging engineers provide free technical consultation — recommending the optimal solution based on your product type, target market, and budget.',
    items: [
      'Material recommendation based on product weight & use case',
      'Structural engineering advice for protection & presentation',
      'Surface finish selection for your brand aesthetic',
      'Print method comparison (offset vs. digital vs. flexo)',
      'Cost optimization strategies for your budget',
      'Sustainability consulting for eco-friendly options',
    ],
  },
  {
    title: 'After-Sales Support',
    icon: '✓',
    desc: 'Our relationship does not end when your order ships. We provide ongoing after-sales support including quality issue resolution, reorder management, and design iteration for your next production run.',
    items: [
      'Quality issue investigation & resolution within 48 hours',
      'Reorder management with stored dielines & print files',
      'Design iteration support for seasonal refreshes',
      'Expedited production for urgent repeat orders',
      'Credit note processing for verified quality issues',
      'Long-term partnership programs for regular clients',
    ],
  },
];

export default function Support() {
  return (
    <div className="page-scaffold">
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="gold-line" />
          <span className="eyebrow">Support</span>
          <h1>We Are Here to Help</h1>
          <p>From design consultation to after-sales — Mili Packaging is your partner at every step of the packaging journey.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <img src="/assets/images/support-design.jpg" alt="Mili Packaging design support" style={{ width:'100%', aspectRatio:'16/6', objectFit:'cover', marginBottom:64 }} />

          {sections.map((sec, i) => (
            <div key={sec.title} style={{ marginBottom: i < sections.length - 1 ? 64 : 0 }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap: 16, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>{sec.icon}</span>
                <h2 style={{ fontSize:'clamp(20px,2.5vw,32px)' }}>{sec.title}</h2>
              </div>
              <p style={{ color:'var(--gray-3)', fontSize:15, lineHeight:1.8, marginBottom: 24 }}>{sec.desc}</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 8 }}>
                {sec.items.map(item => (
                  <div key={item} style={{ background:'var(--black-2)', border:'1px solid var(--border-dim)', padding:'16px 20px', fontSize:13, color:'var(--gray-3)', display:'flex', alignItems:'flex-start', gap: 10 }}>
                    <span style={{ color:'var(--gold)', flexShrink:0 }}>✓</span>{item}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 72, padding:'40px', background:'var(--black-2)', border:'1px solid var(--border)', textAlign:'center' }}>
            <span className="eyebrow">Contact Support</span>
            <h3 style={{ marginBottom:12 }}>Need Immediate Assistance?</h3>
            <p style={{ color:'var(--gray-3)', marginBottom:28, fontSize:15 }}>Reach us directly — we respond within 2 hours during business hours.</p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
              <a href="https://wa.me/8618296876285" target="_blank" rel="noopener noreferrer" className="btn-gold">WhatsApp Support</a>
              <a href="mailto:18296876285@163.com" className="btn-outline-gold">Email Support</a>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="gold-line gold-line-center" />
        <h2>Ready to Start Your Project?</h2>
        <p>Tell us what you need — we respond with a tailored quote within 24 hours.</p>
        <div className="cta-band-actions">
          <Link to="/contact" className="btn-gold">Get a Quote</Link>
          <Link to="/faq" className="btn-outline-gold">View FAQ</Link>
        </div>
      </section>
    </div>
  );
}
