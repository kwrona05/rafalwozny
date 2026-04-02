"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, Home, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6 flex items-center justify-center font-sans antialiased text-foreground">
      <Navbar />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="max-w-xl w-full bg-zinc-950 border border-white/5 p-12 text-center shadow-2xl shadow-accent/5 overflow-hidden relative"
      >
        {/* Background Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className="w-24 h-24 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-12 h-12 text-accent" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 uppercase tracking-wider">
            Zamówienie <br /> <span className="text-accent underline underline-offset-8 decoration-white/10 italic">Przyjęte!</span>
          </h1>

          <p className="text-muted text-lg mb-12 font-light leading-relaxed">
            Dziękujemy za zaufanie. Twoje zamówienie zostało przekazane do realizacji. Potwierdzenie wysłaliśmy na Twój adres e-mail.
          </p>

          <div className="flex flex-col gap-6 p-8 bg-black/40 border border-white/5 mb-12 text-left">
            <div className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-widest">
               <Mail className="w-4 h-4 text-accent" /> Sprawdź pocztę
            </div>
            <p className="text-muted text-xs font-light leading-relaxed">
               Znajdziesz tam szczegóły zamówienia oraz informacje o statusie dostawy. W razie pytań skontaktuj się z nami.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link 
              href="/shop" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all"
            >
              Wróć do Sklepu <ShoppingBag className="w-4 h-4" />
            </Link>
            <Link 
              href="/" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent border border-white/10 text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:border-white transition-all"
            >
              Strona Główna <Home className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
