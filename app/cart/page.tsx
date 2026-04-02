"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-store";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems, isReady } = useCart();

  if (!isReady) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white font-serif">
      Ładowanie koszyka...
    </div>
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-black pt-32 pb-24 px-6 text-center">
        <Navbar />
        <div className="max-w-xl mx-auto py-24">
          <ShoppingBag className="w-24 h-24 text-accent/20 mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 uppercase tracking-wider">Twój koszyk jest pusty</h1>
          <p className="text-muted text-lg mb-12 font-light">Wygląda na to, że nie dodałeś jeszcze żadnego zdjęcia do swojej kolekcji.</p>
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-3 bg-accent text-black px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-accent/5"
          >
            Przejdź do Sklepu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6 font-sans antialiased text-foreground">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12 uppercase text-[10px] font-bold tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Kontynuuj zakupy
          </Link>
          <div className="flex items-end justify-between">
             <h1 className="text-5xl md:text-7xl font-serif font-bold text-white uppercase tracking-tighter">Twój <br /><span className="text-accent underline decoration-white/10 underline-offset-8">Koszyk</span></h1>
             <div className="text-right hidden md:block">
                <span className="block text-muted text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Razem Przedmiotów</span>
                <span className="text-3xl font-serif font-bold text-white">{totalItems}</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-zinc-950 border border-white/5 p-6 flex flex-col sm:flex-row items-center gap-8 relative hover:border-white/10 transition-colors"
                >
                  <div className="w-full sm:w-32 aspect-square relative overflow-hidden bg-black flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-grow space-y-2 text-center sm:text-left">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">{item.category}</span>
                    <h3 className="text-xl font-serif font-bold text-white tracking-wide">{item.name}</h3>
                    <div className="text-lg font-serif font-bold text-white sm:hidden">{item.price} PLN</div>
                  </div>

                  <div className="flex flex-col items-center sm:items-end gap-4 min-w-[120px]">
                     <div className="flex items-center gap-4 bg-black border border-white/10 p-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted hover:text-white transition-colors"
                        >
                           <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-white font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted hover:text-white transition-colors"
                        >
                           <Plus className="w-4 h-4" />
                        </button>
                     </div>
                     <button 
                       onClick={() => removeItem(item.id)}
                       className="text-muted hover:text-red-500 transition-colors flex items-center gap-2 uppercase text-[10px] font-bold tracking-widest"
                     >
                        Usuń <Trash2 className="w-3 h-3" />
                     </button>
                  </div>

                  <div className="hidden sm:block text-right min-w-[120px]">
                    <div className="text-xl font-serif font-bold text-white">{item.price * item.quantity} PLN</div>
                    <div className="text-muted text-[10px] uppercase font-light">Cena jedn: {item.price} PLN</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
             <div className="bg-zinc-950 border border-accent/20 p-8 sticky top-32 shadow-2xl shadow-accent/5">
                <h2 className="text-2xl font-serif font-bold text-white mb-8 uppercase tracking-widest underline decoration-accent underline-offset-8">Podsumowanie</h2>
                
                <div className="space-y-4 mb-8">
                   <div className="flex justify-between items-center text-muted text-sm px-1">
                      <span>Przedmioty ({totalItems})</span>
                      <span>{totalPrice} PLN</span>
                   </div>
                   <div className="flex justify-between items-center text-muted text-sm px-1">
                      <span>Dostawa</span>
                      <span className="text-accent uppercase font-bold text-xs">Gratis</span>
                   </div>
                   <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center px-1">
                      <span className="text-white font-bold text-lg uppercase tracking-widest">Suma</span>
                      <span className="text-3xl font-serif font-bold text-accent">{totalPrice} PLN</span>
                   </div>
                </div>

                <Link 
                  href="/checkout"
                  className="w-full bg-accent text-black py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 shadow-xl shadow-accent/10"
                >
                  Finalizuj Zamówienie <ArrowRight className="w-5 h-5" />
                </Link>

                <p className="mt-8 text-[10px] text-muted text-center uppercase tracking-widest leading-relaxed">
                   Dokładając produkty do koszyka akceptujesz <br /> regulamin zakupów oraz politykę prywatności.
                </p>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
