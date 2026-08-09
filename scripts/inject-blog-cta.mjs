// Injects a floating WhatsApp button + "Get a Quote" CTA band into every
// static blog HTML page under public/blog/. Idempotent: skips files that
// already contain the marker. Run: node scripts/inject-blog-cta.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = join(ROOT, 'public', 'blog');
const MARKER = '<!-- mili-blog-conv -->';

const WA_HREF =
  'https://wa.me/8618296876285?text=' +
  encodeURIComponent("Hi, I'd like a quote for custom packaging");

const SNIPPET = `
<!-- mili-blog-conv -->
<style>
.blog-wa{position:fixed;bottom:24px;right:24px;z-index:999;width:56px;height:56px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,.4);animation:blogWaPulse 2s ease-in-out infinite;transition:transform .2s}
.blog-wa:hover{transform:scale(1.1);animation:none}
@keyframes blogWaPulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4);transform:scale(1)}50%{box-shadow:0 4px 32px rgba(37,211,102,.7);transform:scale(1.05)}}
.blog-cta{margin:56px auto 0;max-width:760px;padding:32px 24px;background:#141414;border:1px solid #c9a84c;text-align:center}
.blog-cta h3{color:#c9a84c;font-size:18px;margin-bottom:8px;font-weight:700}
.blog-cta p{color:#aaa;font-size:13.5px;margin-bottom:20px}
.blog-cta a{display:inline-block;background:#c9a84c;color:#0a0a0a;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:14px 32px;margin:4px}
.blog-cta a.ghost{background:transparent;color:#c9a84c;border:1px solid #c9a84c}
</style>
<a class="blog-wa" href="${WA_HREF}" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp - usually replies in 2h" title="Chat on WhatsApp - usually replies in 2h">
<svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>
<div class="blog-cta">
<h3>Planning a packaging project?</h3>
<p>Free design consultation and 3D mockup within 48 hours. MOQ from 100 pcs.</p>
<a href="/contact#quote-form">Get a Free Quote</a>
<a class="ghost" href="${WA_HREF}">Chat on WhatsApp</a>
</div>
`;

const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.html'));
let changed = 0;
for (const f of files) {
  const path = join(BLOG_DIR, f);
  const html = readFileSync(path, 'utf8');
  if (html.includes(MARKER)) continue;
  if (!html.includes('</body>')) {
    console.log(`SKIP ${f}: no </body>`);
    continue;
  }
  const out = html.replace('</body>', SNIPPET + '\n</body>');
  writeFileSync(path, out);
  changed++;
  console.log(`INJECT ${f}`);
}
console.log(`Done. ${changed} file(s) injected.`);
