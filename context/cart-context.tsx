"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  cartId?: string; // Her ekleme için benzersiz ID
  id: string | number;
  title: string;
  price: number;
  image: string;
  category: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void; // HATA VEREN FONKSİYON EKLENDİ
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Sayfa yüklendiğinde sepeti hafızadan çek (Sayfa yenilenince kaybolmasın)
  useEffect(() => {
    const savedCart = localStorage.getItem("aurax_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sepet her değiştiğinde hafızaya kaydet
  useEffect(() => {
    localStorage.setItem("aurax_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    // Ürüne rastgele bir cartId atayarak aynı üründen defalarca eklenebilmesini sağlıyoruz
    const newItem = { ...item, cartId: Math.random().toString(36).substr(2, 9) };
    setCart((prev) => [...prev, newItem]);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Sepeti tamamen boşaltma fonksiyonu
  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

