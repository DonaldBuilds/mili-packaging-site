import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { productGroups } from '../data/products';
import { trackEvent } from '../lib/track';

const channels = [
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>, title:'Email', info:'info@mili-packaging.com', sub:'Reply within 2 business hours', href:'mailto:info@mili-packaging.com' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l5-1.5A10 10 0 1 0 12 2z" /><path d="M8.5 9.5c0 3 2.5 6 5.5 6l1.5-2-2-1-1 .6c-.8-.4-1.6-1.2-2-2l.6-1-1-2-1.6 1z" /></svg>, title:'WhatsApp', info:'+86 182 9687 6285', sub:'Mon–Sat 09:00–18:00 (GMT+8) · If WhatsApp is unavailable, email us', href:'https://wa.me/8618296876285' },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>, title:'Factory', info:'Jiangxi, China', sub:'Visits welcome — please arrange in advance', href:null },
];

const whyUs = [
  'Free design consultation and 3D mockups',
  '2 rounds of free structural samples',
  'Factory-direct pricing, no middlemen',
  'Dedicated account manager for your project',
  'Global shipping to 50+ countries',
  'MOQ from 100 pcs, watch boxes from 50 pcs',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [renderedAt] = useState(() => Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Anti-spam checks — never block silently, so users always see feedback
    const honeypotFilled = formData.get('w3_field');
    const tooFast = Date.now() - Number(formData.get('w3_ts') || 0) < 3000;
    if (honeypotFilled || tooFast) {
      setError('Submission blocked by our anti-spam check (often caused by browser form-fill extensions). Please refresh the page, disable auto-fill add-ons, and try again — or email us directly at info@mili-packaging.com.');
      return;
    }
    setLoading(true);
    setError(null);

    const data = {
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      industry: formData.get('industry'),
      product_type: formData.get('productType'),
      quantity: formData.get('quantity'),
      message: formData.get('message'),
    };

    try {
      const { error: submitError } = await supabase
        .from('inquiries')
        .insert([data]);

      if (submitError) throw submitError;
      trackEvent('form_submit', { product_type: data.product_type, industry: data.industry, quantity: data.quantity });
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit inquiry. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div className="page-scaffold">
      <section style={{ padding:'180px 0 120px', textAlign:'center', maxWidth:560, margin:'0 auto' }}>
        <div className="gold-line gold-line-center" />
        <span className="eyebrow">Thank You</span>
        <h1 style={{ marginBottom:20 }}>Thank you! Your quote request is being processed. &#128640;</h1>
        <p style={{ color:'var(--gray-3)', fontSize:16, marginBottom:40 }}>
          Our team will review your project and respond within 24 hours. In the meantime, explore our portfolio or browse our product catalog.
        </p>
        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/portfolio" className="btn-outline-gold">View Portfolio</Link>
          <Link to="/" className="btn-gold">Back to Home</Link>
        </div>
      </section>
    </div>
  );

  return (
    <div className="page-scaffold">
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="gold-line" />
          <span className="eyebrow">Get in Touch</span>
          <h1>Start Your Project</h1>
          <p>Tell us about your packaging needs. We respond with a tailored quote within 24 hours — free design consultation and samples included.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Info col */}
            <div>
              <h3 style={{ marginBottom:8 }}>Contact Mili Packaging</h3>
              <p style={{ color:'var(--gray-3)', fontSize:14, marginBottom:40, lineHeight:1.7 }}>
                We are a factory-direct team — no middlemen. When you contact us, you speak directly with our packaging specialists.
              </p>

              {channels.map(ch => (
                <div className="contact-channel" key={ch.title}>
                  <div className="contact-channel-icon">{ch.icon}</div>
                  <div>
                    <h4>{ch.title}</h4>
                    {ch.href
                      ? <p><a href={ch.href} target="_blank" rel="noopener noreferrer" style={{ color:'var(--gold)', textDecoration:'none' }}>{ch.info}</a></p>
                      : <p style={{ color:'var(--gold)' }}>{ch.info}</p>}
                    <p>{ch.sub}</p>
                  </div>
                </div>
              ))}

              <div style={{ marginTop:40, padding:'28px', background:'var(--black-2)', border:'1px solid var(--border-dim)' }}>
                <div className="gold-line" />
                <h4 style={{ marginBottom:16, fontSize:15 }}>Why Choose Mili Packaging?</h4>
                <ul style={{ listStyle:'none' }}>
                  {whyUs.map(w => (
                    <li key={w} style={{ fontSize:13, color:'var(--gray-3)', padding:'7px 0', borderBottom:'1px solid var(--border-dim)', paddingLeft:18, position:'relative' }}>
                      <span style={{ position:'absolute', left:0, color:'var(--gold)' }}>→</span>{w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form col */}
            <form id="quote-form" onSubmit={handleSubmit} style={{ background:'var(--black-2)', border:'1px solid var(--border-dim)', padding:'44px 40px' }}>
              <h3 style={{ marginBottom:28 }}>Get a Free Quote</h3>

              {/* Honeypot anti-spam fields (hidden from humans, skipped by browser auto-fill) */}
              <input type="text" name="w3_field" tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ display:'none' }} />
              <input type="hidden" name="w3_ts" value={renderedAt} />

              {error && (
                <div style={{ color:'var(--red)', background:'rgba(255,0,0,0.1)', padding:'10px 15px', borderRadius:4, marginBottom:20, fontSize:13 }}>
                  {error}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" name="name" type="text" required placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Company *</label>
                  <input className="form-input" name="company" type="text" required placeholder="Company name" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" name="email" type="email" required placeholder="you@company.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp / Phone</label>
                  <input className="form-input" name="phone" type="tel" placeholder="+1 555 000 0000" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Industry *</label>
                <select className="form-select" name="industry" required defaultValue="">
                  <option value="" disabled>Select your industry</option>
                  {['Cosmetics & Beauty','Jewelry & Watches','Apparel & Fashion','Food & Beverage','Electronics','Corporate Gifts','Other'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Product Type</label>
                  <select className="form-select" name="productType" defaultValue="">
                    <option value="" disabled>Select product</option>
                    {[...productGroups.map(g => g.name), 'Not sure — need advice'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Estimated Quantity</label>
                  <input className="form-input" name="quantity" type="text" placeholder="e.g. 5,000 pcs" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Brief *</label>
                <textarea className="form-textarea" name="message" required placeholder="Describe your project — box dimensions, material, finish, print requirements, budget range, and delivery deadline." style={{ minHeight:130 }}></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Upload Reference (optional)</label>
                <input className="form-input" type="file" accept="image/*,.pdf,.ai,.cdr,.eps" />
                <p style={{ fontSize:11, color:'var(--gray-2)', marginTop:5 }}>Images, PDF, AI, CDR, EPS accepted</p>
              </div>

              <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:20 }}>
                <input type="checkbox" id="privacy" required style={{ accentColor:'var(--gold)', width:15, height:15 }} />
                <label htmlFor="privacy" style={{ fontSize:12, color:'var(--gray-3)' }}>I agree to the <span style={{ color:'var(--gold)' }}>Privacy Policy</span></label>
              </div>

              <button type="submit" className="btn-gold" style={{ width:'100%' }} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Inquiry →'}
              </button>
              <p style={{ fontSize:12, color:'var(--gray-2)', textAlign:'center', marginTop:12 }}>Your information is never shared with third parties.</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
