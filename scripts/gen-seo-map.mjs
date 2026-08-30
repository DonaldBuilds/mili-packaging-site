// Generates seo-map.json — per-route SEO metadata consumed by the Cloudflare
// Worker for SSR title/description/JSON-LD injection.
// Usage: node scripts/gen-seo-map.mjs [outDir]   (default: public)
import fs from 'fs';
import path from 'path';

const OUT_DIR = process.argv[2] || 'public';
const data = JSON.parse(fs.readFileSync(new URL('../src/data/products.json', import.meta.url), 'utf8'));
const { productGroups, productCatalog } = data;

// Compress over-long titles (>65 chars) for SERP display: keep the product-name
// part before the dash separator when safe, else truncate at a word boundary.
const compressTitle = (t) => {
  if (!t || t.length <= 65) return t;
  const dash = t.indexOf('\u2013');
  if (dash > 15 && dash <= 60) return t.slice(0, dash).trim();
  let cut = t.slice(0, 60).replace(/\s+\S*$/, '');
  return cut.length > 15 ? cut : t.slice(0, 62);
};

const BASE = 'https://mili-packaging.com';
const routes = {};

// ── Home ──
routes['/'] = { type: 'home' };

// ── Product groups (categories) ──
for (const g of productGroups) {
  const path = '/products/' + g.slug;
  const title = `Custom ${g.name} Manufacturer | Mili Packaging`;
  const desc = `Factory-direct ${g.name.toLowerCase()} from China. MOQ ${g.moq || 100} pcs, free design & 3D mockup in 48h, 12-15 day lead time. Get a quote within 24 hours.`;
  routes[path] = { type: 'category', title, description: desc, h1: g.name, name: g.name, tagline: g.tagline || '' };
  for (const p of (productCatalog[g.slug] || [])) {
    const ppath = `/products/${g.slug}/${p.slug}`;
    const price = p.price || (p.tierPrice && p.tierPrice[0] ? String(p.tierPrice[0].price) : '') || '';
    routes[ppath] = {
      type: 'product',
      title: compressTitle(p.title) || `${p.name} – Custom Manufacturer | Mili Packaging`,
      description: p.description || `Custom ${p.name} with free design, MOQ ${p.moq || 100} pcs and factory-direct pricing. Request a quote within 24 hours.`,
      h1: p.name,
      name: p.name,
      price,
      moq: p.moq,
      image: p.img || '',
      categoryName: g.name,
      categoryUrl: `${BASE}/products/${g.slug}`
    };
  }
}

// ── Industries ──
const industries = [
  ['fashion-apparel', 'Fashion & Apparel', 'tape-free mailers, boutique paper bags and affordable shipping'],
  ['food-beverage', 'Food & Beverage', 'folding cartons, rigid gift boxes and kraft shippers'],
  ['beauty-skincare', 'Beauty & Skincare', 'complete packaging sets, EVA/foam inserts and premium finishing'],
  ['electronics-tech', 'Electronics & Tech', 'precision foam/EVA inserts, rigid presentation boxes and corrugated shippers'],
  ['subscription-dtc', 'Subscription & DTC', 'tape-free mailers, multi-SKU cartons and starter kits'],
  ['wine-spirits', 'Wine & Spirits', 'luxury rigid gift boxes, magnetic presentation sets and bottle cradles'],
  ['jewelry-watches', 'Jewelry & Watches', 'velvet-lined interiors, embossed logos and multi-drawer collection boxes']
];
for (const [slug, name, benefits] of industries) {
  const path = '/industries/' + slug;
  routes[path] = {
    type: 'industry',
    title: `${name} Packaging Solutions | Mili Packaging`,
    description: `Custom packaging for ${name.toLowerCase()} brands: ${benefits}. Factory-direct, MOQ 100 pcs, free samples, global delivery to 50+ countries.`,
    h1: `${name} Packaging`,
    name
  };
}
routes['/industries'] = {
  type: 'static',
  title: 'Industry Packaging Solutions | Mili Packaging',
  description: 'Tailored custom packaging for jewelry, cosmetics, food & beverage, fashion, electronics, subscription and wine & spirits brands. Factory-direct, MOQ 100 pcs.',
  h1: 'Industry Solutions'
};

