"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MOCK_PRODUCTS, MOCK_PORTFOLIO, MOCK_EXHIBITIONS, Product, PortfolioItem, Exhibition, SiteSettings, DEFAULT_SETTINGS } from "./mock-data";

export type CartItem = Product & {
  quantity: number;
};

interface StoreContextType {
  products: Product[];
  portfolio: PortfolioItem[];
  exhibitions: Exhibition[];
  cartItems: CartItem[];
  settings: SiteSettings;
  isReady: boolean;
  saveProducts: (newProducts: Product[]) => void;
  savePortfolio: (newPortfolio: PortfolioItem[]) => void;
  saveExhibitions: (newExhibitions: Exhibition[]) => void;
  saveSettings: (newSettings: SiteSettings) => void;
  // Cart Actions
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(MOCK_PORTFOLIO);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(MOCK_EXHIBITIONS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initial Load
    const storedProducts = localStorage.getItem("rw_products");
    const storedPortfolio = localStorage.getItem("rw_portfolio");
    const storedExhibitions = localStorage.getItem("rw_exhibitions");
    const storedSettings = localStorage.getItem("rw_settings");

    if (storedProducts) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProducts(JSON.parse(storedProducts));
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProducts(MOCK_PRODUCTS);
      localStorage.setItem("rw_products", JSON.stringify(MOCK_PRODUCTS));
    }

    if (storedPortfolio) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPortfolio(JSON.parse(storedPortfolio));
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPortfolio(MOCK_PORTFOLIO);
      localStorage.setItem("rw_portfolio", JSON.stringify(MOCK_PORTFOLIO));
    }
    
    if (storedExhibitions) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExhibitions(JSON.parse(storedExhibitions));
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExhibitions(MOCK_EXHIBITIONS);
      localStorage.setItem("rw_exhibitions", JSON.stringify(MOCK_EXHIBITIONS));
    }

    if (storedSettings) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSettings(JSON.parse(storedSettings));
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSettings(DEFAULT_SETTINGS);
      localStorage.setItem("rw_settings", JSON.stringify(DEFAULT_SETTINGS));
    }

    localStorage.removeItem("rw_cart");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("rw_products", JSON.stringify(newProducts));
  };

  const savePortfolio = (newPortfolio: PortfolioItem[]) => {
    setPortfolio(newPortfolio);
    localStorage.setItem("rw_portfolio", JSON.stringify(newPortfolio));
  };

  const saveExhibitions = (newExhibitions: Exhibition[]) => {
    setExhibitions(newExhibitions);
    localStorage.setItem("rw_exhibitions", JSON.stringify(newExhibitions));
  };

  const saveSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem("rw_settings", JSON.stringify(newSettings));
  };

  const saveCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    localStorage.setItem("rw_cart", JSON.stringify(newItems));
  };

  const addItem = (product: Product) => {
    const existing = cartItems.find((i) => i.id === product.id);
    if (existing) {
      saveCart(
        cartItems.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      saveCart([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeItem = (id: string) => {
    saveCart(cartItems.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) removeItem(id);
    else saveCart(cartItems.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => saveCart([]);

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <StoreContext.Provider value={{
      products,
      portfolio,
      exhibitions,
      cartItems,
      settings,
      isReady,
      saveProducts,
      savePortfolio,
      saveExhibitions,
      saveSettings,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
