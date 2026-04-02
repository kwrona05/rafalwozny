"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/lib/data-store";
import { Filter, ShoppingBag } from "lucide-react";

const categories = ["Wszystkie", "Prints", "Presets", "Workshops"];

export default function ShopPage() {
  const { products, isReady } = useStore();
  const [activeCategory, setActiveCategory] = useState("Wszystkie");

  const filteredProducts = activeCategory === "Wszystkie"
    ? products
    : products.filter(p => p.category === activeCategory);

  if (!isReady) return null;

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6 font-sans antialiased text-foreground">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4 text-accent uppercase tracking-[0.3em] text-xs font-bold">
            <ShoppingBag className="w-4 h-4" /> 
            <span>Sklep Autorski</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">
            Wydruki i <span className="text-accent underline decoration-accent/20 decoration-2 underline-offset-8">Akcesoria</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl font-light leading-relaxed">
            Wybierz najwyższej jakości produkty fotograficzne, które pomogą Ci zachować piękno natury w Twoim domu lub rozwinąć własne umiejętności.
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-6 mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-2 text-muted text-xs font-bold uppercase tracking-widest mr-4">
            <Filter className="w-4 h-4" /> Filtruj:
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${
                activeCategory === cat 
                ? "bg-accent text-black border-accent" 
                : "bg-transparent text-muted border-white/10 hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      {/* Footer simple */}
      <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-muted">
        <span className="text-sm tracking-widest uppercase font-bold">© 2026 RAFAŁ WOŹNY PHOTOGRAPHY</span>
        <div className="flex gap-8 uppercase text-xs tracking-widest font-bold">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
        </div>
      </footer>
    </main>
  );
}