// ── Static pages ──
const statics = {
  '/products': ['Custom Packaging Products & Boxes | Mili Packaging', 'Shop custom rigid boxes, magnetic gift boxes, jewelry boxes, cosmetic boxes, mailer boxes, paper bags and more. MOQ 100 pcs, free design, factory-direct pricing.', 'Our Products'],
  '/about': ['About Mili Packaging – Custom Box Factory in China', 'Jiangxi Mili Packaging Materials Co., Ltd. — a factory-direct custom luxury packaging manufacturer since 2018. FSC certified, ISO 9001, MOQ 100 pcs.', 'About Mili Packaging'],
  '/portfolio': ['Portfolio & Client Case Studies | Mili Packaging', 'Real packaging projects for brands across 50+ countries: rigid boxes, mailers, cosmetic sets and more. See what Mili delivers.', 'Our Portfolio'],
  '/faq': ['Packaging FAQ – MOQ, Lead Times, Samples | Mili Packaging', 'Answers on MOQ (from 100 pcs), production lead times (12-15 days), free samples, customization and shipping. Get your quote in 24 hours.', 'Frequently Asked Questions'],
  '/contact': ['Contact Us – Get a Custom Packaging Quote | Mili Packaging', 'Send your packaging brief and get a factory-direct quote within 24 hours. Free design & 3D mockup, 2 rounds of free samples. MOQ from 100 pcs.', 'Contact Mili Packaging'],
  '/sample-kits': ['Sample & Starter Kits | Mili Packaging', 'Explore 12 material and finish combinations in one $29 sample kit — fee credited to your first bulk order. Free shipping included.', 'Sample & Starter Kits'],
  '/support': ['Support & After-Sales | Mili Packaging', 'Production updates, QC reports, shipping tracking and after-sales support for your custom packaging orders.', 'Support'],
  '/warranty': ['Warranty & Quality Promise | Mili Packaging', 'AQL 2.5 inspection on every batch, FSC-certified materials and a quality promise on all custom packaging orders.', 'Warranty & Quality', true],
  '/shipping-policy': ['Shipping Policy | Mili Packaging', 'FOB, CIF and DDP shipping options to 50+ countries. Export-grade packing, tracking and door-to-door delivery.', 'Shipping Policy', true],
  '/shipping-delivery': ['Shipping & Delivery | Mili Packaging', 'Lead times and global delivery options: FOB, CIF, DDP door-to-door across 50+ countries from our China factory.', 'Shipping & Delivery', true],
  '/payment-terms': ['Payment Terms | Mili Packaging', 'Payment options and terms for custom packaging orders: deposit + balance structure with secure payment channels.', 'Payment Terms', true],
  '/returns-policy': ['Returns Policy | Mili Packaging', 'Our returns and rework policy for custom packaging orders. Quality inspection and issue resolution process.', 'Returns Policy', true],
  '/privacy-policy': ['Privacy Policy | Mili Packaging', 'How Mili Packaging collects, uses and protects your personal information.', 'Privacy Policy', true]
};
for (const [path, [title, description, h1, noindex]] of Object.entries(statics)) {
  routes[path] = { type: 'static', title, description, h1, ...(noindex ? { noindex: true } : {}) };
}

// ── Blog pages: static files already carry unique titles, but map them so the
//    Worker can serve a real 404 for everything else ──
routes['/blog'] = { type: 'blog', title: 'Packaging Knowledge Base | Mili Packaging', description: 'Expert guides on custom packaging, box design, finishing, materials and sourcing for B2B buyers.', h1: 'Packaging Knowledge Base' };
routes['/blog/'] = routes['/blog'];

const out = { routes, base: BASE };
fs.writeFileSync(path.join(OUT_DIR, 'seo-map.json'), JSON.stringify(out), 'utf8');
console.log(`seo-map.json written to ${OUT_DIR}: ${Object.keys(routes).length} routes`);
