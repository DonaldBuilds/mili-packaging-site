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
    if (entry.name === 'worker.test.mjs') continue; // smoke-test artifact, never embed
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

// ── v5: GA4 + GSC dashboard helpers (Service Account JWT, 1h in-memory cache) ──
const V5_CACHE=(globalThis.__miliV5=globalThis.__miliV5||{});
const V5_TTL=3600000;
const b64url=function(s){let x=btoa(s);x=x.split('+').join('-').split('/').join('_');while(x.length&&x.endsWith('='))x=x.slice(0,-1);return x};
const b64uJson=function(o){return b64url(unescape(encodeURIComponent(JSON.stringify(o))))};
const u8b64=function(u8){let s='';for(let i=0;i<u8.length;i++)s+=String.fromCharCode(u8[i]);return b64url(s)};
const pemToDer=function(pem){const body=pem.replace(/-----BEGIN [A-Z ]*KEY-----/g,'').replace(/-----END [A-Z ]*KEY-----/g,'').replace(/\\n/g,'').replace(/\\s/g,'');const bin=atob(body);const arr=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);return arr};
const jwtAssertion=async function(svc){
  const now=Math.floor(Date.now()/1000);
  const header=b64uJson({alg:'RS256',typ:'JWT'});
  const claims=b64uJson({iss:svc.client_email,scope:'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly',aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+3600});
  const key=await crypto.subtle.importKey('pkcs8',pemToDer(svc.private_key),{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['sign']);
  const sig=await crypto.subtle.sign('RSASSA-PKCS1-v1_5',key,new TextEncoder().encode(header+'.'+claims));
  return header+'.'+claims+'.'+u8b64(new Uint8Array(sig));
};
const oauthToken=async function(svcJson){
  const svc=JSON.parse(svcJson);
  const assertion=await jwtAssertion(svc);
  const r=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion:assertion}).toString()});
  const d=await r.json();
  if(!d.access_token)throw new Error('oauth-fail:'+((d&&d.error)||'')+':'+((d&&d.error_description)||''));
  return d.access_token;
};
const llmChat=async function(env,messages){
  let ep=(env.LLM_ENDPOINT||'https://api.openai.com/v1');
  if(ep.endsWith('/'))ep=ep.slice(0,-1);
  const r=await fetch(ep+'/chat/completions',{method:'POST',headers:{authorization:'Bearer '+env.LLM_API_KEY,'content-type':'application/json'},body:JSON.stringify({model:'qwen-plus',messages:messages,max_tokens:1200})});
  const d=await r.json();
  if(!r.ok)throw new Error('llm:'+r.status+':'+JSON.stringify(d).slice(0,140));
  return (d.choices&&d.choices[0]&&d.choices[0].message&&d.choices[0].message.content)||'';
};
const ga4Report=async function(token,prop,path,body){
  const r=await fetch('https://analyticsdata.googleapis.com/v1beta/properties/'+prop+':'+path,{method:'POST',headers:{authorization:'Bearer '+token,'content-type':'application/json'},body:JSON.stringify(body)});
  const d=await r.json();
  if(!r.ok)throw new Error('ga4:'+r.status+':'+JSON.stringify(d.error||{}).slice(0,220));
  return d;
};
const gscQuery=async function(token,site,body){
  const r=await fetch('https://www.googleapis.com/webmasters/v3/sites/'+encodeURIComponent(site)+'/searchAnalytics/query',{method:'POST',headers:{authorization:'Bearer '+token,'content-type':'application/json'},body:JSON.stringify(body)});
  const d=await r.json();
  if(!r.ok)throw new Error('gsc:'+r.status);
  return d;
};
const rowsToObj=function(d){
  const out=[];const rs=d.rows||[];
  for(const row of rs){out.push({d:row.dimensionValues?row.dimensionValues.map(function(x){return x.value}):[],m:row.metricValues?row.metricValues.map(function(x){return parseFloat(x.value)}):[]})}
  return out;
};
const ga4DateRange=function(days){const end=new Date(Date.now()-86400000);const start=new Date(Date.now()-days*86400000);const f=function(dt){return dt.getUTCFullYear()+'-'+String(dt.getUTCMonth()+1).padStart(2,'0')+'-'+String(dt.getUTCDate()).padStart(2,'0')};return {start:f(start),end:f(end)}};
const handleV5=async function(env,url){
  try{
    if(!env.GA4_SERVICE_JSON||!env.GA4_PROPERTY_ID){return new Response(JSON.stringify({ok:true,configured:false,message:'GA4 未配置'}),{headers:{'content-type':'application/json'}})}
    const range=url.searchParams.get('range')||'7d';
    const days=range==='1d'?1:(range==='30d'?30:7);
    const ck='v5:'+range;
    const hit=V5_CACHE[ck];
    if(hit&&(Date.now()-hit.t)<V5_TTL){return new Response(JSON.stringify({ok:true,configured:true,cache:'hit',generatedAt:hit.generatedAt,modules:hit.data}),{headers:{'content-type':'application/json'}})}
    const token=await oauthToken(env.GA4_SERVICE_JSON);
    const prop=env.GA4_PROPERTY_ID;
    const range1=ga4DateRange(days);const range0=ga4DateRange(days*2);
    const ov=await ga4Report(token,prop,'runReport',{dateRanges:[{startDate:range1.start,endDate:range1.end}],dimensions:[{name:'date'}],metrics:[{name:'activeUsers'},{name:'sessions'},{name:'bounceRate'},{name:'averageSessionDuration'}]});
    const ov0=await ga4Report(token,prop,'runReport',{dateRanges:[{startDate:range0.start,endDate:range1.start}],metrics:[{name:'activeUsers'},{name:'sessions'},{name:'bounceRate'},{name:'averageSessionDuration'}]});
    const src=await ga4Report(token,prop,'runReport',{dateRanges:[{startDate:range1.start,endDate:range1.end}],dimensions:[{name:'sessionDefaultChannelGroup'}],metrics:[{name:'sessions'}]});
    const dev=await ga4Report(token,prop,'runReport',{dateRanges:[{startDate:range1.start,endDate:range1.end}],dimensions:[{name:'deviceCategory'}],metrics:[{name:'sessions'}]});
    const geo=await ga4Report(token,prop,'runReport',{dateRanges:[{startDate:range1.start,endDate:range1.end}],dimensions:[{name:'country'}],metrics:[{name:'activeUsers'}]});
    const city=await ga4Report(token,prop,'runReport',{dateRanges:[{startDate:range1.start,endDate:range1.end}],dimensions:[{name:'city'}],metrics:[{name:'activeUsers'}]});
    const pg=await ga4Report(token,prop,'runReport',{dateRanges:[{startDate:range1.start,endDate:range1.end}],dimensions:[{name:'landingPage'}],metrics:[{name:'sessions'}]});
    const ev=await ga4Report(token,prop,'runReport',{dateRanges:[{startDate:range1.start,endDate:range1.end}],dimensions:[{name:'eventName'}],metrics:[{name:'eventCount'}],dimensionFilter:{filter:{fieldName:'eventName',inListFilter:{values:['whatsapp_click','form_submit','page_view','session_start']}}}});
    const modules={overview:{rows:rowsToObj(ov),prev:rowsToObj(ov0)},sources:rowsToObj(src),devices:rowsToObj(dev),geo:rowsToObj(geo),city:rowsToObj(city),pages:rowsToObj(pg),events:rowsToObj(ev)};
    let seo=null;
    if(env.GSC_SERVICE_JSON&&env.GSC_SITE_URL){
      try{const gt=await oauthToken(env.GSC_SERVICE_JSON);const q=await gscQuery(gt,env.GSC_SITE_URL,{startDate:range1.start,endDate:range1.end,dimensions:['query'],rowLimit:20});seo=rowsToObj(q)}catch(e){seo={error:'gsc:'+String((e&&e.message)||e)}}
    }
    modules.seo=seo;
    V5_CACHE[ck]={t:Date.now(),generatedAt:new Date().toISOString(),data:modules};
    return new Response(JSON.stringify({ok:true,configured:true,cache:'miss',generatedAt:V5_CACHE[ck].generatedAt,modules:modules}),{headers:{'content-type':'application/json'}});
  }catch(e){return new Response(JSON.stringify({ok:false,error:String((e&&e.message)||e)}),{status:500,headers:{'content-type':'application/json'}})}
};
// Supabase 内置默认（anon key 为公开密钥，前端已使用；env 可覆盖）
const SB_DEF_URL='https://qfecxuuvgbqqruzfgrpl.supabase.co';
const SB_DEF_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmZWN4dXV2Z2JxcXJ1emZncnBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5ODgwMDEsImV4cCI6MjEwMDU2NDAwMX0.l_nwv0I1ZogH34_2EFBcJKyMMkYAzWbOc3cEkkFUMp0';
const sbU=function(env){return(env&&env.SB_URL)||SB_DEF_URL};
const sbK=function(env){return(env&&env.SB_ANON_KEY)||SB_DEF_KEY};
const handleConfigTest=async function(env){
  const out={};
  if(env.OPS_GH_PAT){
    try{const r=await fetch('https://api.github.com/user',{headers:{authorization:'Bearer '+env.OPS_GH_PAT,'user-agent':'mili-ops'}});out.gh_pat=r.ok?'ok':'fail:'+r.status}catch(e){out.gh_pat='fail'}
  }else{out.gh_pat='not-configured'}
  if(env.PUSHPLUS_TOKEN){
    try{const r=await fetch('https://www.pushplus.plus/send',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({token:env.PUSHPLUS_TOKEN,title:'Mili 工作台连通性测试',content:'✅ PushPlus 微信通知通道正常',template:'txt'})});out.pushplus=r.ok?'ok':'fail:'+r.status}catch(e){out.pushplus='fail'}
  }else{out.pushplus='not-configured'}
  if(env.GA4_SERVICE_JSON&&env.GA4_PROPERTY_ID){
    try{const t=await oauthToken(env.GA4_SERVICE_JSON);const dr1=ga4DateRange(1);await ga4Report(t,env.GA4_PROPERTY_ID,'runReport',{dateRanges:[{startDate:dr1.start,endDate:dr1.end}],metrics:[{name:'activeUsers'}]});out.ga4='ok'}catch(e){out.ga4='fail:'+String((e&&e.message)||e)}
  }else{out.ga4='not-configured'}
  if(env.GSC_SERVICE_JSON&&env.GSC_SITE_URL){
    try{const t=await oauthToken(env.GSC_SERVICE_JSON);const dr=ga4DateRange(7);await gscQuery(t,env.GSC_SITE_URL,{startDate:dr.start,endDate:dr.end,rowLimit:1});out.gsc='ok'}catch(e){out.gsc='fail:'+String((e&&e.message)||e)}
  }else{out.gsc='not-configured'}
  try{const r=await fetch(sbU(env)+'/rest/v1/inquiries?select=id&limit=1',{headers:{apikey:sbK(env),Authorization:'Bearer '+sbK(env)}});out.supabase=r.ok?'ok':'fail:'+r.status}catch(e){out.supabase='fail'}
  if(env.LLM_API_KEY){try{const c=await llmChat(env,[{role:'user',content:'只回复两个字：正常'}]);out.llm=c?'ok':'ok-empty'}catch(e){out.llm='fail:'+String((e&&e.message)||e)}}else{out.llm='not-configured'}
  out.indexnow=env.INDEXNOW_KEY?'ok':'not-configured';
  out.admin_pw=env.ADMIN_PW_HASH?'ok':'ok-default';
  return new Response(JSON.stringify({ok:true,results:out}),{headers:{'content-type':'application/json'}});
};
const handleV5Realtime=async function(env){
  try{
    if(!env.GA4_SERVICE_JSON||!env.GA4_PROPERTY_ID)return new Response(JSON.stringify({ok:true,configured:false}),{headers:{'content-type':'application/json'}});
    const token=await oauthToken(env.GA4_SERVICE_JSON);
    const rt=await ga4Report(token,env.GA4_PROPERTY_ID,'runRealtimeReport',{dimensions:[{name:'unifiedScreenName'}],metrics:[{name:'activeUsers'}]});
    return new Response(JSON.stringify({ok:true,configured:true,realtime:rowsToObj(rt)}),{headers:{'content-type':'application/json'}});
  }catch(e){return new Response(JSON.stringify({ok:false,error:String((e&&e.message)||e)}),{status:500,headers:{'content-type':'application/json'}})}
};
const LOGIN_HTML='<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex,nofollow"/><title>Mili 运营工作台 · 登录</title><style>body{background:#0a0a0a;color:#e8e8e8;font-family:"Segoe UI",system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}.box{background:#141416;border:1px solid #2a2a2e;padding:44px 40px;border-radius:8px;width:340px;max-width:90vw}.box h1{font-size:18px;margin:0 0 6px}.box h1 span{color:#c9a227}.sub{color:#9a9a9a;font-size:12px;margin:0 0 24px}input{width:100%;background:#0e0e10;border:1px solid #2a2a2e;color:#e8e8e8;padding:12px;border-radius:4px;font-size:14px;box-sizing:border-box}button{width:100%;background:#c9a227;color:#0a0a0a;border:none;padding:12px;border-radius:4px;font-size:14px;font-weight:700;margin-top:14px;cursor:pointer}#msg{color:#ff6b6b;font-size:12px;margin-top:12px;min-height:16px}.hint{color:#555;font-size:11px;margin-top:16px;text-align:center}</style></head><body><div class="box"><h1>Mili Packaging <span>运营工作台</span></h1><p class="sub">内部系统 · 请先登录（会话 24h）</p><input id="pw" type="password" placeholder="管理员密码" autocomplete="current-password"/><button id="btn">登 录</button><p id="msg"></p><div class="hint">登录后自动进入工作台</div></div><script>var b=document.getElementById("btn"),i=document.getElementById("pw"),m=document.getElementById("msg");function go(){m.textContent="";fetch("/api/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({password:i.value})}).then(function(r){if(r.ok){location.href="/admin.html"}else{return r.json().then(function(j){m.textContent=j.error==="bad-credentials"?"密码错误":"登录失败 ("+j.error+")"})}}).catch(function(){m.textContent="网络错误，请重试"})}b.onclick=go;i.addEventListener("keydown",function(e){if(e.key==="Enter")go()});</script></body></html>';

