"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Product = {
  id: string;
  title: string;
  category: string;
  type: "logo" | "esports" | "bot" | "web";
  price: string;
  imageUrl?: string;
};

export type Order = {
  id: string;
  planName: string;
  fullName: string;
  contact: string;
  notes: string;
  date: string;
  status: "bekliyor" | "tamamlandi";
};

type StoreContextType = {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
  addOrder: (orderData: Omit<Order, "id" | "date" | "status">) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const defaultProducts: Product[] = [
    { id: "logo-1", title: "Apex Vanguard", category: "E-Spor", type: "logo", price: "750", imageUrl: "" },
    { id: "logo-2", title: "CyberNova", category: "Fütüristik", type: "logo", price: "750", imageUrl: "" },
    { id: "logo-3", title: "Vortex Gaming", category: "Topluluk", type: "logo", price: "500", imageUrl: "" },
    { id: "logo-4", title: "Aether Syndicate", category: "Minimal", type: "logo", price: "600", imageUrl: "" },
    { id: "esp-1", title: "Takım Formaları", category: "Giyim", type: "esports", price: "1200", imageUrl: "" },
    { id: "esp-2", title: "Turnuva Afişleri", category: "Grafik", type: "esports", price: "400", imageUrl: "" },
    { id: "esp-3", title: "Sunucu Kimliği", category: "Tasarım", type: "esports", price: "1500", imageUrl: "" },
    { id: "esp-4", title: "Topluluk Rozetleri", category: "İkon", type: "esports", price: "300", imageUrl: "" },
  ];

  const [products, setProducts] = useState<Product[]>([]);

  // Sayfa yüklendiğinde ürünleri LocalStorage'dan çek
  useEffect(() => {
    const savedProducts = localStorage.getItem("aurax_products");
    if (savedProducts && JSON.parse(savedProducts).length > 0) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem("aurax_products", JSON.stringify(defaultProducts));
    }
  }, []);

  // Yeni Ürün Ekle
  const addProduct = (prodData: Omit<Product, "id">) => {
    const newProduct = { ...prodData, id: Math.random().toString(36).substring(2, 9) };
    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem("aurax_products", JSON.stringify(updated));
  };

  // Ürün Sil
  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem("aurax_products", JSON.stringify(updated));
  };

  const addOrder = (orderData: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString("tr-TR"),
      status: "bekliyor",
    };
    const existingOrders = JSON.parse(localStorage.getItem("aurax_orders") || "[]");
    localStorage.setItem("aurax_orders", JSON.stringify([newOrder, ...existingOrders]));
  };

  return (
    <StoreContext.Provider value={{ products, addProduct, deleteProduct, addOrder }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within a StoreProvider");
  return context;
}

