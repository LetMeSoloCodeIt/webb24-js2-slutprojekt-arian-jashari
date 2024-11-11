import React, { useState, useEffect } from 'react';
import Product from './Product';
import './ProductsPage.css';

const ProductsPage = ({ setCart, cart }) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Fel vid hämtning av produkter:", err));
    }, []);

    const addToCart = (product) => {
        if (product.stock <= 0) {
            alert("Produkten är slut i lager!");
            return;
        }

        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
        
        if (existingProductIndex >= 0) {
            const updatedCart = cart.map((item, index) =>
                index === existingProductIndex
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            setCart(updatedCart);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }

        fetch('http://localhost:5000/products/purchase', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: product.id, quantity: 1 })
        })
        .then((res) => res.json())
        .then((updatedProduct) => {
            const updatedProducts = products.map((p) =>
                p.id === product.id ? updatedProduct : p
            );
            setProducts(updatedProducts);
        })
        .catch((err) => console.error("Fel vid uppdatering av lagret:", err));
    };

    const sortProductsByPriceDescending = () => {
        const sortedProducts = [...products].sort((a, b) => b.price - a.price);
        setProducts(sortedProducts);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="products-page">
            <h1>Produkter</h1>
            <input
                type="text"
                placeholder="Sök efter produkter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={sortProductsByPriceDescending}>Sortera efter pris</button>
            <div className="products-list">
                {filteredProducts.map((product) => (
                    <Product key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
