"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { PortfolioItem } from "@/lib/mock-data";

interface BlogCardProps {
  item: PortfolioItem;
  index: number;
}

export default function BlogCard({ item, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-zinc-950/50 border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-500"
    >
      <Link href={`/portfolio/${item.id}`} className="aspect-[16/10] relative overflow-hidden block">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
      </Link>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-accent text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-accent/20">
            {item.category}
          </span>
          <span className="text-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Calendar className="w-3 h-3" /> {item.date}
          </span>
        </div>
        
        <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
          <Link href={`/portfolio/${item.id}`}>{item.title}</Link>
        </h3>
        
        <p className="text-muted text-sm font-light leading-relaxed mb-8 line-clamp-3">
          {item.shortDescription}
        </p>
        
        <div className="mt-auto">
          <Link 
            href={`/portfolio/${item.id}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border-b border-accent pb-1 hover:text-accent transition-all duration-300"
          >
            Czytaj Więcej <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
