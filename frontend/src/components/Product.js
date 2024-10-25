import React from 'react'; //importerar react biblioteket
import './Product.css';  //importerar css stylen

// komponent för enskild produkt
const Product = ({ product, addToCart }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name} {product.price} kr</h2>
            <p>Lager: {product.stock}</p>
            <button onClick={() => addToCart(product)} disabled={product.stock <= 0}>
                KÖP
            </button>
        </div>
        );
};

export default Product;
