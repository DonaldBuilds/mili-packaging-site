import { Link } from 'react-router-dom';

export default function ReturnsPolicy() {
  return (
    <div className="page-scaffold">
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="gold-line" />
          <span className="eyebrow">Returns Policy</span>
          <h1>Returns & Refunds</h1>
          <p>Clear, fair, and straightforward. Our returns policy protects you while setting clear expectations for custom-manufactured products.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>

          {/* Custom Products Note */}
          <div style={{ marginBottom: 64, padding:'36px', background:'var(--black-2)', border:'1px solid var(--border)', borderLeft:'4px solid var(--gold)' }}>
            <span className="eyebrow">Important</span>
            <h3 style={{ marginBottom:12 }}>Custom-Manufactured Products</h3>
            <p style={{ color:'var(--gray-3)', fontSize:15, lineHeight:1.9 }}>
              All Mili Packaging products are custom-manufactured to your specifications — dimensions, materials, print design,
              and finishes. Because these products are made specifically for your brand and cannot be resold, returns are only
              accepted when the product does not meet the <strong style={{ color:'var(--white)' }}>agreed and approved specifications</strong>. This is
              industry standard for custom packaging manufacturing.
            </p>
          </div>

          {/* When Returns Are Accepted */}
          <div style={{ marginBottom: 64 }}>
            <div className="gold-line" />
            <h2 style={{ marginBottom: 24 }}>When Returns Are Accepted</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 2 }}>
              {[
                ['Dimensional Errors','Box dimensions deviate from the approved dieline beyond the ±1–2mm tolerance.'],
                ['Print Quality Issues','Significant color deviation from the approved sample. Smudging, misregistration, missing elements.'],
                ['Material Mismatch','Material type, thickness, or certification does not match the order specification.'],
                ['Structural Defects','Boxes do not assemble correctly. Magnetic closures fail. Seams delaminate or separate.'],
                ['Quantity Shortfall','Shipped quantity is more than 3% below the ordered quantity after the standard allowance.'],
                ['Shipping Damage','Boxes arrived physically damaged due to inadequate packaging by our team (carrier damage is claimed separately).'],
              ].map(([t,d]) => (
                <div key={t} style={{ background:'var(--black-2)', border:'1px solid var(--border-dim)', padding:'28px 24px' }}>
                  <h4 style={{ fontSize:15, marginBottom:8, color:'var(--gold)' }}>✓ {t}</h4>
                  <p style={{ color:'var(--gray-3)', fontSize:13, lineHeight:1.7 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* When Not Accepted */}
          <div style={{ marginBottom: 64 }}>
            <div className="gold-line" />
            <h2 style={{ marginBottom: 24 }}>When Returns Are Not Accepted</h2>
            <p style={{ color:'var(--gray-3)', fontSize:15, lineHeight:1.9, marginBottom: 24 }}>
              The following scenarios do not qualify for return or refund, as they are inherent to the custom packaging manufacturing process:
            </p>
            <div style={{ display:'grid', gap: 8 }}>
              {[
                'Change of mind — you ordered but no longer need the boxes',
                'Design change — you want a different print design than what was approved',
                'Color variations within industry-standard tolerance (Delta E ≤ 3)',
                'Slight size variations within the ±1–2mm industry tolerance',
                'Issues visible on the pre-production sample that were approved',
                'Carrier damage — covered by shipping insurance, not product return',
                'Returns requested more than 30 days after delivery',
              ].map(item => (
                <div key={item} style={{ fontSize:14, color:'var(--gray-3)', lineHeight:1.7, padding:'14px 20px', background:'var(--black-2)', border:'1px solid var(--border-dim)', display:'flex', gap:10, alignItems:'flex-start' }}>
                  <span style={{ color:'var(--gray-2)', flexShrink:0 }}>—</span>{item}
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div style={{ marginBottom: 64 }}>
            <div className="gold-line" />
            <h2 style={{ marginBottom: 24 }}>Return Process</h2>
            <div style={{ display:'grid', gap: 2 }}>
              {[
                ['1','Contact Us Within 30 Days','Email info@mili-packaging.com with your order number, photos or videos showing the issue, and a description. Most claims are resolved without requiring a physical return.'],
                ['2','QC Review','Our team assesses your claim within 48 hours. We may request additional evidence, a video call, or a sample return for inspection.'],
                ['3','Resolution','If the claim is verified, we offer: (a) replacement production at no cost, (b) a credit note toward your next order, or (c) a proportional refund. Resolution type is mutually agreed based on the situation.'],
                ['4','Return Shipping','If a physical return is necessary, we provide a prepaid return label or arrange carrier pickup. Do not return items without prior authorization.'],
              ].map(([num, title, desc]) => (
                <div key={num} style={{ background:'var(--black-2)', border:'1px solid var(--border-dim)', padding:'28px 32px', display:'flex', gap:20, alignItems:'flex-start' }}>
                  <div style={{ fontFamily:'Georgia,serif', fontSize:32, color:'var(--gold)', opacity:0.3, lineHeight:1, flexShrink:0, minWidth:36 }}>{num}</div>
                  <div>
                    <h4 style={{ fontSize:16, marginBottom:4 }}>{title}</h4>
                    <p style={{ color:'var(--gray-3)', fontSize:14, lineHeight:1.7 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refunds */}
          <div style={{ marginBottom: 64 }}>
            <div className="gold-line" />
            <h2 style={{ marginBottom: 24 }}>Refund Terms</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 2 }}>
              {[
                ['Refund Method','Refunds are processed via the original payment method: T/T bank transfer for wire payments, Trade Assurance refund for Alibaba orders.'],
                ['Processing Time','Refunds are processed within 5–10 business days after the claim is verified and the resolution is mutually agreed.'],
                ['Partial Refunds','For issues affecting only a portion of the order, we provide proportional credit or refund for the affected quantity only.'],
                ['Credit Notes','Credit notes are valid for 12 months from the issue date and can be applied to any future order. No expiration on reorder usage.'],
              ].map(([t,d]) => (
                <div key={t} style={{ background:'var(--black-2)', border:'1px solid var(--border-dim)', padding:'28px 24px' }}>
                  <h4 style={{ fontSize:15, marginBottom:8 }}>{t}</h4>
                  <p style={{ color:'var(--gray-3)', fontSize:13, lineHeight:1.7 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention */}
          <div style={{ marginBottom: 64 }}>
            <div className="gold-line" />
            <h2 style={{ marginBottom: 24 }}>How We Prevent Returns</h2>
            <p style={{ color:'var(--gray-3)', fontSize:15, lineHeight:1.9, marginBottom:24 }}>
              The best return is the one that never happens. We invest heavily in prevention:
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 2 }}>
              {[
                ['Pre-Production Sample','Always. Every order. You approve a full-print sample that becomes the gold standard for the production run. We do not proceed without your written approval.'],
                ['3-Stage QC','Material incoming check. In-process inspection at each station. Final AQL 2.5 random sampling. Three opportunities to catch issues before they reach you.'],
                ['Digital Color Proof','Before printing, you receive a digital color proof showing exact print placement and colors. This is your chance to catch layout or color issues before production.'],
              ].map(([t,d]) => (
                <div key={t} style={{ background:'var(--black-2)', border:'1px solid var(--border-dim)', padding:'28px 24px' }}>
                  <h4 style={{ fontSize:15, marginBottom:8 }}>{t}</h4>
                  <p style={{ color:'var(--gray-3)', fontSize:13, lineHeight:1.7 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding:'36px', background:'var(--black-2)', border:'1px solid var(--border)', textAlign:'center' }}>
            <span className="eyebrow">Need to Start a Return?</span>
            <h3 style={{ marginBottom:12 }}>Contact Our Returns Team</h3>
            <p style={{ color:'var(--gray-3)', marginBottom:28, fontSize:15 }}>Email info@mili-packaging.com with your order number and photos. We respond within 48 hours.</p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
              <a href="mailto:info@mili-packaging.com" className="btn-gold">Email Returns</a>
              <Link to="/warranty" className="btn-outline-gold">View Warranty</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
