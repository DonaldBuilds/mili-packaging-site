// Injects a high-conversion WhatsApp FAB + "Get a Quote" CTA band into every
// static blog HTML page under public/blog/. Idempotent: strips any previous
// injection (marker mili-blog-conv) then injects the current snippet.
// Run: node scripts/inject-blog-cta.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = join(ROOT, 'public', 'blog');
const MARKER = '<!-- mili-blog-conv -->';

const WA_TEXT =
  "Hi Mili team! 👋 I'd like a quote.\n• Product: [e.g. mailer box / rigid box]\n• Size: [L×W×H]\n• Quantity: [e.g. 500 pcs]\n• Material/Printing: [e.g. kraft, full-color logo]\n• Destination: [country]";
const WA_HREF = 'https://wa.me/8618296876285?text=' + encodeURIComponent(WA_TEXT);

const SNIPPET = `
<!-- mili-blog-conv -->
<style>
.blog-wa{position:fixed;bottom:24px;right:24px;z-index:900;width:56px;height:56px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,.4);animation:blogWaPulse 2s ease-in-out infinite;transition:transform .2s;text-decoration:none}
.blog-wa:hover{transform:scale(1.08);animation:none}
.blog-wa svg{width:30px;height:30px}
.blog-wa-tip{position:absolute;right:calc(100% + 14px);top:50%;transform:translateY(-50%);white-space:nowrap;background:#141416;color:#F2F2F2;font-size:12px;font-weight:600;padding:9px 14px;border:1px solid rgba(255,255,255,.14);border-radius:6px;opacity:0;pointer-events:none;transition:opacity .2s;box-shadow:0 8px 24px rgba(0,0,0,.45)}
.blog-wa:hover .blog-wa-tip{opacity:1}
.blog-wa-tip::after{content:'';position:absolute;left:100%;top:50%;transform:translateY(-50%);border:6px solid transparent;border-left-color:#141416}
@keyframes blogWaPulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4);transform:scale(1)}50%{box-shadow:0 4px 32px rgba(37,211,102,.7);transform:scale(1.05)}}
.blog-cta{margin:56px auto 0;max-width:760px;padding:32px 24px;background:#141414;border:1px solid #c9a84c;text-align:center}
.blog-cta h3{color:#c9a84c;font-size:18px;margin-bottom:8px;font-weight:700}
.blog-cta p{color:#aaa;font-size:13.5px;margin-bottom:20px}
.blog-cta a{display:inline-block;background:#c9a84c;color:#0a0a0a;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:14px 32px;margin:4px}
.blog-cta a.ghost{background:transparent;color:#c9a84c;border:1px solid #c9a84c}
.blog-wa-hint{position:fixed;right:24px;bottom:96px;z-index:899;max-width:300px;background:#141416;border:1px solid rgba(201,168,76,.55);border-radius:10px;box-shadow:0 12px 36px rgba(0,0,0,.55);animation:blogWaHintIn .35s ease}
.blog-wa-hint a{display:block;padding:16px 18px 14px;text-decoration:none}
.blog-wa-hint strong{display:block;color:#c9a84c;font-size:13.5px;font-weight:700;line-height:1.45}
.blog-wa-hint small{display:block;margin-top:6px;color:rgba(210,210,210,.7);font-size:11px;line-height:1.5}
.blog-wa-hint-close{position:absolute;top:6px;right:8px;width:22px;height:22px;background:none;border:none;color:rgba(210,210,210,.55);font-size:16px;line-height:1;cursor:pointer;z-index:2;border-radius:50%}
.blog-wa-hint-close:hover{color:#fff;background:rgba(255,255,255,.1)}
@keyframes blogWaHintIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@media (max-width:768px){.blog-wa{bottom:calc(16px + env(safe-area-inset-bottom));right:16px;width:54px;height:54px}.blog-wa-hint{right:16px;bottom:calc(84px + env(safe-area-inset-bottom));max-width:calc(100vw - 88px)}.blog-wa-tip{display:none}}
@media (prefers-reduced-motion:reduce){.blog-wa{animation:none}}
</style>
<a class="blog-wa" href="${WA_HREF}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" aria-label="Chat with us on WhatsApp" title="Chat with us on WhatsApp">
<svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
<span class="blog-wa-tip">Chat with us on WhatsApp</span>
</a>
<div class="blog-cta">
<h3>Planning a packaging project?</h3>
<p>Free design consultation and 3D mockup within 48 hours. MOQ from 100 pcs.</p>
<a href="/contact#quote-form">Get a Free Quote</a>
<a class="ghost" href="${WA_HREF}" data-track="whatsapp_click">Chat on WhatsApp</a>
</div>
<script>
(function(){
  var WA_HREF="${WA_HREF}";
  function fire(){try{if(window.gtag){window.gtag('event','whatsapp_click',{event_category:'engagement',event_label:'floating_button'});}else{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'whatsapp_click',event_category:'engagement',event_label:'floating_button'});}}catch(e){}}
  var btn=document.querySelector('.blog-wa');
  if(btn){btn.addEventListener('click',fire);}
  var cta=document.querySelector('.blog-cta a.ghost');
  if(cta){cta.addEventListener('click',fire);}
  var KEY='mili_wa_hint_dismissed';
  try{
    if(!sessionStorage.getItem(KEY)){
      setTimeout(function(){
        if(document.querySelector('.blog-wa-hint'))return;
        var h=document.createElement('div');
        h.className='blog-wa-hint';
        h.setAttribute('role','status');
        h.innerHTML='<button type="button" class="blog-wa-hint-close" aria-label="Dismiss message">×</button><a href="'+WA_HREF+'" target="_blank" rel="noopener noreferrer" data-track="whatsapp_click"><strong>Questions about MOQ or samples? Chat now 💬</strong><small>We reply within a few hours · Mon–Sat 9:00–18:00 (GMT+8)</small></a>';
        var body=document.body;
        body.appendChild(h);
        h.querySelector('.blog-wa-hint-close').addEventListener('click',function(e){e.preventDefault();e.stopPropagation();h.remove();try{sessionStorage.setItem(KEY,'1');}catch(e2){}});
        h.querySelector('a').addEventListener('click',fire);
      },8000+Math.random()*7000);
    }
  }catch(e){}
})();
</script>
`;

