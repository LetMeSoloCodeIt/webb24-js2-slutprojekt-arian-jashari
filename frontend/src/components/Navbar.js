import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cart }) => {
  // Beräkna det totala antalet produkter i kundvagnen
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav>
      <Link to="/">Produkter</Link>
      <Link to="/kundvagn">Kundvagn ({totalQuantity})</Link>
    </nav>
  );
};

export default Navbar;

