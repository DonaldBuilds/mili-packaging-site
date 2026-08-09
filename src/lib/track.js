// Conversion event tracking — pushes to dataLayer for GA4 / Clarity / future analytics
export function trackEvent(event, params = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch (e) {
    // analytics must never break the site
  }
}

// GA4 initialization — loads gtag.js only when a Measurement ID is configured (VITE_GA4_ID).
// send_page_view is disabled; SPA route changes fire page_view from TitleManager.
export function initGA4(id) {
  try {
    if (!id || typeof window === 'undefined' || window.__ga4Loaded) return;
    window.__ga4Loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, { send_page_view: false });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);
  } catch (e) {
    // analytics must never break the site
  }
}

// Global listeners for WhatsApp / email clicks (registered once in App)
export function initGlobalClickTracking() {
  if (typeof document === 'undefined') return;
  document.addEventListener('click', (e) => {
    const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.indexOf('wa.me/') > -1 || href.indexOf('whatsapp.com') > -1) {
      trackEvent('whatsapp_click', { url: href });
    } else if (href.indexOf('mailto:') === 0) {
      trackEvent('email_click', { url: href });
    }
  }, true);
}
