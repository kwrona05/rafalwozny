"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useStore } from "@/lib/data-store";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Presentation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ExhibitionsPage() {
  const { exhibitions, isReady } = useStore();

  if (!isReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6 text-accent uppercase tracking-[0.4em] text-xs font-bold"
          >
            <Presentation className="w-4 h-4" /> 
            <span>Wydarzenia</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif font-bold text-white mb-8"
          >
            Wystawy <br />& <span className="text-accent italic font-light">Prelekcje</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-sm md:text-base font-light uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed"
          >
            Spotkajmy się na żywo. Zapraszam do zapoznania się z nadchodzącymi i archiwalnymi wydarzeniami, podczas których dzielę się swoją pasją do fotografii.
          </motion.p>
        </header>

        {exhibitions.length === 0 ? (
          <div className="text-center py-20 border border-white/5 bg-zinc-950/20">
            <p className="text-muted text-sm uppercase tracking-widest">Brak nadchodzących wydarzeń. Zajrzyj tu wkrótce.</p>
          </div>
        ) : (
          <div className="space-y-32">
            {exhibitions.map((item, index) => (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
              >
                {/* Image Gallery Preview */}
                <div className="w-full lg:w-1/2 group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5">
                    {item.images[0] ? (
                      <Image 
                        src={item.images[0]} 
                        alt={item.title} 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-800"><Presentation className="w-32 h-32" /></div>
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {/* Badge */}
                    <div className="absolute top-8 left-8 bg-accent text-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                       {item.place}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-accent text-[10px] font-bold uppercase tracking-widest">
                      <Calendar className="w-4 h-4" /> {item.date}
                    </div>
                    <div className="w-12 h-[1px] bg-white/10" />
                    <div className="flex items-center gap-2 text-muted text-[10px] font-bold uppercase tracking-widest">
                      <MapPin className="w-4 h-4" /> {item.place}
                    </div>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-white group-hover:text-accent transition-colors leading-tight">
                    {item.title}
                  </h2>

                  <p className="text-muted text-lg font-light leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-6">
                    <button className="group/btn flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-white hover:text-accent transition-colors">
                      Szczegóły wydarzenia 
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                    </button>
                  </div>

                  {/* Multiple Images Preview (if any) */}
                  {item.images.length > 1 && (
                    <div className="flex gap-4 pt-8">
                      {item.images.slice(1, 4).map((img, i) => (
                        <div key={i} className="w-20 h-20 relative overflow-hidden bg-zinc-900 border border-white/5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                          <Image src={img} alt="Gallery" fill className="object-cover" />
                        </div>
                      ))}
                      {item.images.length > 4 && (
                        <div className="w-20 h-20 flex items-center justify-center border border-white/5 bg-zinc-950 text-muted font-bold text-xs uppercase">
                          +{item.images.length - 4}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Footer Decoration */}
      <footer className="mt-48 text-center py-20 border-t border-white/5">
        <div className="text-[10px] text-zinc-600 uppercase tracking-[1em] font-bold">
          © Rafał Woźny Portfolio 2024
        </div>
      </footer>
    </main>
  );
}
