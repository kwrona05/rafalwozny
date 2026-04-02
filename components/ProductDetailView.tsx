"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/data-store";
import { useCart } from "@/lib/cart-store";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, RefreshCcw, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProductDetailView({ id }: { id: string }) {
  const { products, isReady } = useStore();
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const product = products.find((p) => p.id === id);

  const handleAddToCart = () => {
    if (product) {
      setAdding(true);
      addItem(product);
      setTimeout(() => setAdding(false), 1000);
    }
  };

  if (!isReady) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      Ładowanie...
    </div>
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Produkt nie odnaleziony.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6 font-sans antialiased text-foreground">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12 uppercase text-[10px] font-bold tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Powrót do sklepu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[4/5] relative overflow-hidden bg-zinc-950 border border-white/5"
          >
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Info Section */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="space-y-12"
          >
            <div>
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                {product.name}
              </h1>
              <div className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">
                {product.price} <span className="text-sm font-sans font-normal text-muted uppercase">PLN</span>
              </div>
              <p className="text-muted text-lg font-light leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            {/* Features/Trust */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-y border-white/5">
              <div className="flex flex-col items-center text-center gap-4">
                <ShieldCheck className="w-6 h-6 text-accent" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Bezpieczna płatność</span>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <Truck className="w-6 h-6 text-accent" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Szybka dostawa</span>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <RefreshCcw className="w-6 h-6 text-accent" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">14 dni na zwrot</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={adding}
                className={cn(
                  "flex-1 py-5 text-sm font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-accent/10",
                  adding 
                    ? "bg-green-600 text-white" 
                    : "bg-accent text-black hover:bg-white hover:shadow-white/10"
                )}
              >
                {adding ? (
                  <>Dodano! <Check className="w-5 h-5" /></>
                ) : (
                  <>Dodaj do koszyka <ShoppingCart className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
