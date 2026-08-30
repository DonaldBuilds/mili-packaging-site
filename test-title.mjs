import worker from './dist-seo/worker.test.mjs';
const cases = [
  'https://mili-packaging.com/products/paper-bags/luxury-art-paper-bag',
  'https://mili-packaging.com/products/mailer-boxes/subscription-mailer',
  'https://mili-packaging.com/products/sample-starter-kits/beauty-cosmetic-sample-kit',
  'https://mili-packaging.com/blog/1/'
];
for (const u of cases) {
  const r = await worker.fetch(new Request(u), {});
  const t = await r.text();
  const ti = (t.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || 'NONE';
  console.log(u.split('.com')[1], '|', ti, '(', ti.length, ')');
}
