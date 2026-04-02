"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/mock-data";
import { useCart } from "@/lib/cart-store";
import { ShoppingCart, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group bg-zinc-950 border border-white/5 overflow-hidden flex flex-col h-full hover:border-accent/20 transition-all">
      <Link href={`/shop/${product.id}`} className="block aspect-[4/5] relative overflow-hidden bg-black">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <button 
             onClick={(e) => {
               e.preventDefault();
               addItem(product);
             }}
             className="bg-accent text-black p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-2xl hover:bg-white"
             title="Dodaj do koszyka"
           >
              <Plus className="w-6 h-6" />
           </button>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">{product.category}</span>
          <span className="text-white font-serif font-bold text-lg">{product.price} PLN</span>
        </div>
        
        <Link href={`/shop/${product.id}`}>
          <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-accent transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-muted text-xs font-light leading-relaxed mb-6 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <Link 
            href={`/shop/${product.id}`}
            className="text-[10px] font-bold text-white uppercase tracking-widest hover:text-accent transition-colors"
          >
            Szczegóły
          </Link>
          <button 
            onClick={() => addItem(product)}
            className="text-[10px] font-bold text-accent uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
          >
            Dodaj <ShoppingCart className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
