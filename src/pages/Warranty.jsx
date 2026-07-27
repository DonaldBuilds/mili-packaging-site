import { Link } from 'react-router-dom';

export default function Warranty() {
  return (
    <div className="page-scaffold">
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="gold-line" />
          <span className="eyebrow">Warranty</span>
          <h1>Quality Guarantee</h1>
          <p>We stand behind every box we manufacture. Our warranty ensures your packaging meets the agreed specifications — every time.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          {/* Coverage */}
          <div style={{ marginBottom: 64 }}>
            <div className="gold-line" />
            <h2 style={{ marginBottom: 24 }}>What Our Warranty Covers</h2>
            <p style={{ color:'var(--gray-3)', fontSize:15, lineHeight:1.9, marginBottom: 24 }}>
              Mili Packaging warrants that all custom packaging products will conform to the agreed specifications
              — including dimensions, material, print quality, surface finish, and structural integrity — at the
              time of delivery. This warranty is valid for a period of <strong style={{ color:'var(--white)' }}>30 days</strong> from the date you receive your shipment.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 2 }}>
              {[
                ['Dimensional Accuracy','±1mm tolerance for boxes under 200mm; ±2mm for boxes over 200mm. Verified against your approved dieline.'],
                ['Material Compliance','Material matches the specified grade, thickness, and certification (e.g. FSC, food-grade).'],
                ['Print Quality','Color accuracy within industry-standard Delta E tolerance. No smudging, misregistration, or ghosting.'],
                ['Structural Integrity','Box assembles correctly. Magnetic closures function. No delamination or seam separation.'],
                ['Surface Finish','Consistent lamination, foil stamping, embossing, or coating across the full production run.'],
                ['Quantity Accuracy','Shipped quantity matches the order within the standard ±3% over/under allowance.'],
              ].map(([t,d]) => (
                <div key={t} style={{ background:'var(--black-2)', border:'1px solid var(--border-dim)', padding:'28px 24px' }}>
                  <h4 style={{ fontSize:15, marginBottom:8 }}>{t}</h4>
                  <p style={{ color:'var(--gray-3)', fontSize:13, lineHeight:1.7 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Claims */}
          <div style={{ marginBottom: 64 }}>
            <div className="gold-line" />
            <h2 style={{ marginBottom: 24 }}>How to Make a Warranty Claim</h2>
            <div style={{ display:'grid', gap: 2 }}>
              {[
                ['Step 1','Document the Issue','Within 30 days of delivery, email us at 18296876285@163.com with: photos/videos of the issue, affected quantity, your order number, and a brief description.'],
                ['Step 2','Our Review','Our QC team reviews your claim within 48 hours. We may request additional photos, a sample return, or a video call to inspect the issue together.'],
                ['Step 3','Resolution','If the claim is verified, we will offer one of the following: replacement production at no cost, credit note for your next order, or a partial refund proportional to the affected quantity.'],
              ].map(([step, title, desc]) => (
                <div key={step} style={{ background:'var(--black-2)', border:'1px solid var(--border-dim)', padding:'28px 32px', display:'flex', gap: 20, alignItems:'flex-start' }}>
                  <div style={{ fontFamily:'Georgia,serif', fontSize:28, color:'var(--gold)', opacity:0.35, lineHeight:1, flexShrink:0, minWidth:36 }}>{step}</div>
                  <div>
                    <h4 style={{ fontSize:16, marginBottom:4 }}>{title}</h4>
                    <p style={{ color:'var(--gray-3)', fontSize:14, lineHeight:1.7 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusions */}
          <div style={{ marginBottom: 64 }}>
            <div className="gold-line" />
            <h2 style={{ marginBottom: 24 }}>What Is Not Covered</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 8 }}>
              {[
                'Damage caused during shipping by the carrier (covered by shipping insurance)',
                'Issues resulting from incorrect assembly or handling by the recipient',
                'Color variations approved during the pre-production sample stage',
                'Normal material variations within industry standards for paper products',
                'Claims made after the 30-day warranty period',
                'Issues with customer-supplied artwork or design files',
              ].map(item => (
                <div key={item} style={{ fontSize:14, color:'var(--gray-3)', lineHeight:1.7, padding:'14px 20px', background:'var(--black-2)', border:'1px solid var(--border-dim)', display:'flex', gap: 10, alignItems:'flex-start' }}>
                  <span style={{ color:'var(--gold)', flexShrink:0 }}>—</span>{item}
                </div>
              ))}
            </div>
          </div>

          {/* QC */}
          <div style={{ marginBottom: 64 }}>
            <div className="gold-line" />
            <h2 style={{ marginBottom: 24 }}>Our Quality Commitment</h2>
            <p style={{ color:'var(--gray-3)', fontSize:15, lineHeight:1.9, marginBottom: 24 }}>
              We follow AQL 2.5 (Acceptable Quality Level) inspection standards throughout production. Every order undergoes
              three checkpoints: incoming material inspection, in-process QC at each workstation, and final random sampling
              before shipment. Our factory holds ISO 9001 quality management certification.
            </p>
            <p style={{ color:'var(--gray-3)', fontSize:15, lineHeight:1.9 }}>
              We encourage all clients to approve a pre-production sample before bulk production begins. The approved
              sample serves as the reference standard for the entire production run — ensuring what you approved is exactly
              what you receive.
            </p>
          </div>

          <div style={{ padding:'36px', background:'var(--black-2)', border:'1px solid var(--border)', textAlign:'center' }}>
            <span className="eyebrow">Need Help With a Claim?</span>
            <h3 style={{ marginBottom:12 }}>Contact Our QC Team</h3>
            <p style={{ color:'var(--gray-3)', marginBottom:28, fontSize:15 }}>Email us at 18296876285@163.com with your order number and photos of the issue.</p>
            <Link to="/contact" className="btn-gold">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
