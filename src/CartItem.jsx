import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNumber = parseFloat(item.cost.replace('$', ''));
      return total + costNumber * item.quantity;
    }, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
          <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
          <div>
            <h3>{item.name}</h3>
            <p>Unit Cost: {item.cost}</p>
            <div>
              <button onClick={() => handleDecrement(item)}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p>Subtotal: ${(parseFloat(item.cost.replace('$', '')) * item.quantity).toFixed(2)}</p>
            <button onClick={() => handleRemove(item)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        <button onClick={onContinueShopping} style={{ marginRight: '10px' }}>Continue Shopping</button>
        <button onClick={() => alert('Checkout functionality coming soon!')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
