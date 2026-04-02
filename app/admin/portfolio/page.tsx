"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";
import { useStore } from "@/lib/data-store";
import { PortfolioItem } from "@/lib/mock-data";
import { 
  Camera, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Calendar,
  X,
  Save
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AdminPortfolioPage() {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { portfolio, savePortfolio, isReady } = useStore();
  const router = useRouter();
  
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<PortfolioItem, "id">>({
    title: "",
    category: "Góry",
    image: "",
    shortDescription: "",
    fullDescription: "",
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/login");
    }
  }, [isAdmin, authLoading, router]);

  const filteredItems = portfolio.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Czy na pewno chcesz usunąć ten wpis z portfolio?")) {
       savePortfolio(portfolio.filter(p => p.id !== id));
    }
  };

  const handleOpenModal = (item?: PortfolioItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        category: item.category,
        image: item.image,
        shortDescription: item.shortDescription,
        fullDescription: item.fullDescription,
        date: item.date
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        category: "Góry",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
        shortDescription: "",
        fullDescription: "",
        date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      const updated = portfolio.map(p => p.id === editingItem.id ? { ...p, ...formData } : p);
      savePortfolio(updated);
    } else {
      const newItem: PortfolioItem = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      savePortfolio([...portfolio, newItem]);
    }
    setIsModalOpen(false);
  };

  if (authLoading || !isAdmin || !isReady) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-24 px-6">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4 text-accent uppercase tracking-[0.3em] text-xs font-bold">
              <Camera className="w-4 h-4" /> 
              <span>Portfolio CMS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-2">Zarządzaj Galerią</h1>
            <p className="text-muted text-sm font-light uppercase tracking-widest leading-relaxed">Dodawaj zdjęcia i nowe historie do swojego portfolio.</p>
          </div>

          <button 
            onClick={() => handleOpenModal()}
            className="bg-accent text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-3"
          >
             <Plus className="w-4 h-4" /> Dodaj Nowy Wpis
          </button>
        </header>

        {/* Toolbar */}
        <div className="bg-zinc-950 border border-white/5 p-4 mb-8 flex items-center">
           <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input 
                type="text" 
                placeholder="Szukaj wpisu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/40 border border-white/5 py-4 pl-12 pr-4 text-white placeholder-muted focus:outline-none focus:border-accent/30 transition-all font-light text-sm"
              />
           </div>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 gap-6">
           {filteredItems.map((item) => (
              <motion.div 
                key={item.id}
                layout
                className="bg-zinc-950 border border-white/5 p-6 flex flex-col md:flex-row items-center gap-8 group hover:border-accent/20 transition-all shadow-xl shadow-black/20"
              >
                 <div className="w-full md:w-48 aspect-video md:aspect-square relative overflow-hidden bg-black flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                 </div>
                 
                 <div className="flex-grow space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                       <span className="text-[10px] font-bold text-accent px-3 py-1 border border-accent/20 uppercase tracking-widest">{item.category}</span>
                       <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {item.date}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-muted text-sm font-light leading-relaxed line-clamp-1 max-w-2xl">{item.shortDescription}</p>
                 </div>

                 <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                    <Link href={`/portfolio/${item.id}`} className="p-3 text-muted hover:text-white border border-white/5 hover:bg-white/10" title="Podgląd">
                       <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="p-3 text-muted hover:text-accent border border-white/5 hover:bg-white/10" 
                      title="Edytuj"
                    >
                       <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-3 text-muted hover:text-red-500 border border-white/5 hover:bg-white/10" 
                      title="Usuń"
                    >
                       <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
              </motion.div>
           ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 text-muted hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-serif font-bold text-white mb-8">
                {editingItem ? "Edytuj Wpis" : "Dodaj Nowy Wpis"}
              </h2>

              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Tytuł Wpisu</label>
                    <input 
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Kategoria</label>
                    <input 
                      required
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-widest">URL Zdjęcia</label>
                    <input 
                      required
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Data</label>
                    <input 
                      required
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Krótki Opis (Zajawka)</label>
                  <input 
                    required
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Pełna Treść (Historia)</label>
                  <textarea 
                    required
                    rows={8}
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-accent text-black py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 shadow-xl shadow-accent/10"
                >
                  <Save className="w-5 h-5" /> {editingItem ? "Zapisz Zmiany" : "Opublikuj Wpis"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
