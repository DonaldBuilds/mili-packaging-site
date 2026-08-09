// Post-build: copy index.html to 404.html so static hosts (Accio) serve the SPA
// on deep URLs like /products/xxx (standard SPA fallback trick).
import fs from 'fs';
try {
  fs.copyFileSync('dist/index.html', 'dist/404.html');
  console.log('postbuild: dist/404.html created');
} catch (e) {
  console.log('postbuild skipped:', e.message);
}
