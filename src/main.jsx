import React, { useEffect, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ProductItem from './pages/ProductItem';
import { productGroups, productCatalog } from './data/products';
import { getPost } from './data/posts';
import { initGlobalClickTracking, initGA4 } from './lib/track';
import './styles.css';

// Lazy-loaded below-the-fold pages
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Industries = lazy(() => import('./pages/Industries'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Support = lazy(() => import('./pages/Support'));
const Warranty = lazy(() => import('./pages/Warranty'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const ShippingDelivery = lazy(() => import('./pages/ShippingDelivery'));
const PaymentTerms = lazy(() => import('./pages/PaymentTerms'));
const ReturnsPolicy = lazy(() => import('./pages/ReturnsPolicy'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const SampleKitLanding = lazy(() => import('./pages/SampleKitLanding'));

// Legacy hash-URL compatibility: #/products/xxx → /products/xxx (clean History URL)
if (window.location.hash.startsWith('#/')) {
  window.location.replace(window.location.hash.slice(1));
}

const groupDesc = (g) => {
  if (g.slug === 'sample-starter-kits') {
    return `${g.name}: 12 material & finish sample boxes branded with your logo. Fixed $29 including worldwide shipping, fee credited to your first bulk order. Ships in 5-7 days. Get your sample kit.`;
  }
  return `Custom ${g.name.toLowerCase()}: ${g.tagline}. Reference price from $${g.priceFrom} per unit (EXW), MOQ ${g.moq} pcs, 12-15 days lead time. Free design & 3D mockup, FSC certified, global delivery. Get a factory-direct quote.`;
};

function TitleManager() {
  const location = useLocation();
  useEffect(() => {
    const titles = {
      '/': 'Mili Packaging | Custom Rigid Box Manufacturer | MOQ 100pcs',
      '/products': 'Packaging Products | Custom Boxes, Bags & Mailers | Mili Packaging',
      '/about': 'About Us | Jiangxi Mili Packaging Materials Co., Ltd.',
      '/contact': 'Contact Us | Get a Free Packaging Quote | Mili Packaging',
      '/faq': 'FAQ | Custom Packaging Questions Answered | Mili Packaging',
      '/portfolio': 'Portfolio | Packaging Case Studies | Mili Packaging',
      '/industries': 'Industries | Packaging Solutions by Sector | Mili Packaging',
      '/blog': 'Blog | Packaging Guides & Buyers Resources | Mili Packaging',
      '/support': 'Support | Design, QC & After-Sales | Mili Packaging',
      '/warranty': 'Warranty | Mili Packaging',
      '/shipping-policy': 'Shipping Policy | Mili Packaging',
      '/shipping-delivery': 'Shipping & Delivery | Logistics & Incoterms | Mili Packaging',
      '/payment-terms': 'Payment Terms | T/T, L/C & Trade Assurance | Mili Packaging',
      '/returns-policy': 'Returns Policy | Mili Packaging',
      '/privacy-policy': 'Privacy Policy | Mili Packaging',
      '/sample-kits': 'Sample & Starter Kit | Test 12 Box Styles for $29 | Mili Packaging',
    };
    const path = location.pathname;
    let title = titles[path] || 'Mili Packaging | Custom Packaging Manufacturer';
    let desc = null;
    if (path.startsWith('/products/')) {
      const parts = path.split('/').filter(Boolean); // ['products', slug, productSlug?]
      const g = productGroups.find(x => x.slug === parts[1]);
      if (g && parts[2]) {
        // Independent product page: /products/:slug/:productSlug
        const list = productCatalog[g.slug] || [];
        const p = list.find(x => x.slug === parts[2]);
        if (p) {
          title = `${p.name} | MOQ ${g.slug === 'watch-boxes' ? 50 : g.slug === 'sample-starter-kits' ? '1 kit' : g.moq} pcs | Mili Packaging`;
          desc = `${p.name} - ${p.tagline}. ${p.spec}. Reference price from $${p.price} per unit (EXW). Factory-direct custom ${g.name.toLowerCase()} with free design & 3D mockup.`;
        }
      } else if (g) {
        title = g.slug === 'sample-starter-kits'
          ? `${g.name} | Fixed $29 Sample Kit | Mili Packaging`
          : `${g.name} | MOQ ${g.moq} pcs | Mili Packaging`;
        desc = groupDesc(g);
      }
    } else if (path.startsWith('/industries/')) {
      // industry pages resolve their own TDK via module import below
    } else if (path.startsWith('/blog/')) {
      const p = getPost(path.replace('/blog/', ''));
      if (p) { title = `${p.title} | Mili Packaging`; desc = p.excerpt; }
    } else if (path === '/sample-kits') {
      desc = 'Order the Mili sample & starter kit: 12 material and finish sample boxes branded with your logo. $29 including worldwide shipping, fully credited to your first bulk order.';
    }
    document.title = title;
    // Dynamic canonical + og:url — each route gets its own clean (hash-free) URL
    const canonical = 'https://mili-packaging.com' + (path === '/' ? '/' : path);
    let cl = document.querySelector('link[rel="canonical"]');
    if (!cl) { cl = document.createElement('link'); cl.rel = 'canonical'; document.head.appendChild(cl); }
    cl.href = canonical;
    const og = document.querySelector('meta[property="og:url"]');
    if (og) og.content = canonical;
    // GA4 SPA page_view on every route change (gtag loaded by initGA4 when VITE_GA4_ID set)
    if (window.gtag) window.gtag('event', 'page_view', { page_path: location.pathname + location.search });
    if (desc) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = desc;
    }
  }, [location]);
  return null;
}

// Industry TDK resolver (kept separate to avoid circular import in TitleManager)
function IndustryTitles() {
  const location = useLocation();
  useEffect(() => {
    if (!location.pathname.startsWith('/industries/')) return;
    import('./pages/Industries').then(({ industries }) => {
      const ind = industries.find(i => location.pathname === '/industries/' + i.slug);
      if (ind) {
        document.title = ind.title;
        let meta = document.querySelector('meta[name="description"]');
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = 'description';
          document.head.appendChild(meta);
        }
        meta.content = ind.description;
      }
    });
  }, [location]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    initGA4(import.meta.env.VITE_GA4_ID || 'G-RC1NV5DELP');
    initGlobalClickTracking();
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <TitleManager />
      <IndustryTitles />
      <Navbar />
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug/:productSlug" element={<ProductItem />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<Industries />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/support" element={<Support />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/shipping-delivery" element={<ShippingDelivery />} />
          <Route path="/payment-terms" element={<PaymentTerms />} />
          <Route path="/returns-policy" element={<ReturnsPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/sample-kits" element={<SampleKitLanding />} />
        </Routes>
      </Suspense>
      <Footer />
      {/* Global floating CTAs — every page: WhatsApp (prefilled message) + 60-sec quote pill */}
      <a href="/contact" className="sticky-quote">⚡ 60-Sec Quote</a>
      <a
        href={`https://wa.me/8618296876285?text=${encodeURIComponent("Hi, I'd like a quote for custom packaging")}`}
        target="_blank" rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Chat on WhatsApp — usually replies in 2h"
        title="Chat on WhatsApp · Usually replies in 2h"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<App />);
