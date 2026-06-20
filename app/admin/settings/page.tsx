"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";
import { useStore } from "@/lib/data-store";
import { SiteSettings } from "@/lib/mock-data";
import { 
  Settings as SettingsIcon,
  Upload, 
  Loader2, 
  Save,
  ArrowLeft,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminSettingsPage() {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { settings, saveSettings, isReady } = useStore();
  const router = useRouter();

  const [formData, setFormData] = useState<SiteSettings>({
    siteName: "",
    siteLogo: "",
    contactPhone: "",
    contactEmail: "",
    aboutTitle: "",
    aboutText: "",
    aboutImage: ""
  });

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingAbout, setIsUploadingAbout] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/login");
    }
  }, [isAdmin, authLoading, router]);

  useEffect(() => {
    if (isReady && settings) {
      setFormData(settings);
    }
  }, [isReady, settings]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "logo" | "about") => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (target === "logo") {
      setIsUploadingLogo(true);
    } else {
      setIsUploadingAbout(true);
    }

    try {
      const storageRef = ref(storage, `settings/${target}_${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      setFormData(prev => ({
        ...prev,
        [target === "logo" ? "siteLogo" : "aboutImage"]: url
      }));
    } catch (error) {
      console.error("Upload failed", error);
      alert("Błąd podczas przesyłania pliku.");
    } finally {
      if (target === "logo") {
        setIsUploadingLogo(false);
      } else {
        setIsUploadingAbout(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      saveSettings(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save settings", error);
      alert("Błąd zapisu ustawień.");
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || !isAdmin || !isReady) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 font-sans">
      <Navbar />
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12 uppercase text-[10px] font-bold tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Powrót do panelu
          </Link>
          <div className="flex items-center gap-3 mb-4 text-accent uppercase tracking-[0.3em] text-xs font-bold">
            <SettingsIcon className="w-4 h-4" /> 
            <span>Konfiguracja Systemowa</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-2">Ustawienia Strony</h1>
          <p className="text-muted text-sm font-light uppercase tracking-widest leading-relaxed">
            Zmieniaj branding, dane kontaktowe oraz opis sekcji o mnie.
          </p>
        </header>

        {saveSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-600/10 border border-green-500/20 p-4 mb-8 text-green-400 text-xs font-bold uppercase tracking-widest text-center"
          >
            Ustawienia zostały zapisane pomyślnie!
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Sekcja Branding */}
          <div className="bg-zinc-950 border border-white/5 p-8 space-y-6">
            <h2 className="text-xl font-serif font-bold text-white border-b border-white/5 pb-4 uppercase tracking-widest">
              Branding & Nazwa
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Nazwa strony (Logo tekstowe)</label>
                <input 
                  required
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => setFormData({...formData, siteName: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-accent uppercase tracking-widest block">Logo obrazkowe (opcjonalne)</label>
                {formData.siteLogo ? (
                  <div className="relative w-20 h-20 group bg-black border border-white/5 rounded-full overflow-hidden">
                    <Image src={formData.siteLogo} alt="Uploaded logo" fill className="object-cover" />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, siteLogo: ""})}
                      className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <label className="w-full max-w-xs h-16 border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent/40 transition-colors bg-white/5">
                    {isUploadingLogo ? (
                      <Loader2 className="w-6 h-6 text-accent animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-muted" />
                        <span className="text-[8px] font-bold uppercase tracking-widest text-muted">Prześlij logo</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, "logo")} 
                      disabled={isUploadingLogo}
                      className="hidden" 
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Sekcja Kontakt */}
          <div className="bg-zinc-950 border border-white/5 p-8 space-y-6">
            <h2 className="text-xl font-serif font-bold text-white border-b border-white/5 pb-4 uppercase tracking-widest">
              Dane Kontaktowe
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Numer Telefonu</label>
                <input 
                  type="text"
                  placeholder="+48 123 456 789"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Adres Email</label>
                <input 
                  type="email"
                  placeholder="name@domain.com"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light"
                />
              </div>
            </div>
          </div>

          {/* Sekcja O mnie */}
          <div className="bg-zinc-950 border border-white/5 p-8 space-y-6">
            <h2 className="text-xl font-serif font-bold text-white border-b border-white/5 pb-4 uppercase tracking-widest">
              Sekcja O mnie
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Nagłówek sekcji</label>
                <input 
                  type="text"
                  placeholder="Pasja Zrodzona w Górach"
                  value={formData.aboutTitle}
                  onChange={(e) => setFormData({...formData, aboutTitle: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Treść (Opis biograficzny)</label>
                <textarea 
                  rows={6}
                  placeholder="Opisz swoją historię i pasję..."
                  value={formData.aboutText}
                  onChange={(e) => setFormData({...formData, aboutText: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 py-5 px-4 text-white focus:outline-none focus:border-accent transition-all font-light resize-none whitespace-pre-line"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-accent uppercase tracking-widest block">Zdjęcie sekcji O mnie</label>
                {formData.aboutImage ? (
                  <div className="relative aspect-video max-w-md group bg-black border border-white/5">
                    <Image src={formData.aboutImage} alt="About image preview" fill className="object-cover" />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, aboutImage: ""})}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="w-full max-w-md aspect-video border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent/40 transition-colors bg-white/5">
                    {isUploadingAbout ? (
                      <Loader2 className="w-6 h-6 text-accent animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-muted" />
                        <span className="text-[8px] font-bold uppercase tracking-widest text-muted">Dodaj zdjęcie z komputera</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, "about")} 
                      disabled={isUploadingAbout}
                      className="hidden" 
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSaving || isUploadingLogo || isUploadingAbout}
            className="w-full bg-accent text-black py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 shadow-xl shadow-accent/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <><Save className="w-5 h-5" /> Zapisz Wszystkie Zmiany</>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
