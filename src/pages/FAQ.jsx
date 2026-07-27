import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqData = [
  { cat:'Orders & MOQ', items:[
    { q:'What is your minimum order quantity (MOQ)?', a:'Standard MOQ is 500 pieces for most box types. Jewelry boxes start from 100 pieces. For first-time or trial orders, contact us — we offer flexible options for startups and new clients.' },
    { q:'Can I order different products in one order?', a:'Yes. You can combine multiple box types, sizes, and designs in one order. Each variant may have its own MOQ, but we consolidate production for efficiency and cost savings.' },
    { q:'How do I start an order?', a:'Fill out our inquiry form with your requirements. We respond within 24 hours with a quote, recommended product, and timeline. Upon approval, we move to design and sampling.' },
    { q:'Do you offer rush orders?', a:'Yes, rush production (5–7 day turnaround) is available for select products at a premium. Contact us with your deadline and we will advise on feasibility.' },
  ]},
  { cat:'Design & Customization', items:[
    { q:'Is design service free?', a:'Yes. Professional structural design and graphic layout are included free for all custom orders. We deliver 3D mockups within 48 hours of receiving your brief.' },
    { q:'What can I customize?', a:'Nearly everything: box dimensions, material (kraft, rigid board, corrugated), closure type (magnetic, ribbon, drawer, flip-top), surface finish (matte/gloss lamination, foil stamp, emboss, UV spot, soft-touch), interior (velvet, satin, foam, EVA), and full-color printing.' },
    { q:'Do you accept my own design files?', a:'Yes — AI, PSD, PDF, CDR, and EPS files. Please provide CMYK color mode, 300 DPI resolution, outlined text, and 3mm bleed. Our design team can help with file preparation if needed.' },
    { q:'Can I see a sample before bulk production?', a:'Yes. We provide 2 rounds of free structural (white/unprinted) samples in 3–5 business days. Pre-production samples with full printing and finishing are available — the sample fee is fully deducted from your bulk order.' },
  ]},
  { cat:'Production & Quality', items:[
    { q:'What are your production lead times?', a:'Structural samples: 3–5 business days. Bulk production: 7–15 business days after sample approval, depending on order size and complexity. Rush options available — discuss with your account manager.' },
    { q:'What quality standards do you follow?', a:'AQL 2.5 (Acceptable Quality Level) inspection standards throughout production: incoming material inspection, in-process QC at each workstation, and final random sampling before shipment. Our factory is ISO 9001 certified.' },
    { q:'Are your materials eco-friendly?', a:'Yes. We use FSC-certified paper, soy-based inks, and water-based adhesives as standard. Biodegradable, recycled, and compostable material options are available upon request.' },
    { q:'Do you print in Pantone colors?', a:'Yes. We match Pantone coated (C) colors for offset printing. Please provide the Pantone code in your brief. Note: screen colors and actual print may vary slightly — sample approval before bulk run is always recommended.' },
  ]},
  { cat:'Shipping & Logistics', items:[
    { q:'What shipping options do you offer?', a:'Sea freight (most cost-effective for bulk), air freight (5–10 days), and express courier (DHL/UPS/FedEx, 3–7 days for samples and urgent orders). We support FOB, CIF, DDP, and door-to-door delivery terms.' },
    { q:'Do you ship to my country?', a:'We ship to 50+ countries worldwide, including USA, Canada, UK, Australia, EU, Middle East, and Southeast Asia. Contact us for a specific shipping quote and timeline to your destination.' },
    { q:'How are the boxes packaged for shipping?', a:'All boxes are flat-packed to minimize shipping volume and cost (unless assembled delivery is requested). Packed in strong export-grade corrugated master cartons with moisture-proof wrap for ocean freight.' },
    { q:'Can you ship directly to my Amazon warehouse?', a:'Yes. We can ship directly to Amazon FBA warehouses (US, UK, EU, and other marketplaces) with the correct labeling and packaging requirements. Please confirm the fulfillment center details when placing your order.' },
  ]},
  { cat:'Payment & Pricing', items:[
    { q:'What payment methods do you accept?', a:'T/T bank transfer (30% deposit, 70% before shipment), Letter of Credit (L/C) for orders over $30,000, Alibaba Trade Assurance for first-time buyers, and PayPal/credit card for sample orders.' },
    { q:'How is pricing calculated?', a:'Price depends on: box dimensions, material type and thickness, number of print colors, surface finishing, interior lining, and order quantity. Larger quantities significantly reduce the per-unit cost.' },
    { q:'Are there any hidden fees?', a:'None. Your quote includes box production, printing, finishing, interior lining, flat packing, and export packaging. Additional costs are shipping (quoted separately) and any import duties in your country — these are your responsibility.' },
    { q:'Do prices include design and sampling?', a:'Structural design and graphic layout are free. White samples (2 rounds) are free. Pre-production samples (with full print and finish) are charged at cost but fully deducted from your bulk order.' },
  ]},
];

export default function FAQ() {
  const [open, setOpen] = useState(new Set());
  const toggle = (k) => {
    const n = new Set(open);
    n.has(k) ? n.delete(k) : n.add(k);
    setOpen(n);
  };

  return (
    <div className="page-scaffold">
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="gold-line" />
          <span className="eyebrow">Help Center</span>
          <h1>Frequently Asked<br />Questions</h1>
          <p>Everything you need to know about working with Mili Packaging. Still have a question? <Link to="/contact" style={{ color:'var(--gold)', textDecoration:'none' }}>Contact us directly</Link>.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          {faqData.map((cat, ci) => (
            <div key={cat.cat} style={{ marginBottom: 60 }}>
              <div style={{ display:'flex', alignItems:'center', gap: 16, marginBottom: 28 }}>
                <div className="gold-line" style={{ marginBottom: 0, flexShrink: 0 }} />
                <h3 style={{ fontSize:'clamp(16px,1.8vw,20px)' }}>{cat.cat}</h3>
              </div>
              {cat.items.map((item, ii) => {
                const k = `${ci}-${ii}`;
                const isOpen = open.has(k);
                return (
                  <div key={k} className="faq-item">
                    <button className={`faq-btn${isOpen ? ' open' : ''}`} onClick={() => toggle(k)}>
                      <span>{item.q}</span>
                      <span className="faq-btn-icon">+</span>
                    </button>
                    {isOpen && <div className="faq-answer">{item.a}</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="gold-line gold-line-center" />
        <h2>Still Have Questions?</h2>
        <p>Our team is happy to help — we typically respond within 2 hours during business hours.</p>
        <div className="cta-band-actions">
          <a href="https://wa.me/8618296876285" target="_blank" rel="noopener noreferrer" className="btn-gold">WhatsApp Us</a>
          <Link to="/contact" className="btn-outline-gold">Send an Email</Link>
        </div>
      </section>
    </div>
  );
}
