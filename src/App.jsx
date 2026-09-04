import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Home from './pages/Home.jsx';
import Checkout from './pages/Checkout.jsx';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  );
}
