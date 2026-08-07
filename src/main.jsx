import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Portfolio from './pages/Portfolio';
import Industries, { industries as industryList } from './pages/Industries';
import Support from './pages/Support';
import Warranty from './pages/Warranty';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnsPolicy from './pages/ReturnsPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './styles.css';

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
      '/support': 'Support | Design, QC & After-Sales | Mili Packaging',
      '/warranty': 'Warranty | Mili Packaging',
      '/shipping-policy': 'Shipping Policy | Mili Packaging',
      '/returns-policy': 'Returns Policy | Mili Packaging',
      '/privacy-policy': 'Privacy Policy | Mili Packaging',
    };
    const path = location.pathname;
    let title = titles[path] || 'Mili Packaging | Custom Packaging Manufacturer';
    let desc = null;
    if (path.startsWith('/industries/')) {
      const ind = industryList.find(i => path === '/industries/' + i.slug);
      if (ind) { title = ind.title; desc = ind.description; }
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

function App() {
  return (
    <Router>
      <TitleManager />
      <Navbar />
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
        <Route path="/support" element={<Support />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/returns-policy" element={<ReturnsPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<App />);
