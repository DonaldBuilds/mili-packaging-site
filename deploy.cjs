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
const LOGIN_HTML='<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex,nofollow"/><title>Mili 运营工作台 · 登录</title><style>body{background:#0a0a0a;color:#e8e8e8;font-family:"Segoe UI",system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}.box{background:#141416;border:1px solid #2a2a2e;padding:44px 40px;border-radius:8px;width:340px;max-width:90vw}.box h1{font-size:18px;margin:0 0 6px}.box h1 span{color:#c9a227}.sub{color:#9a9a9a;font-size:12px;margin:0 0 24px}input{width:100%;background:#0e0e10;border:1px solid #2a2a2e;color:#e8e8e8;padding:12px;border-radius:4px;font-size:14px;box-sizing:border-box}button{width:100%;background:#c9a227;color:#0a0a0a;border:none;padding:12px;border-radius:4px;font-size:14px;font-weight:700;margin-top:14px;cursor:pointer}#msg{color:#ff6b6b;font-size:12px;margin-top:12px;min-height:16px}.hint{color:#555;font-size:11px;margin-top:16px;text-align:center}</style></head><body><div class="box"><h1>Mili Packaging <span>运营工作台</span></h1><p class="sub">内部系统 · 请先登录（会话 24h）</p><input id="pw" type="password" placeholder="管理员密码" autocomplete="current-password"/><button id="btn">登 录</button><p id="msg"></p><div class="hint">登录后自动进入工作台</div></div><script>var b=document.getElementById("btn"),i=document.getElementById("pw"),m=document.getElementById("msg");function go(){m.textContent="";fetch("/api/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({password:i.value})}).then(function(r){if(r.ok){location.href="/admin.html"}else{return r.json().then(function(j){m.textContent=j.error==="bad-credentials"?"密码错误":"登录失败 ("+j.error+")"})}}).catch(function(){m.textContent="网络错误，请重试"})}b.onclick=go;i.addEventListener("keydown",function(e){if(e.key==="Enter")go()});</script></body></html>';

