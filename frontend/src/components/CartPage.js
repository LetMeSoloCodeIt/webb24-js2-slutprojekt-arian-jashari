import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './CartPage.css'; // importerar min css för cartpage

const CartPage = ({ cart, setCart }) => {
    const [purchaseCompleted, setPurchaseCompleted] = useState(false); // kollar om köpet genomförts
    const navigate = useNavigate(); // navigerar till andra sidor


    //Beräknar totala konstaden
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    //tömmer kundvagnen
    const clearCart = () => {
        setCart([]);
        setPurchaseCompleted(false); // 
        };

    //utcheckning
    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Kundvagnen är tom! Lägg till produkter för att kunna betala.');
            return;
         }
        
        
        
        
        setCart([]); // tömmer min kundvagn
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
                            <p>Pris: {item.price} kr</p>
                        </div>
                    ))}
                    <h3 className="total-price">Total pris: {total} kr</h3>
                    <button onClick={handleCheckout}>BETALA</button>
                    <button onClick={clearCart}>TÖM</button>
                </div>
            )
            }
        </div>
    );
};

export default CartPage;
