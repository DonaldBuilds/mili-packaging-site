import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Portfolio from './pages/Portfolio';
import Industries from './pages/Industries';
import Support from './pages/Support';
import Warranty from './pages/Warranty';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnsPolicy from './pages/ReturnsPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './styles.css';

function App() {
  return (
    <Router>
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
