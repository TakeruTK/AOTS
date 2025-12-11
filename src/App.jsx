
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; // Import Checkout
import PaymentSuccess from './pages/PaymentSuccess'; // Import PaymentSuccess
import PaymentFailed from './pages/PaymentFailed'; // Import PaymentFailed
import Header from './components/Header';
import Shop from './pages/Shop';
import Jewelry from './pages/Jewelry';
import About from './pages/About';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/jewelry" element={<Jewelry />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
