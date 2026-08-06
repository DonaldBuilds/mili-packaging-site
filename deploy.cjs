const fs = require('fs');
const path = require('path');
const https = require('https');

const TOKEN = process.env.CF_API_TOKEN || '';
if (!TOKEN) { console.error('Missing CF_API_TOKEN environment variable. Set it before running deploy.'); process.exit(1); }
const ACCT = '411618ac8eb6523118fd89739f6df2b9';
const NAME = 'flat-mud-c136';
const BOUNDARY = '----CF' + Date.now();
const CRLF = '\r\n';
const BASE = 'dist-seo';

const SKIP = new Set(['.jpg','.jpeg','.png','.webp','.mp4']);

// Read all text/SVG files
const files = {};
const queue = [''];
while (queue.length) {
  const dir = queue.shift();
  const fullDir = path.join(BASE, dir);
  if (!fs.existsSync(fullDir)) continue;
  for (const entry of fs.readdirSync(fullDir, { withFileTypes: true })) {
    const rel = dir ? dir + '/' + entry.name : entry.name;
    if (entry.isDirectory()) { queue.push(rel); continue; }
    const ext = path.extname(entry.name).toLowerCase();
    if (SKIP.has(ext)) continue;
    files[rel] = fs.readFileSync(path.join(fullDir, entry.name), 'utf8');
  }
}
console.log(`Embedded ${Object.keys(files).length} files`);

const filesJson = JSON.stringify(files);
const worker = `
const F=JSON.parse(new TextDecoder().decode(Uint8Array.from(atob('${Buffer.from(filesJson).toString('base64')}'),c=>c.charCodeAt(0))));
const M=Object.fromEntries(Object.entries({
  '.html':'text/html;charset=UTF-8','.css':'text/css;charset=UTF-8','.js':'application/javascript',
  '.svg':'image/svg+xml','.json':'application/json','.txt':'text/plain','.xml':'application/xml'
}).map(([k,v])=>[k,{'content-type':v,'cache-control':'public,max-age=3600'}]));
const H={'x-content-type-options':'nosniff','x-frame-options':'DENY','referrer-policy':'strict-origin-when-cross-origin','permissions-policy':'camera=(), microphone=(), geolocation=()','content-security-policy':"default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none'",'strict-transport-security':'max-age=31536000'};
const SPA=['/products','/contact','/about','/faq','/portfolio','/industries','/support','/warranty','/shipping-policy','/returns-policy'];
const BLOG_PATHS=['/blog','/blog/'];

export default{async fetch(r){
  const url=new URL(r.url);
  let p=url.pathname;
  if(p==='/')p='/index.html';
  let k=p.replace(/^\\//,'');

  // Blog routes
  if(p==='/blog'||p==='/blog/'){return new Response(F['blog/index.html'],{headers:Object.assign({},H,{'content-type':'text/html;charset=UTF-8'})})}
  let bm=null;if(p.startsWith('/blog/')&&p.length>6){bm=p.split('/').filter(x=>x)[1]}
  if(bm&&F['blog/'+bm+'.html']){return new Response(F['blog/'+bm+'.html'],{headers:Object.assign({},H,{'content-type':'text/html;charset=UTF-8'})})}

  // Known file → serve directly
  if(F[k]){
    const h={};const e=k.substring(k.lastIndexOf('.')).toLowerCase();
    if(M[e])Object.assign(h,M[e]);
    else h['content-type']='text/plain';
    // Add Vary header for SPA routing
    h['vary']='Accept-Encoding';
    return new Response(F[k],{headers:Object.assign({},H,h)});
  }

  // SPA routes → redirect to hash route for proper navigation
  for(const s of SPA){if(p===s||p.startsWith(s+'/'))return Response.redirect(url.origin+'/#'+p.replace(/^\\//,''),301)}

  // Image proxy from Accio CDN
  if(/\\.(jpg|png|webp|jpeg)\$/i.test(k))return fetch('https://mili-packaging.site.accio.ai/'+k,{cf:{cacheEverything:true}});

  // Fallback → SPA index
  return new Response(F['index.html'],{headers:Object.assign({},H,{'content-type':'text/html;charset=UTF-8'})});
}}`;

const wSize = Buffer.byteLength(worker, 'utf8');
console.log(`Worker: ${(wSize/1024).toFixed(0)}KB (limit 1MB)`);
if (wSize > 1000000) { console.error('Too large!'); process.exit(1); }

const metadata = JSON.stringify({ main_module: 'worker.js' });
const body = Buffer.from([
  `--${BOUNDARY}${CRLF}Content-Disposition: form-data; name="metadata"${CRLF}${CRLF}${metadata}${CRLF}`,
  `--${BOUNDARY}${CRLF}Content-Disposition: form-data; name="worker.js"; filename="worker.js"${CRLF}Content-Type: application/javascript+module${CRLF}${CRLF}${worker}${CRLF}`,
  `--${BOUNDARY}--${CRLF}`
].join(''));

const req = https.request({
  hostname: 'api.cloudflare.com',
  path: `/client/v4/accounts/${ACCT}/workers/scripts/${NAME}`,
  method: 'PUT',
  headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': `multipart/form-data; boundary=${BOUNDARY}`, 'Content-Length': body.length }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const j = JSON.parse(d);
    console.log(j.success ? '✅ Deployed! Refresh mili-packaging.com' : '❌ '+JSON.stringify(j.errors));
  });
});
req.on('error', e => console.error(e.message));
req.write(body);
req.end();
