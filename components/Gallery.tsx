"use client";

import React from "react";
import Image from "next/image";
import BlogCard from "./BlogCard";
import { useStore } from "@/lib/data-store";

const categories = ["Wszystkie", "Góry", "Natura", "Podróże"];

export default function Gallery() {
  const { portfolio, isReady } = useStore();
  const [activeCategory, setActiveCategory] = React.useState("Wszystkie");

  if (!isReady) return null;

  const filteredItems = activeCategory === "Wszystkie" 
    ? portfolio 
    : portfolio.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-3 block">Portfolio & Blog</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">Historie Pisane <br /> <span className="text-accent">Światłem</span></h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat 
                  ? "bg-accent text-black border-accent" 
                  : "bg-transparent text-muted border-white/10 hover:border-white/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <BlogCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
