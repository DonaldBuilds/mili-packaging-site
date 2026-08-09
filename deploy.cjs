const fs = require('fs');
const path = require('path');
const https = require('https');
const zlib = require('zlib');

const SKIP_UPLOAD = process.env.SKIP_UPLOAD === '1';
const TOKEN = process.env.CF_API_TOKEN || '';
if (!TOKEN && !SKIP_UPLOAD) { console.error('Missing CF_API_TOKEN environment variable. Set it before running deploy.'); process.exit(1); }
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
// Gzip the embedded payload so the worker script stays well under CF's 1MB limit
// (raw base64 of all assets grew past 1MB as the catalog expanded).
const gz = zlib.gzipSync(Buffer.from(filesJson, 'utf8'));
const b64 = gz.toString('base64');
const worker = `
const B64='${b64}';
let F=null;
async function getF(){
  if(F)return F;
  // Decompress lazily INSIDE the fetch handler: CF forbids async I/O in global scope (error 10021).
  const txt=await new Response(new Blob([Uint8Array.from(atob(B64),c=>c.charCodeAt(0))]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
  F=JSON.parse(txt);
  return F;
}
const M=Object.fromEntries(Object.entries({
  '.html':['text/html;charset=UTF-8','no-cache'],
  '.css':['text/css;charset=UTF-8','public,max-age=3600'],
  '.js':['application/javascript','public,max-age=3600'],
  '.svg':['image/svg+xml','public,max-age=3600'],
  '.json':['application/json','public,max-age=3600'],
  '.txt':['text/plain','public,max-age=3600'],
  '.xml':['application/xml','public,max-age=3600']
}).map(([k,[ct,cc]])=>[k,{'content-type':ct,'cache-control':cc}]));
const H={'x-content-type-options':'nosniff','x-frame-options':'DENY','referrer-policy':'strict-origin-when-cross-origin','permissions-policy':'camera=(), microphone=(), geolocation=()','content-security-policy':"default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none'",'strict-transport-security':'max-age=31536000'};
const BLOG_PATHS=['/blog','/blog/'];

export default{async fetch(r,env){
  const F=await getF();
  const url=new URL(r.url);
  let p=url.pathname;
  if(p==='/')p='/index.html';
  let k=p.replace(/^\//,'');
  const OPS_PIN=(env&&env.OPS_PIN)||'mili2026';
  const OPS_GH_PAT=(env&&env.OPS_GH_PAT)||'';

  // ── Ops API: workbench product edits → GitHub commit → auto deploy ──
  if(p==='/api/content'&&r.method==='POST'){
    try{
      if(r.headers.get('x-ops-pin')!==OPS_PIN)return new Response(JSON.stringify({ok:false,error:'unauthorized'}),{status:401,headers:{'content-type':'application/json'}});
      if(!OPS_GH_PAT)return new Response(JSON.stringify({ok:false,error:'server-not-configured'}),{status:500,headers:{'content-type':'application/json'}});
      const body=await r.json();
      const gh='https://api.github.com/repos/DonaldBuilds/mili-packaging-site/contents/src/data/products.json';
      const ghH={authorization:'Bearer '+OPS_GH_PAT,'accept':'application/vnd.github+json','user-agent':'mili-ops','content-type':'application/json'};
      const cur=await fetch(gh,{headers:ghH});
      if(!cur.ok)return new Response(JSON.stringify({ok:false,error:'github-read:'+cur.status}),{status:502,headers:{'content-type':'application/json'}});
      const meta=await cur.json();
      const data=JSON.parse(decodeURIComponent(escape(atob(meta.content))));
      const ops=body.ops||[];
      for(const op of ops){
        if(op.action==='product'&&op.group&&op.slug&&op.fields){
          const list=data.productCatalog[op.group];
          if(!Array.isArray(list))return new Response(JSON.stringify({ok:false,error:'group-not-found:'+op.group}),{status:400,headers:{'content-type':'application/json'}});
          const prod=list.find(x=>x.slug===op.slug);
          if(!prod)return new Response(JSON.stringify({ok:false,error:'product-not-found:'+op.slug}),{status:400,headers:{'content-type':'application/json'}});
          Object.assign(prod,op.fields);
        } else if(op.action==='group'&&op.group&&op.fields){
          const g=data.productGroups.find(x=>x.slug===op.group);
          if(!g)return new Response(JSON.stringify({ok:false,error:'group-not-found:'+op.group}),{status:400,headers:{'content-type':'application/json'}});
          Object.assign(g,op.fields);
        } else {
          return new Response(JSON.stringify({ok:false,error:'unknown-op'}),{status:400,headers:{'content-type':'application/json'}});
        }
      }
      const put=await fetch(gh,{method:'PUT',headers:ghH,body:JSON.stringify({message:'ops: workbench update '+new Date().toISOString().slice(0,16)+'Z',content:btoa(unescape(encodeURIComponent(JSON.stringify(data)))),sha:meta.sha})});
      if(!put.ok)return new Response(JSON.stringify({ok:false,error:'github-write:'+put.status}),{status:502,headers:{'content-type':'application/json'}});
      return new Response(JSON.stringify({ok:true,message:'updated & pushed — auto-deploy started'}),{headers:{'content-type':'application/json'}});
    }catch(e){return new Response(JSON.stringify({ok:false,error:String(e&&e.message||e)}),{status:500,headers:{'content-type':'application/json'}})}
  }

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

  // SPA routes → fall through to index.html (History-mode routing, no hash redirects)

  // Image proxy from Accio CDN
  if(/\\.(jpg|png|webp|jpeg)\$/i.test(k))return fetch('https://mili-packaging.site.accio.ai/'+k,{cf:{cacheEverything:true}});

  // Fallback → SPA index
  return new Response(F['index.html'],{headers:Object.assign({},H,{'content-type':'text/html;charset=UTF-8'})});
}}`;

