import React, { useEffect, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
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
      {/* Global floating CTAs — every page: WhatsApp (structured prefilled quote) + 60-sec quote pill */}
      <a href="/contact" className="sticky-quote">⚡ 60-Sec Quote</a>
      <WhatsAppButton />
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<App />);
