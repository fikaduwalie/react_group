import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, amount = 1) => {
    setCartItems(prev => {
      const idx = prev.findIndex(item => item.id === product.id);
      if (idx !== -1) {
        const newQty = prev[idx].quantity + amount;
        if (newQty <= 0) {
          // Remove item if quantity drops to 0 or below
          return prev.filter(item => item.id !== product.id);
        }
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: newQty };
        return updated;
      }
      // Adding new item
      return [...prev, { ...product, quantity: amount }];
    });
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
