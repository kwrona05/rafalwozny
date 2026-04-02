"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-105"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80')",
          filter: "brightness(0.4)"
        }}
      />
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-accent uppercase tracking-[0.3em] text-sm font-bold mb-4 block"
        >
          Fotografia Krajobrazowa
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-[1.1]"
        >
          Uchwycić Duszę <br /> 
          <span className="text-gradient">Natury</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Podróż przez zapierające dech w piersiach krajobrazy, góry i surowe piękno natury, uchwycone w obiektywie Rafała Woźnego.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href="#portfolio" className="group relative px-10 py-5 bg-transparent border border-white text-white text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-all hover:text-black">
            <span className="relative z-10">Odkryj Portfolio</span>
            <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
          </a>
          <Link href="/shop" className="group relative px-10 py-5 bg-accent border border-accent text-black text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-white hover:border-white">
            <span className="relative z-10 flex items-center gap-2">
              Kup Zdjęcie <ShoppingCart className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}
