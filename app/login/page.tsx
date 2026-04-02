"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Proszę wypełnić wszystkie pola.");
      return;
    }
    
    login(email, password);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-black flex flex-col justify-center px-6 relative overflow-hidden">
      <Navbar />
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-md w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-950 border border-white/5 p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
          
          <div className="mb-12">
            <h1 className="text-4xl font-serif font-bold text-white mb-2">Witaj Ponownie</h1>
            <p className="text-muted text-sm font-light uppercase tracking-widest">Logowanie do panelu klienta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="relative group">
                <Mail className="absolute left-0 top-3 w-5 h-5 text-muted group-focus-within:text-accent transition-colors" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-3 pl-10 text-white placeholder-muted focus:outline-none focus:border-accent transition-all font-light"
                />
              </div>
              
              <div className="relative group">
                <Lock className="absolute left-0 top-3 w-5 h-5 text-muted group-focus-within:text-accent transition-colors" />
                <input
                  type="password"
                  placeholder="Hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-3 pl-10 text-white placeholder-muted focus:outline-none focus:border-accent transition-all font-light"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{error}</p>}

            <div className="flex flex-col gap-6 pt-6">
              <button
                type="submit"
                className="w-full bg-accent text-black py-4 mt-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-3"
              >
                <LogIn className="w-4 h-4" /> Zaloguj Się
              </button>
              
              <div className="flex flex-col items-center gap-4 text-[10px] text-muted font-bold uppercase tracking-widest">
                <span>Nie masz konta?</span>
                <Link 
                  href="/register"
                  className="text-white hover:text-accent transition-colors flex items-center gap-2"
                >
                  Utwórz Nowe Konto <UserPlus className="w-3.5 h-3.5 text-accent" />
                </Link>
              </div>
              
              <div className="text-center pt-8 border-t border-white/5 opacity-50">
                 <p className="text-[10px] text-muted font-bold uppercase tracking-tight">Dane demo admina:</p>
                 <p className="text-[10px] text-accent font-bold uppercase tracking-tight">admin@rafalwozny.pl / admin123</p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
