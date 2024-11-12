import React, { useState } from 'react';
import Product from './Product';
import './ProductsPage.css';

const ProductsPage = ({ products, setCart, cart }) => {
     const [searchTerm, setSearchTerm] = useState('');
    const [sorted, setSorted] = useState(false);
 
    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);

      
        if (existingProduct) {
             if (existingProduct.quantity >= product.stock) {
                alert(`Det finns endast ${product.stock} i lager för denna produkt.`);
                 return;
            }
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
         } else {
             if (product.stock > 0) {
                setCart([...cart, { ...product, quantity: 1 }]);
              } else {
                 alert("Produkten är slut i lager.");
            }
        }
    };

    const toggleSortByPrice = () => {
        setSorted(!sorted);
    };

     const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
         )
        .sort((a, b) => sorted ? b.price - a.price : a.id - b.id); 

    return (
         <div className="products-page">
            <h1>Produkter</h1>
            <input
                type="text"
                placeholder="Sök efter produkter..."
                value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={toggleSortByPrice}>
                 {sorted ? "Visa originalordning" : "Sortera efter pris"}
            </button>
            <div className="products-list">
                 {filteredProducts.map((product) => (
                    <Product key={product.id} product={product} addToCart={addToCart} />
                 ))}
            </div>
         </div>
    );
};

export default ProductsPage;
