// Conversion event tracking — pushes to dataLayer for GA4 / Clarity / future analytics
export function trackEvent(event, params = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
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
