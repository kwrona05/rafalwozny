"use client";

import { useStore } from "./data-store";

export const useCart = () => {
  const { 
    cartItems, 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    totalPrice, 
    isReady 
  } = useStore();

  return {
    items: cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isReady,
  };
};
