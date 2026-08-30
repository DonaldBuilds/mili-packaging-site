// Post-build: copy index.html to 404.html so static hosts (Accio) serve the SPA
// on deep URLs like /products/xxx (standard SPA fallback trick), and generate
// dist/seo-map.json for the Worker's per-route SEO injection.
import fs from 'fs';
import { execSync } from 'child_process';
try {
  fs.copyFileSync('dist/index.html', 'dist/404.html');
  console.log('postbuild: dist/404.html created');
} catch (e) {
  console.log('postbuild skipped:', e.message);
}
try {
  execSync('node scripts/gen-seo-map.mjs dist', { stdio: 'inherit' });
  console.log('postbuild: dist/seo-map.json generated');
} catch (e) {
  console.log('postbuild seo-map skipped:', e.message);
}