export default{async fetch(r,env){
  const F=await getF();
  const url=new URL(r.url);
  let p=url.pathname;
  if(p==='/')p='/index.html';
  let k=p.length>1&&p[0]==='/'?p.slice(1):p;
  const OPS_GH_PAT=(env&&env.OPS_GH_PAT)||'';

  // ── v4 Security: session (HMAC cookie), rate limit, audit ring ──
  const SESSION_SECRET=(env&&env.SESSION_SECRET)||'d9bd1a6dab1fda8f6c9766f1836d5b203c145c9f47554ca334da5becc6859bc9';
  const ADMIN_PW_HASH=(env&&env.ADMIN_PW_HASH)||'7377a71607a8dabc029ab10e7a6a895b92e87762538b10ce8b10c4c9ddc74448';
  const AUDIT_LOG=(globalThis.__miliAudit=globalThis.__miliAudit||[]);
  const RL=(globalThis.__miliRl=globalThis.__miliRl||{});
  const sha256hex=async function(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return[...new Uint8Array(b)].map(function(x){return x.toString(16).padStart(2,'0')}).join('')};
  const hmacHex=async function(msg){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(SESSION_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);const sig=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(msg));return[...new Uint8Array(sig)].map(function(x){return x.toString(16).padStart(2,'0')}).join('')};
  const getCookie=function(name){const m=(r.headers.get('cookie')||'').match(new RegExp('(?:^|; )'+name+'=([^;]*)'));return m?decodeURIComponent(m[1]):null};
  const sessionValid=async function(){const t=getCookie('mili_session');if(!t)return false;const sp=t.split('.');if(sp.length!==2)return false;const exp=parseInt(sp[0],10);if(!exp||exp<Date.now())return false;try{const sig=await hmacHex('mili_session.'+exp);if(sig.length!==sp[1].length)return false;let ok=true;for(let i=0;i<sig.length;i++){if(sig[i]!==sp[1][i]){ok=false;break}}return ok}catch(e){return false}};
  const audit=function(action,obj,before,after){const rec={t:new Date().toISOString(),actor:'admin',action:action,obj:obj,before:before,after:after};AUDIT_LOG.push(rec);if(AUDIT_LOG.length>500)AUDIT_LOG.splice(0,AUDIT_LOG.length-500)};
  const ip=(r.headers.get('cf-connecting-ip'))||'unknown';const now=Date.now();const rc=RL[ip];
  if(!rc||rc.r<now){RL[ip]={n:1,r:now+60000}}else{RL[ip].n++;if(RL[ip].n>60)return new Response(JSON.stringify({ok:false,error:'rate-limited'}),{status:429,headers:{'content-type':'application/json'}})}

  // ── Auth API（/api/login 免会话，其余 /api/* 需会话） ──
  if(p==='/api/login'&&r.method==='POST'){
    try{
      const b=await r.json();
      const h=await sha256hex(String((b&&b.password)||''));
      if(h!==ADMIN_PW_HASH)return new Response(JSON.stringify({ok:false,error:'bad-credentials'}),{status:401,headers:{'content-type':'application/json'}});
      const exp=Date.now()+86400000;
      const sig=await hmacHex('mili_session.'+exp);
      return new Response(JSON.stringify({ok:true,exp:exp}),{headers:{'content-type':'application/json','set-cookie':'mili_session='+exp+'.'+sig+'; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400'}});
    }catch(e){return new Response(JSON.stringify({ok:false,error:'bad-request'}),{status:400,headers:{'content-type':'application/json'}})}
  }
  if(p==='/api/logout'){return new Response(JSON.stringify({ok:true}),{headers:{'content-type':'application/json','set-cookie':'mili_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0'}})}
  if(p.startsWith('/api/')){
    if(!(await sessionValid()))return new Response(JSON.stringify({ok:false,error:'unauthorized'}),{status:401,headers:{'content-type':'application/json'}});
    if(p==='/api/session')return new Response(JSON.stringify({ok:true}),{headers:{'content-type':'application/json'}});
    if(p==='/api/audit')return new Response(JSON.stringify({ok:true,logs:AUDIT_LOG.slice().reverse()}),{headers:{'content-type':'application/json'}});
  }

  // admin.html 鉴权：未登录返回登录页
  if(k==='admin.html'&&!(await sessionValid())){
    return new Response(LOGIN_HTML,{headers:Object.assign({},H,{'content-type':'text/html;charset=UTF-8','cache-control':'no-store'})});
  }

  // ── Ops API: workbench product edits → GitHub commit → auto deploy ──
  if(p==='/api/content'&&r.method==='POST'){
    try{
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
          const before=JSON.parse(JSON.stringify(prod));
          Object.assign(prod,op.fields);
          audit('product.update',op.group+'/'+op.slug,before,JSON.parse(JSON.stringify(prod)));
        } else if(op.action==='group'&&op.group&&op.fields){
          const g=data.productGroups.find(x=>x.slug===op.group);
          if(!g)return new Response(JSON.stringify({ok:false,error:'group-not-found:'+op.group}),{status:400,headers:{'content-type':'application/json'}});
          const before=JSON.parse(JSON.stringify(g));
          Object.assign(g,op.fields);
          audit('group.update',op.group,before,JSON.parse(JSON.stringify(g)));
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

// Env vars injected at deploy time (read from process env; absent → worker falls back to dev defaults).
// Production: set ADMIN_PW_HASH / SESSION_SECRET / PUSHPLUS_TOKEN / LLM_API_KEY in the CI/deploy env.
const VARS = {};
['ADMIN_PW_HASH', 'SESSION_SECRET', 'PUSHPLUS_TOKEN', 'LLM_API_KEY', 'LLM_ENDPOINT'].forEach(v => { if (process.env[v]) VARS[v] = process.env[v]; });
const metadata = JSON.stringify({ main_module: 'worker.js', vars: VARS });
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
