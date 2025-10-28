"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

// 1. Context তৈরি করা
const CartContext = createContext({});

// 2. Provider কম্পোনেন্ট তৈরি করা
export function CartProvider({ children }) {
  // localStorage-এ 'cart' নামে ডেটা সেভ হবে
  const [cartItems, setCartItems] = useLocalStorageState('cart', { defaultValue: [] });
  
  // ক্লায়েন্ট সাইডে মাউন্ট হওয়ার পর state ঠিক করার জন্য
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // প্রোডাক্ট যোগ করার ফাংশন
  function addToCart(productId, productDetails) {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === productId);
      if (existingItem) {
        // যদি প্রোডাক্ট আগে থেকেই থাকে, তাহলে শুধু quantity বাড়ানো হচ্ছে
        return prevItems.map(item =>
          item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // যদি নতুন প্রোডাক্ট হয়, তাহলে quantity: 1 সহ যোগ করা হচ্ছে
        return [...prevItems, { ...productDetails, _id: productId, quantity: 1 }];
      }
    });
  }

  // প্রোডাক্ট সরানো/ডিলিট করার ফাংশন
  function removeFromCart(productId) {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  }

  // প্রোডাক্টের পরিমাণ (quantity) আপডেট করার ফাংশন
  function updateQuantity(productId, amount) {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item._id === productId) {
          const newQuantity = item.quantity + amount;
          // যদি পরিমাণ ০ বা তার কম হয়, তাহলে আইটেমটি সরানো হবে
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean); // null আইটেমগুলো অ্যারে থেকে বাদ দেওয়া হচ্ছে
    });
  }

  // কার্ট খালি করার ফাংশন
  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{
      cartItems: isClient ? cartItems : [],
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. একটি কাস্টম হুক তৈরি করা, যা ব্যবহার করাকে সহজ করে
export function useCart() {
  return useContext(CartContext);
}