"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-store";
import { ArrowLeft, CreditCard, Truck, ShieldCheck, ShoppingBag, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, isReady } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    zipCode: "",
    city: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Call our custom imoje payment API
      const response = await fetch("/api/payments/imoje", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          totalPrice,
          customer: formData,
          successUrl: `${window.location.origin}/checkout/success`,
          failureUrl: `${window.location.origin}/checkout/failure`,
        }),
      });

      const result = await response.json();

      if (result.success && result.paymentUrl) {
        // 2. Redirect to imoje payment page
        // No clearCart here - we do it on the success page
        window.location.href = result.paymentUrl;
      } else {
        setError(result.error || "Wystąpił błąd podczas inicjacji płatności.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Wystąpił błąd podczas przetwarzania transakcji. Spróbuj ponownie.");
      setIsSubmitting(false);
    }
  };

  if (!isReady) return null;
  if (items.length === 0 && !isSubmitting) {
    router.push("/cart");
    return null;
  }

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6 font-sans antialiased text-foreground">
      <Navbar />

      <div className="max-w-5xl mx-auto">
        <Link 
          href="/cart" 
          className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12 uppercase text-[10px] font-bold tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Powrót do koszyka
        </Link>

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-16 uppercase tracking-tighter">
          Finalizacja <span className="text-accent underline underline-offset-8 decoration-white/10 italic">Zamówienia</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-widest mb-8"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-12">
               <div className="space-y-6">
                  <h2 className="text-xl font-serif font-bold text-white flex items-center gap-3 uppercase tracking-widest">
                     <Truck className="w-5 h-5 text-accent" /> Dane do wysyłki
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Imię i Nazwisko</label>
                        <input 
                          required 
                          type="text" 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-white/5 py-4 px-4 text-white focus:outline-none focus:border-accent transition-colors" 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Email</label>
                        <input 
                          required 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-white/5 py-4 px-4 text-white focus:outline-none focus:border-accent transition-colors" 
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Adres</label>
                     <input 
                        required 
                        type="text" 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-950 border border-white/5 py-4 px-4 text-white focus:outline-none focus:border-accent transition-colors" 
                        placeholder="Ulica, Numer domu/mieszkania" 
                     />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Kod Pocztowy</label>
                        <input 
                          required 
                          type="text" 
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-white/5 py-4 px-4 text-white focus:outline-none focus:border-accent transition-colors" 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Miasto</label>
                        <input 
                          required 
                          type="text" 
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-white/5 py-4 px-4 text-white focus:outline-none focus:border-accent transition-colors" 
                        />
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <h2 className="text-xl font-serif font-bold text-white flex items-center gap-3 uppercase tracking-widest">
                     <CreditCard className="w-5 h-5 text-accent" /> Metoda Płatności
                  </h2>
                  <div className="grid grid-cols-1 gap-2">
                     <label className="group relative flex items-center gap-4 p-5 bg-zinc-950 border border-white/5 cursor-pointer hover:border-accent/40 transition-all">
                        <input type="radio" name="payment" defaultChecked className="accent-accent" />
                        <span className="text-white font-bold text-xs uppercase tracking-widest">Karta Płatnicza / BLIK</span>
                        <div className="ml-auto flex gap-2">
                           <div className="w-8 h-5 bg-white/10 rounded" />
                           <div className="w-8 h-5 bg-white/10 rounded" />
                        </div>
                     </label>
                     <label className="group relative flex items-center gap-4 p-5 bg-zinc-950 border border-white/5 cursor-pointer opacity-50">
                        <input type="radio" name="payment" disabled className="accent-accent" />
                        <span className="text-white font-bold text-xs uppercase tracking-widest">PayPal (Wkrótce)</span>
                     </label>
                  </div>
               </div>

               <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-black py-6 text-sm font-bold uppercase tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-4 shadow-2xl shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {isSubmitting ? "Przetwarzanie..." : (<>Zapłać {totalPrice} PLN <ArrowRight className="w-5 h-5" /></>)}
               </button>
            </form>
          </motion.div>

          {/* Right Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 h-fit"
          >
             <div className="bg-zinc-950 border border-white/5 p-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.3em] mb-8 pb-4 border-b border-white/10 flex items-center gap-3">
                   <ShoppingBag className="w-4 h-4 text-accent" /> Podsumowanie
                </h3>
                <div className="space-y-6 max-h-[400px] overflow-y-auto mb-8 px-2 scrollbar-thin scrollbar-thumb-accent">
                   {items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center">
                         <div className="w-16 h-16 relative overflow-hidden bg-black border border-white/10">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                         </div>
                         <div className="flex-grow">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider line-clamp-1">{item.name}</h4>
                            <div className="text-[10px] text-muted uppercase font-light">szt: {item.quantity}</div>
                         </div>
                         <div className="text-sm font-serif font-bold text-white">{item.price * item.quantity} PLN</div>
                      </div>
                   ))}
                </div>
                <div className="space-y-3 pt-6 border-t border-white/10">
                   <div className="flex justify-between text-muted text-[10px] font-bold uppercase tracking-widest">
                      <span>Wartość koszyka</span>
                      <span>{totalPrice} PLN</span>
                   </div>
                   <div className="flex justify-between text-accent text-[10px] font-bold uppercase tracking-widest">
                      <span>Przesyłka</span>
                      <span>0.00 PLN</span>
                   </div>
                   <div className="flex justify-between text-white font-bold text-lg uppercase tracking-widest pt-4">
                      <span>Suma</span>
                      <span className="text-2xl font-serif text-accent">{totalPrice} PLN</span>
                   </div>
                </div>
             </div>
             
             <div className="mt-8 flex items-center justify-center gap-4 text-muted">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Szyfrowane połączenie SSL</span>
             </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
