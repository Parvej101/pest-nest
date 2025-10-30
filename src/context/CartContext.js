"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useLocalStorageState from "use-local-storage-state";

const CartContext = createContext({});


export function CartProvider({ children }) {
  // localStorage-এ 'cart' নামে ডেটা সেভ হবে
  const [cartItems, setCartItems] = useLocalStorageState('cart', { defaultValue: [] });
  
   // কুপন এবং ডিসকাউন্টের জন্য state
  const [coupon, setCoupon] = useLocalStorageState('coupon', { 
    defaultValue: { code: '', discount: 0 } 
  });

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


   // কুপন প্রয়োগ করার ডাইনামিক ফাংশন
  async function applyCoupon(couponCode) {
    if (!couponCode.trim()) {
      setCoupon({ code: '', discount: 0 });
      return { success: true };
    }
    try {
      const res = await fetch(`/api/coupons/${couponCode.toUpperCase()}`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Invalid coupon code.");
      
      const couponData = result.data;
      const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      let discountAmount = 0;
      if (couponData.discountType === 'percentage') {
        discountAmount = subTotal * (couponData.discountValue / 100);
      } else if (couponData.discountType === 'fixed') {
        discountAmount = couponData.discountValue;
      }
      setCoupon({ code: couponData.code, discount: discountAmount });
      return { success: true, discount: discountAmount, code: couponData.code };
    } catch (err) {
      setCoupon({ code: '', discount: 0 });
      return { success: false, error: err.message };
    }
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
           const availableStock = item.stock || 0;
          const newQuantity = item.quantity + amount;
          
           if (newQuantity > availableStock) {
            Swal.fire('Limit Reached!', `Only ${availableStock} items are available.`, 'warning');
            return item; // কোনো পরিবর্তন করা হবে না
          }
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean);
    });
  }

  // কার্ট খালি করার ফাংশন
  function clearCart() {
    setCartItems([]);
    setCoupon({ code: '', discount: 0 });
  }

  return (
    <CartContext.Provider value={{
      cartItems: isClient ? cartItems : [],
      coupon: isClient ? coupon : { code: '', discount: 0 },
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyCoupon, 
    }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. একটি কাস্টম হুক তৈরি করা, যা ব্যবহার করাকে সহজ করে
export function useCart() {
  return useContext(CartContext);
}