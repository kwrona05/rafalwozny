"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";
import { useStore } from "@/lib/data-store";
import { Product } from "@/lib/mock-data";
import { 
  ShoppingBag,
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink,
  X,
  Save
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AdminProductsPage() {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { products, saveProducts, isReady } = useStore();
  const router = useRouter();
  
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    category: "Prints",
    image: "",
    description: ""
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/login");
    }
  }, [isAdmin, authLoading, router]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
     if (confirm("Czy na pewno chcesz usunąć ten produkt?")) {
        const updated = products.filter(p => p.id !== id);
        saveProducts(updated);
     }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        description: product.description
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        price: 0,
        category: "Prints",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80",
        description: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      const updated = products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p);
      saveProducts(updated);
    } else {
      const newProduct: Product = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      saveProducts([...products, newProduct]);
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
              <ShoppingBag className="w-4 h-4" /> 
              <span>Sklep CMS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-2">Zarządzaj Produktami</h1>
            <p className="text-muted text-sm font-light uppercase tracking-widest leading-relaxed">Edytuj, usuwaj i dodawaj nowe towary do sklepu.</p>
          </div>

          <button 
            onClick={() => handleOpenModal()}
            className="bg-accent text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-3"
          >
             <Plus className="w-4 h-4" /> Dodaj Nowy Produkt
          </button>
        </header>

        {/* Toolbar */}
        <div className="bg-zinc-950 border border-white/5 p-4 mb-12 flex flex-col md:flex-row gap-4 items-center">
           <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input 
                type="text" 
                placeholder="Szukaj produktu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/40 border border-white/5 py-4 pl-12 pr-4 text-white placeholder-muted focus:outline-none focus:border-accent/30 transition-all font-light text-sm"
              />
           </div>
        </div>

        {/* Table */}
        <div className="bg-zinc-950 border border-white/5 overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/5 bg-white/5">
                       <th className="p-6 text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Produkt</th>
                       <th className="p-6 text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Kategoria</th>
                       <th className="p-6 text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Cena</th>
                       <th className="p-6 text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Akcje</th>
                    </tr>
                 </thead>
                 <tbody>
                    {filteredProducts.map((product) => (
                       <tr key={product.id} className="border-b border-white/5 hover:bg-white/10 transition-colors">
                          <td className="p-6">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 relative overflow-hidden bg-black flex-shrink-0">
                                   <Image src={product.image} alt={product.name} fill className="object-cover" />
                                </div>
                                <div>
                                   <div className="text-white font-bold text-sm uppercase tracking-widest">{product.name}</div>
                                   <div className="text-muted text-[10px] uppercase font-light truncate max-w-[150px]">ID: {product.id}</div>
                                </div>
                             </div>
                          </td>
                          <td className="p-6">
                             <span className="text-[10px] font-bold text-accent px-3 py-1 border border-accent/20 uppercase">
                                {product.category}
                             </span>
                          </td>
                          <td className="p-6">
                             <div className="text-white font-serif font-bold text-lg">{product.price} PLN</div>
                          </td>
                          <td className="p-6">
                             <div className="flex items-center gap-4">
                                <Link href={`/shop/${product.id}`} className="p-2 text-muted hover:text-white" title="Podgląd">
                                   <ExternalLink className="w-4 h-4" />
                                </Link>
                                <button 
                                  onClick={() => handleOpenModal(product)}
                                  className="p-2 text-muted hover:text-accent" 
                                  title="Edytuj"
                                >
                                   <Edit3 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDelete(product.id)}
                                  className="p-2 text-muted hover:text-red-500" 
                                  title="Usuń"
                                >
                                   <Trash2 className="w-4 h-4" />
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
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
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 text-muted hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-serif font-bold text-white mb-8">
                {editingProduct ? "Edytuj Produkt" : "Dodaj Nowy Produkt"}
              </h2>

              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Nazwa Produktu</label>
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Cena (PLN)</label>
                    <input 
                      required
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Kategoria</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as Product["category"]})}
                      className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light appearance-none"
                    >
                      <option value="Prints">Prints</option>
                      <option value="Presets">Presets</option>
                      <option value="Workshops">Workshops</option>
                    </select>
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
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Opis</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-accent text-black py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 shadow-xl shadow-accent/10"
                >
                  <Save className="w-5 h-5" /> {editingProduct ? "Zapisz Zmiany" : "Utwórz Produkt"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
