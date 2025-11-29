
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Jewelry from './pages/Jewelry';
import About from './pages/About';
import './App.css'; // <-- This is the crucial line I'm adding

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/jewelry" element={<Jewelry />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