export default{async fetch(r,env){
  const url=new URL(r.url);
  // SEO: force HTTPS (single canonical host, no http/https duplication)
  if(url.protocol==='http:')return Response.redirect('https://'+url.host+url.pathname+url.search,301);
  const F=await getF();
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
    if(p==='/api/v5/status')return new Response(JSON.stringify({ok:true,ga4:{configured:!!(env.GA4_SERVICE_JSON&&env.GA4_PROPERTY_ID),propertyId:env.GA4_PROPERTY_ID||''},gsc:{configured:!!(env.GSC_SERVICE_JSON&&env.GSC_SITE_URL),site:env.GSC_SITE_URL||''}}),{headers:{'content-type':'application/json'}});
    if(p==='/api/config')return new Response(JSON.stringify({ok:true,configs:{
      gh_pat:{ok:!!env.OPS_GH_PAT,hint:'产品编辑发布、审计持久化、sitemap 自动重建'},
      pushplus:{ok:!!env.PUSHPLUS_TOKEN,hint:'简报/巡检/告警微信推送'},
      ga4:{ok:!!(env.GA4_SERVICE_JSON&&env.GA4_PROPERTY_ID),hint:'数据驾驶舱流量与转化'},
      gsc:{ok:!!(env.GSC_SERVICE_JSON&&env.GSC_SITE_URL),hint:'数据驾驶舱 SEO 关键词'},
      llm:{ok:!!env.LLM_API_KEY,hint:'AI 优化建议（当前规则引擎降级）'},
      indexnow:{ok:!!env.INDEXNOW_KEY,hint:'Bing 收录加速'},
      supabase:{ok:true,hint:'询盘入库与统计（内置默认，env 可覆盖）'},
      admin_pw:{ok:!!env.ADMIN_PW_HASH,hint:'登录密码（当前为默认值，建议设置独立哈希）'}
    }}),{headers:{'content-type':'application/json'}});
    if(p==='/api/config/test'){return handleConfigTest(env)}
    if(p==='/api/v5/refresh'){const keys=Object.keys(V5_CACHE);keys.forEach(function(k){delete V5_CACHE[k]});return new Response(JSON.stringify({ok:true,cleared:keys.length}),{headers:{'content-type':'application/json'}})}
    if(p==='/api/v5/dashboard'){return handleV5(env,url)}
    if(p==='/api/v5/realtime'){return handleV5Realtime(env)}
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
          if(!prod){prod={slug:op.slug,name:op.slug};list.push(prod);}
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

  // ── products data proxy（GitHub API 实时读取，绕开 raw CDN 超时）──
  if(p==='/api/products'&&r.method==='GET'){
    try{
      if(!(await sessionValid()))return new Response(JSON.stringify({ok:false,error:'unauthorized'}),{status:401,headers:{'content-type':'application/json'}});
      if(!env.OPS_GH_PAT)return new Response(JSON.stringify({ok:false,error:'gh-pat-not-configured'}),{status:400,headers:{'content-type':'application/json'}});
      const ghH={authorization:'Bearer '+env.OPS_GH_PAT,'user-agent':'mili-ops','accept':'application/vnd.github+json'};
      const m=await (await fetch('https://api.github.com/repos/DonaldBuilds/mili-packaging-site/contents/src/data/products.json?ref=main',{headers:ghH})).json();
      if(!m.content)throw new Error('github-read-fail');
      const data=JSON.parse(decodeURIComponent(escape(atob(m.content))));
      return new Response(JSON.stringify(data),{headers:{'content-type':'application/json'}});
    }catch(e){return new Response(JSON.stringify({ok:false,error:String((e&&e.message)||e)}),{status:500,headers:{'content-type':'application/json'}})}
  }

  // ── AI advice: LLM-powered SEO suggestions ──
  if(p==='/api/ai/advice'&&r.method==='POST'){
    try{
      if(!(await sessionValid()))return new Response(JSON.stringify({ok:false,error:'unauthorized'}),{status:401,headers:{'content-type':'application/json'}});
      if(!env.LLM_API_KEY)return new Response(JSON.stringify({ok:false,error:'llm-not-configured'}),{status:400,headers:{'content-type':'application/json'}});
      const body=await r.json();
      if(!env.OPS_GH_PAT)return new Response(JSON.stringify({ok:false,error:'gh-pat-not-configured'}),{status:400,headers:{'content-type':'application/json'}});
      const ghH0={authorization:'Bearer '+env.OPS_GH_PAT,'user-agent':'mili-ops','accept':'application/vnd.github+json'};
      const m0=await (await fetch('https://api.github.com/repos/DonaldBuilds/mili-packaging-site/contents/src/data/products.json?ref=main',{headers:ghH0})).json();
      if(!m0.content)throw new Error('github-read-fail');
      const data=JSON.parse(decodeURIComponent(escape(atob(m0.content))));
      const cat=data.productCatalog||{};
      const slugs=Object.keys(cat);
      let group=(body&&body.group)||'';
      let prod=null;
      if(group&&cat[group]&&cat[group].length){const list=cat[group];prod=list.find(function(x){return x.slug===(body&&body.slug)})||list[0]}
      if(!prod&&slugs.length){group=slugs[0];const list=cat[group]||[];prod=list[0]}
      if(!prod)return new Response(JSON.stringify({ok:false,error:'no-products'}),{status:404,headers:{'content-type':'application/json'}});
      const sample=JSON.stringify({name:prod.name,tagline:prod.tagline,spec:prod.spec,price:prod.price,tierPrice:prod.tierPrice,moq:prod.moq,copy:prod.copy,chips:prod.chips,faq:prod.faq}).slice(0,3000);
      if(body&&body.apply){
        // v2: 字段级应用（body.field + body.value 直写单字段）；无 field 时回退 LLM 全量生成
        let title='',description='';
        if(body.field&&body.value!==undefined){
          const field=String(body.field).trim();
          const value=String(body.value).trim();
          if(field==='title'){if(value.length<30||value.length>90)throw new Error('bad-value:title-len='+value.length);title=value;}
          else if(field==='description'){if(value.length<60||value.length>280)throw new Error('bad-value:desc-len='+value.length);description=value;}
          else if(field==='tagline'){if(!value||value.length>120)throw new Error('bad-value:tagline-len='+value.length);prod.tagline=value;}
          else throw new Error('bad-field:'+field);
          if(title)prod.title=title;
          if(description)prod.description=description;
        }else{
          const jprompt='你是 B2B 定制包装制造商的 SEO 文案专家。以下是产品数据 JSON：\\n'+sample+'\\n\\n请基于产品真实信息生成 SEO 标题和 Meta 描述。只输出一个 JSON 对象（不要 markdown 代码块、不要多余文字），格式：{"title":"英文标题，50-62 字符，突出产品类型+目标用途","description":"英文 Meta 描述，120-160 字符，包含核心卖点、MOQ、定制能力"}。严禁编造规格与价格，只能使用提供的数据。';
          const rawJson=await llmChat(env,[{role:'system',content:'你是 B2B 包装产品 SEO 文案专家，只输出合法 JSON。'},{role:'user',content:jprompt}]);
          let jt=rawJson.trim();const ai=jt.indexOf('{');const bi=jt.lastIndexOf('}');if(ai>=0&&bi>ai)jt=jt.slice(ai,bi+1);
          const j=JSON.parse(jt);
          title=String(j.title||'').trim();
          description=String(j.description||'').trim();
          if(!title||!description||title.length<30||title.length>90||description.length<60||description.length>280)throw new Error('bad-llm-output:title='+title.length+',desc='+description.length);
          prod.title=title;prod.description=description;
        }
        if(!env.OPS_GH_PAT)return new Response(JSON.stringify({ok:false,error:'gh-pat-not-configured'}),{status:400,headers:{'content-type':'application/json'}});
        const gh='https://api.github.com/repos/DonaldBuilds/mili-packaging-site/contents/src/data/products.json';
        const ghH={authorization:'Bearer '+env.OPS_GH_PAT,'user-agent':'mili-ops','accept':'application/vnd.github+json'};
        const meta=await (await fetch(gh+'?ref=main',{headers:ghH})).json();
        if(!meta.sha)throw new Error('github-read-fail');
        const put=await fetch(gh,{method:'PUT',headers:ghH,body:JSON.stringify({message:'ops: AI optimize '+group+'/'+prod.slug+' '+new Date().toISOString().slice(0,16)+'Z',content:btoa(unescape(encodeURIComponent(JSON.stringify(data)))),sha:meta.sha})});
        if(!put.ok)throw new Error('github-write:'+put.status);
        return new Response(JSON.stringify({ok:true,applied:{group:group,slug:prod.slug,field:(body&&body.field)||'title+description',title:title||prod.title,description:description||prod.description,tagline:prod.tagline||''},message:'AI 已优化并写入 GitHub，自动部署启动中'}),{headers:{'content-type':'application/json'}});
      }
      if(body&&body.batch){
        const todo=[];
        outerCollect: for(const g of Object.keys(cat)){
          for(const p of (cat[g]||[])){
            if(!p.title||!p.description){todo.push({group:g,slug:p.slug,name:p.name,tagline:p.tagline,spec:p.spec,price:p.price,moq:p.moq});if(todo.length>=6)break outerCollect}
          }
        }
        if(!todo.length)return new Response(JSON.stringify({ok:false,error:'all-products-optimized'}),{headers:{'content-type':'application/json'}});
        const items=JSON.stringify(todo.map(function(t){return {slug:t.slug,name:t.name,tagline:t.tagline,spec:t.spec,price:t.price,moq:t.moq}})).slice(0,3500);
        const jprompt='你是 B2B 定制包装制造商 SEO 文案专家。以下是产品数据 JSON 数组：\\n'+items+'\\n\\n为每个产品生成 SEO 标题与 Meta 描述。只输出一个 JSON 数组（不要 markdown 代码块、不要多余文字），格式：[{"slug":"产品slug","title":"英文标题 50-62 字符，突出产品类型+用途","description":"英文 Meta 描述 120-160 字符，含核心卖点、MOQ、定制能力"}]。严禁编造规格与价格，只能使用提供的数据。';
        const raw=await llmChat(env,[{role:'system',content:'你是 B2B 包装产品 SEO 文案专家，只输出合法 JSON。'},{role:'user',content:jprompt}]);
        let jt=raw.trim();const ai2=jt.indexOf('[');const bi2=jt.lastIndexOf(']');if(ai2>=0&&bi2>ai2)jt=jt.slice(ai2,bi2+1);
        const arr=JSON.parse(jt);
        let applied=0;
        for(const item of arr){
          const t2=String(item.title||'').trim();const d2=String(item.description||'').trim();
          if(!item.slug||!t2||!d2||t2.length<30||t2.length>90||d2.length<60||d2.length>280)continue;
          outer: for(const g of Object.keys(cat)){for(const p of (cat[g]||[])){if(p.slug===item.slug){p.title=t2;p.description=d2;applied++;break outer}}}
        }
        if(!applied)throw new Error('bad-llm-output');
        if(!env.OPS_GH_PAT)return new Response(JSON.stringify({ok:false,error:'gh-pat-not-configured'}),{status:400,headers:{'content-type':'application/json'}});
        const gh='https://api.github.com/repos/DonaldBuilds/mili-packaging-site/contents/src/data/products.json';
        const ghH={authorization:'Bearer '+env.OPS_GH_PAT,'user-agent':'mili-ops','accept':'application/vnd.github+json'};
        const meta=await (await fetch(gh+'?ref=main',{headers:ghH})).json();
        if(!meta.sha)throw new Error('github-read-fail');
        const put=await fetch(gh,{method:'PUT',headers:ghH,body:JSON.stringify({message:'ops: AI batch optimize '+applied+' products '+new Date().toISOString().slice(0,16)+'Z',content:btoa(unescape(encodeURIComponent(JSON.stringify(data)))),sha:meta.sha})});
        if(!put.ok)throw new Error('github-write:'+put.status);
        let remaining=0;
        for(const g of Object.keys(cat)){for(const p of (cat[g]||[])){if(!p.title||!p.description)remaining++}}
        return new Response(JSON.stringify({ok:true,applied:applied,remaining:remaining,message:'已批量优化 '+applied+' 个，剩余 '+remaining+' 个'}),{headers:{'content-type':'application/json'}});
      }
      const prompt='你是资深跨境电商 SEO 顾问，服务 B2B 定制包装制造商 Mili Packaging（mili-packaging.com）。以下是产品数据 JSON：\\n'+sample+'\\n\\n请基于产品真实数据输出结构化 SEO 优化建议。只输出一个 JSON 对象（不要 markdown 代码块、不要多余文字），格式：{"title":{"current":"当前标题（如为空填空字符串）","suggested":"优化后的英文标题，50-62 字符，突出产品类型+用途","note":"改进说明（中文，30字内）"},"description":{"current":"当前 Meta 描述（如为空填空字符串）","suggested":"英文 Meta 描述，120-160 字符，含核心卖点、MOQ、定制能力","note":"改进说明（中文，30字内）"},"tagline":{"current":"当前卖点","suggested":"一句英文卖点（<=120 字符）","note":"改进说明"},"keywords":["3 个英文长尾关键词"],"tips":["2-3 条具体可操作改进要点"]}。严禁编造规格与价格，只能基于提供的数据。';
      const raw=await llmChat(env,[{role:'system',content:'你是资深 B2B 跨境电商 SEO 顾问，只输出合法 JSON。'},{role:'user',content:prompt}]);
      let jt=raw.trim();const ai3=jt.indexOf('{');const bi3=jt.lastIndexOf('}');if(ai3>=0&&bi3>ai3)jt=jt.slice(ai3,bi3+1);
      let fields=null;try{fields=JSON.parse(jt)}catch(e){fields=null}
      if(!fields||typeof fields!=='object'){
        // 解析失败：回退旧格式，前端仍可用
        return new Response(JSON.stringify({ok:true,group:group,slug:prod.slug,advice:raw,fields:null}),{headers:{'content-type':'application/json'}});
      }
      return new Response(JSON.stringify({ok:true,group:group,slug:prod.slug,fields:fields,current:{title:prod.title||'',description:prod.description||'',tagline:prod.tagline||''}}),{headers:{'content-type':'application/json'}});
    }catch(e){return new Response(JSON.stringify({ok:false,error:String((e&&e.message)||e)}),{status:500,headers:{'content-type':'application/json'}})}
  }

  // ── image upload: save base64 image to repo public/assets/images/ ──
  if(p==='/api/upload'&&r.method==='POST'){
    try{
      if(!(await sessionValid()))return new Response(JSON.stringify({ok:false,error:'unauthorized'}),{status:401,headers:{'content-type':'application/json'}});
      if(!env.OPS_GH_PAT)return new Response(JSON.stringify({ok:false,error:'gh-pat-not-configured'}),{status:400,headers:{'content-type':'application/json'}});
      const body=await r.json();
      const name=String(body.name||'').trim();
      const data=String(body.data||'');
      if(!/^[a-z0-9-]{2,60}\.(webp|jpg|jpeg|png)$/.test(name))throw new Error('bad-filename:'+name);
      const bytes=Math.floor(data.length*3/4);
      if(bytes>1500000)throw new Error('too-large:'+bytes);
      const gh='https://api.github.com/repos/DonaldBuilds/mili-packaging-site/contents/public/assets/images/'+name;
      const ghH={authorization:'Bearer '+env.OPS_GH_PAT,'user-agent':'mili-ops','accept':'application/vnd.github+json'};
      let sha='';
      const exist=await (await fetch(gh+'?ref=main',{headers:ghH})).json();
      if(exist&&exist.sha)sha=exist.sha;
      const put=await fetch(gh,{method:'PUT',headers:ghH,body:JSON.stringify({message:'ops: upload image '+name+' '+new Date().toISOString().slice(0,16)+'Z',content:data,sha:sha})});
      if(!put.ok)throw new Error('github-write:'+put.status);
      return new Response(JSON.stringify({ok:true,name:name,path:'/assets/images/'+name,message:'图片已上传，自动部署后即可访问'}),{headers:{'content-type':'application/json'}});
    }catch(e){return new Response(JSON.stringify({ok:false,error:String((e&&e.message)||e)}),{status:500,headers:{'content-type':'application/json'}})}
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

  // Image proxy: Accio CDN first, fallback to GitHub Contents API (new/backfill images)
  if(/\\.(jpg|png|webp|jpeg)\$/i.test(k)){
    const r0=await fetch('https://mili-packaging.site.accio.ai/'+k,{cf:{cacheEverything:true}});
    if(r0&&r0.ok)return r0;
    const ext=k.split('.').pop().toLowerCase();
    const ct=({webp:'image/webp',jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png'})[ext]||'application/octet-stream';
    if(env.OPS_GH_PAT){
      let ghErr='';
      try{
        const gh=await fetch('https://api.github.com/repos/DonaldBuilds/mili-packaging-site/contents/public/'+k+'?ref=main',{headers:{authorization:'Bearer '+env.OPS_GH_PAT,'user-agent':'mili-ops','accept':'application/vnd.github+json'}});
        const j=await gh.json();
        if(j&&j.content){
          const bin=atob(j.content);
          const u8=new Uint8Array(bin.length);
          for(let i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);
          return new Response(u8,{headers:{'content-type':ct,'cache-control':'public,max-age=86400','x-img-src':'github'}});
        }
        ghErr='no-content:'+gh.status+':'+JSON.stringify(j).slice(0,80);
      }catch(e){ghErr='ex:'+String((e&&e.message)||e)}
      return new Response('Not Found',{status:404,headers:{'x-img-err':ghErr}});
    }
    return new Response('Not Found',{status:404});
  }

  // Fallback → SPA index (SSR canonical per route: Google sees correct canonical on raw HTML)
  let spa=F['index.html'];
  const canonUrl='https://mili-packaging.com'+(url.pathname==='/'?'/':url.pathname);
  spa=spa.replace('<link rel="canonical" href="https://mili-packaging.com/" />','<link rel="canonical" href="'+canonUrl+'" />');
  spa=spa.replace('<meta property="og:url" content="https://mili-packaging.com/" />','<meta property="og:url" content="'+canonUrl+'" />');
  return new Response(spa,{headers:Object.assign({},H,{'content-type':'text/html;charset=UTF-8'})});
},
async scheduled(event,env,ctx){
  const cron=String((event&&event.cron)||'');
  const nowIso=new Date().toISOString();
  const L=function(tag,status,detail){console.log('CRON:'+tag+' '+status+' '+(detail||'')+' @'+nowIso)};
  // 每个任务失败自动重试 1 次
  const run=async function(tag,fn){
    try{const out=await fn();L(tag,'OK',String(out||''));return out}
    catch(e){L(tag,'FAIL1',String((e&&e.message)||e));try{const out=await fn();L(tag,'OK-RETRY',String(out||''));return out}catch(e2){L(tag,'FAIL2',String((e2&&e2.message)||e2));return null}}
  };
  const push=async function(title,content){
    if(!env.PUSHPLUS_TOKEN){L('push','skipped','PUSHPLUS_TOKEN not set');return}
    try{const r=await fetch('https://www.pushplus.plus/send',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({token:env.PUSHPLUS_TOKEN,title:title,content:content,template:'txt'})});L('push',r.ok?'ok':'fail:'+r.status,'')}catch(e){L('push','fail',String((e&&e.message)||e))}
  };
  // ── 每日经营简报（08:00 CST = UTC 00:00）：询盘 / 健康 / 部署；GA4+GSC 需 Service Account，未配置则占位 ──
  if(cron==='0 0 * * *'){
    await run('daily-brief',async function(){
      const lines=[];
      try{
        const y=new Date(Date.now()-86400000).toISOString();
        const r=await fetch(sbU(env)+'/rest/v1/inquiries?select=created_at&created_at=gte.'+y,{headers:{apikey:sbK(env),Authorization:'Bearer '+sbK(env)}});
        const rows=await r.json();
        lines.push('昨日新询盘: '+(Array.isArray(rows)?rows.length:'读取失败'));
      }catch(e){lines.push('昨日新询盘: 读取失败')}
      let ok=0,bad=[];
      for(const u of ['/','/products','/portfolio','/about','/contact','/blog','/industries','/faq','/privacy-policy','/sitemap.xml']){
        try{const rr=await fetch('https://mili-packaging.com'+u,{method:'HEAD'});if(rr.ok)ok++;else bad.push(u+':'+rr.status)}catch(e){bad.push(u+':ERR')}
      }
      lines.push('站点健康: '+ok+'/10 正常'+(bad.length?' · '+bad.join(' '):''));
      try{
        const r=await fetch('https://api.github.com/repos/DonaldBuilds/mili-packaging-site/actions/runs?per_page=1');
        const d=await r.json();
        const ru=d.workflow_runs&&d.workflow_runs[0];
        lines.push('最近部署: '+(ru?((ru.conclusion||ru.status)+' '+String(ru.created_at||'').slice(0,16)):'N/A'));
      }catch(e){lines.push('最近部署: 读取失败')}
      lines.push('GA4/GSC: 未配置 Service Account（流量/关键词跳过）');
      const text=lines.join('\\n');
      L('daily-brief','DATA',text.replace(/\\n/g,' | '));
      await push('Mili 每日经营简报 '+nowIso.slice(0,10),text);
      return 'brief-done';
    });
  }
  // ── 每周一死链巡检（09:00 CST = UTC 01:00 Mon）：站内 URL 4xx/5xx ──
  if(cron==='0 1 * * 1'){
    await run('link-check',async function(){
      const F2=await getF();
      const sm=F2['sitemap.xml']||'';
      const urls=[];const re=new RegExp('<loc>(.*?)</loc>','g');let m;
      while((m=re.exec(sm))!==null){urls.push(m[1].replace(/&amp;/g,'&'))}
      if(!urls.length){urls.push('https://mili-packaging.com/')}
      const base='https://mili-packaging.com';
      const check=async function(rel){try{const r=await fetch(base+rel,{method:'HEAD',redirect:'manual'});return r.status>=400?(rel+' '+r.status):null}catch(e){return rel+' ERR'}};
      const results=await Promise.all(urls.map(function(u){return check(u.indexOf(base)===0?u.slice(base.length):u)}));
      const dead=results.filter(Boolean);const ok=urls.length-dead.length;
      const text='死链巡检 '+nowIso.slice(0,10)+'\\n总数: '+urls.length+' 正常: '+ok+' 异常: '+dead.length+(dead.length?'\\n'+dead.join('\\n'):'');
      console.log('LINKCHECK\\n'+text);
      await push('Mili 死链巡检 '+nowIso.slice(0,10),text);
      return urls.length+' urls, '+dead.length+' dead';
    });
  }
  // ── IndexNow 提交（每 6 小时） ──
  if(cron==='0 */6 * * *'){
    await run('indexnow',async function(){
      if(!env.INDEXNOW_KEY){L('indexnow','skipped','INDEXNOW_KEY not set');return 'skipped'}
      const r=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({host:'mili-packaging.com',key:env.INDEXNOW_KEY,keyLocation:'https://mili-packaging.com/'+env.INDEXNOW_KEY+'.txt',urlList:['https://mili-packaging.com/','https://mili-packaging.com/sitemap.xml']})});
      L('indexnow',r.ok?'ok':'fail:'+r.status,'');
      return r.ok?'ok':'fail:'+r.status;
    });
  }
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
['ADMIN_PW_HASH', 'SESSION_SECRET', 'PUSHPLUS_TOKEN', 'LLM_API_KEY', 'LLM_ENDPOINT', 'OPS_GH_PAT', 'SB_URL', 'SB_ANON_KEY', 'INDEXNOW_KEY', 'GA4_SERVICE_JSON', 'GA4_PROPERTY_ID', 'GSC_SERVICE_JSON', 'GSC_SITE_URL'].forEach(v => { if (process.env[v]) VARS[v] = process.env[v]; });
// v4.5 cron triggers: daily brief 08:00 CST (UTC 00:00), weekly link check Mon 09:00 CST (UTC 01:00), IndexNow every 6h
const TRIGGERS = ['0 0 * * *', '0 1 * * 1', '0 */6 * * *'];
const metadata = JSON.stringify({ main_module: 'worker.js', vars: VARS, triggers: { crons: TRIGGERS } });
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

// Sync env vars as Cloudflare Worker secrets — metadata.vars on script PUT is unreliable,
// but secrets are injected into the worker env deterministically.
async function syncSecrets() {
  async function cfFetch(method, p, body) {
    const res = await fetch('https://api.cloudflare.com/client/v4' + p, {
      method,
      headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined
    });
    return res.json();
  }
  const base = `/accounts/${ACCT}/workers/scripts/${NAME}/secrets`;
  const list = await cfFetch('GET', base);
  const existing = (list.result || []).map(s => s.name);
  for (const [k, v] of Object.entries(VARS)) {
    if (!v) continue;
    const r = await cfFetch('PUT', base, { name: k, text: v, type: 'secret_text' });
    console.log(`${r.success ? 'OK' : 'FAIL'} secret ${k}${r.success ? '' : ': ' + JSON.stringify(r.errors)}`);
  }
  for (const n of existing) {
    if (!VARS[n]) {
      const r = await cfFetch('DELETE', base + '/' + n);
      console.log(`${r.success ? 'OK' : 'FAIL'} secret ${n}${r.success ? ' deleted' : ' delete: ' + JSON.stringify(r.errors)}`);
    }
  }
}

(async () => {
  const MAX = 4;
  for (let i = 1; i <= MAX; i++) {
    try {
      await deploy(i);
      await syncSecrets();
      await purgeCache();
      process.exit(0);
    } catch (e) {
      if (i === MAX) { console.error('Deploy failed after ' + MAX + ' attempts.'); process.exit(1); }
      await new Promise(r => setTimeout(r, 3000));
    }
  }
})();
