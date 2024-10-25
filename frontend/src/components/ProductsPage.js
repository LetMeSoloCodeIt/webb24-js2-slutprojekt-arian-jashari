import React, { useState, useEffect } from 'react'; 
import Product from './Product'; 
import './ProductsPage.css';

const ProductsPage = ({ setCart, cart }) => {
    const [products, setProducts] = useState([]); // State för  produkter
    const [searchTerm, setSearchTerm] = useState(''); // State för  sökord

    useEffect(() => {
        // Hämta data från API
        fetch('http://localhost:5000/products') // Min backend URL
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Fel vid hämtning av produkter:", err));
    }, []);

    const addToCart = (product) => {
        // Kolla om produkten redan finns i kundvagnen
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
        
        if (existingProductIndex >= 0) {
            // Om produkten redan finn så öka antalet
            const updatedCart = cart.map((item, index) =>
                index === existingProductIndex
                    ? { ...item, quantity: item.quantity + 1 } // Öka antalet
                    : item
            );

            // Uppdatera bara lagret om det är mer än 0
            const updatedProducts = products.map((p) =>
                p.id === product.id ? { ...p, stock: p.stock - 1 } : p
            );

            setCart(updatedCart); // Uppdatera kundvagnens status
            setProducts(updatedProducts); // Uppdatera produktstatus
        } else {
            // Om produkten inte finns så lägg till 1 i mängd
            setCart([...cart, { ...product, quantity: 1 }]);

            // Uppdatera saldo
            const updatedProducts = products.map((p) =>
                p.id === product.id ? { ...p, stock: p.stock - 1 } : p
            );

            setProducts(updatedProducts); 
        }
    };

    // sortera efter pris
    const sortProductsByPriceDescending = () => {
        const sortedProducts = [...products].sort((a, b) => b.price - a.price); // Sortera produkterna 
        setProducts(sortedProducts); // Uppdatera produkterna sorterade
    };

    // Filtrera efter sök
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="products-page">
            <h1>Produkter</h1>
            <input
                type="text"
                placeholder="Sök efter produkter..." // Sökbarens text
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={sortProductsByPriceDescending}>Sortera efter pris</button> {/* Sorteringsknapp */}
            <div className="products-list">
                {filteredProducts.map((product) => (
                    <Product key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
