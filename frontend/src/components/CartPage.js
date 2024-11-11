import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = ({ cart, setCart }) => {
    const [purchaseCompleted, setPurchaseCompleted] = useState(false);
    const navigate = useNavigate();

    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    const clearCart = () => {
        fetch('http://localhost:5000/products/restore', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart) // Skicka kundvagnen till backend
        })
        .then(() => {
            setCart([]);
            setPurchaseCompleted(false);
        })
        .catch((err) => console.error("Fel vid återställning av lagret:", err));
    };

    const handleCheckout = () => {
        setCart([]);
        setPurchaseCompleted(true);
    };

    return (
        <div className="cart-page">
            <h1>Kundvagn</h1>
            {purchaseCompleted ? (
                <p className="confirmation-message">Tack! Köpet är genomfört.</p> 
            ) : cart.length === 0 ? (
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
                    <button onClick={handleCheckout}>BETALA</button>
                    <button onClick={clearCart}>TÖM</button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
