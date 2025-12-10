import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cartItems } = useCart();

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <Link to="/">Back to Products</Link>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;

