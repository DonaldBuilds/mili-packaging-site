// Local smoke test for the generated Cloudflare worker (mirrors CF runtime semantics).
// Run AFTER `SKIP_UPLOAD=1 node deploy.cjs` has written dist-seo/worker.test.mjs.
const m = await import('./dist-seo/worker.test.mjs');
const w = m.default;

async function check(name, url, expectStatus, expectType) {
  const r = await w.fetch(new Request(url));
  const t = await r.text();
  const okStatus = r.status === expectStatus;
  const okType = !expectType || (r.headers.get('content-type') || '').includes(expectType);
  console.log(`${okStatus && okType ? 'PASS' : 'FAIL'} ${name}: status=${r.status} type=${r.headers.get('content-type')} len=${t.length}${r.headers.get('location') ? ' -> ' + r.headers.get('location') : ''}`);
  if (!okStatus || !okType) process.exitCode = 1;
}

await check('index.html', 'https://mili-packaging.com/', 200, 'text/html');
await check('SPA redirect /products', 'https://mili-packaging.com/products', 301, null);
await check('blog index', 'https://mili-packaging.com/blog', 200, 'text/html');
await check('blog post 1', 'https://mili-packaging.com/blog/1', 200, 'text/html');
await check('blog unknown -> SPA fallback', 'https://mili-packaging.com/blog/xyz', 200, 'text/html');
await check('assets js', 'https://mili-packaging.com/assets/index-DYc0n_AH.js', 200, 'javascript');
await check('assets css', 'https://mili-packaging.com/assets/index-XkHTGcGk.css', 200, 'css');
await check('robots.txt', 'https://mili-packaging.com/robots.txt', 200, 'text/plain');
await check('sitemap.xml', 'https://mili-packaging.com/sitemap.xml', 200, 'xml');
await check('fallback SPA', 'https://mili-packaging.com/unknown-page', 200, 'text/html');

console.log(process.exitCode ? 'SMOKE TEST FAILED' : 'SMOKE TEST PASSED');