const wSize = Buffer.byteLength(worker, 'utf8');
console.log(`Worker: ${(wSize/1024).toFixed(0)}KB (limit 1MB)`);
if (wSize > 1000000) { console.error('Too large!'); process.exit(1); }

if (SKIP_UPLOAD) {
  fs.writeFileSync(path.join(BASE, 'worker.test.mjs'), worker, 'utf8');
  console.log('SKIP_UPLOAD: wrote dist-seo/worker.test.mjs for local smoke test');
  process.exit(0);
}

const metadata = JSON.stringify({ main_module: 'worker.js' });
const body = Buffer.from([
  `--${BOUNDARY}${CRLF}Content-Disposition: form-data; name="metadata"${CRLF}${CRLF}${metadata}${CRLF}`,
  `--${BOUNDARY}${CRLF}Content-Disposition: form-data; name="worker.js"; filename="worker.js"${CRLF}Content-Type: application/javascript+module${CRLF}${CRLF}${worker}${CRLF}`,
  `--${BOUNDARY}--${CRLF}`
].join(''));

function deploy(attempt) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.cloudflare.com',
      path: `/client/v4/accounts/${ACCT}/workers/scripts/${NAME}`,
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': `multipart/form-data; boundary=${BOUNDARY}`, 'Content-Length': body.length }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          if (j.success) { console.log(`✅ Deployed on attempt ${attempt}!`); resolve(); }
          else { console.error('❌ ' + JSON.stringify(j.errors)); reject(new Error('api_error')); }
        } catch (e) { reject(e); }
      });
    });
    req.on('error', e => { console.error(`Attempt ${attempt} failed: ${e.message}`); reject(e); });
    req.write(body);
    req.end();
  });
}

function purgeCache() {
  return new Promise((resolve) => {
    const listReq = https.request({
      hostname: 'api.cloudflare.com',
      path: '/client/v4/zones?per_page=50',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const zones = (j.result || []).map(z => z.id);
          if (!zones.length) { console.log('⚠️ No zones found for purge — HTML is no-cache so deploy is effective immediately.'); return resolve(); }
          let done = 0;
          zones.forEach(zid => {
            const body = JSON.stringify({ purge_everything: true });
            const req2 = https.request({
              hostname: 'api.cloudflare.com',
              path: `/client/v4/zones/${zid}/purge_cache`,
              method: 'POST',
              headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
            }, res2 => {
              let d2 = '';
              res2.on('data', c => d2 += c);
              res2.on('end', () => {
                try {
                  const j2 = JSON.parse(d2);
                  console.log(j2.success ? `✅ Purged zone ${zid}` : `⚠️ Purge failed for ${zid}: ${JSON.stringify(j2.errors)}`);
                } catch (e) { console.log('⚠️ Purge parse error for ' + zid); }
                if (++done === zones.length) resolve();
              });
            });
            req2.on('error', e => { console.log(`⚠️ Purge request error for ${zid}: ${e.message}`); if (++done === zones.length) resolve(); });
            req2.write(body);
            req2.end();
          });
        } catch (e) { console.log('⚠️ Purge zone list error: ' + e.message); resolve(); }
      });
    });
    listReq.on('error', e => { console.log('⚠️ Purge zone list request error: ' + e.message); resolve(); });
    listReq.end();
  });
}

(async () => {
  const MAX = 4;
  for (let i = 1; i <= MAX; i++) {
    try {
      await deploy(i);
      await purgeCache();
      process.exit(0);
    } catch (e) {
      if (i === MAX) { console.error('Deploy failed after ' + MAX + ' attempts.'); process.exit(1); }
      await new Promise(r => setTimeout(r, 3000));
    }
  }
})();
