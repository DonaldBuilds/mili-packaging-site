// Smoke test: verifies per-route SEO injection, 404 handling and robots.txt
import worker from './dist-seo/worker.test.mjs';

const cases = [
  ['/', 'home'],
  ['/products/rigid-gift-boxes', 'category'],
  ['/products/rigid-gift-boxes/magnetic-flip-top-gift-box', 'product'],
  ['/industries/jewelry-watches', 'industry'],
  ['/about', 'static'],
  ['/privacy-policy', 'noindex-static'],
  ['/totally-unknown-page-xyz', '404'],
  ['/robots.txt', 'robots']
];

for (const [path, label] of cases) {
  const req = new Request('https://mili-packaging.com' + path, { headers: { 'User-Agent': 'Mozilla/5.0 test' } });
  const res = await worker.fetch(req, {});
  const text = await res.text();
  const title = (text.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || 'NONE';
  const robots = (text.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
  const jsonldTypes = [...text.matchAll(/"@type":\s*"([A-Za-z]+)"/g)].map(m => m[1]);
  console.log('=== ' + path + ' [' + label + ']');
  console.log('  status:', res.status, '| ctype:', res.headers.get('content-type'));
  console.log('  title:', title.slice(0, 70));
  console.log('  robots:', robots || '(none)');
  console.log('  jsonld:', jsonldTypes.length ? jsonldTypes.join(',') : 'NONE');
  console.log('  hasSiteProduct:', text.includes('"@type": "Product"'));
  console.log('  bodyLen:', text.length);
}
