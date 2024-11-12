import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsPage from './components/ProductsPage';
import CartPage from './components/CartPage';
import ConfirmationPage from './components/ConfirmationPage';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fel vid hämtning av produkter:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Laddar produkter...</p>;
  }

  return (
    <Router>
      <Navbar cart={cart} />
        <Routes>
          <Route 
          path="/" 
            element={<ProductsPage products={products} setCart={setCart} cart={cart} />} 
        />
          <Route 
          path="/kundvagn" 
          element={
             <CartPage 
               cart={cart} 
               setCart={setCart} 
                products={products} 
              setProducts={setProducts} 
              setPurchaseCompleted={setPurchaseCompleted} 
                 />
          } 
          /> 
        <Route path="/bekraftelse" element={<ConfirmationPage />} />
        </Routes>
    </Router>
  );
};

export default App;
