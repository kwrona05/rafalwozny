"use client";

import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw, ShoppingCart, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

function FailureContent() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl w-full bg-zinc-950 border border-white/5 p-12 text-center shadow-2xl shadow-red-500/5 relative"
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <XCircle className="w-12 h-12 text-red-500" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 uppercase tracking-wider">
          Płatność <br /> <span className="text-red-500 underline underline-offset-8 decoration-white/10 italic">Nieudana</span>
        </h1>

        <p className="text-muted text-lg mb-12 font-light leading-relaxed">
          Wystąpił problem z Twoją płatnością. Transakcja została przerwana lub odrzucona przez bank. Twoje środki nie zostały pobrane.
        </p>

        <div className="grid grid-cols-1 gap-4 mb-12">
          <div className="p-6 bg-black/40 border border-white/5 text-left">
             <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                <RefreshCw className="w-3 h-3 text-red-500" /> Co możesz zrobić?
             </h3>
             <ul className="text-[11px] text-muted space-y-2 font-light list-disc pl-4 uppercase tracking-tighter">
                <li>Sprawdź dostępność środków na koncie</li>
                <li>Upewnij się, że limity transakcyjne nie zostały przekroczone</li>
                <li>Spróbuj ponownie inną metodą płatności</li>
             </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link 
            href="/checkout" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all"
          >
            Spróbuj Ponownie <RefreshCw className="w-4 h-4" />
          </Link>
          <Link 
            href="/cart" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent border border-white/10 text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:border-white transition-all"
          >
            <ShoppingCart className="w-4 h-4" /> Koszyk
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
           <Link href="/#contact" className="text-[10px] font-bold text-muted hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-2">
              <MessageSquare className="w-3 h-3" /> Potrzebujesz pomocy? Skontaktuj się z nami
           </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function CheckoutFailurePage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6 flex items-center justify-center font-sans antialiased text-foreground">
      <Navbar />
      <Suspense fallback={<div className="text-white">Ładowanie...</div>}>
         <FailureContent />
      </Suspense>
    </main>
  );
}
