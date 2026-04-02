"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/data-store";
import { ArrowLeft, Calendar, Share2, Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function PortfolioDetailView({ id }: { id: string }) {
  const { portfolio, isReady } = useStore();
  const item = portfolio.find((p) => p.id === id);

  if (!isReady) return null;
  if (!item) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Wpis nie znaleziony.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6 font-sans">
      <Navbar />
      
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12 uppercase text-xs font-bold tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Powrót do galerii
        </Link>
        
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest">
              {item.category}
            </span>
            <span className="text-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {item.date}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
            {item.title}
          </h1>
          <p className="text-muted text-xl font-light italic border-l-2 border-accent/30 pl-6 py-4">
            {item.shortDescription}
          </p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="aspect-[16/9] relative overflow-hidden mb-16 border border-white/5"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <article className="prose prose-invert prose-lg max-w-none">
          <div className="flex items-center gap-4 mb-12 py-6 border-b border-white/5">
             <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-black" />
             </div>
             <div>
                <span className="block text-white font-bold uppercase text-[10px] tracking-widest">Autor</span>
                <span className="text-muted text-sm uppercase">Rafał Woźny</span>
             </div>
          </div>
          
          <div className="text-muted text-lg leading-relaxed font-light space-y-8 first-letter:text-5xl first-letter:font-serif first-letter:text-accent first-letter:float-left first-letter:mr-3 first-letter:mb-1">
             {item.fullDescription.split('\n').map((paragraph, i) => (
               <p key={i}>{paragraph}</p>
             ))}
          </div>
        </article>

        <div className="mt-24 pt-12 border-t border-white/5 flex items-center justify-between">
           <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted hover:text-white transition-colors">
              <Share2 className="w-4 h-4" /> Udostępnij historię
           </button>
           <div className="flex gap-4">
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">Tagi:</span>
              <span className="text-muted text-[10px] font-bold uppercase tracking-widest italic cursor-pointer hover:text-accent">#tatry</span>
              <span className="text-muted text-[10px] font-bold uppercase tracking-widest italic cursor-pointer hover:text-accent">#fotografia</span>
           </div>
        </div>
      </div>
    </main>
  );
}
