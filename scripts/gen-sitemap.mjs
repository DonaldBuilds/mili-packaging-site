// Generates public/sitemap.xml from the data layer (product groups, products, posts).
// History-mode URLs only — no hash fragments. Run: node scripts/gen-sitemap.mjs
import fs from 'fs';

// Read the data layer JSON directly (products.js uses JSON import attributes
// which plain Node < 20.10 cannot evaluate outside Vite).
const data = JSON.parse(fs.readFileSync(new URL('../src/data/products.json', import.meta.url), 'utf8'));
const { productGroups, productCatalog } = data;

const BASE = 'https://mili-packaging.com';
const LASTMOD = '2026-08-10';
const urls = [];

const add = (path, freq, pri) => {
  urls.push(`  <url><loc>${BASE}${path}</loc><lastmod>${LASTMOD}</lastmod><changefreq>${freq}</changefreq><priority>${pri}</priority></url>`);
};

// Core
add('/', 'weekly', '1.0');
add('/products', 'weekly', '0.9');

// Product groups + every product page
for (const g of productGroups) {
  add(`/products/${g.slug}`, 'monthly', '0.8');
  for (const p of (productCatalog[g.slug] || [])) {
    add(`/products/${g.slug}/${p.slug}`, 'monthly', '0.6');
  }
}

// Industries
add('/industries', 'monthly', '0.7');
for (const slug of ['fashion-apparel', 'food-beverage', 'beauty-skincare', 'electronics-tech', 'subscription-dtc', 'wine-spirits', 'jewelry-watches']) {
  add(`/industries/${slug}`, 'monthly', '0.7');
}

// Blog: static SEO articles only (trailing slash; SPA /blog routes retired)
add('/blog/', 'weekly', '0.7');
for (let i = 1; i <= 10; i++) add(`/blog/${i}/`, 'monthly', '0.7');

// Static pages
const staticPages = [
  ['/about', 'monthly', '0.6'],
  ['/portfolio', 'monthly', '0.6'],
  ['/faq', 'monthly', '0.5'],
  ['/contact', 'monthly', '0.9'],
  ['/support', 'monthly', '0.5'],
  ['/warranty', 'monthly', '0.5'],
  ['/shipping-policy', 'monthly', '0.5'],
  ['/shipping-delivery', 'monthly', '0.5'],
  ['/payment-terms', 'monthly', '0.5'],
  ['/returns-policy', 'monthly', '0.5'],
  ['/privacy-policy', 'monthly', '0.3'],
  ['/sample-kits', 'monthly', '0.8'],
];
for (const [path, freq, pri] of staticPages) add(path, freq, pri);

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
console.log(`sitemap.xml written: ${urls.length} URLs`);
