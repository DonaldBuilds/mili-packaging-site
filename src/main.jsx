import React, { useEffect, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import { productGroups } from './data/products';
import { getPost } from './data/posts';
import { initGlobalClickTracking } from './lib/track';
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

const groupDesc = (g) =>
  `Custom ${g.name.toLowerCase()}: ${g.tagline}. From $${g.priceFrom}-$${g.priceTo} USD per unit, MOQ ${g.moq} pcs, 12-15 days lead time. Free design & 3D mockup, FSC certified, global delivery. Get a factory-direct quote.`;

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
    };
    const path = location.pathname;
    let title = titles[path] || 'Mili Packaging | Custom Packaging Manufacturer';
    let desc = null;
    if (path.startsWith('/products/')) {
      const g = productGroups.find(x => path === '/products/' + x.slug);
      if (g) { title = `${g.name} | Mili Packaging`; desc = groupDesc(g); }
    } else if (path.startsWith('/industries/')) {
      // industry pages resolve their own TDK via module import below
    } else if (path.startsWith('/blog/')) {
      const p = getPost(path.replace('/blog/', ''));
      if (p) { title = `${p.title} | Mili Packaging`; desc = p.excerpt; }
    }
    document.title = title;
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

function App() {
  useEffect(() => { initGlobalClickTracking(); }, []);
  return (
    <Router>
      <TitleManager />
      <IndustryTitles />
      <Navbar />
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
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
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<App />);
