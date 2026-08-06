import { useParams, Link } from 'react-router-dom';

const productData = {
  '1': {
    name: 'Premium Magnetic Gift Box', category: 'Magnetic Boxes', img: '/assets/images/mag-box-black-gold.jpg',
    moq: '500 pcs', leadTime: '15 Days', material: 'Rigid greyboard + 157g art paper wrap', size: 'Custom - any dimension',
    priceFrom: '1.20', priceTo: '3.80',
    desc: 'A rigid magnetic closure box engineered for premium unboxing moments. The flip-top lid opens with a satisfying snap, revealing a fully customizable interior. Ideal for products where first impression drives perceived value - cosmetics, electronics, and luxury gifts.',
    highlights: ['Smooth magnetic flip-top closure', 'Rigid greyboard construction (1.5-3.0mm)', 'Custom foam, velvet, or EVA inserts', 'Gold/silver foil stamping & embossing', 'Free 3D mockup within 48 hours'],
    applications: ['Cosmetics & skincare sets', 'Electronics & accessories', 'Subscription boxes', 'Corporate & promotional gifts'],
    finishes: ['Gold / Silver Foil Stamping', 'Matte Lamination', 'Spot UV', 'Embossing', 'Magnetic Closure', 'Ribbon Pull'],
    faq: [
      ['What is the minimum order for magnetic boxes?', 'Our MOQ is 500 pcs, though we are flexible for trial orders with a small setup cost. Stock-standard sizes can ship from 100 pcs.'],
      ['Can the interior be customized?', 'Yes - velvet, satin, foam, EVA, or paper-covered inserts with custom cutouts for your exact product dimensions.'],
      ['What is the price range per box?', 'USD 1.20-3.80 per unit (EXW), depending on size, board thickness, finishing, and quantity. Volume discounts apply from 3,000 pcs.'],
    ],
  },
  '2': {
    name: 'Velvet Jewelry Display Case', category: 'Jewelry Boxes', img: '/assets/images/jewelry-box-black.jpg',
    moq: '100 pcs', leadTime: '12 Days', material: 'Rigid board + black velvet lining', size: 'Custom - any dimension',
    priceFrom: '1.50', priceTo: '4.50',
    desc: 'Boutique-grade jewelry presentation boxes with plush velvet interiors and precision-fit cutouts for rings, necklaces, earrings, and bracelets. The soft-touch exterior with debossed or foil logo delivers a premium retail experience at factory-direct pricing.',
    highlights: ['Plush velvet or suede interior lining', 'Precision foam/velvet product cutouts', 'Soft-touch or leatherette exterior', 'Foil-stamped or debossed logo options', 'MOQ from 100 pcs - startup friendly'],
    applications: ['Ring & necklace retail display', 'Wedding & bridal jewelry', 'Watches & accessories', 'Jewelry e-commerce unboxing'],
    finishes: ['Gold Foil Logo', 'Debossing', 'Soft-Touch Finish', 'Satin Ribbon', 'Magnetic Flap', 'Custom Foam Insert'],
    faq: [
      ['Can you match my brand colors inside and out?', 'Yes - interior velvet and exterior materials are available in any color, with custom logo treatment in foil, deboss, or print.'],
      ['Do you offer watch display boxes?', 'Yes - PU leather and velvet watch boxes with pillow or groove holders are a standard variant of this line.'],
      ['What is the lead time?', '12 days for bulk after sample approval. Structural samples ship in 3-5 days.'],
    ],
  },
  '3': {
    name: 'Luxury Skincare Gift Set Box', category: 'Cosmetic Boxes', img: '/assets/images/cosmetic-box-black.jpg',
    moq: '300 pcs', leadTime: '15 Days', material: 'Rigid board + specialty art paper', size: 'Custom - any dimension',
    priceFrom: '1.80', priceTo: '4.80',
    desc: 'A showcase box designed to make skincare sets feel like an event. The flip-top or magnetic structure reveals a tailored EVA insert holding each bottle securely. Premium finishes - hot foil, spot UV, and matte lamination - elevate the perceived value of your product.',
    highlights: ['Multi-compartment EVA inserts', 'Hot foil & spot UV finishing', 'Rigid structure protects glass bottles', 'Lift-out trays for layered unboxing', 'Shelf-ready retail presentation'],
    applications: ['Skincare & serum gift sets', 'Beauty subscription boxes', 'Holiday & seasonal collections', 'Branded gift-with-purchase'],
    finishes: ['Hot Foil Stamping', 'Spot UV Gloss', 'Matt Lamination', 'Magnetic Flip-Top', 'Custom EVA Insert', 'Window Cut-Out'],
    faq: [
      ['Can the box hold bottles of different sizes?', 'Yes - the EVA insert is custom die-cut to your exact bottle dimensions and can combine multiple sizes in one tray.'],
      ['Do you print the skincare claims on-pack?', 'We can include regulatory text, ingredients, and usage instructions as part of the print design.'],
      ['What finishing combinations work best?', 'We recommend matte lamination + gold hot foil + spot UV for a premium skincare aesthetic.'],
    ],
  },
  '4': {
    name: 'Rigid Drawer Slide Box', category: 'Rigid Boxes', img: '/assets/images/magnetic-box-detail.jpg',
    moq: '500 pcs', leadTime: '15 Days', material: '2mm greyboard + coated paper', size: 'Custom - any dimension',
    priceFrom: '1.40', priceTo: '4.20',
    desc: 'A refined slide-out drawer box with a satisfying ribbon pull. The outer sleeve and inner tray are each wrapped in printed paper, allowing two-tone color combinations and full-brand storytelling across both surfaces. A favorite for premium retail and gifting.',
    highlights: ['Smooth slide-out mechanism', 'Ribbon pull for easy opening', 'Two-tone outer sleeve + inner tray', 'Full-surface print on both layers', 'Felt or velvet drawer lining options'],
    applications: ['Jewelry & watches', 'Stationery & pens', 'Premium food & chocolate', 'Apparel accessories'],
    finishes: ['Gold Foil', 'Matt Lamination', 'Ribbon Pull', 'Custom Insert', 'Magnetic Closure'],
    faq: [
      ['What makes the drawer box different from a magnetic box?', 'The drawer slides out horizontally from a sleeve - great for products displayed at retail where the open box can sit on a shelf.'],
      ['Can the sleeve and tray have different colors?', 'Yes - this two-layer structure is ideal for brand color contrast (e.g., matte black sleeve, gold tray).'],
      ['What is the price range?', 'USD 1.40-4.20 per unit (EXW) depending on size, material, and finishing.'],
    ],
  },
  '5': {
    name: 'Premium Perfume Packaging Box', category: 'Cosmetic Boxes', img: '/assets/images/case-cosmetics-v2.jpg',
    moq: '500 pcs', leadTime: '15 Days', material: 'Rigid board + satin interior', size: 'Custom - any dimension',
    priceFrom: '1.60', priceTo: '4.60',
    desc: 'Fragrance packaging that mirrors the luxury of the scent inside. A rigid structure with satin or velvet interior holds the perfume bottle in a precision-cut cradle, while hot-stamped foil and soft-touch finishes create a tactile, high-end unboxing experience.',
    highlights: ['Precision-cut bottle cradle interior', 'Satin, velvet, or leatherette lining', 'Hot stamping & metallic foil accents', 'Die-cut windows for product visibility', 'Tamper-evident seal options'],
    applications: ['Perfume & eau de toilette', 'Candles & home fragrance', 'Premium skincare sets', 'Limited-edition launches'],
    finishes: ['Hot Stamping', 'Satin Lining', 'Spot UV', 'Custom Die-Cut', 'Metallic Foil'],
    faq: [
      ['Can you accommodate tall or uniquely shaped bottles?', 'Yes - the interior cradle is custom die-cut to the exact bottle profile, including angled or round shapes.'],
      ['Do you offer window cutouts?', 'Yes - die-cut windows with clear PET or acetate film let customers see the bottle at retail.'],
      ['What is the MOQ for perfume boxes?', '500 pcs standard; trial runs from 100 pcs available with a small setup fee.'],
    ],
  },
  '6': {
    name: 'Watch Display Gift Box', category: 'Jewelry Boxes', img: '/assets/images/case-jewelry-v2.jpg',
    moq: '200 pcs', leadTime: '12 Days', material: 'PU leather + velvet cushion', size: 'Custom - any dimension',
    priceFrom: '2.20', priceTo: '5.50',
    desc: 'A luxury watch presentation box with a cushioned pillow holder that presents the timepiece like a trophy. PU leather or velvet exterior, magnetic snap closure, and debossed or foil logo combine durability with elegance - built to protect and impress.',
    highlights: ['PU leather or velvet exterior', 'Cushioned watch pillow holder', 'Magnetic snap or clasp closure', 'Embossed or foil-stamped branding', 'Watch winder & bracelet slot options'],
    applications: ['Luxury watch retail', 'Watch e-commerce & pre-owned market', 'Corporate gifts & awards', 'Limited edition launches'],
    finishes: ['Gold / Silver Embossing', 'Suede Interior', 'Magnetic Snap', 'Custom Watch Holder', 'Debossed Logo'],
    faq: [
      ['Does the box fit automatic watches?', 'Yes - the pillow holder fits case diameters up to 50mm, and winder compartments can be added for automatics.'],
      ['Can I store the watch and bracelet together?', 'Yes - optional bracelet slots and under-pillow storage are available.'],
      ['What is the MOQ?', '200 pcs standard; we recommend a sample first to confirm the fit of your watch model.'],
    ],
  },
  '7': {
    name: 'Eco Kraft Shipping Mailer', category: 'Shipping Boxes', img: '/assets/images/shipping-box-kraft-v2.jpg',
    moq: '1000 pcs', leadTime: '10 Days', material: 'FSC-certified kraft corrugated', size: 'Custom - any dimension',
    priceFrom: '0.30', priceTo: '1.20',
    desc: 'A durable, eco-friendly mailer built for DTC e-commerce. FSC-certified corrugated construction with full-color flexo printing turns your shipping box into a brand touchpoint - while tear strips, die-cut windows, and custom tape streamline fulfillment.',
    highlights: ['FSC-certified, recyclable materials', 'Full-color flexo printing inside & out', 'Tear strip & self-seal options', 'Die-cut handles & display windows', 'Flat-pack shipping to reduce freight cost'],
    applications: ['E-commerce & DTC shipping', 'Subscription boxes', 'Apparel & footwear', 'Replacement part delivery'],
    finishes: ['Flexo Printing', 'Die-Cut Window', 'Tear Strip', 'Custom Tape', 'Biodegradable'],
    faq: [
      ['Are the mailers FSC certified?', 'Yes - all kraft and corrugated materials are FSC-certified and 100% recyclable.'],
      ['Can you print inside the box?', 'Yes - full-color flexo print is available on interior surfaces for an elevated unboxing.'],
      ['What sizes are available?', 'Any custom dimension; we also stock 12+ standard e-commerce sizes with same-week production.'],
    ],
  },
  '8': {
    name: 'Branded Retail Paper Bag', category: 'Paper Bags', img: '/assets/images/gift-bag-black-v2.jpg',
    moq: '500 pcs', leadTime: '12 Days', material: '180g coated art paper', size: 'Custom - any dimension',
    priceFrom: '0.50', priceTo: '1.80',
    desc: 'A retail-ready paper bag that carries your brand from counter to street. Matte or glossy coated paper with foil-stamped logos, cotton rope handles, and reinforced bottoms - durable enough for bottles, heavy goods, and repeat use as a walking billboard.',
    highlights: ['Foil stamping & spot UV branding', 'Cotton, twisted, or die-cut handles', 'Reinforced bottom board for weight', 'Multiple stock sizes + custom dimensions', 'Retail & boutique premium finish'],
    applications: ['Retail & boutique stores', 'Luxury goods & jewelry', 'Cosmetics & fragrance', 'Events, exhibitions & giveaways'],
    finishes: ['Foil Stamping', 'Matt Lamination', 'Cotton Rope Handle', 'Spot UV', 'Embossing'],
    faq: [
      ['How much weight can the bag hold?', 'With a reinforced bottom board, bags support up to 10-15kg depending on size and paper weight (180-300g).'],
      ['Can handles be customized?', 'Yes - cotton rope, twisted paper, ribbon, or die-cut handles in matching brand colors.'],
      ['What is the price range?', 'USD 0.50-1.80 per bag (EXW) depending on size, paper weight, and finishing.'],
    ],
  },
};

