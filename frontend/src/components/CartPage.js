import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './CartPage.css';

const CartPage = ({ cart, setCart, products, setProducts, setPurchaseCompleted }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    const handleCheckout = () => {
        if (cart.length === 0 || isProcessing) return;

        setIsProcessing(true);
        console.log("Genomför köp...");

        fetch('http://localhost:5000/products/purchase', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        })
        .then((res) => res.json())
        .then(() => {
            const updatedProducts = products.map((product) => {
                const cartItem = cart.find(item => item.id === product.id);
                if (cartItem) {
                    return { ...product, stock: product.stock - cartItem.quantity };
                }
                return product;
            });

            setProducts(updatedProducts); 
            setCart([]); 
            setPurchaseCompleted(true);
            
           
            navigate('/bekraftelse'); 
        })
        .catch((err) => {
            console.error("Fel vid genomförande av köp:", err);
            setIsProcessing(false);
        });
    };

    const clearCart = () => {
        setCart([]); 
    };

    return (
        <div className="cart-page">
            <h1>Kundvagn</h1>
            {cart.length === 0 ? (
                <p>Din kundvagn är tom.</p>
            ) : (
                <div>
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <h2>{item.name} - {item.quantity} st</h2>
                            <p>Pris: {item.price * item.quantity} kr</p>
                        </div>
                    ))}
                    <h3 className="total-price">Total pris: {total} kr</h3>
                    <button onClick={handleCheckout} disabled={isProcessing}>BETALA</button>
                    <button onClick={clearCart}>TÖM</button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
