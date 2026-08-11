import { Link } from 'react-router-dom';

const methods = [
  ['Sea Freight','FCL / LCL','25–35 days','Most cost-effective for bulk orders. Full container load (FCL) or less than container load (LCL). Door-to-port and door-to-door available.'],
  ['Air Freight','Consolidated','5–10 days','Faster than sea. Best for medium-weight orders on tight timelines. Airport-to-airport or door-to-door options.'],
  ['Express Courier','DHL / UPS / FedEx','3–7 days','Fastest method. For samples, urgent orders, or small-batch shipments. Real-time tracking.'],
  ['Rail Freight','China-Europe Railway','15–20 days','Cost-speed balance for European destinations. Ideal for Central and Eastern European clients.'],
];

const terms = [
  ['FOB (Free On Board)', 'Jiangxi / Shenzhen / Shanghai','We handle production and deliver goods to the port. You arrange and pay for ocean/air freight and insurance from the port onwards. Most common for experienced importers.'],
  ['CIF (Cost, Insurance & Freight)', 'Your destination port','We arrange and pay for freight and insurance to your destination port. You handle customs clearance and inland delivery. Good for clients who want shipping managed but handle customs locally.'],
  ['DDP (Delivered Duty Paid)', 'Your address','All-inclusive door-to-door delivery. We handle everything — production, freight, customs, duties, and final delivery to your door. The most convenient option. Available for most countries.'],
  ['EXW (Ex-Works)', 'Our factory in Jiangxi','You arrange and pay for all logistics from our factory gate. Lowest product price, but you manage the entire shipping process. For clients with established logistics partners.'],
];

export default function ShippingPolicy() {
  return (
    <div className="page-scaffold">
      <div className="page-hero" style={{ position:'relative', overflow:'hidden', padding:'80px 0 200px' }}>
        <img src="/assets/images/shipping-warehouse.webp" alt="Shipping" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.25 }} />
        <div className="page-hero-inner" style={{ position:'relative', zIndex:1 }}>
          <div className="gold-line" />
          <span className="eyebrow">Shipping Policy</span>
          <h1>Global Shipping &<br />Delivery</h1>
          <p>Reliable logistics to 50+ countries. Multiple shipping methods and terms to fit your timeline and budget.</p>
        </div>
      </div>

      <section className="section" style={{ marginTop:-120, position:'relative', zIndex:1 }}>
        <div className="container" style={{ maxWidth: 860 }}>

          {/* Shipping Methods */}
          <div style={{ marginBottom: 64 }}>
            <div className="gold-line" />
            <h2 style={{ marginBottom: 24 }}>Shipping Methods</h2>
            <div style={{ display:'grid', gap: 2 }}>
              {methods.map(([type, mode, time, desc]) => (
                <div key={type} style={{ background:'var(--black-2)', border:'1px solid var(--border-dim)', padding:'28px 32px', display:'grid', gridTemplateColumns:'1fr 1fr 2fr', gap: 20, alignItems:'center' }}>
                  <div>
                    <h4 style={{ fontSize:16 }}>{type}</h4>
                    <p style={{ color:'var(--gray-3)', fontSize:12, marginTop:4 }}>{mode}</p>
                  </div>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:'Georgia,serif', fontSize:28, color:'var(--gold)', lineHeight:1 }}>{time}</div>
                    <div style={{ fontSize:11, color:'var(--gray-3)', marginTop:4 }}>transit</div>
                  </div>
                  <p style={{ color:'var(--gray-3)', fontSize:13, lineHeight:1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Terms */}
          <div style={{ marginBottom: 64 }}>
            <div className="gold-line" />
            <h2 style={{ marginBottom: 24 }}>Incoterms We Support</h2>
            <div style={{ display:'grid', gap: 2 }}>
              {terms.map(([term, location, desc]) => (
                <div key={term} style={{ background:'var(--black-2)', border:'1px solid var(--border-dim)', padding:'28px 32px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: 12 }}>
                    <h4 style={{ fontSize:16 }}>{term}</h4>
                    <span style={{ fontSize:11, letterSpacing:'0.05em', textTransform:'uppercase', color:'var(--gold)', border:'1px solid var(--border)', padding:'3px 10px' }}>{location}</span>
                  </div>
                  <p style={{ color:'var(--gray-3)', fontSize:14, lineHeight:1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 2, marginBottom: 64 }}>
            {[
              ['Packaging for Transit','All boxes are flat-packed (folded) to minimize volume unless assembled delivery is requested. Master cartons are export-grade corrugated with moisture-proof PE wrap for ocean freight. Pallets available at no extra charge for FCL orders.'],
              ['Tracking & Insurance','All shipments include basic carrier liability. Marine cargo insurance (1.1% of invoice value) available upon request for FOB/CIF orders. Express and air shipments include standard tracking. We provide tracking numbers within 24 hours of dispatch.'],
              ['Customs & Duties','Import duties, taxes, and customs clearance fees are the buyer\'s responsibility unless DDP terms are selected. We provide all required export documentation: commercial invoice, packing list, bill of lading, certificate of origin, and any product-specific certificates.'],
              ['Estimated Delivery','Production lead time + shipping transit = total delivery time. Example: Magnetic Box production (10 days) + Sea Freight to Los Angeles (28 days) = ~38 days total. We provide a detailed timeline with every quote. Rush production available at a premium.'],
            ].map(([title, desc]) => (
              <div key={title} style={{ background:'var(--black-2)', border:'1px solid var(--border-dim)', padding:'28px 24px' }}>
                <h4 style={{ fontSize:15, marginBottom:8 }}>{title}</h4>
                <p style={{ color:'var(--gray-3)', fontSize:13, lineHeight:1.7 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ padding:'36px', background:'var(--black-2)', border:'1px solid var(--border)', textAlign:'center' }}>
            <span className="eyebrow">Need a Shipping Quote?</span>
            <h3 style={{ marginBottom:12 }}>Tell Us Your Destination</h3>
            <p style={{ color:'var(--gray-3)', marginBottom:28, fontSize:15 }}>We calculate the best shipping method and cost for your order size and location.</p>
            <Link to="/contact" className="btn-gold">Request Shipping Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
