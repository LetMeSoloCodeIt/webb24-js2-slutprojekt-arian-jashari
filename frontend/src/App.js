import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsPage from './components/ProductsPage';
import CartPage from './components/CartPage';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(    () => {
    fetch('http://localhost:5000/products') // Hämta produkterna från backend
        .then(res => res.json()) // konvertera svar till JSON
        .then(data => setProducts(data))
        .catch(err => console.error("Fel vid hämtning av produkter:", err));
  }, []   );

  return    (
    <Router>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<ProductsPage products={products} setCart={setCart} cart={cart} />} />
        <Route path="/kundvagn" element={<CartPage cart={cart} setCart={setCart} />} /> 
      </Routes>
    </Router>
      );
};

export default App;
