import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cart }) => {
  return (
    <nav>
         {/* Navigeringslänkar för att gå till produktlistan och kundvagnen */}
      <Link to="/">Produkter</Link>
      <Link to="/kundvagn">Kundvagn ({cart.length})</Link> 
    </nav>
        );
};

export default Navbar;
