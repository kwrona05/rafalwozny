"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = ["Wszystkie", "Góry", "Natura", "Podróże"];

const photos = [
  { id: 1, title: "Tatry Wysokie", category: "Góry", src: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80", size: "large" },
  { id: 2, title: "Zimowy Ranek", category: "Góry", src: "https://images.unsplash.com/photo-1491555103946-3c631c32a97b?auto=format&fit=crop&q=80", size: "small" },
  { id: 3, title: "Jesienne Mgły", category: "Natura", src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80", size: "medium" },
  { id: 4, title: "Dzikie Alpy", category: "Góry", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80", size: "large" },
  { id: 5, title: "Budapeszt Nocą", category: "Podróże", src: "https://images.unsplash.com/photo-1550942003-886ec13f885f?auto=format&fit=crop&q=80", size: "medium" },
  { id: 6, title: "Morski Świt", category: "Natura", src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80", size: "small" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = React.useState("Wszystkie");

  const filteredPhotos = activeCategory === "Wszystkie" 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-3 block">Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">Przegląd Twórczości</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat 
                  ? "bg-white text-black border-white" 
                  : "bg-transparent text-muted border-white/20 hover:border-white/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              layout
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative cursor-pointer overflow-hidden aspect-[4/5]"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2">{photo.category}</span>
                <h3 className="text-white text-2xl font-serif font-bold">{photo.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