const WhyCard = ({ title, text }) => (
  <div style={{ padding: 24, background: 'var(--black-2)', border: '1px solid var(--border-dim)' }}>
    <div style={{ marginBottom: 10, color: 'var(--gold)' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
    </div>
    <h5 style={{ fontSize: 14, marginBottom: 8 }}>{title}</h5>
    <p style={{ fontSize: 13, color: 'var(--gray-3)', lineHeight: 1.7, margin: 0 }}>{text}</p>
  </div>
);

export default function ProductDetail() {
  const { id } = useParams();
  const product = productData[id];

  if (!product) {
    return (
      <div className="page-scaffold" style={{ paddingTop: 140, textAlign: 'center' }}>
        <div className="container">
          <h1>Product Not Found</h1>
          <Link to="/products" className="btn-gold" style={{ marginTop: 24, textDecoration: 'none' }}>Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-scaffold" style={{ paddingTop: 120 }}>
      <div className="container">
        <nav style={{ marginBottom: 40, fontSize: 13, color: 'var(--gray-3)' }}>
          <Link to="/" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Home</Link> <span style={{ margin: '0 8px' }}>/</span>
          <Link to="/products" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Products</Link> <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--gold)' }}>{product.name}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: 64, marginBottom: 80 }}>
          <div style={{ position: 'relative', background: 'var(--black-2)', border: '1px solid var(--border-dim)' }}>
            <img src={product.img} alt={product.name} style={{ width: '100%', display: 'block' }} />
          </div>
          <div>
            <div className="hero-badges" style={{ marginBottom: 16 }}>
              <span className="hero-badge">MOQ: {product.moq}</span>
              <span className="hero-badge">Lead Time: {product.leadTime}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px, 3vw, 42px)', marginBottom: 12, fontFamily: 'var(--font-display)' }}>{product.name}</h1>

            <div style={{ marginBottom: 20, padding: '16px 20px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)' }}>
              <span style={{ fontSize: 12, color: 'var(--gray-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Unit Price (EXW)</span>
              <div style={{ fontSize: 28, color: 'var(--gold)', fontFamily: 'var(--font-display)', marginTop: 2 }}>
                From ${product.priceFrom} - ${product.priceTo}
              </div>
              <div style={{ fontSize: 12, color: 'var(--gray-3)', marginTop: 6 }}>
                Per unit, depends on size, material & quantity. Volume discounts from 3,000 pcs. Free design & samples.
              </div>
            </div>

            <p style={{ color: 'var(--gray-3)', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
              {product.desc}
            </p>

            <div style={{ marginBottom: 32 }}>
              <div className="gold-line" style={{ marginBottom: 12 }} />
              <h4 style={{ marginBottom: 16, fontSize: 15 }}>Specifications</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
                {[
                  ['Material', product.material],
                  ['Size', product.size],
                  ['MOQ', product.moq],
                  ['Lead Time', product.leadTime],
                  ['Category', product.category],
                  ['Design', 'Free - 3D mockup within 48h'],
                ].map(([k, v]) => (
                  <div key={k} style={{ borderBottom: '1px solid var(--border-dim)', paddingBottom: 10 }}>
                    <span style={{ fontSize: 11, color: 'var(--gray-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k}</span>
                    <span style={{ display: 'block', fontSize: 14, color: 'var(--white)', marginTop: 4 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <h4 style={{ marginBottom: 12, fontSize: 15 }}>Key Features</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {product.highlights.map(h => (
                  <div key={h} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--gray-3)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                    {h}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <h4 style={{ marginBottom: 12, fontSize: 15 }}>Best For</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {product.applications.map(a => (
                  <span key={a} style={{ fontSize: 12, color: 'var(--gray-2)', border: '1px solid var(--border)', padding: '5px 12px' }}>{a}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <h4 style={{ marginBottom: 12, fontSize: 15 }}>Available Finishes</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {product.finishes.map(f => (
                  <span key={f} style={{ fontSize: 12, color: 'var(--gold)', border: '1px solid var(--border)', padding: '5px 12px' }}>{f}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-gold" style={{ textDecoration: 'none' }}>Enquire Now</a>
              <a href={`https://wa.me/8618296876285?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 60 }}>
          <div className="gold-line" />
          <span className="eyebrow" style={{ marginBottom: 24 }}>Product FAQ</span>
          <div style={{ display: 'grid', gap: 0 }}>
            {product.faq.map(([q, a]) => (
              <div key={q} style={{ borderBottom: '1px solid var(--border-dim)', padding: '18px 0' }}>
                <div style={{ fontSize: 15, color: 'var(--white)', fontWeight: 600, marginBottom: 8 }}>{q}</div>
                <div style={{ fontSize: 14, color: 'var(--gray-3)', lineHeight: 1.7 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 60 }}>
          <div className="gold-line" />
          <span className="eyebrow" style={{ marginBottom: 24 }}>Why Order From Mili</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <WhyCard title="Free Design & 3D Mockup" text="Structural design and photorealistic 3D mockups included - ready within 48 hours." />
            <WhyCard title="Free Structural Samples" text="Two rounds of free structural samples before bulk production. Approve first, then produce." />
            <WhyCard title="AQL 2.5 Quality Control" text="In-house QC with AQL 2.5 inspection at every stage, plus pre-shipment photo confirmation." />
            <WhyCard title="Factory-Direct Pricing" text="No middlemen. Pay factory prices with volume discounts and transparent costing." />
          </div>
        </div>

        <div style={{ marginBottom: 60 }}>
          <div className="gold-line" />
          <span className="eyebrow" style={{ marginBottom: 32 }}>Related Products</span>
          <div className="product-grid">
            {Object.entries(productData).filter(([pid]) => pid !== id).slice(0, 4).map(([pid, p]) => (
              <Link to={`/products/${pid}`} className="product-card" key={pid} style={{ textDecoration: 'none' }}>
                <div className="product-card-img-wrap">
                  <img src={p.img} alt={p.name} className="product-card-img" />
                </div>
                <div className="product-card-body">
                  <h4>{p.name}</h4>
                  <p>{p.category}</p>
                  <span className="product-card-tag">From ${p.priceFrom} | MOQ: {p.moq}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
