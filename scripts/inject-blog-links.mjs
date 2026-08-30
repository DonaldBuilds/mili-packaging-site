// Injects contextual product/category links into the blog articles'
// .blog-related block (internal linking for SEO + user journey).
// One-time batch run: node scripts/inject-blog-links.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const data = JSON.parse(fs.readFileSync(new URL('../src/data/products.json', import.meta.url), 'utf8'));
const { productGroups, productCatalog } = data;

const catNames = {};
for (const g of productGroups) catNames[g.slug] = g.name;
const prodNames = {};
for (const g of Object.keys(productCatalog)) {
  for (const p of productCatalog[g]) prodNames[`${g}/${p.slug}`] = p.name;
}

const mapping = {
  '1.html': [
    ['cat', 'cosmetic-boxes'], ['cat', 'rigid-gift-boxes'], ['prod', 'cosmetic-boxes/serum-bottle-carton-set']
  ],
  '2.html': [
    ['cat', 'rigid-gift-boxes'], ['cat', 'folding-cartons'], ['prod', 'folding-cartons/tuck-end-carton']
  ],
  '3.html': [
    ['cat', 'rigid-gift-boxes'], ['prod', 'paper-bags/luxury-art-paper-bag'], ['cat', 'cosmetic-boxes']
  ],
  '4.html': [
    ['cat', 'folding-cartons'], ['cat', 'mailer-boxes'], ['cat', 'corrugated-shipping']
  ],
  '5.html': [
    ['prod', 'folding-cartons/food-grade-kraft-carton'], ['cat', 'paper-bags'], ['prod', 'corrugated-shipping/eco-printed-shipping-box']
  ],
  '6.html': [
    ['prod', 'rigid-gift-boxes/magnetic-flip-top-gift-box'], ['prod', 'cosmetic-boxes/valentine-magnetic-folding-box'], ['cat', 'rigid-gift-boxes']
  ],
  '7.html': [
    ['static', '/products', 'Browse Our Custom Packaging Products'], ['cat', 'sample-starter-kits']
  ],
  '8.html': [
    ['cat', 'sample-starter-kits'], ['cat', 'watch-boxes'], ['cat', 'paper-bags']
  ],
  '9.html': [
    ['prod', 'cosmetic-boxes/perfume-box-foam-cradle'], ['cat', 'cosmetic-boxes'], ['cat', 'rigid-gift-boxes']
  ],
  '10.html': [
    ['cat', 'mailer-boxes'], ['cat', 'corrugated-shipping'], ['cat', 'paper-bags']
  ]
};

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'blog');
let changed = 0;
for (const [file, links] of Object.entries(mapping)) {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) { console.log('SKIP missing:', file); continue; }
  let html = fs.readFileSync(fp, 'utf8');
  const anchors = [];
  for (const [kind, ref, label] of links) {
    let href, text;
    if (kind === 'cat') {
      if (!catNames[ref]) { console.log('  !! unknown category:', ref); continue; }
      href = '/products/' + ref;
      text = 'Custom ' + catNames[ref];
    } else if (kind === 'prod') {
      if (!prodNames[ref]) { console.log('  !! unknown product:', ref); continue; }
      href = '/products/' + ref;
      text = prodNames[ref];
    } else {
      href = ref;
      text = label;
    }
    anchors.push('  <a href="' + href + '">' + text + '</a>');
  }
  if (!anchors.length) continue;
  const re = /<div class="blog-related">\s*<h4>Related Guides<\/h4>\s*([\s\S]*?)<\/div>/;
  if (!re.test(html)) { console.log('  !! .blog-related block not found in', file); continue; }
  html = html.replace(re, (m, inner) => {
    return '<div class="blog-related">\n<h4>Related Guides & Products</h4>\n' + inner.replace(/\s+$/, '') + '\n' + anchors.join('\n') + '\n</div>';
  });
  fs.writeFileSync(fp, html, 'utf8');
  console.log('OK', file, '+', anchors.length, 'product links');
  changed++;
}
console.log('done, changed:', changed, 'files');