function stripOld(html) {
  const idx = html.indexOf(MARKER);
  if (idx === -1) return html;
  const bodyIdx = html.indexOf('</body>');
  return html.slice(0, idx) + html.slice(bodyIdx);
}

// Related Guides — topic-based cross links (article file -> recommended articles)
const TITLES = {
  1: 'How to Choose the Right Packaging Box for Your Skincare Brand (2026 Guide)',
  2: 'Rigid Box vs Folding Box: Which Is Right for Your Product?',
  3: 'Gold Foil vs Hot Stamping vs Embossing: A Complete Finishing Guide',
  4: 'How to Reduce Packaging Cost Without Sacrificing Quality',
  5: '2026 Sustainable Packaging Trends Every Brand Should Know',
  6: 'Magnetic Closure Box: The Ultimate Guide for Luxury Brands',
  7: 'How to Write a Packaging Design Brief (Free Template Included)',
  8: 'MOQ Explained: How to Order Custom Packaging in Small Quantities',
  9: 'Perfume Box Design: 7 Elements That Make Customers Buy',
  10: 'Shipping Packaging 101: How to Protect Products & Impress Customers',
};
const RELATED = {
  1: [6, 2],
  2: [8, 1],
  3: [9, 7],
  4: [8, 2],
  5: [1, 10],
  6: [1, 9],
  7: [1, 6],
  8: [2, 4],
  9: [3, 6],
  10: [5, 3],
};
const RELATED_STYLE = `
.blog-related{margin:40px auto 0;max-width:760px;padding:24px;background:#111;border:1px solid rgba(255,255,255,.1);border-radius:8px}
.blog-related h4{color:#c9a84c;font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px}
.blog-related a{display:block;color:#ddd;font-size:14px;text-decoration:none;padding:8px 0;border-bottom:1px dashed rgba(255,255,255,.08)}
.blog-related a:hover{color:#c9a84c}
`;

function relatedBlock(n) {
  const list = RELATED[n] || [];
  if (!list.length) return '';
  const links = list
    .map((i) => `  <a href="/blog/${i}/">${TITLES[i]}</a>`)
    .join('\n');
  return `
<div class="blog-related">
<h4>Related Guides</h4>
${links}
</div>`;
}

// BlogPosting JSON-LD for article pages (GEO + rich results)
const HEAD_MARKER = '<!-- mili-blog-article -->';
function articleSchema(n, title, desc) {
  return `
${HEAD_MARKER}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": ${JSON.stringify(title)},
  "description": ${JSON.stringify(desc)},
  "datePublished": "2026-08-04",
  "dateModified": "2026-08-09",
  "author": { "@type": "Organization", "name": "Mili Packaging", "url": "https://mili-packaging.com/" },
  "publisher": { "@type": "Organization", "name": "Jiangxi Mili Packaging Materials Co., Ltd.", "url": "https://mili-packaging.com/" },
  "mainEntityOfPage": "https://mili-packaging.com/blog/${n}/",
  "image": "https://mili-packaging.com/assets/images/product-hero-v5.jpg",
  "inLanguage": "en"
}
</script>`;
}

function stripHeadOld(html) {
  const idx = html.indexOf(HEAD_MARKER);
  if (idx === -1) return html;
  const headIdx = html.indexOf('</head>');
  return html.slice(0, idx) + html.slice(headIdx);
}

const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.html'));
let changed = 0;
for (const f of files) {
  const path = join(BLOG_DIR, f);
  const html = readFileSync(path, 'utf8');
  if (!html.includes('</body>')) {
    console.log(`SKIP ${f}: no </body>`);
    continue;
  }
  const n = /^(\d+)\.html$/.exec(f);
  let out = stripOld(html);
  if (n) {
    const i = parseInt(n[1], 10);
    const title = TITLES[i] || '';
    const desc = (html.match(/name="description" content="([^"]*)"/) || [])[1] || title;
    out = stripHeadOld(out);
    if (out.includes('</head>')) {
      out = out.replace('</head>', articleSchema(i, title, desc) + '\n</head>');
    }
    const extra = RELATED_STYLE + relatedBlock(i);
    out = out.replace('</body>', SNIPPET + '\n' + extra + '\n</body>');
  } else {
    out = out.replace('</body>', SNIPPET + '\n</body>');
  }
  writeFileSync(path, out);
  changed++;
  console.log(`INJECT ${f}`);
}
console.log(`Done. ${changed} file(s) updated.`);
