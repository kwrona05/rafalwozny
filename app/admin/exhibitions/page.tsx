"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";
import { useStore } from "@/lib/data-store";
import { Exhibition } from "@/lib/mock-data";
import { 
  Presentation, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X,
  Save,
  Calendar,
  MapPin,
  Upload,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminExhibitionsPage() {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { exhibitions, saveExhibitions, isReady } = useStore();
  const router = useRouter();
  
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Exhibition | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Omit<Exhibition, "id">>({
    title: "",
    description: "",
    images: [],
    date: new Date().toISOString().split('T')[0],
    place: ""
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/login");
    }
  }, [isAdmin, authLoading, router]);

  const filteredItems = exhibitions.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.place.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Czy na pewno chcesz usunąć tę wystawę/prelekcję?")) {
       saveExhibitions(exhibitions.filter(item => item.id !== id));
    }
  };

  const handleOpenModal = (item?: Exhibition) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        images: item.images,
        date: item.date,
        place: item.place
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        description: "",
        images: [],
        date: new Date().toISOString().split('T')[0],
        place: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    const files = Array.from(e.target.files);
    const newUrls: string[] = [];

    try {
      for (const file of files) {
        const storageRef = ref(storage, `exhibitions/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        newUrls.push(url);
      }
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newUrls]
      }));
    } catch (error) {
      console.error("Upload failed", error);
      alert("Błąd podczas przesyłania plików.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      const updated = exhibitions.map(item => item.id === editingItem.id ? { ...item, ...formData } : item);
      saveExhibitions(updated);
    } else {
      const newItem: Exhibition = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      saveExhibitions([...exhibitions, newItem]);
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
              <Presentation className="w-4 h-4" /> 
              <span>Wystawy i Prelekcje CMS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-2">Zarządzaj Wydarzeniami</h1>
            <p className="text-muted text-sm font-light uppercase tracking-widest leading-relaxed">Dodawaj informacje o swoich wystawach i prelekcjach.</p>
          </div>

          <button 
            onClick={() => handleOpenModal()}
            className="bg-accent text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-3"
          >
             <Plus className="w-4 h-4" /> Dodaj Wydarzenie
          </button>
        </header>

        {/* Toolbar */}
        <div className="bg-zinc-950 border border-white/5 p-4 mb-8 flex items-center">
           <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input 
                type="text" 
                placeholder="Szukaj wydarzenia..."
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
                className="bg-zinc-950 border border-white/5 p-6 flex flex-col md:flex-row items-center gap-8 group hover:border-accent/20 transition-all"
              >
                 <div className="w-full md:w-48 aspect-video md:aspect-square relative overflow-hidden bg-black flex-shrink-0">
                    {item.images[0] ? (
                      <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-800"><Presentation className="w-12 h-12" /></div>
                    )}
                 </div>
                 
                 <div className="flex-grow space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                       <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1.5"><Calendar className="w-3 h-3 text-accent" /> {item.date}</span>
                       <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1.5"><MapPin className="w-3 h-3 text-accent" /> {item.place}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-muted text-sm font-light leading-relaxed line-clamp-1 max-w-2xl">{item.description}</p>
                 </div>

                 <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="p-3 text-muted hover:text-accent border border-white/5 hover:bg-white/10 transition-all" 
                      title="Edytuj"
                    >
                       <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-3 text-muted hover:text-red-500 border border-white/5 hover:bg-white/10 transition-all" 
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
                {editingItem ? "Edytuj Wydarzenie" : "Dodaj Nowe Wydarzenie"}
              </h2>

              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Tytuł</label>
                    <input 
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Miejsce</label>
                    <input 
                      required
                      type="text"
                      value={formData.place}
                      onChange={(e) => setFormData({...formData, place: e.target.value})}
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

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-accent uppercase tracking-widest block">Zdjęcia</label>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {formData.images.map((url, i) => (
                      <div key={i} className="aspect-square relative group bg-black border border-white/5">
                        <Image src={url} alt="Uploaded" fill className="object-cover" />
                        <button 
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-square border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent/40 transition-colors bg-white/5">
                      {isUploading ? (
                        <Loader2 className="w-6 h-6 text-accent animate-spin" />
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-muted" />
                          <span className="text-[8px] font-bold uppercase tracking-widest text-muted">Dodaj plik</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileUpload} 
                        disabled={isUploading}
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Opis Wydarzenia</label>
                  <textarea 
                    required
                    rows={8}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-accent text-black py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 shadow-xl shadow-accent/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" /> {editingItem ? "Zapisz Zmiany" : "Opublikuj Wydarzenie"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
