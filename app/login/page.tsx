"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, LogIn, UserPlus, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Proszę wypełnić wszystkie pola.");
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await login(email, password);
      if (result.success) {
        if (!result.isVerified) {
          router.push(`/register/verify?uid=${result.uid}`);
        } else {
          router.push("/");
        }
      } else {
        // Map common Firebase errors to Polish
        let msg = result.error;
        if (msg.includes("auth/invalid-credential")) msg = "Nieprawidłowy e-mail lub hasło.";
        if (msg.includes("auth/user-not-found")) msg = "Użytkownik nie istnieje.";
        if (msg.includes("auth/wrong-password")) msg = "Nieprawidłowe hasło.";
        setError(msg);
      }
    } catch (err) {
      setError("Wystąpił nieoczekiwany błąd.");
    } finally {
      setIsLoading(false);
    }
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
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3 text-red-500 text-[10px] font-bold uppercase tracking-widest"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              <div className="relative group">
                <Mail className="absolute left-0 top-3 w-5 h-5 text-muted group-focus-within:text-accent transition-colors" />
                <input
                  disabled={isLoading}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-3 pl-10 text-white placeholder-muted focus:outline-none focus:border-accent transition-all font-light disabled:opacity-50"
                />
              </div>
              
              <div className="relative group">
                <Lock className="absolute left-0 top-3 w-5 h-5 text-muted group-focus-within:text-accent transition-colors" />
                <input
                  disabled={isLoading}
                  type="password"
                  placeholder="Hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-3 pl-10 text-white placeholder-muted focus:outline-none focus:border-accent transition-all font-light disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-6">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-accent text-black py-4 mt-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-30 group"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> 
                    Zaloguj Się
                  </>
                )}
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
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

