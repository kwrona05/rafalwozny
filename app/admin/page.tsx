"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Image as ImageIcon, 
  Settings, 
  Users, 
  TrendingUp, 
  ArrowUpRight 
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/login");
    }
  }, [isAdmin, isLoading, router]);

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: "Zamówienia", value: "12", change: "+4 dzisiaj", icon: TrendingUp },
    { label: "Produkty", value: "3", change: "0 dzisiaj", icon: ShoppingBag },
    { label: "Blog / Portfolio", value: "3", change: "0 dzisiaj", icon: ImageIcon },
    { label: "Użytkownicy", value: "1", change: "0 dzisiaj", icon: Users },
  ];

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4 text-accent uppercase tracking-[0.3em] text-xs font-bold">
            <LayoutDashboard className="w-4 h-4" /> 
            <span>System Zarządzania Treścią</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white">
            Witaj, <span className="text-accent">{user?.name}</span>
          </h1>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
              className="bg-zinc-950 border border-white/5 p-8 hover:border-accent/20 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <stat.icon className="w-6 h-6 text-accent/60 group-hover:text-accent transition-colors" />
                <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">{stat.change}</span>
              </div>
              <div className="text-3xl font-serif font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-muted uppercase font-bold tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Link href="/admin/products" className="group">
              <div className="bg-zinc-950 border border-white/5 p-12 relative overflow-hidden h-full">
                 <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <ShoppingBag className="w-32 h-32 text-white" />
                 </div>
                 <h2 className="text-3xl font-serif font-bold text-white mb-4">Zarządzaj Sklepem</h2>
                 <p className="text-muted text-sm font-light mb-8 max-w-sm">Dodawaj nowe wydruki, presety Lightroom lub edytuj istniejące warsztaty.</p>
                 <span className="inline-flex items-center gap-2 text-[10px] text-accent font-bold uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                    Otwórz Sklep CMS <ArrowUpRight className="w-4 h-4" />
                 </span>
              </div>
           </Link>

           <Link href="/admin/portfolio" className="group">
              <div className="bg-zinc-950 border border-white/5 p-12 relative overflow-hidden h-full">
                 <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <ImageIcon className="w-32 h-32 text-white" />
                 </div>
                 <h2 className="text-3xl font-serif font-bold text-white mb-4">Zarządzaj Portfolio</h2>
                 <p className="text-muted text-sm font-light mb-8 max-w-sm">Publikuj nowe zdjęcia i twórz historie na mini-blogu fotograficznym.</p>
                 <span className="inline-flex items-center gap-2 text-[10px] text-accent font-bold uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                    Otwórz Portfolio CMS <ArrowUpRight className="w-4 h-4" />
                 </span>
              </div>
           </Link>
        </div>
      </div>
    </main>
  );
}
