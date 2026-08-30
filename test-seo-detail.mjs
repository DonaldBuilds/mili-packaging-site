import worker from './dist-seo/worker.test.mjs';

const r1 = await worker.fetch(new Request('https://mili-packaging.com/robots.txt'), {});
console.log('---ROBOTS---');
console.log((await r1.text()).slice(0, 500));

const r2 = await worker.fetch(new Request('https://mili-packaging.com/products/rigid-gift-boxes/magnetic-flip-top-gift-box'), {});
const t = await r2.text();
const prod = t.match(/<script type="application\/ld\+json">(\{"@context":"https:\/\/schema.org","@type":"Product"[\s\S]*?\})<\/script>/);
console.log('---PRODUCT SCHEMA---');
console.log(prod ? prod[1].slice(0, 600) : 'NOT FOUND');

const r3 = await worker.fetch(new Request('https://mili-packaging.com/products/rigid-gift-boxes/'), {});
console.log('---TRAILING SLASH---', r3.status, (await r3.text()).match(/<title[^>]*>([^<]*)<\/title>/)[1]);
